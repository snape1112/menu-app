# Generated by Django 2.1.4 on 2022-06-05 11:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('menuapi', '0002_auto_20220605_1904'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='screen',
            name='title',
        ),
    ]
