
echo Starting to build
cd ../../app/src/ && go build -o bin/main.exe
start bin/main.exe
cd ../../frontend/app/
npm install && npm run build
serve -l 5050 -s build
pause