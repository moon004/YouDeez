@echo off
echo Starting to build

start ../../app/src/bin/main.exe
npm install && npm run build
serve -l 5050 -s build
pause