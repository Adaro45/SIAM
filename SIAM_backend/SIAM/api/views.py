from rest_framework import status, serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from django.shortcuts import render
from SIAM.models import Project, Entity, CustomUser
from SIAM.models import  Measures, Investigator, Resources
from .serializers import ProjectSerializer, MeasuresSerializer, CustomUserSerializer, UserRegistrationSerializer, UserLoginSerializer
from .serializers import InvestigatorSerializer, ResourcesSerializer, EntitySerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from ..permissions import IsAdmin, IsStaffOrAdmin, IsNormalOrHigher
from rest_framework.permissions import AllowAny
def index(request):
    context = {}
    return render(request, 'index.html', context)
class ProjectView(APIView):
    permission_classes = [IsNormalOrHigher]  # Todos los roles autenticados pueden acceder
    def get_permissions(self):
        # Permitir acceso sin autenticación para el método GET
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]  # Requiere autenticación para los otros métodos

    def get(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Solo los administradores pueden crear proyectos
        if not request.user.role == 'admin':
            return Response({"detail": "No tiene permisos para esta acción."}, status=status.HTTP_403_FORBIDDEN)
        
        deserializer = ProjectSerializer(data=request.data)
        if deserializer.is_valid():
            deserializer.save()
            return Response(deserializer.data, status=status.HTTP_201_CREATED)
        return Response(deserializer.errors, status=status.HTTP_400_BAD_REQUEST)
class ProjectDetailView(APIView):
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden acceder
    
    def get_permissions(self):
    # Permitir acceso sin autenticación para el método GET
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]  # Requiere autenticación para los otros métodos
    def get(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
            serializer = ProjectSerializer(project)
            return Response(serializer.data)

        except Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        # Solo admin puede editar
        if not request.user.role == 'admin':
            return Response({"detail": "No tiene permisos para esta acción."}, status=status.HTTP_403_FORBIDDEN)

        try:
            project = Project.objects.get(pk=pk)
            deserializer = ProjectSerializer(project, data=request.data)
            if deserializer.is_valid():
                deserializer.save()
                return Response(deserializer.data)
            return Response(deserializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
class ProjectDeleteView(APIView):
    permissions_classes = [IsAdmin]
    def delete(self, request, pk):
        # Solo admin puede borrar
        if not request.user.role == 'admin':
            return Response({"detail": "No tiene permisos para esta acción."}, status=status.HTTP_403_FORBIDDEN)

        try:
            project = Project.objects.get(pk=pk)
            project.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
class EntityView(APIView):
    permission_classes = [IsAuthenticated]  # Asegura que todos los usuarios autenticados puedan acceder

    def get(self, request):
        # Obtener todas las entidades, solo accesible sin autenticación si se configura el permiso correspondiente
        entities = Entity.objects.all()
        serializer = EntitySerializer(entities, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Solo los usuarios autenticados pueden crear una nueva entidad
        serializer = EntitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class EntityDetailView(APIView):
    permission_classes = [IsAuthenticated]  # Asegura que todos los usuarios autenticados puedan acceder

    def get(self, request, pk):
        entity = Entity.objects.get(pk=pk)
        serializer = EntitySerializer(entity)
        return Response(serializer.data)
    
    def put(self, request, pk):
        try:
            entity = Entity.objects.get(pk=pk)
            serializer = EntitySerializer(entity, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Entity.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            entity = Entity.objects.get(pk=pk)
            entity.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Entity.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
class MeasuresView(APIView):
    permission_classes = [IsAuthenticated]
    
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
class MeasuresDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        try:
            measures = Measures.objects.get(pk=pk)
            serializer = MeasuresSerializer(measures)
            return Response(serializer.data)
        except Measures.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            measures = Measures.objects.get(pk=pk)
            serializer = MeasuresSerializer(measures, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Measures.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
class MeasuresDeleteView(APIView):
    def delete(self, request, pk):
        try:
            measures = Measures.objects.get(pk=pk)
            measures.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Measures.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
class ResourcesView(APIView):
    permission_classes = [IsAuthenticated]
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
class ResourcesDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        try:
            resources = Resources.objects.get(pk=pk)
            serializer = ResourcesSerializer(resources)
            return Response(serializer.data)
        except Resources.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            resources = Resources.objects.get(pk=pk)
            serializer = ResourcesSerializer(resources, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Resources.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
class ResourcesDeleteView(APIView):
    perimission_classes = [IsAuthenticated]
    def delete(self, request, pk):
        try:
            resources = Resources.objects.get(pk=pk)
            resources.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Resources.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
class InvestigatorView(APIView):
    permission_classes = [IsAuthenticated]
    
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
    permission_classes = [IsAuthenticated]
    
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
            deserializer = InvestigatorSerializer(investigador, data=request.data)
            if deserializer.is_valid():
                deserializer.save()
                return Response(deserializer.data, status=status.HTTP_200_OK)
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
class UserRegistrationAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {"refresh":str(token),
                        "access": str(token.access_token)}
        return Response(data, status= status.HTTP_201_CREATED)
class UserLoginAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            serializer = CustomUserSerializer(user)
            token = RefreshToken.for_user(user)
            data = serializer.data
            data["tokens"] = {
                "refresh": str(token),
                "access": str(token.access_token)
            }
            return Response(data, status=status.HTTP_200_OK)
        else:
            # Imprimir los errores de validación para depurar
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserLogoutAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)
    
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status= status.HTTP_400_BAD_REQUEST)
class UserInfoAPIView(APIView):
    serializer_class = CustomUserSerializer
    permission_classes = (IsAuthenticated,)
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]  # Requiere autenticación para los otros métodos
    
    def get(self,request, username):
        try:
            user = CustomUser.objects.get(username=username)
            serializer = CustomUserSerializer(user)
            return Response(serializer.data)
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
class UserListAPIView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]
    def get(self, request):
        user = CustomUser.objects.all()
        serializer = CustomUserSerializer(user, many=True)
        return Response(serializer.data)
class UserUpdateAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get_permissions(self):
        if self.request.method == 'PUT':
            return [AllowAny()]
        return [IsAuthenticated()]

    def put(self, request, username, password):
        try:
            user = CustomUser.objects.get(username=username)
            if user.check_password(password):
                # Si la validación de la contraseña actual es correcta, procesar la solicitud
                serializer = CustomUserSerializer(user, data=request.data, partial=True)
                if serializer.is_valid():
                    # Guardar los datos que vienen en el serializer
                    serializer.save()

                    # Si se envía una nueva contraseña, actualizarla
                    new_password = request.data.get('new_password')
                    if new_password:
                        user.set_password(new_password)
                        user.save()  # Importante para guardar la nueva contraseña

                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"detail": "Contraseña incorrecta."}, status=status.HTTP_400_BAD_REQUEST)
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
class AdminUserUpdateAPIView(APIView):
    permission_classes = (IsAuthenticated, IsAdmin)  # Aseguramos que solo el admin puede acceder

    def put(self, request, username):
        try:
            user = CustomUser.objects.get(username=username)
            
            # Verificar que el usuario autenticado es admin
            if not request.user.is_staff:
                return Response({"detail": "No tiene permisos para realizar esta acción."}, status=status.HTTP_403_FORBIDDEN)

            # Si el admin tiene permisos, procesamos la solicitud
            serializer = CustomUserSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                # Guardar los datos que vienen en el serializer
                serializer.save()

                # Si se envía una nueva contraseña, actualízala
                new_password = request.data.get('new_password')
                if new_password:
                    user.set_password(new_password)
                    user.save()  # Guardar la nueva contraseña

                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except CustomUser.DoesNotExist:
            return Response({"detail": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
class UserDeleteAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request, username):
        admin_user = request.user  # Usuario autenticado (admin)
        # Obtener la contraseña del admin desde el cuerpo de la solicitud
        admin_password = request.data.get('password')
        if admin_password and admin_user.check_password(admin_password):
            try:
                user = CustomUser.objects.get(username=username)
                user.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except CustomUser.DoesNotExist:
                return Response({"detail": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"detail": "Contraseña incorrecta."}, status=status.HTTP_400_BAD_REQUEST)
