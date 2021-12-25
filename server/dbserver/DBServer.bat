@echo off 
mode con: cols=118 lines=30
title DBServer数据库服务器%date:~0,4%-%date:~5,2%-%date:~8,2% %time:~0,2%:%time:~3,2%:%time:~6,2%
node DBMain.js