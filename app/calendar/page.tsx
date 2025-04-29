"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Trash, Edit, Check, XCircle, Upload } from "lucide-react";
import ICAL from "ical.js";

export default function CalendarPage() {
    const today = new Date();
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-indexed (0 = January, 11 = December)
    const [events, setEvents] = useState<{ title: string; date: string; description?: string; start_time?: string; end_time?: string }[]>([
        { title: "Exam", date: "2025-04-01", description: "Midterm exam covering chapters 1-5", start_time: "10:00", end_time: "12:00" },
        { title: "Meeting", date: "2025-04-03", description: "Project discussion with the team", start_time: "14:00", end_time: "15:30" },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedEvent, setSelectedEvent] = useState<{ title: string; description?: string; start_time?: string; end_time?: string } | null>(null);
    const [newEvent, setNewEvent] = useState({ title: "", description: "", start_time: "", end_time: "" });

    // Attach events to the window object for debugging
    // useEffect(() => {
    //     window.events = events;
    //     console.log("Events are now accessible via window.events");
    // }, [events]);

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Days in the current month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // First day of the current month

    const handlePreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11); // Go to December of the previous year
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0); // Go to January of the next year
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handleDayClick = (date: string) => {
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const handleEventClick = (event: { title: string; description?: string; start_time?: string; end_time?: string }) => {
        setSelectedEvent(event);
        setIsEventModalOpen(true);
    };

    const handleAddEvent = () => {
        if (newEvent.title && newEvent.start_time && newEvent.end_time) {
            setEvents([...events, { ...newEvent, date: selectedDate }]);
            setNewEvent({ title: "", description: "", start_time: "", end_time: "" });
            setIsModalOpen(false);
        }
    };

    const handleIcsFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const icsData = e.target?.result as string;
            try {
                const jcalData = ICAL.parse(icsData);
                const comp = new ICAL.Component(jcalData);
                const vevents = comp.getAllSubcomponents("vevent");

                const importedEvents = vevents.map((vevent) => {
                    const event = new ICAL.Event(vevent);

                    // Validate required fields
                    if (!event.summary || !event.startDate || !event.endDate) {
                        throw new Error("Invalid event: Missing required fields (SUMMARY, DTSTART, DTEND).");
                    }

                    // Ensure start and end times are valid
                    const startDate = event.startDate.toJSDate();
                    const endDate = event.endDate.toJSDate();
                    if (!(startDate instanceof Date) || !(endDate instanceof Date) || startDate > endDate) {
                        throw new Error("Invalid event: Invalid or inconsistent start and end times.");
                    }

                    return {
                        title: event.summary || "Untitled Event",
                        date: startDate.toISOString().split("T")[0],
                        description: event.description || "",
                        start_time: startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                        end_time: endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    };
                });

                setEvents((prevEvents) => [...prevEvents, ...importedEvents]);
                alert("Events imported successfully!");
            } catch (error) {
                console.error("Error parsing .ics file:", error);
                alert(`Failed to import events: ${error.message}`);
            }
        };

        reader.readAsText(file);
    };

    const renderDays = () => {
        const days = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="h-32 border p-2 cursor-pointer rounded-lg flex flex-col justify-between"></div>); // Empty cells for padding
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const dayEvents = events.filter((event) => event.date === date);
            const isToday =
                today.getFullYear() === currentYear &&
                today.getMonth() === currentMonth &&
                today.getDate() === day;

            days.push(
                <div
                    key={day}
                    className={`h-32 border p-2 cursor-pointer rounded-lg flex flex-col justify-between ${
                        isToday ? "bg-pink-50" : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleDayClick(date)}
                >
                    <div className="font-bold">{day}</div>
                    <div className="overflow-hidden">
                        {dayEvents.map((event, index) => (
                            <div
                                key={index}
                                className="mt-1 bg-gray-200 text-sm truncate cursor-pointer px-2 py-1 rounded hover:bg-gray-300"
                                // style={{ maxHeight: "1.5rem" }} // Adjusted height for compactness
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering the day click
                                    handleEventClick(event);
                                }}
                            >
                                {event.title}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return days;
    };

    return (
        <div className="relative">
            {/* Import Calendar Button */}
            <div className="mb-4 flex justify-end">
                <label
                    htmlFor="ics-file-input"
                    className="inline-flex items-center px-4 py-2 bg-gray-200 text-sm font-medium rounded cursor-pointer hover:bg-gray-300"
                >
                    Import Calendar
                    <Upload className="w-4 h-4 ml-2" />
                </label>
                <input
                    id="ics-file-input"
                    type="file"
                    accept=".ics"
                    onChange={handleIcsFileUpload}
                    className="hidden" // Hide the actual file input
                />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={handlePreviousMonth}
                    className="px-4 py-2 rounded hover:bg-gray-100 flex items-center justify-center"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-bold">
                    {new Date(currentYear, currentMonth).toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                    })}
                </h2>
                <button
                    onClick={handleNextMonth}
                    className="px-4 py-2 rounded hover:bg-gray-100 flex items-center justify-center"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 text-center font-bold text-lg">
                <div className="bg-gray-100 p-2 rounded">Sun</div>
                <div className="bg-gray-100 p-2 rounded">Mon</div>
                <div className="bg-gray-100 p-2 rounded">Tue</div>
                <div className="bg-gray-100 p-2 rounded">Wed</div>
                <div className="bg-gray-100 p-2 rounded">Thu</div>
                <div className="bg-gray-100 p-2 rounded">Fri</div>
                <div className="bg-gray-100 p-2 rounded">Sat</div>
            </div>
            <div className="grid grid-cols-7 gap-2 mt-4">
                {renderDays()}
            </div>

            {/* Event Details Modal */}
            {isEventModalOpen && selectedEvent && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <Card className="w-96">
                        <CardHeader>
                            <CardTitle className="text-center">{selectedEvent.title}</CardTitle>
                        </CardHeader>
                        <CardDescription className="px-6">
                            <p className="mb-2 text-sm text-gray-700">
                                <strong>Description:</strong> {selectedEvent.description || "No description provided"}
                            </p>
                            <p className="mb-2 text-sm text-gray-700">
                                <strong>Start Time:</strong> {selectedEvent.start_time || "No start time specified"}
                            </p>
                            <p className="mb-4 text-sm text-gray-700">
                                <strong>End Time:</strong> {selectedEvent.end_time || "No end time specified"}
                            </p>
                        </CardDescription>
                        <CardFooter className="flex justify-between">
                            <button
                                className="p-2 hover:bg-gray-100 rounded"
                                onClick={() => {
                                    setEvents(events.filter((event) => event !== selectedEvent));
                                    setIsEventModalOpen(false);
                                }}
                            >
                                <Trash className="w-5 h-5" />
                            </button>
                            <button
                                className="p-2 hover:bg-gray-100 rounded"
                                onClick={() => {
                                    setNewEvent({
                                        title: selectedEvent.title,
                                        description: selectedEvent.description || "",
                                        start_time: selectedEvent.start_time || "",
                                        end_time: selectedEvent.end_time || "",
                                    });
                                    setEvents(events.filter((event) => event !== selectedEvent)); // Temporarily remove the event
                                    setIsEventModalOpen(false);
                                    setIsModalOpen(true); // Open the Add Event modal for editing
                                }}
                            >
                                <Edit className="w-5 h-5" />
                            </button>
                            <button
                                className="p-2 hover:bg-gray-100 rounded"
                                onClick={() => setIsEventModalOpen(false)}
                            >
                                <Check className="w-5 h-5" />
                            </button>
                        </CardFooter>
                    </Card>
                </div>
            )}

            {/* Add Event Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <Card className="w-96">
                        <CardHeader>
                            <CardTitle className="text-center">Add/Edit Event</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={newEvent.description}
                                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Start Time</label>
                                <input
                                    type="time"
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={newEvent.start_time}
                                    onChange={(e) => setNewEvent({ ...newEvent, start_time: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">End Time</label>
                                <input
                                    type="time"
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={newEvent.end_time}
                                    onChange={(e) => setNewEvent({ ...newEvent, end_time: e.target.value })}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <button
                                className="p-2 hover:bg-gray-100 rounded"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <XCircle className="w-5 h-5" />
                            </button>
                            <button
                                className="p-2 hover:bg-gray-100 rounded"
                                onClick={() => {
                                    if (newEvent.title && newEvent.start_time && newEvent.end_time) {
                                        setEvents([...events, { ...newEvent, date: selectedDate }]);
                                        setNewEvent({ title: "", description: "", start_time: "", end_time: "" });
                                        setIsModalOpen(false);
                                    }
                                }}
                            >
                                <Check className="w-5 h-5" />
                            </button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    );
}