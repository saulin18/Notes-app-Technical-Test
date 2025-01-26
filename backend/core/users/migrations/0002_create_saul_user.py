# users/migrations/0002_create_saul_user.py
from django.db import migrations
from django.contrib.auth.hashers import make_password

def create_saul_user(apps, schema_editor):
    User = apps.get_model('users', 'User')
    if not User.objects.filter(username='saul').exists():
        User.objects.create(
            username='saul',
            password=make_password('12345')
        )

class Migration(migrations.Migration):
    dependencies = [
        ('users', '0001_initial'),  
    ]

    operations = [
        migrations.RunPython(create_saul_user),
    ]