"use client";

import Calendar from "@/components/calendar";


export default function RoomReservations({ params, searchParams }: any) {
  const id = String(params.id);
  const email = String(searchParams.email);

  return (<Calendar id={id} email={email} />);
}