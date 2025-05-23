# Generated by Django 5.2 on 2025-04-21 19:56

import api.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_account_table'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdata',
            name='calendar',
            field=models.JSONField(default=api.models.UserData.default_calendar),
        ),
        migrations.CreateModel(
            name='Reminder',
            fields=[
                ('reminder_id', models.AutoField(primary_key=True, serialize=False)),
                ('reminder_time', models.DateTimeField(help_text='When to remind the user')),
                ('message', models.TextField(default='You have an upcoming event!')),
                ('email', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.account')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.event')),
            ],
        ),
    ]
