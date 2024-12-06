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
