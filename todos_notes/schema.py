import graphene_django


class Query(graphene_django.ObjectType):
    hello = graphene_django.String(default_value="Hi!")


schema = graphene_django.Schema(query=Query)
