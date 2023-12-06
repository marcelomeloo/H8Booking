import SignOut from "@/components/sign-out";
import getAllRooms from "@/lib/getAllRooms";
import getWeeklyReservations from "@/lib/getWeeklyReservations";
import postReservation from "@/lib/postReservation";
import axios from "axios";

export default async function Home() {
  // const rooms = await postReservation('1', new Date('2023-11-29T00:00:00.000Z'), new Date('2023-11-29T01:00:00.000Z'));
  // console.log(rooms);
  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full max-w-screen-lg aspect-video"
        ></iframe>
        <SignOut />
        <button
          className={`${false
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "border-black bg-black text-white hover:bg-white hover:text-black"
            } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
        >
          <span className="font-semibold">Clique aqui</span>
        </button>
      </div>
    </div>
  );
}
