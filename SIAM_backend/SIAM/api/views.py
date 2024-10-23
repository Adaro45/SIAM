from rest_framework import status, serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import render
from SIAM.models import Project, Entity
from SIAM.models import  Measures, Investigator, Resources
from .serializers import ProjectSerializer, MeasuresSerializer
from .serializers import InvestigatorSerializer, ResourcesSerializer, EntitySerializer

def index(request):
    context = {}
    return render(request, 'index.html', context)

class ProjectView(APIView):
    def get(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)
    def post(self,request):
        deserializer = ProjectSerializer(data=request.data)
        print(deserializer)
        if deserializer.is_valid():
            deserializer.save()
            return Response(deserializer.data, status=status.HTTP_201_CREATED)
        return Response(deserializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProjectDetailView(APIView):
    def get(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
            serializer = ProjectSerializer(project)
            return Response(serializer.data)
        except Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
            deserializer = ProjectDeserializer(project, data=request.data)
            if deserializer.is_valid():
                deserializer.save()
                return Response(deserializer.data)
            return Response(deserializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
            project.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class EntityView(APIView):
    def get(self,request):
        entity = Entity.objects.all()
        serializers = EntitySerializer(entity, many=True)
        return Response(serializers.data)
    def post(self,request):
        deserializer = EntitySerializer(data=request.data)
        if deserializer.is_valid():
            deserializer.save()
            return Response(deserializer.data, status=status.HTTP_201_CREATED)
        return Response(deserializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MeasuresView(APIView):
    def get(self, request):
        try:
            measures = Measures.objects.all()
            serializer = MeasuresSerializer(measures, many=True)
            return Response(serializer.data)
        except Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self,request):
        serializer = MeasuresSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResourcesView(APIView):
    def get(self, request, *args):
        try:
            resources = Resources.objects.all()
            serializer = ResourcesSerializer(resources, many=True)
            return Response(serializer.data)
        except Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self,request):
        serializer = ResourcesSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InvestigatorView(APIView):
    def get(self, request):
        investigator = Investigator.objects.all()
        serializer = InvestigatorSerializer(investigator, many=True)
        return Response(serializer.data)

    def post(self, request):
        deserializer = InvestigatorSerializer(data=request.data)
        if deserializer.is_valid():
            deserializer.save()
            return Response(deserializer.data, status=status.HTTP_201_CREATED)
        return Response(deserializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InvestigadorsDetailView(APIView):
    def get(self, request, pk):
        try:
            investigador = Investigator.objects.get(pk=pk)
            serializer = InvestigatorSerializer(investigador)
            return Response(serializer.data)
        except Investigator.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            investigador = Investigator.objects.get(pk=pk)
            deserializer = InvestigatorDeserializer(investigador, data=request.data)
            if deserializer.is_valid():
                deserializer.save()
                return Response(deserializer.data, status=status.HTTP_201_CREATED)
        except Investigator.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(deserializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            investigador = Investigator.objects.get(pk=pk)
            investigador.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Investigator.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
