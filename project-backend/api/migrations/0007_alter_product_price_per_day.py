# Generated by Django 5.0.2 on 2025-03-28 07:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_product_image_alter_product_thumbnail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='price_per_day',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
