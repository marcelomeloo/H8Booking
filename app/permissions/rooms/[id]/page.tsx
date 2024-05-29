'use client';

import { RoomPermissionsGETResponse } from "@/app/api/rooms/[id]/permissions/route";
import { useParams } from "next/navigation";

export default async function RoomPermissions() {
  const { id } = useParams();

  const { permissions, roomName }: RoomPermissionsGETResponse = await fetch(`/api/rooms/${id}/permissions`).then((res) => res.json());

  console.log(permissions);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full overflow-hidden">
      <h1 className="text-2xl font-semibold mb-4">{roomName} permissions</h1>
      <table className="min-w-full bg-white border rounded-md overflow-hidden text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Create reservation</th>
            <th className="py-2 px-4 border-b">Cancel reservation</th>
          </tr>
        </thead>
        <tbody>
          {// Generate row for each user
            permissions.map((userConfig) => {
              const { user, ...config } = userConfig;

              return (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="checkbox"
                      checked={config.allowCreateReserve}
                      onChange={(e) => {
                        // TODO
                        // fetch(`/api/rooms/${id}/permissions`, {
                        //   method: "PATCH",
                        //   headers: { "Content-Type": "application/json" },
                        //   body: JSON.stringify({
                        //   }),
                        // });
                      }}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="checkbox"
                      checked={config.allowCancelReserve}
                      onChange={(e) => {
                        // TODO
                        // fetch(`/api/rooms/${id}/permissions`, {
                        //   method: "PATCH",
                        //   headers: { "Content-Type": "application/json" },
                        //   body: JSON.stringify({
                        //   }),
                        // });
                      }}
                    />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}