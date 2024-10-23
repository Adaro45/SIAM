# Generated by Django 5.1.1 on 2024-10-03 03:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SIAM', '0002_entity_remove_project_precedent_precedent_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='clients',
        ),
        migrations.RemoveField(
            model_name='project',
            name='entitys',
        ),
        migrations.RemoveField(
            model_name='project',
            name='investigators',
        ),
        migrations.AddField(
            model_name='project',
            name='clients',
            field=models.ManyToManyField(related_name='clients', to='SIAM.entity'),
        ),
        migrations.AddField(
            model_name='project',
            name='entitys',
            field=models.ManyToManyField(related_name='entitys', to='SIAM.entity'),
        ),
        migrations.AddField(
            model_name='project',
            name='investigators',
            field=models.ManyToManyField(related_name='investigatorlist', to='SIAM.investigator'),
        ),
    ]
