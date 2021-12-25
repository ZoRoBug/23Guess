/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_LOGIN_CLDB = (function() {

    /**
     * Properties of a MSG_LOGIN_CLDB.
     * @exports IMSG_LOGIN_CLDB
     * @interface IMSG_LOGIN_CLDB
     * @property {number} msgID MSG_LOGIN_CLDB msgID
     * @property {string|null} [account] MSG_LOGIN_CLDB account
     * @property {string|null} [nickname] MSG_LOGIN_CLDB nickname
     * @property {string|null} [password] MSG_LOGIN_CLDB password
     * @property {Platform|null} [platform] MSG_LOGIN_CLDB platform
     * @property {string|null} [ticket] MSG_LOGIN_CLDB ticket
     * @property {string|null} [head] MSG_LOGIN_CLDB head
     * @property {string|null} [wxCode] MSG_LOGIN_CLDB wxCode
     * @property {string|null} [wxSessionKey] MSG_LOGIN_CLDB wxSessionKey
     * @property {number|Long|null} [loginID] MSG_LOGIN_CLDB loginID
     */

    /**
     * Constructs a new MSG_LOGIN_CLDB.
     * @exports MSG_LOGIN_CLDB
     * @classdesc Represents a MSG_LOGIN_CLDB.
     * @implements IMSG_LOGIN_CLDB
     * @constructor
     * @param {IMSG_LOGIN_CLDB=} [properties] Properties to set
     */
    function MSG_LOGIN_CLDB(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_LOGIN_CLDB msgID.
     * @member {number} msgID
     * @memberof MSG_LOGIN_CLDB
     * @instance
     */
    MSG_LOGIN_CLDB.prototype.msgID = 0;

    /**
     * MSG_LOGIN_CLDB account.
     * @member {string} account
     * @memberof MSG_LOGIN_CLDB
     * @instance
     */
    MSG_LOGIN_CLDB.prototype.account = "";

    /**
     * MSG_LOGIN_CLDB nickname.
     * @member {string} nickname
     * @memberof MSG_LOGIN_CLDB
     * @instance
     */
    MSG_LOGIN_CLDB.prototype.nickname = "";

    /**
     * MSG_LOGIN_CLDB password.
     * @member {string} password
     * @memberof MSG_LOGIN_CLDB
     * @instance
     */
    MSG_LOGIN_CLDB.prototype.password = "";

    /**
     * MSG_LOGIN_CLDB platform.
     * @member {Platform} platform
     * @memberof MSG_LOGIN_CLDB
     * @instance
     */
    MSG_LOGIN_CLDB.prototype.platform = 0;

    /**
     * MSG_LOGIN_CLDB ticket.
     * @member {string} ticket
     * @memberof MSG_LOGIN_CLDB
     * @instance
     */
    MSG_LOGIN_CLDB.prototype.ticket = "";

    /**
     * MSG_LOGIN_CLDB head.
     * @member {string} head
     * @memberof MSG_LOGIN_CLDB
     * @instance
     */
    MSG_LOGIN_CLDB.prototype.head = "";

    /**
     * MSG_LOGIN_CLDB wxCode.
     * @member {string} wxCode
     * @memberof MSG_LOGIN_CLDB
     * @instance
     */
    MSG_LOGIN_CLDB.prototype.wxCode = "";

    /**
     * MSG_LOGIN_CLDB wxSessionKey.
     * @member {string} wxSessionKey
     * @memberof MSG_LOGIN_CLDB
     * @instance
     */
    MSG_LOGIN_CLDB.prototype.wxSessionKey = "";

    /**
     * MSG_LOGIN_CLDB loginID.
     * @member {number|Long} loginID
     * @memberof MSG_LOGIN_CLDB
     * @instance
     */
    MSG_LOGIN_CLDB.prototype.loginID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new MSG_LOGIN_CLDB instance using the specified properties.
     * @function create
     * @memberof MSG_LOGIN_CLDB
     * @static
     * @param {IMSG_LOGIN_CLDB=} [properties] Properties to set
     * @returns {MSG_LOGIN_CLDB} MSG_LOGIN_CLDB instance
     */
    MSG_LOGIN_CLDB.create = function create(properties) {
        return new MSG_LOGIN_CLDB(properties);
    };

    /**
     * Encodes the specified MSG_LOGIN_CLDB message. Does not implicitly {@link MSG_LOGIN_CLDB.verify|verify} messages.
     * @function encode
     * @memberof MSG_LOGIN_CLDB
     * @static
     * @param {IMSG_LOGIN_CLDB} message MSG_LOGIN_CLDB message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_LOGIN_CLDB.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.account != null && message.hasOwnProperty("account"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.account);
        if (message.nickname != null && message.hasOwnProperty("nickname"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.nickname);
        if (message.password != null && message.hasOwnProperty("password"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.password);
        if (message.platform != null && message.hasOwnProperty("platform"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.platform);
        if (message.ticket != null && message.hasOwnProperty("ticket"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.ticket);
        if (message.head != null && message.hasOwnProperty("head"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.head);
        if (message.wxCode != null && message.hasOwnProperty("wxCode"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.wxCode);
        if (message.wxSessionKey != null && message.hasOwnProperty("wxSessionKey"))
            writer.uint32(/* id 9, wireType 2 =*/74).string(message.wxSessionKey);
        if (message.loginID != null && message.hasOwnProperty("loginID"))
            writer.uint32(/* id 10, wireType 0 =*/80).uint64(message.loginID);
        return writer;
    };

    /**
     * Encodes the specified MSG_LOGIN_CLDB message, length delimited. Does not implicitly {@link MSG_LOGIN_CLDB.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_LOGIN_CLDB
     * @static
     * @param {IMSG_LOGIN_CLDB} message MSG_LOGIN_CLDB message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_LOGIN_CLDB.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_LOGIN_CLDB message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_LOGIN_CLDB
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_LOGIN_CLDB} MSG_LOGIN_CLDB
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_LOGIN_CLDB.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_LOGIN_CLDB();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.msgID = reader.uint32();
                break;
            case 2:
                message.account = reader.string();
                break;
            case 3:
                message.nickname = reader.string();
                break;
            case 4:
                message.password = reader.string();
                break;
            case 5:
                message.platform = reader.int32();
                break;
            case 6:
                message.ticket = reader.string();
                break;
            case 7:
                message.head = reader.string();
                break;
            case 8:
                message.wxCode = reader.string();
                break;
            case 9:
                message.wxSessionKey = reader.string();
                break;
            case 10:
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
     * Decodes a MSG_LOGIN_CLDB message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_LOGIN_CLDB
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_LOGIN_CLDB} MSG_LOGIN_CLDB
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_LOGIN_CLDB.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_LOGIN_CLDB message.
     * @function verify
     * @memberof MSG_LOGIN_CLDB
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_LOGIN_CLDB.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.account != null && message.hasOwnProperty("account"))
            if (!$util.isString(message.account))
                return "account: string expected";
        if (message.nickname != null && message.hasOwnProperty("nickname"))
            if (!$util.isString(message.nickname))
                return "nickname: string expected";
        if (message.password != null && message.hasOwnProperty("password"))
            if (!$util.isString(message.password))
                return "password: string expected";
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
        if (message.ticket != null && message.hasOwnProperty("ticket"))
            if (!$util.isString(message.ticket))
                return "ticket: string expected";
        if (message.head != null && message.hasOwnProperty("head"))
            if (!$util.isString(message.head))
                return "head: string expected";
        if (message.wxCode != null && message.hasOwnProperty("wxCode"))
            if (!$util.isString(message.wxCode))
                return "wxCode: string expected";
        if (message.wxSessionKey != null && message.hasOwnProperty("wxSessionKey"))
            if (!$util.isString(message.wxSessionKey))
                return "wxSessionKey: string expected";
        if (message.loginID != null && message.hasOwnProperty("loginID"))
            if (!$util.isInteger(message.loginID) && !(message.loginID && $util.isInteger(message.loginID.low) && $util.isInteger(message.loginID.high)))
                return "loginID: integer|Long expected";
        return null;
    };

    /**
     * Creates a MSG_LOGIN_CLDB message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_LOGIN_CLDB
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_LOGIN_CLDB} MSG_LOGIN_CLDB
     */
    MSG_LOGIN_CLDB.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_LOGIN_CLDB)
            return object;
        var message = new $root.MSG_LOGIN_CLDB();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.account != null)
            message.account = String(object.account);
        if (object.nickname != null)
            message.nickname = String(object.nickname);
        if (object.password != null)
            message.password = String(object.password);
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
        if (object.ticket != null)
            message.ticket = String(object.ticket);
        if (object.head != null)
            message.head = String(object.head);
        if (object.wxCode != null)
            message.wxCode = String(object.wxCode);
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
     * Creates a plain object from a MSG_LOGIN_CLDB message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_LOGIN_CLDB
     * @static
     * @param {MSG_LOGIN_CLDB} message MSG_LOGIN_CLDB
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_LOGIN_CLDB.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.account = "";
            object.nickname = "";
            object.password = "";
            object.platform = options.enums === String ? "MIN" : 0;
            object.ticket = "";
            object.head = "";
            object.wxCode = "";
            object.wxSessionKey = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.loginID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.loginID = options.longs === String ? "0" : 0;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.account != null && message.hasOwnProperty("account"))
            object.account = message.account;
        if (message.nickname != null && message.hasOwnProperty("nickname"))
            object.nickname = message.nickname;
        if (message.password != null && message.hasOwnProperty("password"))
            object.password = message.password;
        if (message.platform != null && message.hasOwnProperty("platform"))
            object.platform = options.enums === String ? $root.Platform[message.platform] : message.platform;
        if (message.ticket != null && message.hasOwnProperty("ticket"))
            object.ticket = message.ticket;
        if (message.head != null && message.hasOwnProperty("head"))
            object.head = message.head;
        if (message.wxCode != null && message.hasOwnProperty("wxCode"))
            object.wxCode = message.wxCode;
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
     * Converts this MSG_LOGIN_CLDB to JSON.
     * @function toJSON
     * @memberof MSG_LOGIN_CLDB
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_LOGIN_CLDB.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MSG_LOGIN_CLDB;
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