#!/bin/bash
echo Starting to compile.

../../app/src/bin/main.exe
npm install && npm run build
serve -l 5050 -s build
