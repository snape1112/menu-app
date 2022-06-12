import os
from django.conf import settings
from django.db import models

from datetime import date

# Create the Screen class to describe the model.
class Screen(models.Model):
    """Stores a screen."""
    cast_id = models.IntegerField()
    type = models.CharField(
        max_length=20,
        choices = [('menu','Menu'),('media','Media')], 
        null=False,
    )
    width = models.IntegerField()
    height = models.IntegerField()
    orientation = models.CharField(
        max_length=20,
        choices = [('landscape','Landscape'),('portrait','Portrait')], 
        null=False,
    )
    style = models.CharField(
        max_length=20,
        choices = [('normal','Normal'),('white','White Background')], 
        null=False,
    )
    media = models.ImageField(upload_to='images/', default='', blank=True, null=True)

    # Date the screen was created.
    created_on = models.DateField(default=date.today)

    # Due date.
    due_date = models.DateField(default=date.today)

    # Meta data about the database table.
    class Meta:
        # Set the table name.
        db_table = 'screen'

        # Set default ordering
        ordering = ['id']

    # Define what to output when the model is printed as a string.
    def __str__(self):
        return "cast_id_" + str(self.cast_id)


class Category(models.Model):
    category_id = models.IntegerField()
    category_name = models.CharField(max_length=100)
    arrangeable = models.BooleanField()
    start_on_new = models.BooleanField(default=False)

    # Meta data about the database table.
    class Meta:
        # Set the table name.
        db_table = 'category'

        # Set default ordering
        ordering = ['id']

    # Define what to output when the model is printed as a string.
    def __str__(self):
        return self.category_name