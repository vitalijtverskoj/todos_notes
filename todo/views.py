from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination

from todo.models import Project, Todo
from todo.serializers import ProjectModelSerializer, TodoModelSerializer


# class ProjectLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    # pagination_class = ProjectLimitOffsetPagination

    def get_queryset(self):
        name = self.request.query_params.get('name', '')
        project = Project.objects.all()
        if name:
            project = project.filter(name__contains=name)
        return project


# class TodoLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 20


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    filterset_fields = ['project']
    # pagination_class = TodoLimitOffsetPagination
