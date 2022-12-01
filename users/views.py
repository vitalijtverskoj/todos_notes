from django.shortcuts import render
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from users.models import User
from users.serializers import UserModelSerializer


class UserCustomViewSet(CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
