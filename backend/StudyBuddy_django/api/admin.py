from django.contrib import admin
from .models import (
    Account,
    UserData,
    Note,
    Quiz,
    Event,
    Setting,
    Friend,
    Request,
    Block,
)

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('account_id', 'email', 'username')
    search_fields = ('email', 'username')
    ordering = ('account_id',)

@admin.register(UserData)
class UserDataAdmin(admin.ModelAdmin):
    list_display = ('email', 'days', 'streak')
    search_fields = ('email__email',)

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ('note_id', 'email', 'note')
    search_fields = ('email__email', 'note')

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('quiz_id', 'email', 'score')
    search_fields = ('email__email',)

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('event_id', 'email', 'title', 'event_date', 'start_time', 'end_time')
    search_fields = ('email__email', 'title')
    list_filter = ('event_date',)

@admin.register(Setting)
class SettingAdmin(admin.ModelAdmin):
    list_display = ('email', 'dark_mode', 'font_size', 'timezone', 'enable_notifications', 'notification_frequency')
    list_filter = ('dark_mode', 'enable_notifications', 'notification_frequency')
    search_fields = ('email__email',)

@admin.register(Friend)
class FriendAdmin(admin.ModelAdmin):
    list_display = ('friend_id', 'user_email', 'friend_email')
    search_fields = ('user_email__email', 'friend_email__email')

@admin.register(Request)
class RequestAdmin(admin.ModelAdmin):
    list_display = ('request_id', 'user_email', 'friend_email')
    search_fields = ('user_email__email', 'friend_email__email')

@admin.register(Block)
class BlockAdmin(admin.ModelAdmin):
    list_display = ('block_id', 'user_email', 'blocked_email')
    search_fields = ('user_email__email', 'blocked_email__email')
