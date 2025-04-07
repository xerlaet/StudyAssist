"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // For drag-and-drop
import iCalendarPlugin from "@fullcalendar/icalendar"; // For .ics file import

export default function CalendarPage() {
  const [events, setEvents] = useState<{ title: string; start: string | Date; end?: string | Date; description?: string }[]>([]);
  const [eventInput, setEventInput] = useState({ title: "", date: "", startTime: "", endTime: "", description: "" });

  // Add event manually
  const addEvent = () => {
    if (eventInput.title && eventInput.date && eventInput.startTime) {
      const start = `${eventInput.date}T${eventInput.startTime}`;
      const end = eventInput.endTime ? `${eventInput.date}T${eventInput.endTime}` : undefined;
      setEvents([...events, { title: eventInput.title, start, end, description: eventInput.description }]);
      setEventInput({ title: "", date: "", startTime: "", endTime: "", description: "" });
    }
  };

  // Handle .ics file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result as string;
        const calendar = new window.DOMParser().parseFromString(data, "text/xml");
        const importedEvents = Array.from(calendar.querySelectorAll("VEVENT")).map((vevent) => {
          const summary = vevent.querySelector("SUMMARY")?.textContent || "Untitled Event";
          const dtstart = vevent.querySelector("DTSTART")?.textContent || "";
          const dtend = vevent.querySelector("DTEND")?.textContent || "";
          const description = vevent.querySelector("DESCRIPTION")?.textContent || "";

          // Convert DTSTART and DTEND to valid Date objects
          const start = new Date(dtstart);
          const end = dtend ? new Date(dtend) : undefined;

          return { title: summary, start, end, description };
        });

        // Add imported events to the calendar
        setEvents([...events, ...importedEvents]);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-500 to-white flex flex-col items-center font-sans p-4">
      <h1 className="text-2xl font-bold mb-4">My Calendar</h1>

      {/* Add Event Form */}
      <div className="flex flex-col w-full max-w-md gap-2 mb-4">
        <input
          type="text"
          value={eventInput.title}
          onChange={(e) => setEventInput({ ...eventInput, title: e.target.value })}
          placeholder="Event Title"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="date"
          value={eventInput.date}
          onChange={(e) => setEventInput({ ...eventInput, date: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="time"
          value={eventInput.startTime}
          onChange={(e) => setEventInput({ ...eventInput, startTime: e.target.value })}
          placeholder="Start Time"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="time"
          value={eventInput.endTime}
          onChange={(e) => setEventInput({ ...eventInput, endTime: e.target.value })}
          placeholder="End Time (Optional)"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <textarea
          value={eventInput.description}
          onChange={(e) => setEventInput({ ...eventInput, description: e.target.value })}
          placeholder="Event Description (Optional)"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={addEvent}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Add Event
        </button>
      </div>

      {/* Import .ics File */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Import .ics File</label>
        <input
          type="file"
          accept=".ics"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
        />
      </div>

      {/* FullCalendar Component */}
      <div className="w-full max-w-4xl">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, iCalendarPlugin]}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          events={events}
          eventContent={(eventInfo) => (
            <div>
              <b>{eventInfo.event.title}</b>
              {eventInfo.event.extendedProps.description && (
                <div className="text-sm text-gray-500">{eventInfo.event.extendedProps.description}</div>
              )}
            </div>
          )}
          height="auto"
        />
      </div>
    </div>
  );
}