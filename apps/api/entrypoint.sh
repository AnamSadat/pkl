#!/bin/sh
set -e

# Wait for database to be ready
echo "Waiting for database..."
while ! python -c "from prisma import Prisma; p = Prisma(); p.connect()" 2>/dev/null; do
  sleep 2
done
echo "Database is ready!"

# Run migrations only if RUN_MIGRATIONS=true
if [ "$RUN_MIGRATIONS" = "true" ]; then
  echo "Running database migrations..."
  prisma migrate deploy --schema=apps/api/prisma/schema.prisma
  echo "Migrations completed!"
fi

# Execute CMD (passed from Dockerfile or docker run)
exec "$@"
