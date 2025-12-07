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
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
RUN mkdir -p /app/media/documents
COPY . .
EXPOSE 8000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]