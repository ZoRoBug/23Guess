// --------------------------------------------------------
// 输出日志到控制台和文件
// --------------------------------------------------------
// 如使用log.logger对象，方法请参见winston
// --------------------------------------------------------
"use strict";
const { createLogger, format, transports } = require('winston');

function CreateLogger(fileName, consoleLevel, fileLevel) {
    return createLogger({
        transports: [
            new transports.File({
                level: fileLevel,
                filename: fileName
            }),
            new transports.Console({
                level: consoleLevel,
                format: format.combine(
                    format.colorize(),
                    format.simple()
                )
            })
        ],
        format: format.combine(
            format.timestamp({
                format: 'YY-MM-DD HH:mm:ss SSS'
            }),
            format.splat(),
            format.simple()
        )
    });
}

const log = {
    Init: function (cfgLog) {
        let fileLevel = 'info';
        let consoleLevel = 'debug';
        let fileName = 'winston.log';
        if (cfgLog instanceof Object) {
            if (cfgLog.fileName) fileName = cfgLog.fileName;
            if (cfgLog.fileLevel) fileLevel = cfgLog.fileLevel;
            if (cfgLog.consoleLevel) consoleLevel = cfgLog.consoleLevel;
        }

        this.logger = CreateLogger(fileName, consoleLevel, fileLevel);
        this.logger.emitErrs = false;

        this.loggerIMP = CreateLogger('important.log', 'silly', 'silly');
        this.loggerIMP.emitErrs = false;

        this.warns = 0, this.errors = 0;
        this.Info('日志开始---------------------------');
    },

    Uninit: function () {
        this.Info('日志结束---------------------------');
        if (this.logger) {
            this.logger.end();
            this.logger = null;
        }
        if (this.loggerIMP) {
            this.loggerIMP.end();
            this.loggerIMP = null;
        }
    },

    Title: function () {
        return ' E:' + this.errors + ' W:' + this.warns;
    },

    Error: function () {
        ++this.errors;
        if (this.lastError === JSON.stringify(arguments)) return;
        this.lastError = JSON.stringify(arguments);;
        if (typeof arguments[0] === 'string') arguments[0] += this.Title();
        if (this.logger) this.logger.error.apply(this.logger, arguments);
    },

    Warn: function () {
        ++this.warns;
        if (this.lastWarn === JSON.stringify(arguments)) return;
        this.lastWarn = JSON.stringify(arguments);
        if (typeof arguments[0] === 'string') arguments[0] += this.Title();
        if (this.logger) this.logger.warn.apply(this.logger, arguments);
    },

    Info: function () {
        if (typeof arguments[0] === 'string') arguments[0] += this.Title();
        if (this.logger) this.logger.info.apply(this.logger, arguments);
    },

    Verbose: function () {
        if (typeof arguments[0] === 'string') arguments[0] += this.Title();
        if (this.logger) this.logger.verbose.apply(this.logger, arguments);
    },

    Debug: function () {
        if (typeof arguments[0] === 'string') arguments[0] += this.Title();
        if (this.logger) this.logger.debug.apply(this.logger, arguments);
    },

    Silly: function () {
        if (typeof arguments[0] === 'string') arguments[0] += this.Title();
        if (this.logger) this.logger.silly.apply(this.logger, arguments);
    },

    Matter: function () {
        if (!this.loggerIMP) return;
        this.loggerIMP.error.apply(this.loggerIMP, arguments);
    }
};

module.exports = log;