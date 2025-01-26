# Usar imagen oficial de Python 3.12
FROM python:3.11:11-slim-bookworm

# Configurar variables de entorno
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1

# Instalar dependencias del sistema para PostgreSQL y compilación
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Crear usuario no root
RUN useradd -m appuser
WORKDIR /app
RUN chown appuser:appuser /app
USER appuser

# Copiar e instalar dependencias de Python
COPY --chown=appuser:appuser requirements.txt .
RUN pip install --user --no-warn-script-location -r requirements.txt

# Copiar el proyecto
COPY --chown=appuser:appuser . .

# Puerto para Django
EXPOSE 8000

# Comando para ejecutar la aplicación (ajustar según necesidades)
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]