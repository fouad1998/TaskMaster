# Generated by Django 4.2.17 on 2024-12-16 00:00

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0003_alter_task_comlexity_alter_task_duration'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='comlexity',
            new_name='complexity',
        ),
        migrations.AlterField(
            model_name='task',
            name='created_at',
            field=models.DateTimeField(auto_created=True, auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='duration',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(28800)]),
        ),
        migrations.AlterField(
            model_name='task',
            name='updated_at',
            field=models.DateTimeField(auto_created=True, auto_now=True),
        ),
    ]
