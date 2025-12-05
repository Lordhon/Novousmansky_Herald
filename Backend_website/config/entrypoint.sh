#!/bin/sh


: "${POSTGRES_HOST:?Need to set POSTGRES_HOST}"
: "${POSTGRES_PORT:?Need to set POSTGRES_PORT}"

echo "Waiting for database at $POSTGRES_HOST:$POSTGRES_PORT..."
max_attempts=30
attempt=0
while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
  attempt=$((attempt + 1))
  if [ $attempt -ge $max_attempts ]; then
    echo "Database connection failed after $max_attempts attempts"
    exit 1
  fi
  echo "Attempt $attempt/$max_attempts: Database not ready, waiting..."
  sleep 2
done
echo "Database is up!"

python manage.py makemigrations
python manage.py migrate


gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 2 --timeout 120 --keep-alive 5 --max-requests 1000 --max-requests-jitter 50
