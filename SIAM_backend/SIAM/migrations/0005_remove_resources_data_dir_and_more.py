# Generated by Django 5.1.1 on 2024-10-22 22:49

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SIAM', '0004_alter_project_financed_alter_project_leed_entity_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='resources',
            name='data_dir',
        ),
        migrations.RemoveField(
            model_name='resources',
            name='resourceType',
        ),
        migrations.AddField(
            model_name='resources',
            name='resource',
            field=models.ImageField(blank='', default='', upload_to='../resources/'),
        ),
        migrations.AddField(
            model_name='resources',
            name='title',
            field=models.CharField(default=django.utils.timezone.now, max_length=50),
            preserve_default=False,
        ),
        migrations.RemoveField(
            model_name='project',
            name='resource',
        ),
        migrations.AddField(
            model_name='project',
            name='resource',
            field=models.ManyToManyField(related_name='resources', to='SIAM.resources'),
        ),
    ]
