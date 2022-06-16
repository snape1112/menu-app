import json
from pickle import TRUE
from django.conf import settings
from django.contrib import admin
from django.http import HttpResponseBadRequest, HttpResponseForbidden, HttpResponseNotAllowed
from menuapi.models import Screen, Category
from django.db import connection
import requests
from adminsortable2.admin import SortableAdminMixin
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse

@admin.register(Screen)
class ScreenAdmin(admin.ModelAdmin):
    model: Screen
    pass

@admin.register(Category)
class CategoryAdmin(SortableAdminMixin, admin.ModelAdmin):
    ordering = ['my_order']
    list_display = ['category_name', 'display', 'start_on_new', 'my_order']
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        r = requests.get('https://publicapi.leaflogix.net/util/AuthorizationHeader/' + settings.APIKEY)
        if r.status_code == 200:
            auth_key = r.json()      
            headers = {
                'authorization': auth_key,
                'consumerkey': settings.APIKEY
            }
            r = requests.get('https://publicapi.leaflogix.net/product-category', headers=headers)
            if r.status_code == 200:
                categories = r.json()
                with connection.cursor() as cursor:
                    for category in categories:  
                        name = category['productCategoryName']
                        id = category['productCategoryId']
                        cursor.execute("UPDATE category SET category_name=%s WHERE id=%s; INSERT INTO category (category_id, category_name, display, start_on_new) SELECT %s, %s, true, false WHERE NOT EXISTS (SELECT 1 FROM category WHERE category.category_id=%s);", [name, id, id, name, id])
                        # cursor.execute("SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'category');", [])
                        # (exists,)=cursor.fetchone()
                        # if(exists == TRUE):
                        #     cursor.execute("UPDATE category SET category_name=%s WHERE id=%s; INSERT INTO category (category_id, category_name, display, start_on_new) SELECT %s, %s, true, false WHERE NOT EXISTS (SELECT 1 FROM category WHERE category.category_id=%s);", [name, id, id, name, id])

    # def update_order(self, request):
    #     if not request.is_ajax() or request.method != 'POST':
    #         return HttpResponseBadRequest('Not an XMLHttpRequest')
    #     if request.method != 'POST':
    #         return HttpResponseNotAllowed('Must be a POST request')
    #     if not self.has_change_permission(request):
    #         return HttpResponseForbidden('Missing permissions to perform this request')
    #     startorder = int(request.POST.get('o'))
    #     endorder = int(request.POST.get('endorder'))
    #     moved_items = list(self._move_item(request, startorder, endorder))
    #     return HttpResponse(json.dumps(moved_items, cls=DjangoJSONEncoder), content_type='application/json;charset=UTF-8')
                                    