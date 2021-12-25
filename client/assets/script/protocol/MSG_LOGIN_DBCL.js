/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_LOGIN_DBCL = (function() {

    /**
     * Properties of a MSG_LOGIN_DBCL.
     * @exports IMSG_LOGIN_DBCL
     * @interface IMSG_LOGIN_DBCL
     * @property {number} msgID MSG_LOGIN_DBCL msgID
     * @property {MSG_LOGIN_DBCL.Result|null} [result] MSG_LOGIN_DBCL result
     * @property {IPlayerInfo|null} [pi] MSG_LOGIN_DBCL pi
     * @property {Array.<IProp>|null} [propList] MSG_LOGIN_DBCL propList
     * @property {string|null} [wxSessionKey] MSG_LOGIN_DBCL wxSessionKey
     * @property {number|Long|null} [loginID] MSG_LOGIN_DBCL loginID
     */

    /**
     * Constructs a new MSG_LOGIN_DBCL.
     * @exports MSG_LOGIN_DBCL
     * @classdesc Represents a MSG_LOGIN_DBCL.
     * @implements IMSG_LOGIN_DBCL
     * @constructor
     * @param {IMSG_LOGIN_DBCL=} [properties] Properties to set
     */
    function MSG_LOGIN_DBCL(properties) {
        this.propList = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_LOGIN_DBCL msgID.
     * @member {number} msgID
     * @memberof MSG_LOGIN_DBCL
     * @instance
     */
    MSG_LOGIN_DBCL.prototype.msgID = 0;

    /**
     * MSG_LOGIN_DBCL result.
     * @member {MSG_LOGIN_DBCL.Result} result
     * @memberof MSG_LOGIN_DBCL
     * @instance
     */
    MSG_LOGIN_DBCL.prototype.result = 0;

    /**
     * MSG_LOGIN_DBCL pi.
     * @member {IPlayerInfo|null|undefined} pi
     * @memberof MSG_LOGIN_DBCL
     * @instance
     */
    MSG_LOGIN_DBCL.prototype.pi = null;

    /**
     * MSG_LOGIN_DBCL propList.
     * @member {Array.<IProp>} propList
     * @memberof MSG_LOGIN_DBCL
     * @instance
     */
    MSG_LOGIN_DBCL.prototype.propList = $util.emptyArray;

    /**
     * MSG_LOGIN_DBCL wxSessionKey.
     * @member {string} wxSessionKey
     * @memberof MSG_LOGIN_DBCL
     * @instance
     */
    MSG_LOGIN_DBCL.prototype.wxSessionKey = "";

    /**
     * MSG_LOGIN_DBCL loginID.
     * @member {number|Long} loginID
     * @memberof MSG_LOGIN_DBCL
     * @instance
     */
    MSG_LOGIN_DBCL.prototype.loginID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new MSG_LOGIN_DBCL instance using the specified properties.
     * @function create
     * @memberof MSG_LOGIN_DBCL
     * @static
     * @param {IMSG_LOGIN_DBCL=} [properties] Properties to set
     * @returns {MSG_LOGIN_DBCL} MSG_LOGIN_DBCL instance
     */
    MSG_LOGIN_DBCL.create = function create(properties) {
        return new MSG_LOGIN_DBCL(properties);
    };

    /**
     * Encodes the specified MSG_LOGIN_DBCL message. Does not implicitly {@link MSG_LOGIN_DBCL.verify|verify} messages.
     * @function encode
     * @memberof MSG_LOGIN_DBCL
     * @static
     * @param {IMSG_LOGIN_DBCL} message MSG_LOGIN_DBCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_LOGIN_DBCL.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.result != null && message.hasOwnProperty("result"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
        if (message.pi != null && message.hasOwnProperty("pi"))
            $root.PlayerInfo.encode(message.pi, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.propList != null && message.propList.length)
            for (var i = 0; i < message.propList.length; ++i)
                $root.Prop.encode(message.propList[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.wxSessionKey != null && message.hasOwnProperty("wxSessionKey"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.wxSessionKey);
        if (message.loginID != null && message.hasOwnProperty("loginID"))
            writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.loginID);
        return writer;
    };

    /**
     * Encodes the specified MSG_LOGIN_DBCL message, length delimited. Does not implicitly {@link MSG_LOGIN_DBCL.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_LOGIN_DBCL
     * @static
     * @param {IMSG_LOGIN_DBCL} message MSG_LOGIN_DBCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_LOGIN_DBCL.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_LOGIN_DBCL message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_LOGIN_DBCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_LOGIN_DBCL} MSG_LOGIN_DBCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_LOGIN_DBCL.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_LOGIN_DBCL();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.msgID = reader.uint32();
                break;
            case 2:
                message.result = reader.int32();
                break;
            case 3:
                message.pi = $root.PlayerInfo.decode(reader, reader.uint32());
                break;
            case 4:
                if (!(message.propList && message.propList.length))
                    message.propList = [];
                message.propList.push($root.Prop.decode(reader, reader.uint32()));
                break;
            case 5:
                message.wxSessionKey = reader.string();
                break;
            case 6:
                message.loginID = reader.uint64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("msgID"))
            throw $util.ProtocolError("missing required 'msgID'", { instance: message });
        return message;
    };

    /**
     * Decodes a MSG_LOGIN_DBCL message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_LOGIN_DBCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_LOGIN_DBCL} MSG_LOGIN_DBCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_LOGIN_DBCL.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_LOGIN_DBCL message.
     * @function verify
     * @memberof MSG_LOGIN_DBCL
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_LOGIN_DBCL.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.result != null && message.hasOwnProperty("result"))
            switch (message.result) {
            default:
                return "result: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 20:
            case 21:
            case 22:
            case 23:
            case 24:
            case 25:
            case 26:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
                break;
            }
        if (message.pi != null && message.hasOwnProperty("pi")) {
            var error = $root.PlayerInfo.verify(message.pi);
            if (error)
                return "pi." + error;
        }
        if (message.propList != null && message.hasOwnProperty("propList")) {
            if (!Array.isArray(message.propList))
                return "propList: array expected";
            for (var i = 0; i < message.propList.length; ++i) {
                var error = $root.Prop.verify(message.propList[i]);
                if (error)
                    return "propList." + error;
            }
        }
        if (message.wxSessionKey != null && message.hasOwnProperty("wxSessionKey"))
            if (!$util.isString(message.wxSessionKey))
                return "wxSessionKey: string expected";
        if (message.loginID != null && message.hasOwnProperty("loginID"))
            if (!$util.isInteger(message.loginID) && !(message.loginID && $util.isInteger(message.loginID.low) && $util.isInteger(message.loginID.high)))
                return "loginID: integer|Long expected";
        return null;
    };

    /**
     * Creates a MSG_LOGIN_DBCL message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_LOGIN_DBCL
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_LOGIN_DBCL} MSG_LOGIN_DBCL
     */
    MSG_LOGIN_DBCL.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_LOGIN_DBCL)
            return object;
        var message = new $root.MSG_LOGIN_DBCL();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        switch (object.result) {
        case "UNKNOW":
        case 0:
            message.result = 0;
            break;
        case "SUCCESS":
        case 1:
            message.result = 1;
            break;
        case "ACCOUNT_NOEXIST":
        case 2:
            message.result = 2;
            break;
        case "PASSWORD_ERROR":
        case 3:
            message.result = 3;
            break;
        case "PARAM_ERROR":
        case 4:
            message.result = 4;
            break;
        case "ACCOUNT_FROZEN":
        case 5:
            message.result = 5;
            break;
        case "REDIS_GET_ERROR":
        case 6:
            message.result = 6;
            break;
        case "MARIADB_QUERY_ERROR":
        case 7:
            message.result = 7;
            break;
        case "LOBBY_NO_CONNECT":
        case 8:
            message.result = 8;
            break;
        case "TICKET_ERROR":
        case 9:
            message.result = 9;
            break;
        case "OVER_PLAYER":
        case 10:
            message.result = 10;
            break;
        case "ADD_PLAYER_ERROR":
        case 11:
            message.result = 11;
            break;
        case "ALREADY_LOGIN":
        case 12:
            message.result = 12;
            break;
        case "WX_UNKNOW_ERROR":
        case 20:
            message.result = 20;
            break;
        case "WX_SYSTEM_BUSY":
        case 21:
            message.result = 21;
            break;
        case "WX_CODE_INVALID":
        case 22:
            message.result = 22;
            break;
        case "WX_LOGIN_TOOMUCH":
        case 23:
            message.result = 23;
            break;
        case "WX_URL_GET_ERROR":
        case 24:
            message.result = 24;
            break;
        case "WX_PARSE_FAIL":
        case 25:
            message.result = 25;
            break;
        case "WX_DATA_ERROR":
        case 26:
            message.result = 26;
            break;
        case "UNKNOW1":
        case 100:
            message.result = 100;
            break;
        case "UNKNOW2":
        case 101:
            message.result = 101;
            break;
        case "UNKNOW3":
        case 102:
            message.result = 102;
            break;
        case "UNKNOW4":
        case 103:
            message.result = 103;
            break;
        case "UNKNOW5":
        case 104:
            message.result = 104;
            break;
        case "UNKNOW6":
        case 105:
            message.result = 105;
            break;
        case "UNKNOW7":
        case 106:
            message.result = 106;
            break;
        case "UNKNOW8":
        case 107:
            message.result = 107;
            break;
        }
        if (object.pi != null) {
            if (typeof object.pi !== "object")
                throw TypeError(".MSG_LOGIN_DBCL.pi: object expected");
            message.pi = $root.PlayerInfo.fromObject(object.pi);
        }
        if (object.propList) {
            if (!Array.isArray(object.propList))
                throw TypeError(".MSG_LOGIN_DBCL.propList: array expected");
            message.propList = [];
            for (var i = 0; i < object.propList.length; ++i) {
                if (typeof object.propList[i] !== "object")
                    throw TypeError(".MSG_LOGIN_DBCL.propList: object expected");
                message.propList[i] = $root.Prop.fromObject(object.propList[i]);
            }
        }
        if (object.wxSessionKey != null)
            message.wxSessionKey = String(object.wxSessionKey);
        if (object.loginID != null)
            if ($util.Long)
                (message.loginID = $util.Long.fromValue(object.loginID)).unsigned = true;
            else if (typeof object.loginID === "string")
                message.loginID = parseInt(object.loginID, 10);
            else if (typeof object.loginID === "number")
                message.loginID = object.loginID;
            else if (typeof object.loginID === "object")
                message.loginID = new $util.LongBits(object.loginID.low >>> 0, object.loginID.high >>> 0).toNumber(true);
        return message;
    };

    /**
     * Creates a plain object from a MSG_LOGIN_DBCL message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_LOGIN_DBCL
     * @static
     * @param {MSG_LOGIN_DBCL} message MSG_LOGIN_DBCL
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_LOGIN_DBCL.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.propList = [];
        if (options.defaults) {
            object.msgID = 0;
            object.result = options.enums === String ? "UNKNOW" : 0;
            object.pi = null;
            object.wxSessionKey = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.loginID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.loginID = options.longs === String ? "0" : 0;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.result != null && message.hasOwnProperty("result"))
            object.result = options.enums === String ? $root.MSG_LOGIN_DBCL.Result[message.result] : message.result;
        if (message.pi != null && message.hasOwnProperty("pi"))
            object.pi = $root.PlayerInfo.toObject(message.pi, options);
        if (message.propList && message.propList.length) {
            object.propList = [];
            for (var j = 0; j < message.propList.length; ++j)
                object.propList[j] = $root.Prop.toObject(message.propList[j], options);
        }
        if (message.wxSessionKey != null && message.hasOwnProperty("wxSessionKey"))
            object.wxSessionKey = message.wxSessionKey;
        if (message.loginID != null && message.hasOwnProperty("loginID"))
            if (typeof message.loginID === "number")
                object.loginID = options.longs === String ? String(message.loginID) : message.loginID;
            else
                object.loginID = options.longs === String ? $util.Long.prototype.toString.call(message.loginID) : options.longs === Number ? new $util.LongBits(message.loginID.low >>> 0, message.loginID.high >>> 0).toNumber(true) : message.loginID;
        return object;
    };

    /**
     * Converts this MSG_LOGIN_DBCL to JSON.
     * @function toJSON
     * @memberof MSG_LOGIN_DBCL
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_LOGIN_DBCL.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Result enum.
     * @name MSG_LOGIN_DBCL.Result
     * @enum {string}
     * @property {number} UNKNOW=0 UNKNOW value
     * @property {number} SUCCESS=1 SUCCESS value
     * @property {number} ACCOUNT_NOEXIST=2 ACCOUNT_NOEXIST value
     * @property {number} PASSWORD_ERROR=3 PASSWORD_ERROR value
     * @property {number} PARAM_ERROR=4 PARAM_ERROR value
     * @property {number} ACCOUNT_FROZEN=5 ACCOUNT_FROZEN value
     * @property {number} REDIS_GET_ERROR=6 REDIS_GET_ERROR value
     * @property {number} MARIADB_QUERY_ERROR=7 MARIADB_QUERY_ERROR value
     * @property {number} LOBBY_NO_CONNECT=8 LOBBY_NO_CONNECT value
     * @property {number} TICKET_ERROR=9 TICKET_ERROR value
     * @property {number} OVER_PLAYER=10 OVER_PLAYER value
     * @property {number} ADD_PLAYER_ERROR=11 ADD_PLAYER_ERROR value
     * @property {number} ALREADY_LOGIN=12 ALREADY_LOGIN value
     * @property {number} WX_UNKNOW_ERROR=20 WX_UNKNOW_ERROR value
     * @property {number} WX_SYSTEM_BUSY=21 WX_SYSTEM_BUSY value
     * @property {number} WX_CODE_INVALID=22 WX_CODE_INVALID value
     * @property {number} WX_LOGIN_TOOMUCH=23 WX_LOGIN_TOOMUCH value
     * @property {number} WX_URL_GET_ERROR=24 WX_URL_GET_ERROR value
     * @property {number} WX_PARSE_FAIL=25 WX_PARSE_FAIL value
     * @property {number} WX_DATA_ERROR=26 WX_DATA_ERROR value
     * @property {number} UNKNOW1=100 UNKNOW1 value
     * @property {number} UNKNOW2=101 UNKNOW2 value
     * @property {number} UNKNOW3=102 UNKNOW3 value
     * @property {number} UNKNOW4=103 UNKNOW4 value
     * @property {number} UNKNOW5=104 UNKNOW5 value
     * @property {number} UNKNOW6=105 UNKNOW6 value
     * @property {number} UNKNOW7=106 UNKNOW7 value
     * @property {number} UNKNOW8=107 UNKNOW8 value
     */
    MSG_LOGIN_DBCL.Result = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOW"] = 0;
        values[valuesById[1] = "SUCCESS"] = 1;
        values[valuesById[2] = "ACCOUNT_NOEXIST"] = 2;
        values[valuesById[3] = "PASSWORD_ERROR"] = 3;
        values[valuesById[4] = "PARAM_ERROR"] = 4;
        values[valuesById[5] = "ACCOUNT_FROZEN"] = 5;
        values[valuesById[6] = "REDIS_GET_ERROR"] = 6;
        values[valuesById[7] = "MARIADB_QUERY_ERROR"] = 7;
        values[valuesById[8] = "LOBBY_NO_CONNECT"] = 8;
        values[valuesById[9] = "TICKET_ERROR"] = 9;
        values[valuesById[10] = "OVER_PLAYER"] = 10;
        values[valuesById[11] = "ADD_PLAYER_ERROR"] = 11;
        values[valuesById[12] = "ALREADY_LOGIN"] = 12;
        values[valuesById[20] = "WX_UNKNOW_ERROR"] = 20;
        values[valuesById[21] = "WX_SYSTEM_BUSY"] = 21;
        values[valuesById[22] = "WX_CODE_INVALID"] = 22;
        values[valuesById[23] = "WX_LOGIN_TOOMUCH"] = 23;
        values[valuesById[24] = "WX_URL_GET_ERROR"] = 24;
        values[valuesById[25] = "WX_PARSE_FAIL"] = 25;
        values[valuesById[26] = "WX_DATA_ERROR"] = 26;
        values[valuesById[100] = "UNKNOW1"] = 100;
        values[valuesById[101] = "UNKNOW2"] = 101;
        values[valuesById[102] = "UNKNOW3"] = 102;
        values[valuesById[103] = "UNKNOW4"] = 103;
        values[valuesById[104] = "UNKNOW5"] = 104;
        values[valuesById[105] = "UNKNOW6"] = 105;
        values[valuesById[106] = "UNKNOW7"] = 106;
        values[valuesById[107] = "UNKNOW8"] = 107;
        return values;
    })();

    return MSG_LOGIN_DBCL;
})();

