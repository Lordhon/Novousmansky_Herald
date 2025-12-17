FROM python:3.13-slim


RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    gcc \
    python3-dev \
    netcat-openbsd \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app


COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


COPY . .

EXPOSE 8000


CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "2", "--timeout", "120", "--keep-alive", "5", "--max-requests", "1000", "--max-requests-jitter", "50"]
