@echo off 
cd dbserver
start "" "DBServer.bat"
cd..
cd lobby
start "" "Lobby.bat"
cd..
cd impawn
start "" "Impawn.bat"
cd..
cd connserver
start "" "ConnServer.bat"
cd..
cd gateserver
start "" "GateServer.bat"
exit