#!/bin/sh

set -e

host="$DATABASE_HOST"
port="$DATABASE_PORT"

echo "Esperando pelo PostgreSQL em $host:$port..."

while ! nc -z $host $port; do
  sleep 1
done

echo "PostgreSQL está disponível!"
exec "$@"
