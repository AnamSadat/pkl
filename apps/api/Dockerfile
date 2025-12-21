FROM python:3.12-slim

WORKDIR /app

# Optimasi caching & log
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

# Install dependencies untuk Prisma CLI (butuh Node.js)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libatomic1 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements dulu (biar cache optimal)
# Titik (.) di sini mengacu pada 'Context' yang kita set saat build nanti
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy sisa source code ke struktur yang sesuai dengan import
COPY . ./apps/api/

# Generate Prisma client
RUN prisma generate --schema=apps/api/prisma/schema.prisma

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port
EXPOSE 8000

# Default: don't run migrations (safer for production)
ENV RUN_MIGRATIONS=false

ENTRYPOINT ["/entrypoint.sh"]
CMD ["python", "apps/api/main.py"]