/**
 * PropID enum.
 * @exports PropID
 * @enum {string}
 * @property {number} COIN=1 COIN value
 */
$root.PropID = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[1] = "COIN"] = 1;
    return values;
})();

/**
 * Platform enum.
 * @exports Platform
 * @enum {string}
 * @property {number} MIN=0 MIN value
 * @property {number} OFFICIAL=1 OFFICIAL value
 * @property {number} WX_MINIGAME=2 WX_MINIGAME value
 * @property {number} MAX=3 MAX value
 */
$root.Platform = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "MIN"] = 0;
    values[valuesById[1] = "OFFICIAL"] = 1;
    values[valuesById[2] = "WX_MINIGAME"] = 2;
    values[valuesById[3] = "MAX"] = 3;
    return values;
})();

/**
 * Location enum.
 * @exports Location
 * @enum {string}
 * @property {number} LOBBY=1 LOBBY value
 * @property {number} IMPAWN=2 IMPAWN value
 */
$root.Location = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[1] = "LOBBY"] = 1;
    values[valuesById[2] = "IMPAWN"] = 2;
    return values;
})();

/**
 * ImpawnState enum.
 * @exports ImpawnState
 * @enum {string}
 * @property {number} WAIT_START=1 WAIT_START value
 * @property {number} STARTING=2 STARTING value
 * @property {number} WAIT_END=3 WAIT_END value
 * @property {number} SETTLEMENT=4 SETTLEMENT value
 * @property {number} PAUSE=5 PAUSE value
 */
