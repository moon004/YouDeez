#!/bin/bash
echo Starting to compile.

cd ../../app/src/
go build -o ./bin/main.exe
xdg-open ./bin/main.exe
cd frontend/app/
npm install && npm run build
serve -l 5050 -s build
