"""
Robert Teal
CS 3354
April 6, 2025
"""
from datetime import datetime
from icalendar import Calendar as ICalendar

class Event:
    """
    Represents a single calendar event.
    """
    def __init__(self, title: str, start: datetime, end: datetime, description: str = ""):
        self.title = title
        self.start = start
        self.end = end
        self.description = description

    def __str__(self):
        return (
            f"Title: {self.title}\n"
            f"Start: {self.start}\n"
            f"End: {self.end}\n"
            f"Description: {self.description}\n"
        )


class Calendar:
    """
    Represents a calendar that manages events.
    """
    def __init__(self):
        self.events = []

    def add_event(self, title: str, date: str, start_time: str, end_time: str, description: str = ""):
        """
        Adds an event to the calendar with error handling for invalid inputs.
        
        Args:
            title (str): Title of the event.
            date (str): Date of the event in YYYY-MM-DD format.
            start_time (str): Start time of the event in HH:MM format.
            end_time (str): End time of the event in HH:MM format.
            description (str): Optional description of the event.
        """
        try:
            # Validate title
            if not title.strip():
                raise ValueError("Event title cannot be empty.")

            # Validate and parse date and time
            start_datetime = datetime.strptime(f"{date} {start_time}", "%Y-%m-%d %H:%M")
            end_datetime = datetime.strptime(f"{date} {end_time}", "%Y-%m-%d %H:%M")

            # Ensure start time is before end time
            if start_datetime >= end_datetime:
                raise ValueError("Start time must be earlier than end time.")

            # Create and add the event
            event = Event(title, start_datetime, end_datetime, description)
            self.events.append(event)
            print(f"Event '{title}' added successfully!")

        except ValueError as ve:
            print(f"Error adding event: {ve}")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")

    def import_ics(self, file_path: str):
        """
        Imports events from an .ics file and adds them to the calendar.
        
        Args:
            file_path (str): Path to the .ics file.
        """
        try:
            with open(file_path, "r") as file:
                calendar = ICalendar.from_ical(file.read())
                for component in calendar.walk():
                    if component.name == "VEVENT":
                        title = component.get("SUMMARY", "Untitled Event")
                        dtstart = component.get("DTSTART").dt
                        dtend = component.get("DTEND").dt
                        description = component.get("DESCRIPTION", "")

                        # Ensure dtstart and dtend are datetime objects
                        if isinstance(dtstart, datetime) and isinstance(dtend, datetime):
                            self.add_event(
                                title=title,
                                date=dtstart.strftime("%Y-%m-%d"),
                                start_time=dtstart.strftime("%H:%M"),
                                end_time=dtend.strftime("%H:%M"),
                                description=description,
                            )
        except Exception as e:
            print(f"Error importing .ics file: {e}")

    def list_events(self):
        """
        Lists all events in the calendar.
        """
        if not self.events:
            print("No events found.")
            return
        
        for idx, event in enumerate(self.events, start=1):
            print(f"Event ID: {idx}")
            print(event)
            print("-" * 30)


# Run this file to see the test cases in action
if __name__ == "__main__":
    # Create a calendar instance
    my_calendar = Calendar()

    # Add manual events
    my_calendar.add_event(
        title="Brunch with Friends",
        date="2025-04-06",
        start_time="10:00",
        end_time="11:00",
        description="A fun brunch with friends at the new cafe.",
    )
    my_calendar.add_event(
        title="Brunch with Friends",
        date="2025-04-06",
        start_time="Invalid",
        end_time="Time",
        description="A fun brunch with friends at the new cafe.",
    )
    my_calendar.add_event(
        title="",
        date="2025-04-06",
        start_time="10:00",
        end_time="11:00",
        description="A fun brunch with friends at the new cafe.",
    )
    my_calendar.add_event(
        title="",
        date="2025-04-06",
        start_time="Invalid",
        end_time="Time",
        description="A fun brunch with friends at the new cafe.",
    )

    # Add .ics events
    my_calendar.import_ics("test_valid.ics")
    my_calendar.import_ics("test_invalid.ics")
    my_calendar.import_ics("test_invalid2.ics")
    my_calendar.import_ics("test_invalid3.ics")

    # List all events
    my_calendar.list_events()