$root.ImpawnState = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[1] = "WAIT_START"] = 1;
    values[valuesById[2] = "STARTING"] = 2;
    values[valuesById[3] = "WAIT_END"] = 3;
    values[valuesById[4] = "SETTLEMENT"] = 4;
    values[valuesById[5] = "PAUSE"] = 5;
    return values;
})();

/**
 * RankType enum.
 * @exports RankType
 * @enum {string}
 * @property {number} UNIVERSE_CROWN=1 UNIVERSE_CROWN value
 * @property {number} YESTERDAY_WINNER=2 YESTERDAY_WINNER value
 */
$root.RankType = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[1] = "UNIVERSE_CROWN"] = 1;
    values[valuesById[2] = "YESTERDAY_WINNER"] = 2;
    return values;
})();

/**
 * AwardType enum.
 * @exports AwardType
 * @enum {string}
 * @property {number} STATIC_AD=1 STATIC_AD value
 * @property {number} ANIMATE_AD=2 ANIMATE_AD value
 * @property {number} SHARE_GAME=3 SHARE_GAME value
 */
$root.AwardType = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[1] = "STATIC_AD"] = 1;
    values[valuesById[2] = "ANIMATE_AD"] = 2;
    values[valuesById[3] = "SHARE_GAME"] = 3;
    return values;
})();

