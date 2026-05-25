@echo off
cd /d D:\Clients\Encriptados\Encriptados-frontend
"C:\Program Files\nodejs\node.exe" ".\node_modules\next\dist\bin\next" dev >> ".\.next-dev\next-direct.log" 2>> ".\.next-dev\next-direct.err.log"
