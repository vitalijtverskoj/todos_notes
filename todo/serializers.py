from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from todo.models import Project, Todo
from users.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    # users = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(ModelSerializer):
    # user = UserModelSerializer()

    class Meta:
        model = Todo
        fields = '__all__'
        # exclude = ('deleted',)
