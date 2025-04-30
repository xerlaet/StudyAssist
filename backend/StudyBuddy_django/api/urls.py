from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views_firebase import firebase_test
from .views_account import (
    # Account
    get_accounts, get_account, create_account, update_account, delete_account
)

from .views_userData import (
    # UserData
    get_user_data, get_user_data_by_email, create_user_data, update_user_data, delete_user_data
)

from .views_note import (
    # Note
    get_notes, get_note, create_note, update_note, delete_note
)

from .views_quiz import (
    # Quiz
    get_quizzes, get_quiz, create_quiz, update_quiz, delete_quiz
)

from .views_event import (
    # Event
    get_events, get_event, create_event, update_event, delete_event
)

from . import views_setting

from .views_friend import (
    # Friend
    get_friends, get_friend, create_friend, update_friend, delete_friend
)

from .views_request import (
    # Request
    get_requests, get_request, create_request, update_request, delete_request
)

from .views_block import (
    # Block
    get_blocks, get_block, create_block, update_block, delete_block
)

from .views_reminder import (
    # Reminder
    get_reminders, get_reminder, create_reminder, update_reminder, delete_reminder
)

urlpatterns = [
    # Account
    path('accounts/', get_accounts, name='get_accounts'),
    path('accounts/<str:email>/', get_account, name='get_account'),
    path('account_manage/create/', create_account, name='create_account'),
    path('account_manage/update/<str:email>/', update_account, name='update_account'),
    path('account_manage/delete/<str:email>/', delete_account, name='delete_account'),

    # UserData
    path('user_data/', get_user_data, name='get_user_data'),
    path('user_data/<str:email>/', get_user_data_by_email, name='get_user_data_by_email'),
    path('user_data_manage/create/', create_user_data, name='create_user_data'),
    path('user_data_manage/update/<str:email>/', update_user_data, name='update_user_data'),
    path('user_data_manage/delete/<str:email>/', delete_user_data, name='delete_user_data'),

    # Notes
    path('notes/', get_notes, name='get_notes'),
    path('notes/<int:note_id>/', get_note, name='get_note'),
    path('notes/create/', create_note, name='create_note'),
    path('notes/update/<int:note_id>/', update_note, name='update_note'),
    path('notes/delete/<int:note_id>/', delete_note, name='delete_note'),

    # Quizzes
    path('quizzes/', get_quizzes, name='get_quizzes'),
    path('quizzes/<int:quiz_id>/', get_quiz, name='get_quiz'),
    path('quizzes/create/', create_quiz, name='create_quiz'),
    path('quizzes/update/<int:quiz_id>/', update_quiz, name='update_quiz'),
    path('quizzes/delete/<int:quiz_id>/', delete_quiz, name='delete_quiz'),

    # Events
    path('events/', get_events, name='get_events'),
    path('events/<int:event_id>/', get_event, name='get_event'),
    path('events/create/', create_event, name='create_event'),
    path('events/update/<int:event_id>/', update_event, name='update_event'),
    path('events/delete/<int:event_id>/', delete_event, name='delete_event'),

    # Settings
     path('settings/', views_setting.get_settings, name='get_all_settings'),
    path('settings/<str:email>/', views_setting.get_setting, name='get_single_setting'),
    path('settings/create/', views_setting.create_setting, name='create_setting'),
    path('settings/update/<str:email>/', views_setting.update_setting, name='update_setting'),
    path('settings/delete/<str:email>/', views_setting.delete_setting, name='delete_setting'),

    # Friends
    path('friends/', get_friends, name='get_friends'),
    path('friends/<int:friend_id>/', get_friend, name='get_friend'),
    path('friends/create/', create_friend, name='create_friend'),
    path('friends/update/<int:friend_id>/', update_friend, name='update_friend'),
    path('friends/delete/<int:friend_id>/', delete_friend, name='delete_friend'),

    # Requests
    path('requests/', get_requests, name='get_requests'),
    path('requests/<int:request_id>/', get_request, name='get_request'),
    path('requests/create/', create_request, name='create_request'),
    path('requests/update/<int:request_id>/', update_request, name='update_request'),
    path('requests/delete/<int:request_id>/', delete_request, name='delete_request'),

    # Blocks
    path('blocks/', get_blocks, name='get_blocks'),
    path('blocks/<int:block_id>/', get_block, name='get_block'),
    path('blocks/create/', create_block, name='create_block'),
    path('blocks/update/<int:block_id>/', update_block, name='update_block'),
    path('blocks/delete/<int:block_id>/', delete_block, name='delete_block'),

    # Set up JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Reminders
    path('reminders/', get_reminders, name='get_reminders'),
    path('reminders/<int:reminder_id>/', get_reminder, name='get_reminder'),
    path('reminders/create/', create_reminder, name='create_reminder'),
    path('reminders/update/<int:reminder_id>/', update_reminder, name='update_reminder'),
    path('reminders/delete/<int:reminder_id>/', delete_reminder, name='delete_reminder'),


    #firebase 
    path('firebase-test/', firebase_test, name='firebase_test'),
]
