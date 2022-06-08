from rest_framework import serializers
from .models import Category, Screen

class ScreenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Screen
        fields = ('id', 'cast_id', 'type', 'media', 'width', 'height', 'orientation', 'style', 'created_on',  'due_date')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'category_id', 'category_name', 'arrangeable', 'start_on_new')

