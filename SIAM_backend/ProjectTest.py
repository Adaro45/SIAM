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
