/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_REWARD_LBCL = (function() {

    /**
     * Properties of a MSG_REWARD_LBCL.
     * @exports IMSG_REWARD_LBCL
     * @interface IMSG_REWARD_LBCL
     * @property {number} msgID MSG_REWARD_LBCL msgID
     * @property {number|null} [pid] MSG_REWARD_LBCL pid
     * @property {AwardType|null} [awardType] MSG_REWARD_LBCL awardType
     * @property {number|Long|null} [coin] MSG_REWARD_LBCL coin
     * @property {MSG_REWARD_LBCL.Result|null} [result] MSG_REWARD_LBCL result
     */

    /**
     * Constructs a new MSG_REWARD_LBCL.
     * @exports MSG_REWARD_LBCL
     * @classdesc Represents a MSG_REWARD_LBCL.
     * @implements IMSG_REWARD_LBCL
     * @constructor
     * @param {IMSG_REWARD_LBCL=} [properties] Properties to set
     */
    function MSG_REWARD_LBCL(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_REWARD_LBCL msgID.
     * @member {number} msgID
     * @memberof MSG_REWARD_LBCL
     * @instance
     */
    MSG_REWARD_LBCL.prototype.msgID = 0;

    /**
     * MSG_REWARD_LBCL pid.
     * @member {number} pid
     * @memberof MSG_REWARD_LBCL
     * @instance
     */
    MSG_REWARD_LBCL.prototype.pid = 0;

    /**
     * MSG_REWARD_LBCL awardType.
     * @member {AwardType} awardType
     * @memberof MSG_REWARD_LBCL
     * @instance
     */
    MSG_REWARD_LBCL.prototype.awardType = 1;

    /**
     * MSG_REWARD_LBCL coin.
     * @member {number|Long} coin
     * @memberof MSG_REWARD_LBCL
     * @instance
     */
    MSG_REWARD_LBCL.prototype.coin = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * MSG_REWARD_LBCL result.
     * @member {MSG_REWARD_LBCL.Result} result
     * @memberof MSG_REWARD_LBCL
     * @instance
     */
    MSG_REWARD_LBCL.prototype.result = 0;

    /**
     * Creates a new MSG_REWARD_LBCL instance using the specified properties.
     * @function create
     * @memberof MSG_REWARD_LBCL
     * @static
     * @param {IMSG_REWARD_LBCL=} [properties] Properties to set
     * @returns {MSG_REWARD_LBCL} MSG_REWARD_LBCL instance
     */
    MSG_REWARD_LBCL.create = function create(properties) {
        return new MSG_REWARD_LBCL(properties);
    };

    /**
     * Encodes the specified MSG_REWARD_LBCL message. Does not implicitly {@link MSG_REWARD_LBCL.verify|verify} messages.
     * @function encode
     * @memberof MSG_REWARD_LBCL
     * @static
     * @param {IMSG_REWARD_LBCL} message MSG_REWARD_LBCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_REWARD_LBCL.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.pid);
        if (message.awardType != null && message.hasOwnProperty("awardType"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.awardType);
        if (message.coin != null && message.hasOwnProperty("coin"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.coin);
        if (message.result != null && message.hasOwnProperty("result"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.result);
        return writer;
    };

    /**
     * Encodes the specified MSG_REWARD_LBCL message, length delimited. Does not implicitly {@link MSG_REWARD_LBCL.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_REWARD_LBCL
     * @static
     * @param {IMSG_REWARD_LBCL} message MSG_REWARD_LBCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_REWARD_LBCL.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_REWARD_LBCL message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_REWARD_LBCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_REWARD_LBCL} MSG_REWARD_LBCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_REWARD_LBCL.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_REWARD_LBCL();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.msgID = reader.uint32();
                break;
            case 2:
                message.pid = reader.uint32();
                break;
            case 3:
                message.awardType = reader.int32();
                break;
            case 4:
                message.coin = reader.uint64();
                break;
            case 5:
                message.result = reader.int32();
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
     * Decodes a MSG_REWARD_LBCL message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_REWARD_LBCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_REWARD_LBCL} MSG_REWARD_LBCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_REWARD_LBCL.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_REWARD_LBCL message.
     * @function verify
     * @memberof MSG_REWARD_LBCL
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_REWARD_LBCL.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (!$util.isInteger(message.pid))
                return "pid: integer expected";
        if (message.awardType != null && message.hasOwnProperty("awardType"))
            switch (message.awardType) {
            default:
                return "awardType: enum value expected";
            case 1:
            case 2:
            case 3:
                break;
            }
        if (message.coin != null && message.hasOwnProperty("coin"))
            if (!$util.isInteger(message.coin) && !(message.coin && $util.isInteger(message.coin.low) && $util.isInteger(message.coin.high)))
                return "coin: integer|Long expected";
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
                break;
            }
        return null;
    };

    /**
     * Creates a MSG_REWARD_LBCL message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_REWARD_LBCL
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_REWARD_LBCL} MSG_REWARD_LBCL
     */
    MSG_REWARD_LBCL.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_REWARD_LBCL)
            return object;
        var message = new $root.MSG_REWARD_LBCL();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.pid != null)
            message.pid = object.pid >>> 0;
        switch (object.awardType) {
        case "STATIC_AD":
        case 1:
            message.awardType = 1;
            break;
        case "ANIMATE_AD":
        case 2:
            message.awardType = 2;
            break;
        case "SHARE_GAME":
        case 3:
            message.awardType = 3;
            break;
        }
        if (object.coin != null)
            if ($util.Long)
                (message.coin = $util.Long.fromValue(object.coin)).unsigned = true;
            else if (typeof object.coin === "string")
                message.coin = parseInt(object.coin, 10);
            else if (typeof object.coin === "number")
                message.coin = object.coin;
            else if (typeof object.coin === "object")
                message.coin = new $util.LongBits(object.coin.low >>> 0, object.coin.high >>> 0).toNumber(true);
        switch (object.result) {
        case "UNKNOW":
        case 0:
            message.result = 0;
            break;
        case "SUCCESS":
        case 1:
            message.result = 1;
            break;
        case "OFFLINE":
        case 2:
            message.result = 2;
            break;
        case "NO_CLIENT":
        case 3:
            message.result = 3;
            break;
        case "REDIS_ERROR":
        case 4:
            message.result = 4;
            break;
        case "PLAYER_OFFLINE":
        case 5:
            message.result = 5;
            break;
        case "OVER_TIMES":
        case 6:
            message.result = 6;
            break;
        case "ON_IMPAWN":
        case 7:
            message.result = 7;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a MSG_REWARD_LBCL message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_REWARD_LBCL
     * @static
     * @param {MSG_REWARD_LBCL} message MSG_REWARD_LBCL
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_REWARD_LBCL.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.pid = 0;
            object.awardType = options.enums === String ? "STATIC_AD" : 1;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.coin = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.coin = options.longs === String ? "0" : 0;
            object.result = options.enums === String ? "UNKNOW" : 0;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = message.pid;
        if (message.awardType != null && message.hasOwnProperty("awardType"))
            object.awardType = options.enums === String ? $root.AwardType[message.awardType] : message.awardType;
        if (message.coin != null && message.hasOwnProperty("coin"))
            if (typeof message.coin === "number")
                object.coin = options.longs === String ? String(message.coin) : message.coin;
            else
                object.coin = options.longs === String ? $util.Long.prototype.toString.call(message.coin) : options.longs === Number ? new $util.LongBits(message.coin.low >>> 0, message.coin.high >>> 0).toNumber(true) : message.coin;
        if (message.result != null && message.hasOwnProperty("result"))
            object.result = options.enums === String ? $root.MSG_REWARD_LBCL.Result[message.result] : message.result;
        return object;
    };

    /**
     * Converts this MSG_REWARD_LBCL to JSON.
     * @function toJSON
     * @memberof MSG_REWARD_LBCL
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_REWARD_LBCL.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Result enum.
     * @name MSG_REWARD_LBCL.Result
     * @enum {string}
     * @property {number} UNKNOW=0 UNKNOW value
     * @property {number} SUCCESS=1 SUCCESS value
     * @property {number} OFFLINE=2 OFFLINE value
     * @property {number} NO_CLIENT=3 NO_CLIENT value
     * @property {number} REDIS_ERROR=4 REDIS_ERROR value
     * @property {number} PLAYER_OFFLINE=5 PLAYER_OFFLINE value
     * @property {number} OVER_TIMES=6 OVER_TIMES value
     * @property {number} ON_IMPAWN=7 ON_IMPAWN value
     */
    MSG_REWARD_LBCL.Result = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOW"] = 0;
        values[valuesById[1] = "SUCCESS"] = 1;
        values[valuesById[2] = "OFFLINE"] = 2;
        values[valuesById[3] = "NO_CLIENT"] = 3;
        values[valuesById[4] = "REDIS_ERROR"] = 4;
        values[valuesById[5] = "PLAYER_OFFLINE"] = 5;
        values[valuesById[6] = "OVER_TIMES"] = 6;
        values[valuesById[7] = "ON_IMPAWN"] = 7;
        return values;
    })();

    return MSG_REWARD_LBCL;
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