$root.Prop = (function() {

    /**
     * Properties of a Prop.
     * @exports IProp
     * @interface IProp
     * @property {PropID|null} [id] Prop id
     * @property {number|Long|null} [count] Prop count
     */

    /**
     * Constructs a new Prop.
     * @exports Prop
     * @classdesc Represents a Prop.
     * @implements IProp
     * @constructor
     * @param {IProp=} [properties] Properties to set
     */
    function Prop(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Prop id.
     * @member {PropID} id
     * @memberof Prop
     * @instance
     */
    Prop.prototype.id = 1;

    /**
     * Prop count.
     * @member {number|Long} count
     * @memberof Prop
     * @instance
     */
    Prop.prototype.count = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new Prop instance using the specified properties.
     * @function create
     * @memberof Prop
     * @static
     * @param {IProp=} [properties] Properties to set
     * @returns {Prop} Prop instance
     */
    Prop.create = function create(properties) {
        return new Prop(properties);
    };

    /**
     * Encodes the specified Prop message. Does not implicitly {@link Prop.verify|verify} messages.
     * @function encode
     * @memberof Prop
     * @static
     * @param {IProp} message Prop message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Prop.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
        if (message.count != null && message.hasOwnProperty("count"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.count);
        return writer;
    };

    /**
     * Encodes the specified Prop message, length delimited. Does not implicitly {@link Prop.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Prop
     * @static
     * @param {IProp} message Prop message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Prop.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Prop message from the specified reader or buffer.
     * @function decode
     * @memberof Prop
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Prop} Prop
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Prop.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Prop();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.int32();
                break;
            case 2:
                message.count = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Prop message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Prop
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Prop} Prop
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Prop.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Prop message.
     * @function verify
     * @memberof Prop
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Prop.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            switch (message.id) {
            default:
                return "id: enum value expected";
            case 1:
                break;
            }
        if (message.count != null && message.hasOwnProperty("count"))
            if (!$util.isInteger(message.count) && !(message.count && $util.isInteger(message.count.low) && $util.isInteger(message.count.high)))
                return "count: integer|Long expected";
        return null;
    };

    /**
     * Creates a Prop message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Prop
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Prop} Prop
     */
    Prop.fromObject = function fromObject(object) {
        if (object instanceof $root.Prop)
            return object;
        var message = new $root.Prop();
        switch (object.id) {
        case "COIN":
        case 1:
            message.id = 1;
            break;
        }
        if (object.count != null)
            if ($util.Long)
                (message.count = $util.Long.fromValue(object.count)).unsigned = false;
            else if (typeof object.count === "string")
                message.count = parseInt(object.count, 10);
            else if (typeof object.count === "number")
                message.count = object.count;
            else if (typeof object.count === "object")
                message.count = new $util.LongBits(object.count.low >>> 0, object.count.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a Prop message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Prop
     * @static
     * @param {Prop} message Prop
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Prop.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.id = options.enums === String ? "COIN" : 1;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.count = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.count = options.longs === String ? "0" : 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = options.enums === String ? $root.PropID[message.id] : message.id;
        if (message.count != null && message.hasOwnProperty("count"))
            if (typeof message.count === "number")
                object.count = options.longs === String ? String(message.count) : message.count;
            else
                object.count = options.longs === String ? $util.Long.prototype.toString.call(message.count) : options.longs === Number ? new $util.LongBits(message.count.low >>> 0, message.count.high >>> 0).toNumber() : message.count;
        return object;
    };

    /**
     * Converts this Prop to JSON.
     * @function toJSON
     * @memberof Prop
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Prop.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Prop;
})();

$root.PlayerInfo = (function() {

    /**
     * Properties of a PlayerInfo.
     * @exports IPlayerInfo
     * @interface IPlayerInfo
     * @property {number|null} [pid] PlayerInfo pid
     * @property {string|null} [account] PlayerInfo account
     * @property {string|null} [password] PlayerInfo password
     * @property {string|null} [head] PlayerInfo head
     * @property {string|null} [nickname] PlayerInfo nickname
     * @property {Platform|null} [platform] PlayerInfo platform
     * @property {number|null} [level] PlayerInfo level
     * @property {number|Long|null} [winLoss] PlayerInfo winLoss
     * @property {number|Long|null} [coinSum] PlayerInfo coinSum
     */

    /**
     * Constructs a new PlayerInfo.
     * @exports PlayerInfo
     * @classdesc Represents a PlayerInfo.
     * @implements IPlayerInfo
     * @constructor
     * @param {IPlayerInfo=} [properties] Properties to set
     */
    function PlayerInfo(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PlayerInfo pid.
     * @member {number} pid
     * @memberof PlayerInfo
     * @instance
     */
    PlayerInfo.prototype.pid = 0;

    /**
     * PlayerInfo account.
     * @member {string} account
     * @memberof PlayerInfo
     * @instance
     */
    PlayerInfo.prototype.account = "";

    /**
     * PlayerInfo password.
     * @member {string} password
     * @memberof PlayerInfo
     * @instance
     */
    PlayerInfo.prototype.password = "";

    /**
     * PlayerInfo head.
     * @member {string} head
     * @memberof PlayerInfo
     * @instance
     */
    PlayerInfo.prototype.head = "";

    /**
     * PlayerInfo nickname.
     * @member {string} nickname
     * @memberof PlayerInfo
     * @instance
     */
    PlayerInfo.prototype.nickname = "";

    /**
     * PlayerInfo platform.
     * @member {Platform} platform
     * @memberof PlayerInfo
     * @instance
     */
    PlayerInfo.prototype.platform = 0;

    /**
     * PlayerInfo level.
     * @member {number} level
     * @memberof PlayerInfo
     * @instance
     */
    PlayerInfo.prototype.level = 0;

    /**
     * PlayerInfo winLoss.
     * @member {number|Long} winLoss
     * @memberof PlayerInfo
     * @instance
     */
    PlayerInfo.prototype.winLoss = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * PlayerInfo coinSum.
     * @member {number|Long} coinSum
     * @memberof PlayerInfo
     * @instance
     */
    PlayerInfo.prototype.coinSum = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new PlayerInfo instance using the specified properties.
     * @function create
     * @memberof PlayerInfo
     * @static
     * @param {IPlayerInfo=} [properties] Properties to set
     * @returns {PlayerInfo} PlayerInfo instance
     */
    PlayerInfo.create = function create(properties) {
        return new PlayerInfo(properties);
    };

    /**
     * Encodes the specified PlayerInfo message. Does not implicitly {@link PlayerInfo.verify|verify} messages.
     * @function encode
     * @memberof PlayerInfo
     * @static
     * @param {IPlayerInfo} message PlayerInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayerInfo.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.pid);
        if (message.account != null && message.hasOwnProperty("account"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.account);
        if (message.password != null && message.hasOwnProperty("password"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.password);
        if (message.head != null && message.hasOwnProperty("head"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.head);
        if (message.nickname != null && message.hasOwnProperty("nickname"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.nickname);
        if (message.platform != null && message.hasOwnProperty("platform"))
            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.platform);
        if (message.level != null && message.hasOwnProperty("level"))
            writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.level);
        if (message.winLoss != null && message.hasOwnProperty("winLoss"))
            writer.uint32(/* id 8, wireType 0 =*/64).sint64(message.winLoss);
        if (message.coinSum != null && message.hasOwnProperty("coinSum"))
            writer.uint32(/* id 9, wireType 0 =*/72).uint64(message.coinSum);
        return writer;
    };

    /**
     * Encodes the specified PlayerInfo message, length delimited. Does not implicitly {@link PlayerInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PlayerInfo
     * @static
     * @param {IPlayerInfo} message PlayerInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayerInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PlayerInfo message from the specified reader or buffer.
     * @function decode
     * @memberof PlayerInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PlayerInfo} PlayerInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayerInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PlayerInfo();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.pid = reader.uint32();
                break;
            case 2:
                message.account = reader.string();
                break;
            case 3:
                message.password = reader.string();
                break;
            case 4:
                message.head = reader.string();
                break;
            case 5:
                message.nickname = reader.string();
                break;
            case 6:
                message.platform = reader.int32();
                break;
            case 7:
                message.level = reader.uint32();
                break;
            case 8:
                message.winLoss = reader.sint64();
                break;
            case 9:
                message.coinSum = reader.uint64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PlayerInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PlayerInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PlayerInfo} PlayerInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayerInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PlayerInfo message.
     * @function verify
     * @memberof PlayerInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PlayerInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (!$util.isInteger(message.pid))
                return "pid: integer expected";
        if (message.account != null && message.hasOwnProperty("account"))
            if (!$util.isString(message.account))
                return "account: string expected";
        if (message.password != null && message.hasOwnProperty("password"))
            if (!$util.isString(message.password))
                return "password: string expected";
        if (message.head != null && message.hasOwnProperty("head"))
            if (!$util.isString(message.head))
                return "head: string expected";
        if (message.nickname != null && message.hasOwnProperty("nickname"))
            if (!$util.isString(message.nickname))
                return "nickname: string expected";
        if (message.platform != null && message.hasOwnProperty("platform"))
            switch (message.platform) {
            default:
                return "platform: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
                break;
            }
        if (message.level != null && message.hasOwnProperty("level"))
            if (!$util.isInteger(message.level))
                return "level: integer expected";
        if (message.winLoss != null && message.hasOwnProperty("winLoss"))
            if (!$util.isInteger(message.winLoss) && !(message.winLoss && $util.isInteger(message.winLoss.low) && $util.isInteger(message.winLoss.high)))
                return "winLoss: integer|Long expected";
        if (message.coinSum != null && message.hasOwnProperty("coinSum"))
            if (!$util.isInteger(message.coinSum) && !(message.coinSum && $util.isInteger(message.coinSum.low) && $util.isInteger(message.coinSum.high)))
                return "coinSum: integer|Long expected";
        return null;
    };

    /**
     * Creates a PlayerInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PlayerInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PlayerInfo} PlayerInfo
     */
    PlayerInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.PlayerInfo)
            return object;
        var message = new $root.PlayerInfo();
        if (object.pid != null)
            message.pid = object.pid >>> 0;
        if (object.account != null)
            message.account = String(object.account);
        if (object.password != null)
            message.password = String(object.password);
        if (object.head != null)
            message.head = String(object.head);
        if (object.nickname != null)
            message.nickname = String(object.nickname);
        switch (object.platform) {
        case "MIN":
        case 0:
            message.platform = 0;
            break;
        case "OFFICIAL":
        case 1:
            message.platform = 1;
            break;
        case "WX_MINIGAME":
        case 2:
            message.platform = 2;
            break;
        case "MAX":
        case 3:
            message.platform = 3;
            break;
        }
        if (object.level != null)
            message.level = object.level >>> 0;
        if (object.winLoss != null)
            if ($util.Long)
                (message.winLoss = $util.Long.fromValue(object.winLoss)).unsigned = false;
            else if (typeof object.winLoss === "string")
                message.winLoss = parseInt(object.winLoss, 10);
            else if (typeof object.winLoss === "number")
                message.winLoss = object.winLoss;
            else if (typeof object.winLoss === "object")
                message.winLoss = new $util.LongBits(object.winLoss.low >>> 0, object.winLoss.high >>> 0).toNumber();
        if (object.coinSum != null)
            if ($util.Long)
                (message.coinSum = $util.Long.fromValue(object.coinSum)).unsigned = true;
            else if (typeof object.coinSum === "string")
                message.coinSum = parseInt(object.coinSum, 10);
            else if (typeof object.coinSum === "number")
                message.coinSum = object.coinSum;
            else if (typeof object.coinSum === "object")
                message.coinSum = new $util.LongBits(object.coinSum.low >>> 0, object.coinSum.high >>> 0).toNumber(true);
        return message;
    };

    /**
     * Creates a plain object from a PlayerInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PlayerInfo
     * @static
     * @param {PlayerInfo} message PlayerInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PlayerInfo.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.pid = 0;
            object.account = "";
            object.password = "";
            object.head = "";
            object.nickname = "";
            object.platform = options.enums === String ? "MIN" : 0;
            object.level = 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.winLoss = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.winLoss = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.coinSum = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.coinSum = options.longs === String ? "0" : 0;
        }
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = message.pid;
        if (message.account != null && message.hasOwnProperty("account"))
            object.account = message.account;
        if (message.password != null && message.hasOwnProperty("password"))
            object.password = message.password;
        if (message.head != null && message.hasOwnProperty("head"))
            object.head = message.head;
        if (message.nickname != null && message.hasOwnProperty("nickname"))
            object.nickname = message.nickname;
        if (message.platform != null && message.hasOwnProperty("platform"))
            object.platform = options.enums === String ? $root.Platform[message.platform] : message.platform;
        if (message.level != null && message.hasOwnProperty("level"))
            object.level = message.level;
        if (message.winLoss != null && message.hasOwnProperty("winLoss"))
            if (typeof message.winLoss === "number")
                object.winLoss = options.longs === String ? String(message.winLoss) : message.winLoss;
            else
                object.winLoss = options.longs === String ? $util.Long.prototype.toString.call(message.winLoss) : options.longs === Number ? new $util.LongBits(message.winLoss.low >>> 0, message.winLoss.high >>> 0).toNumber() : message.winLoss;
        if (message.coinSum != null && message.hasOwnProperty("coinSum"))
            if (typeof message.coinSum === "number")
                object.coinSum = options.longs === String ? String(message.coinSum) : message.coinSum;
            else
                object.coinSum = options.longs === String ? $util.Long.prototype.toString.call(message.coinSum) : options.longs === Number ? new $util.LongBits(message.coinSum.low >>> 0, message.coinSum.high >>> 0).toNumber(true) : message.coinSum;
        return object;
    };

    /**
     * Converts this PlayerInfo to JSON.
     * @function toJSON
     * @memberof PlayerInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PlayerInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PlayerInfo;
})();

module.exports = $root;
