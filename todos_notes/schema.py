import graphene
from graphene_django import DjangoObjectType
from todo.models import Todo, Project
from users.models import User


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todos = graphene.List(TodoType)
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(UserType)
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))
    todos_by_user_name = graphene.List(TodoType, last_name=graphene.String(required=False))

    def resolve_all_todos(root, info):
        return Todo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_user_by_id(self, info, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None

    def resolve_todos_by_user_name(self, info, last_name=None):
        todos = Todo.objects.all()
        if last_name:
            todos = todos.filter(user__last_name=last_name)
        return todos


schema = graphene.Schema(query=Query)
