#!/bin/bash
set -e

cleanup() {
    echo "🛑 Stopping servers..."
    kill $backend_pid 2>/dev/null || true
    exit 0
}

trap cleanup SIGINT SIGTERM EXIT

check_dependency() {
    if ! command -v $1 &>/dev/null; then
        echo "❌ Error: $1 is not installed. Please install it before proceeding."
        exit 1
    fi
}

create_env_files() {
    # Backend .env
    mkdir -p backend/core
    if [ ! -f backend/core/.env ]; then
        cat <<EOF > backend/core/.env
DEBUG=True
SECRET_KEY=$(openssl rand -hex 32)
DATABASE_URL=postgres://user:password@localhost:5432/mydb
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
CSRF_TRUSTED_ORIGINS=http://localhost:3000,http://localhost:5173
EOF
        echo "✅ Backend .env file created"
    fi

    # Frontend .env
    mkdir -p frontend
    if [ ! -f frontend/.env ]; then
        cat <<EOF > frontend/.env
VITE_BACKEND_URL=http://localhost:8000
EOF
        echo "✅ Frontend .env file created"
    fi
}

check_dependency "python3"
check_dependency "pip3"
check_dependency "node"
check_dependency "npm"

create_env_files

echo "🛠️ Setting up backend..."
cd backend/core
pip3 install -r requirements.txt
python3 manage.py migrate

echo "⚙️ Starting backend server (Django) at http://localhost:8000..."
python3 manage.py runserver 0.0.0.0:8000 &
backend_pid=$!

echo "🛠️ Setting up frontend..."
cd ../../frontend
npm install

echo "⚛️ Starting frontend server (React) at http://localhost:3000..."
npm run dev

wait