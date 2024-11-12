from rest_framework import serializers
from SIAM.models import Investigator, Project, Measures, Resources, Entity, CustomUser
from django.contrib.auth import get_user_model, authenticate
from drf_extra_fields.fields import Base64ImageField,Base64FileField
import filetype

class MyCustomBase64FileField(Base64FileField):
    """
    A custom serializer field to handle base64-encoded files.
    """
    ALLOWED_MIME_TYPES = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'application/pdf': 'pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    }

    ALLOWED_TYPES = ['pdf', 'docx', 'jpg', 'jpeg', 'png']

    def get_file_extension(self, filename, decoded_file):
        extension = filetype.guess_extension(decoded_file)
        return extension

    def to_internal_value(self, data):
        if isinstance(data, str):
            return super().to_internal_value(data)
        return data

# Serializador de Investigator
class InvestigatorSerializer(serializers.ModelSerializer):
    projects = serializers.SlugRelatedField(
        slug_field= 'title',
        queryset = Project.objects.all(),
        many=True,
        required=False
    )
    class Meta:
        model = Investigator
        fields = '__all__'
    def validate_email(self, value):
        if get_user_model().objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value

class EntitySerializer(serializers.ModelSerializer):
    projects = serializers.SlugRelatedField(
        slug_field= 'title',
        queryset = Project.objects.all(),
        many=True,
        required=False
    )
    class Meta:
        model = Entity
        fields ='__all__'
        
class MeasuresSerializer(serializers.ModelSerializer):
    measure = MyCustomBase64FileField(required=True)
    class Meta:
        model = Measures
        fields = ['measure']

class ResourcesSerializer(serializers.ModelSerializer):
    resource = Base64ImageField(required=False)
    class Meta:
        model = Resources
        fields = ['title','resource']

class ProjectSerializer(serializers.ModelSerializer):
    investigators = InvestigatorSerializer(many=True)
    entitys = EntitySerializer(many=True)
    clients = EntitySerializer(many=True)
    resource = ResourcesSerializer(many=True)
    princ_img = Base64ImageField(required=False)
    class Meta:
        model = Project
        fields = ['id','title','acron','date','results'
                ,'results','description','princ_img','inv_area','investigators'
                ,'project_boss','tecnic_boss','leed_entity'
                ,'financed','entitys','clients','resource']

class ProjectDetailSerializer(ProjectSerializer):
    class Meta(ProjectSerializer.Meta):
        fields = ProjectSerializer.Meta.fields + ['measures']

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id","username","email")

class UserRegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)    
    password2 = serializers.CharField(write_only=True)    
    class Meta:
        model = CustomUser
        fields = ("id","username","email","password1","password2")
        extra_kwargs = {"password":{"write_only":True}}
    
    def validate(self,attrs):
        if attrs['password1'] != attrs["password2"]:
            raise serializers.ValidationErrors("Passwords do not match!")
        
        password = attrs.get("password1","")
        if len(password) < 8:
            raise serializers.ValidationErrors("Password must be at leats 8 characters!")
                
        return attrs
    
    def create (self, validated_data):
        password = validated_data.pop("password1")
        validated_data.pop("password2")
        return CustomUser.objects.create_user(password=password, **validated_data)
    
class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        user = authenticate(username=data['email'], password=data['password'])
        
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials!")    