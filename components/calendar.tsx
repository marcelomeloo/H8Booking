import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import "./calendar.css";
import axios from 'axios';
import createReservation from '@/lib/postReservation';
import { sendReservationEmail } from '@/lib/sendEmail';

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

const Calendar = (props: any) => {
  const calendarRef = useRef()
  const roomId = props.id;
  const email = props.email;

  // StartDate and EndDate variables
  // Calcula o início da semana
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  // Calcula o fim da semana
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const startDate = startOfWeek.toISOString();
  const endDate = endOfWeek.toISOString();

  const editEvent = async (e) => {
    const dp = calendarRef.current.control;
    const modal = await DayPilot.Modal.prompt("Update event text:", e.text());
    if (!modal.result) { return; }
    e.data.text = modal.result;
    dp.events.update(e);
  };

  const [calendarConfig, setCalendarConfig] = useState({
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async args => {
      const dp = calendarRef.current.control;
      const modal = await DayPilot.Modal.prompt("Create a new reservation:", "Event");
      dp.clearSelection();
      if (!modal.result) { return; }
      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result
      });
    },
    onEventClick: async args => {
      await editEvent(args.e);
      const startDate: string = args.e.part.start.value;
      const endDate: string = args.e.part.end.value;

      await createReservation(roomId, email, new Date(startDate), new Date(endDate));
      const emailDetails = {
        userName: email,
        userEmail: email,
        room: roomId,
        // date should have the time and the date
        date: `${new Date(startDate).toLocaleDateString()} (${startDate.split('T')[1]}) - ${new Date(endDate).toLocaleDateString()} (${endDate.split('T')[1]})`
      }
      await sendReservationEmail(emailDetails).catch(err => {
        console.log(err);
      });
    },
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Delete",
          onClick: async args => {
            const dp = calendarRef.current.control;
            dp.events.remove(args.source);
          },
        },
        {
          text: "-"
        },
        {
          text: "Edit...",
          onClick: async args => {
            await editEvent(args.source);
          }
        }
      ]
    }),
    onBeforeEventRender: args => {
      args.data.areas = [
        {
          top: 3,
          right: 3,
          width: 20,
          height: 20,
          symbol:  `https://picsum.photos/24/24?random=${1}`,
          fontColor: "#fff",
          toolTip: "Show context menu",
          action: "ContextMenu",
        },
        {
          top: 3,
          right: 25,
          width: 20,
          height: 20,
          symbol:  `https://picsum.photos/24/24?random=${2}`,
          fontColor: "#fff",
          action: "None",
          toolTip: "Delete event",
          onClick: async args => {
            const dp = calendarRef.current.control;
            dp.events.remove(args.source);
          }
        }
      ];


      const participants = args.data.participants;
      if (participants > 0) {
        // show one icon for each participant
        for (let i = 0; i < participants; i++) {
          args.data.areas.push({
            bottom: 5,
            right: 5 + i * 30,
            width: 24,
            height: 24,
            action: "None",
            image: `https://picsum.photos/24/24?random=${i}`,
            style: "border-radius: 50%; border: 2px solid #fff; overflow: hidden;",
          });
        }
      }
    }
  });

  useEffect(() => {
    // Calcula o início da semana
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    // Calcula o fim da semana
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startDate = startOfWeek.toISOString();
    const endDate = endOfWeek.toISOString();
    const response = axios.get(`/api/rooms/${roomId}/reservations?startDate=${startDate}&endDate=${new Date(
      endDate
    ).toISOString()}`).then(response => {
      const events = response.data.reservations.map((e) => {
        return {
          id: e.id,
          text: "Reserved",
          start: e.init_time,
          end: e.end_time,
          participants: 1,
          status: e.status,
          userId: e.userId,
          roomId: e.roomId
        }
      });

      calendarRef.current.control.update({ startDate, events });
    }).catch(err => {
      console.log(err);
    });

    const events = [];

    calendarRef.current.control.update({ startDate, events });
  }, []);

  return (
    <div style={styles.wrap}>
      <div style={styles.left}>
        <DayPilotNavigator
          selectMode={"Week"}
          showMonths={3}
          skipMonths={3}
          startDate={startDate.slice(0, 10)}
          selectionDay={startDate.slice(0, 10)}
          onTimeRangeSelected={args => {
            calendarRef.current.control.update({
              startDate: args.day
            });
          }}
        />
      </div>
      <div style={styles.main}>
        <DayPilotCalendar
          {...calendarConfig}
          ref={calendarRef}
        />
      </div>
    </div>
  );
}

export default Calendar;
