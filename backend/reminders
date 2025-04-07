# @author: sanahsp (Sanah Singh)
# @description: AccountManager and Reminder system to handle user creation and notifications

import re
from datetime import datetime, timedelta, timezone
import time 

"""
Reminder class represents a single notification/reminder entry
"""
class Reminder:
    def __init__(self, title: str, description: str, date_time: datetime):
        """
        Initializes a reminder with title, description, and due datetime.

        Args:
            title (str): Title of the reminder
            description (str): Description of the task
            date_time (datetime): The due date and time of the reminder

        Raises:
            ValueError: If title is empty or datetime is in the past
            TypeError: If date_time is not a datetime object
        """
        if not isinstance(title, str) or not title.strip():
            raise ValueError("Title required.")

        if not isinstance(date_time, datetime):
            raise TypeError("Date/time must be a valid datetime object.")

        if date_time < datetime.now(timezone.utc):
            raise ValueError("Date/time has passed.")

        self.title = title
        self.description = description
        self.date_time = date_time

    def __str__(self):
        """
        Returns a string representation of the reminder with formatted time.
        If description is empty, returns 'No description'.
        """
        formatted_time = self.date_time.strftime('%Y-%m-%d %H:%M:%S')
        desc = self.description if self.description else "No description"
        return f"Title: {self.title}, Description: {desc}, Due at: {formatted_time}"

"""
RemindersManager class manages the list of reminders and handles notification logic.
"""
class RemindersManager:
    def __init__(self):
        """
        Initializes an empty list to hold reminders.
        """
        self.reminders = []

    def add_reminder(self, reminder: Reminder):
        """
        Adds a reminder to the reminders list.

        Args:
            reminder (Reminder): A valid Reminder object
        """
        self.reminders.append(reminder)

    def get_all_reminders(self):
        """
        Returns the list of all reminders.

        Returns:
            list: All stored reminders
        """
        return self.reminders

    def delete_reminder(self, reminder: Reminder):
        """
        Deletes a reminder from the list if it exists.

        Args:
            reminder (Reminder): The reminder to delete
        """
        if reminder in self.reminders:
            self.reminders.remove(reminder)

    def check_due_reminders(self):
        """
        Checks current time and notifies if any reminders are due.
        """
        now = datetime.now(timezone.utc)
        due_reminders = {reminder for reminder in self.reminders if reminder.date_time <= now}

        for reminder in due_reminders:
            self.send_notification(reminder)
            self.delete_reminder(reminder)

    def send_notification(self, reminder: Reminder):
        """
        Simulates sending a notification for a reminder.

        Args:
            reminder (Reminder): The reminder being triggered
        """
        print(f"Reminder: {reminder.title} - {reminder.description} (Due at {reminder.date_time.replace(microsecond=0).strftime('%Y-%m-%d %H:%M:%S')})")

# Create a ReminderManager instance
manager = RemindersManager()

# Create reminders using current UTC time + offset
reminder1 = Reminder("Study Python", "Complete the FastAPI tutorial", datetime.now(timezone.utc) + timedelta(seconds=10))
reminder2 = Reminder("Team Meeting", "Prepare the agenda for the meeting", datetime.now(timezone.utc) + timedelta(seconds=20))
reminder3 = Reminder("Math Homework", "", datetime.now(timezone.utc) + timedelta(seconds=10))  # No description

# Add reminders
manager.add_reminder(reminder1)
manager.add_reminder(reminder2)
manager.add_reminder(reminder3)

# Display all reminders
print("All Reminders:")
for reminder in manager.get_all_reminders():
    print(reminder)

# Simulate notification trigger every second
while True:
    manager.check_due_reminders()
    time.sleep(1)
