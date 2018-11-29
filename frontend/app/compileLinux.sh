#!/bin/bash
echo Starting to compile.

./bin/main.exe
npm install && npm run build
serve -s build
