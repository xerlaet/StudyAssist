# @author: Harsh Patel
# @description: QuizManager class , includes time tracking and answer handling, with shuffled quiz questions and scoring.

import random
import time

class QuizManager:
    def __init__(self):
        """
        Initializes quiz data including:
        - quiz_questions: A shuffled list of CS-related questions
        - current_answers: A dictionary to store user answers by index
        - start_time: When the quiz begins
        - end_time: When the quiz ends
        """
        self.quiz_questions = [
            {
                "question": "What is the time complexity of binary search in a sorted array?",
                "options": ["O(n)", "O(log n)", "O(n log n)"],
                "correct": "O(log n)"
            },
            {
                "question": "Which data structure uses FIFO (First In, First Out)?",
                "options": ["Stack", "Queue", "Tree"],
                "correct": "Queue"
            },
            {
                "question": "What does HTML stand for?",
                "options": ["HyperText Markup Language", "HyperTool Markup Language", "Hyperlink Markup Language"],
                "correct": "HyperText Markup Language"
            }
        ]
        random.shuffle(self.quiz_questions)
        self.current_answers = {}
        self.start_time = None
        self.end_time = None

    def start_quiz(self):
        """
        Marks the start time of the quiz.
        """
        self.start_time = time.time()
        return "Quiz started!"

    def answer_question(self, question_index, selected_option):
        """
        Records the student's answer for a specific question.
        Returns error if the index or answer is invalid.
        """
        if question_index < 0 or question_index >= len(self.quiz_questions):
            return "Error: Invalid question number."

        if selected_option not in self.quiz_questions[question_index]["options"]:
            return "Error: Selected option is not valid."

        self.current_answers[question_index] = selected_option
        return "Answer recorded."

    def submit_quiz(self):
        """
        Submits the quiz, calculates score, records end time, and shows total time taken.
        Also displays unanswered questions.
        """
        self.end_time = time.time()
        total_time = round(self.end_time - self.start_time, 2) if self.start_time else "N/A"

        score = 0
        total_questions = len(self.quiz_questions)
        unanswered = []

        for i, question in enumerate(self.quiz_questions):
            if i not in self.current_answers:
                unanswered.append(i + 1)
            elif self.current_answers[i] == question["correct"]:
                score += 1

        result = f"Score: {score}/{total_questions} | Time Taken: {total_time} seconds"
        if unanswered:
            result += f" | Unanswered: {unanswered}"
        return result


#test Cases
quiz = QuizManager()

# Test Case 1: Start the quiz
print(" Start Quiz")
print(quiz.start_quiz())  # Expected: "Quiz started!"

# Test Case 2: Answer first question 
print("Answer Question 0")
print(quiz.answer_question(0, "O(log n)"))  # Expected: "Answer recorded."

# Test Case 3: Answer second question 
print(" Answer Question 1")
print(quiz.answer_question(1, "Queue"))  # Expected: "Answer recorded."

# Test Case 4: Answer third question 
print("\Answer Question 2")
print(quiz.answer_question(2, "HyperText Markup Language"))  # Expected: "Answer recorded."

# Test Case 5: Submit the quiz and view the result
print("Submit Quiz")
print(quiz.submit_quiz())  # Expected: Score: 3/3 
