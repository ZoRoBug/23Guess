@echo off 
echo 删除PRPublish文件夹
IF EXIST PRPublish rmdir /s/q PRPublish
echo ------------------------
echo 把客户端配置修改为发布配置
node AlterCfg PRConfig alter
echo ------------------------
SET projectPath="..\client"
SET buildPath="..\publish\PRPublish"
SET cccExePath="D:\Program Files\CocosCreator\CocosCreator.exe"
SET wxBuildParam= "title=猜23;platform=wechatgame;buildPath=%buildPath%;startScene=7dCC1hlvNFBIUITq13gbPL;inlineSpriteFrames=true;mergeStartScene=true;md5Cache=true;webOrientation=portrait;debug=false;sourceMaps=false;"
echo 开始生成wechatgame...
%cccExePath% --path %projectPath% --build %wxBuildParam%  --force
echo 生成wechatgame完成！
echo ------------------------
echo 还原客户端配置
node AlterCfg PRConfig reset
echo ------------------------
echo 【server】开始复制公共文件...
xcopy ..\public .\PRPublish\server\public\ /E /Y /Q
echo 【server】开始复制服务器文件...
xcopy ..\server .\PRPublish\server\server\ /E /Y /Q /exclude:exclude.txt
echo 【server】开始复制消息协议文件...
xcopy ..\protocol .\PRPublish\server\protocol\ /E /Y /Q
echo 【server】开始复制JSON配置文件...
copy ..\package.json .\PRPublish\server\package.json /Y
copy ..\package-lock.json .\PRPublish\server\package-lock.json /Y
echo 【server】把服务器配置替换为仿真配置...
xcopy .\PRConfig\server .\PRPublish\server\server\ /E /Y /Q
echo 【server】开始复制NODE_MODULES文件...
xcopy ..\node_modules .\PRPublish\server\node_modules\ /E /Y /Q
echo ------------------------
echo 【robot】开始复制公共文件...
xcopy ..\public .\PRPublish\robot\public\ /E /Y /Q
echo 【robot】开始复制机器人文件...
xcopy ..\robot .\PRPublish\robot\robot\ /E /Y /Q /exclude:exclude.txt
echo 【robot】开始复制消息协议文件...
xcopy ..\protocol .\PRPublish\robot\protocol\ /E /Y /Q
echo 【robot】开始复制JSON配置文件...
copy ..\package.json .\PRPublish\robot\package.json /Y
copy ..\package-lock.json .\PRPublish\robot\package-lock.json /Y
echo 【robot】把服务器配置替换为仿真配置...
xcopy .\PRConfig\robot .\PRPublish\robot\robot\ /E /Y /Q
echo 【robot】开始复制NODE_MODULES文件...
xcopy ..\node_modules .\PRPublish\robot\node_modules\ /E /Y /Q
echo ------------------------
echo 【sql】开始复制数据库文件...
xcopy .\DataBase\sql .\PRPublish\sql\ /E /Y /Q
echo ------------------------
echo 发布完成！
pause