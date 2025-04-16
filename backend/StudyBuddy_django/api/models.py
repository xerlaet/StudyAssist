from django.db import models

class Account(models.Model):
    account_id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.username


class UserData(models.Model):
    email = models.OneToOneField(Account, on_delete=models.CASCADE, primary_key=True)
    days = models.IntegerField(default=0)
    streak = models.IntegerField(default=0)
    calendar = models.JSONField()

    def __str__(self):
        return f"UserData for {self.email}"


class Note(models.Model):
    note_id = models.AutoField(primary_key=True)
    email = models.ForeignKey(Account, on_delete=models.CASCADE)
    note = models.TextField()

    def __str__(self):
        return f"Note by {self.email}"


class Quiz(models.Model):
    quiz_id = models.AutoField(primary_key=True)
    email = models.ForeignKey(Account, on_delete=models.CASCADE)
    score = models.FloatField()

    def __str__(self):
        return f"Quiz score for {self.email}"


class Event(models.Model):
    event_id = models.AutoField(primary_key=True)
    email = models.ForeignKey(Account, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    event_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    description = models.TextField()

    def __str__(self):
        return f"Event: {self.title} for {self.email}"


class Setting(models.Model):
    email = models.OneToOneField(Account, on_delete=models.CASCADE, primary_key=True)
    dark_mode = models.BooleanField(default=False)
    font_size = models.IntegerField(default=12)
    timezone = models.CharField(max_length=50, default='UTC')
    enable_notifications = models.BooleanField(default=True)
    notification_frequency = models.CharField(max_length=20, default='daily')

    def __str__(self):
        return f"Settings for {self.email}"


class Friend(models.Model):
    friend_id = models.AutoField(primary_key=True)
    user_email = models.ForeignKey(Account, related_name="user_friends", on_delete=models.CASCADE)
    friend_email = models.ForeignKey(Account, related_name="friends_of", on_delete=models.CASCADE)
    chat_history = models.TextField()

    def __str__(self):
        return f"Friendship between {self.user_email} and {self.friend_email}"


class Request(models.Model):
    request_id = models.AutoField(primary_key=True)
    user_email = models.ForeignKey(Account, related_name="sent_requests", on_delete=models.CASCADE)
    friend_email = models.ForeignKey(Account, related_name="received_requests", on_delete=models.CASCADE)

    def __str__(self):
        return f"Friend request from {self.user_email} to {self.friend_email}"


class Block(models.Model):
    block_id = models.AutoField(primary_key=True)
    user_email = models.ForeignKey(Account, related_name="blocked_users", on_delete=models.CASCADE)
    blocked_email = models.ForeignKey(Account, related_name="blocked_by_users", on_delete=models.CASCADE)

    def __str__(self):
        return f"Block between {self.user_email} and {self.blocked_email}"
