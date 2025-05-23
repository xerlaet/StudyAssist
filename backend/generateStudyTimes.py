# @author ngover05 (Nicholas Gover)
# @description Class to hold functions for generating study times

# This code was developed and tested using a model locally hosted on LM Studio.
# It uses the openai api tools just in case we wish to switch to that
from openai import OpenAI

class StudyTimeGenerator:
    def __init__(self):
        # OpenAI client with parameters changed to point to LM Studio rather than OpenAI servers
        self.client = OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")
        # List to hold the user's schedule. This will ultimately be stored in the database but is hardcoded in for testing purposes until that is set up.
        self.userSchedule = []

    # The function that actually generates times
    def generate_events(self):
        # Read the AI prompt from the file it is stored in
        file = open("app\\prompt.txt", "r")
        file.readline() # skip file comment
        prompt = file.readline()
        file.close()

        # Generate the response
        response = self.client.chat.completions.create(
            model="qwen2.5-14b-instruct",
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": ', '.join(self.userSchedule)}
            ],
        )

        # Return the string containing the recomended times
        return response.choices[0].message.content
    
    # Function to fill the userSchedule list. Will use db calls once that is implemented.
    def fill_schedule(self):
        self.userSchedule.append("9:30am-10:30am")
        self.userSchedule.append("2:00pm-4:00pm")
        self.userSchedule.append("6:45pm-9:00pm")


test = StudyTimeGenerator()
times = test.generateEvents()
print(times)