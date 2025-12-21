set -e 

echo "🧹 Clean Up Docker images..."
echo ""

echo "-> Remove pkl-web:latest"
docker rmi pkl-web:latest
echo ""

echo "-> Remove pkl-api:latest"
docker rmi pkl-api:latest

echo ""
echo "✅ Clean Up Successfully!"