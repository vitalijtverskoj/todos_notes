import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from users.models import User
from .views import ProjectModelViewSet
from .models import Project, Todo


class TestProjectModelViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestTodoModelViewSet(APITestCase):

    def test_edit_admin(self):
        user = User.objects.create(username='testuser_1', first_name='Иван', last_name='Иванов',
                                   email='ivanivanov@gmail.com', password='ivan123456')
        project = mixer.blend(Project)
        todo = Todo.objects.create(text='text_todo_1', project_id=f'{project.id}', user_id=f'{user.id}')
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/todos/{todo.id}/',
                                   {
                                       "id": todo.id,
                                       "text": "text_todo_2",
                                       "deleted": False,
                                       "project": project.id,
                                       "user": user.id,
                                   })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = Todo.objects.get(id=todo.id)
        self.assertEqual(todo.text, 'text_todo_2')
