import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import UserCustomViewSet
from .models import User


class TestUserCustomViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserCustomViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'username': 'testuser_1', 'first_name': 'Иван', 'last_name': 'Иванов',
                                               'email': 'ivanivanov@gmail.com', 'password': 'ivan123456'},
                               format='json')
        view = UserCustomViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'username': 'testuser_1', 'first_name': 'Иван', 'last_name': 'Иванов',
                                               'email': 'ivanivanov@gmail.com', 'password': 'ivan123456'},
                               format='json')
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        force_authenticate(request, admin)
        view = UserCustomViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        user = User.objects.create(username='testuser_1', first_name='Иван', last_name='Иванов',
                                   email='ivanivanov@gmail.com', password='ivan123456')
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        user = User.objects.create(username='testuser_1', first_name='Иван', last_name='Иванов',
                                   email='ivanivanov@gmail.com', password='ivan123456')
        client = APIClient()
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        client.login(username='admin', password='admin123456')
        response = client.put(f'/api/users/{user.id}/',
                              {'username': 'testuser_2', 'first_name': 'Василий', 'last_name': 'Васильев',
                               'email': 'vasilijvasiliev@gmail.com', 'password': 'vasilij123456'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = User.objects.get(id=user.id)
        self.assertEqual(user.username, 'testuser_2')
        self.assertEqual(user.first_name, 'Василий')
        self.assertEqual(user.last_name, 'Васильев')
        self.assertEqual(user.email, 'vasilijvasiliev@gmail.com')
        client.logout()
