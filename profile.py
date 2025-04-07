class Profile:

    # this function is called when the user is created
    def __init__(self, logged_in, user_name="User"):
        # Checking if the user is logged in before procedding
        if not logged_in:
            print("User must be logged in")
            return

        # initializing the user's name
        self.user_name = user_name

        # we initialize the streak and total_days to 0 initiallu
        self.streak = 0
        self.total_days = 0

        # the quiz statistics are all set to 0, or none on account creation
        self.quizzes_taken = 0
        self.average_score = 0
        self.highest_score = 0
        self.notes_taken = 0
        self.quiz_scores = []

        # The badges are all set to false initially, more badges may be added in the future
        self.badges = {
            "QUIZ": False,
            "STUDY": False,
            "NOTES": False
        }

    # this function is called at the end of every login, and once per day
    def add_day(self):
        self.total_days += 1
        return

    # this function increments the streak, the function is only called if there was a previous login detected the previous day
    def add_streak(self):
        self.streak += 1
        return

    # this function resets the streak to 0, it is only called if the user did not log in the previous day
    def remove_streak(self):
        self.streak = 0
        return

    # this function adds a new quiz score, and also increments the total number of quizzes
    # and updates the average score and highest score
    def add_quiz_score(self, score):
        # we first check if the score is between 0 and 100, if so we proceed
        if 0 <= score <= 100:
            self.quiz_scores.append(score)
            self.quizzes_taken = len(self.quiz_scores)
            self.average_score = round(sum(self.quiz_scores) / self.quizzes_taken)
            self.highest_score = max(self.quiz_scores)

            if not self.badges["QUIZ"]:
                self.evaluate_badges()

            # we return true if the operation was successful
            return True

        # we raise an exception if the score is not in the valid range
        print("Invalid score: score must be between 0 and 100")
        return False

    # this function evaluates whether a user has qualified for a badge, if so the badgeis awarded
    # it returns true if a badge is awarded, and false otherwise
    def evaluate_badges(self):
        awarded = False
        if self.notes_taken >= 30:
            self.badges['NOTES'] = True
            awarded = True
        if self.quizzes_taken >= 20:
            self.badges['QUIZ'] = True
            awarded = True
        if self.total_days >= 50:
            self.badges['STUDY'] = True
            awarded = True
        return awarded

    # this function is used only to get the earned badges
    def earned_badges(self):
        earned_badges = []
        for badge_name in self.badges:
            if self.badges[badge_name]:
                earned_badges.append(badge_name)
        return earned_badges

    # this function displays the whole profile
    def display_profile(self):
        self.evaluate_badges()
        print(f"Hello, {self.user_name}")
        print(f"Your on day {self.streak}")
        print("QUIZ STATS")
        print(f"Quizzes Taken : {self.quizzes_taken}")
        print(f"Average Score : {self.average_score}")
        print(f"Highest Score : {self.highest_score}")
        if not self.earned_badges():
            print("No Badges")
        else:
            print("YOUR BADGES")
            for badge in self.earned_badges():
                print(badge)


# testing out the methods
if __name__ == "__main__":
    # testing out create user
    user = Profile(True, "Alice")

    # Testing adding and removind streak and day
    user.add_day()
    user.add_streak()
    user.remove_streak()

    # adding quizzesto check quiz statistics
    for score in [85, 90, 75, 100]:
        user.add_quiz_score(score)

    # displaying results
    user.display_profile()
    print()
    # Testing the badge system and streak

    #creating a user and adding notes
    test_user = Profile(True)
    test_user.notes_taken = 35
    # testing streak
    test_user.add_streak()

    # adding quizzes
    for _ in range(21):
        test_user.add_quiz_score(80)

    # adding days
    for _ in range(50):
        test_user.add_day()

    #displaying profile
    test_user.display_profile()

