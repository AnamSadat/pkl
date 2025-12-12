from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from apps.api.routes.main import router
from apps.api.core.jwt import verify_token

app = FastAPI(title="FastAPI", version="1.0.0")

origins = ["http://localhost:3000", "http://127.0.0.1:3000"]

app.add_middleware(
	CORSMiddleware,
  allow_origins=origins,
	allow_origin_regex=r"https://.*\.ngrok-free\.dev",
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

protected_paths = ["/api/predict"]


@app.middleware("http")
async def auth_middleware(request: Request, next):
	path = request.url.path
	if any(path.startswith(p) for p in protected_paths):
		authorization = request.headers.get("authorization")
		if not authorization:
			return JSONResponse(
				status_code=401,
				content={"detail": "Missing Authorization header"},
			)

		parts = authorization.split()
		if len(parts) != 2 or parts[0].lower() != "bearer":
			return JSONResponse(
				status_code=401,
				content={"detail": "Invalid Authorization header"},
			)

		token = parts[1]
		try:
			payload = verify_token(token)
			request.state.user = payload
		except HTTPException as e:
			return JSONResponse(status_code=e.status_code, content={"detail": e.detail})

	response = await next(request)
	return response


app.include_router(router, prefix="/api", tags=["API"])


@app.get("/")
def root():
	return {"message": "Fast API Server is running..."}
