@echo off 
echo ɾ��PRPublish�ļ���
IF EXIST PRPublish rmdir /s/q PRPublish
echo ------------------------
echo �ѿͻ��������޸�Ϊ��������
node AlterCfg PRConfig alter
echo ------------------------
SET projectPath="..\client"
SET buildPath="..\publish\PRPublish"
SET cccExePath="D:\Program Files\CocosCreator\CocosCreator.exe"
SET wxBuildParam= "title=��23;platform=wechatgame;buildPath=%buildPath%;startScene=7dCC1hlvNFBIUITq13gbPL;inlineSpriteFrames=true;mergeStartScene=true;md5Cache=true;webOrientation=portrait;debug=false;sourceMaps=false;"
echo ��ʼ����wechatgame...
%cccExePath% --path %projectPath% --build %wxBuildParam%  --force
echo ����wechatgame��ɣ�
echo ------------------------
echo ��ԭ�ͻ�������
node AlterCfg PRConfig reset
echo ------------------------
echo ��server����ʼ���ƹ����ļ�...
xcopy ..\public .\PRPublish\server\public\ /E /Y /Q
echo ��server����ʼ���Ʒ������ļ�...
xcopy ..\server .\PRPublish\server\server\ /E /Y /Q /exclude:exclude.txt
echo ��server����ʼ������ϢЭ���ļ�...
xcopy ..\protocol .\PRPublish\server\protocol\ /E /Y /Q
echo ��server����ʼ����JSON�����ļ�...
copy ..\package.json .\PRPublish\server\package.json /Y
copy ..\package-lock.json .\PRPublish\server\package-lock.json /Y
echo ��server���ѷ����������滻Ϊ��������...
xcopy .\PRConfig\server .\PRPublish\server\server\ /E /Y /Q
echo ��server����ʼ����NODE_MODULES�ļ�...
xcopy ..\node_modules .\PRPublish\server\node_modules\ /E /Y /Q
echo ------------------------
echo ��robot����ʼ���ƹ����ļ�...
xcopy ..\public .\PRPublish\robot\public\ /E /Y /Q
echo ��robot����ʼ���ƻ������ļ�...
xcopy ..\robot .\PRPublish\robot\robot\ /E /Y /Q /exclude:exclude.txt
echo ��robot����ʼ������ϢЭ���ļ�...
xcopy ..\protocol .\PRPublish\robot\protocol\ /E /Y /Q
echo ��robot����ʼ����JSON�����ļ�...
copy ..\package.json .\PRPublish\robot\package.json /Y
copy ..\package-lock.json .\PRPublish\robot\package-lock.json /Y
echo ��robot���ѷ����������滻Ϊ��������...
xcopy .\PRConfig\robot .\PRPublish\robot\robot\ /E /Y /Q
echo ��robot����ʼ����NODE_MODULES�ļ�...
xcopy ..\node_modules .\PRPublish\robot\node_modules\ /E /Y /Q
echo ------------------------
echo ��sql����ʼ�������ݿ��ļ�...
xcopy .\DataBase\sql .\PRPublish\sql\ /E /Y /Q
echo ------------------------
echo ������ɣ�
pause