@echo off
echo Starting to build

start bin/main.exe
npm install && npm run build
serve -s build
pause