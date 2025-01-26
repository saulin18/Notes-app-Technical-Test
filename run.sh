
set -e


cleanup() {
    echo "Deteniendo servidores..."
    kill $backend_pid 2>/dev/null || true
    exit 0
}


trap cleanup SIGINT SIGTERM EXIT


check_dependency() {
    if ! command -v $1 &>/dev/null; then
        echo "Error: $1 no está instalado. Por favor instálalo antes de continuar."
        exit 1
    fi
}

check_dependency "python3"
check_dependency "pip3"
check_dependency "node"
check_dependency "npm"


echo "🛠️ Configuring backend..."
cd backend/core
pip3 install -r requirements.txt
python3 manage.py migrate
echo "⚙️ Backend (Django) in http://localhost:8000..."
python3 manage.py runserver 0.0.0.0:8000 &
backend_pid=$!


echo "🛠️ Configuring frontend..."
cd ../../frontend
npm install
echo "⚛️ Frontend server (React) in http://localhost:3000..."
npm run dev


wait