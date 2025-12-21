set -e 

echo "🔨 Building Docker images..."
echo ""

echo "-> Building API Services..."
docker build -t pkl-api:latest -f apps/api/Dockerfile apps/api
echo ""

echo "-> Building WEB Services..."
docker build -t pkl-web:latest -f apps/web/Dockerfile .
echo ""

echo ""
echo "✅ All images built successfully!"
echo ""
echo "📋 Built images:"
docker images | grep -E "(pkl-web|pkl-api)"
echo ""