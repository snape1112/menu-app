from unicodedata import category
from .models import Screen, Category
from .serializers import ScreenSerializer, CategorySerializer

from django.http import Http404, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
import requests
from django.conf import settings

class MenuList(APIView):
    """
    View all screens and menu, media, categories.
    """
    def get(self, request, format=None):
        """
        Return all screens and menu, media, categories.
        """
        response = {}
        r = requests.get('https://publicapi.leaflogix.net/util/AuthorizationHeader/' + settings.APIKEY)
        r_status = r.status_code
        if r_status == 200:
            auth_key = r.json()
            headers = {
                'authorization': auth_key,
                'consumerkey': settings.APIKEY
            }
            r = requests.get('https://publicapi.leaflogix.net/products', headers=headers)
            if r.status_code == 200:
                response['products'] = r.json()
                screens= Screen.objects.all()
                screen_serializer = ScreenSerializer(screens, many=True)
                categories= Category.objects.all()
                category_serializer = CategorySerializer(categories, many=True)
                response['screens'] = screen_serializer.data
                response['categories'] = category_serializer.data
                response['status'] = 200
                response['message'] = 'success'
            else:
                response['status'] = r.status_code
                response['message'] = 'error'
        else:
            response['status'] = r.status_code
            response['message'] = 'error'
        return Response(response)

        # menu = Screen.objects.all()
        # serializer = MenuSerializer(menu, context={'menu': request.menu})
        # return Response(serializer.data)
