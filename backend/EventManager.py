# @author ngover05 (Nicholas Gover)
# @description Event manager used to manage and edit events

class EventEditor:
    def __init__(self, user):
        # dictionary to store events
        self.eventDict = user["events"]
    
    # method to edit the title of an event
    def edit_title(self, title, t):
        self.eventDict[t] = self.eventDict["title"]
        self.eventDict.pop(title)
    
    # method to edit the start time of an event
    def edit_start_time(self, title, t):
        self.eventDict[title]["startTime"] = t
    
    # method to edit the end time of an event
    def edit_end_time(self, title, t):
        self.eventDict[title]["endTime"] = t
    
    # method to edit the description of an event
    def edit_description(self, title, d):
        self.eventDict[title]["description"] = d
    
    # method to edit the location of an event
    def edit_location(self, title, l):
        self.eventDict[title]["location"] = l
    
    # method to edit the date of an event
    def edit_date(self, title, d):
        self.eventDict[title]["date"] = d

event1 = {
    "date": "04/08/2025",
    "startTime": "10:00am",
    "endTime": "11:15am",
    "location": "ECSS 2.415",
    "description": "Linear Algebra"
}

event2 = {
    "date": "04/07/2025",
    "startTime": "2:30pm",
    "endTime": "3:45pm",
    "location": "SCI 1.210",
    "description": "Software Engineering"
}

user = {
    "events": {
        "MATH 2418": event1,
        "CS 3354": event2
    }
}

ed = EventEditor(user)
print(user["events"])
ed.edit_location("MATH 2418", "ECSS 2.410")
ed.edit_date("CS 3354", "04/09/2025")
ed.edit_start_time("MATH 2418", "11:30am")
ed.edit_end_time("MATH 2418", "12:45pm")
ed.edit_description("CS 3354", "The greatest class ever!!!!")
print(user["events"])