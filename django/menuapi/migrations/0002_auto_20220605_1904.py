# Generated by Django 2.1.4 on 2022-06-05 11:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menuapi', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='screen',
            name='content',
        ),
        migrations.AddField(
            model_name='screen',
            name='media',
            field=models.ImageField(default='', upload_to='static/files/'),
        ),
        migrations.AlterField(
            model_name='screen',
            name='orientation',
            field=models.BooleanField(choices=[(0, 'Landscape'), (1, 'Portrait')], default=0),
        ),
        migrations.AlterField(
            model_name='screen',
            name='style',
            field=models.BooleanField(choices=[(0, 'Normal'), (1, 'White Background')], default=0),
        ),
        migrations.AlterField(
            model_name='screen',
            name='type',
            field=models.BooleanField(choices=[(0, 'Menu'), (1, 'Media')], default=0),
        ),
    ]
