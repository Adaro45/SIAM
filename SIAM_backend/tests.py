import pytest
from rest_framework.test import APIClient
from SIAM.models import Project, Investigator, Entity
from django.contrib.auth import get_user_model

User = get_user_model()

@pytest.mark.django_db
def test_get_projects_list():
    client = APIClient()

    # Crear datos para la prueba
    investigator = Investigator.objects.create(name="Jane Doe", email="jane.doe@example.com")
    entity = Entity.objects.create(name="Test Entity", acron="TE")
    project = Project.objects.create(
        title="Sample Project",
        acron="SP",
        inv_area="Engineering",
        leed_entity=entity,
        financed=entity,
        project_boss=investigator,
        tecnic_boss=investigator,
    )

    # Realizar la solicitud GET
    response = client.get('/projects/')
    assert response.status_code == 200
    assert response.data[0]['title'] == project.title

@pytest.mark.django_db
def test_create_project_as_admin():
    client = APIClient()

    # Crear un usuario administrador
    admin_user = User.objects.create_user(username="admin", password="adminpass", role="admin")
    client.force_authenticate(user=admin_user)

    # Crear datos relacionados
    investigator = Investigator.objects.create(name="John Smith", email="john.smith@example.com")
    entity = Entity.objects.create(name="Entity", acron="ENT")

    # Datos para el POST
    project_data = {
        "title": "New Project",
        "acron": "NP",
        "inv_area": "Science",
        "leed_entity": entity.id,
        "financed": entity.id,
        "project_boss": investigator.id,
        "tecnic_boss": investigator.id,
        "investigators": [investigator.id],
        "entitys": [entity.id],
    }

    # Enviar solicitud POST
    response = client.post('/projects/', project_data, format='json')
    assert response.status_code == 201
    assert response.data['title'] == "New Project"
import pytest
from SIAM.models import Project, Investigator, Entity

@pytest.mark.django_db
def test_create_project():
    # Crear entidades relacionadas
    investigator = Investigator.objects.create(name="John Doe", email="john.doe@example.com")
    entity = Entity.objects.create(name="Entity Name", acron="EN")

    # Crear un proyecto
    project = Project.objects.create(
        title="Test Project",
        acron="TP",
        inv_area="Research",
        leed_entity=entity,
        financed=entity,
        project_boss=investigator,
        tecnic_boss=investigator,
    )
    project.investigators.add(investigator)
    project.entitys.add(entity)

    # Validar el proyecto
    assert project.title == "Test Project"
    assert project.leed_entity == entity
    assert project.project_boss == investigator
@pytest.mark.django_db
def test_get_project_detail():
    client = APIClient()

    # Crear datos de prueba
    investigator = Investigator.objects.create(name="Alice Doe", email="alice.doe@example.com")
    entity = Entity.objects.create(name="Detail Entity", acron="DE")
    project = Project.objects.create(
        title="Detailed Project",
        acron="DP",
        inv_area="IT",
        leed_entity=entity,
        financed=entity,
        project_boss=investigator,
        tecnic_boss=investigator,
    )

    # Realizar solicitud GET
    response = client.get(f'/projects/{project.id}/')
    assert response.status_code == 200
    assert response.data['title'] == "Detailed Project"
