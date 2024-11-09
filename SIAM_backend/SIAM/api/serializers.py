from rest_framework import serializers
from SIAM.models import Investigator, Project, Measures, Resources, Entity
from django.contrib.auth import get_user_model
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

