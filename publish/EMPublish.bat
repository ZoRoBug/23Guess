@echo off 
echo ɾ��EMPublish�ļ���
IF EXIST EMPublish rmdir /s/q EMPublish
echo ------------------------
echo �ѿͻ��������޸�Ϊ��������
node AlterCfg EMConfig alter
echo ------------------------
SET projectPath="..\client"
SET buildPath="..\publish\EMPublish"
SET cccExePath="D:\Program Files\CocosCreator\CocosCreator.exe"
SET wxBuildParam= "title=��23;platform=wechatgame;buildPath=%buildPath%;startScene=7dCC1hlvNFBIUITq13gbPL;inlineSpriteFrames=true;mergeStartScene=true;md5Cache=true;webOrientation=portrait;debug=false;sourceMaps=false;"
echo ��ʼ����wechatgame...
%cccExePath% --path %projectPath% --build %wxBuildParam%  --force
echo ����wechatgame��ɣ�
echo ------------------------
echo ��ԭ�ͻ�������
node AlterCfg EMConfig reset
echo ------------------------
echo ��server����ʼ���ƹ����ļ�...
xcopy ..\public .\EMPublish\server\public\ /E /Y /Q
echo ��server����ʼ���Ʒ������ļ�...
xcopy ..\server .\EMPublish\server\server\ /E /Y /Q /exclude:exclude.txt
echo ��server����ʼ������ϢЭ���ļ�...
xcopy ..\protocol .\EMPublish\server\protocol\ /E /Y /Q
echo ��server����ʼ����JSON�����ļ�...
copy ..\package.json .\EMPublish\server\package.json /Y
copy ..\package-lock.json .\EMPublish\server\package-lock.json /Y
echo ��server���ѷ����������滻Ϊ��������...
xcopy .\EMConfig\server .\EMPublish\server\server\ /E /Y /Q
echo ��server����ʼ����NODE_MODULES�ļ�...
xcopy ..\node_modules .\EMPublish\server\node_modules\ /E /Y /Q
echo ------------------------
echo ��robot����ʼ���ƹ����ļ�...
xcopy ..\public .\EMPublish\robot\public\ /E /Y /Q
echo ��robot����ʼ���ƻ������ļ�...
xcopy ..\robot .\EMPublish\robot\robot\ /E /Y /Q /exclude:exclude.txt
echo ��robot����ʼ������ϢЭ���ļ�...
xcopy ..\protocol .\EMPublish\robot\protocol\ /E /Y /Q
echo ��robot����ʼ����JSON�����ļ�...
copy ..\package.json .\EMPublish\robot\package.json /Y
copy ..\package-lock.json .\EMPublish\robot\package-lock.json /Y
echo ��robot���ѷ����������滻Ϊ��������...
xcopy .\EMConfig\robot .\EMPublish\robot\robot\ /E /Y /Q
echo ��robot����ʼ����NODE_MODULES�ļ�...
xcopy ..\node_modules .\EMPublish\robot\node_modules\ /E /Y /Q
echo ------------------------
echo ��sql����ʼ�������ݿ��ļ�...
xcopy .\DataBase\sql .\EMPublish\sql\ /E /Y /Q
echo ------------------------
echo ������ɣ�
pause