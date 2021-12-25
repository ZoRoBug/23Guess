/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_IMPAWN_BET_FAIL_IMCL = (function() {

    /**
     * Properties of a MSG_IMPAWN_BET_FAIL_IMCL.
     * @exports IMSG_IMPAWN_BET_FAIL_IMCL
     * @interface IMSG_IMPAWN_BET_FAIL_IMCL
     * @property {number} msgID MSG_IMPAWN_BET_FAIL_IMCL msgID
     * @property {number|null} [pid] MSG_IMPAWN_BET_FAIL_IMCL pid
     * @property {boolean|null} [isTwo] MSG_IMPAWN_BET_FAIL_IMCL isTwo
     * @property {number|Long|null} [coinSum] MSG_IMPAWN_BET_FAIL_IMCL coinSum
     * @property {MSG_IMPAWN_BET_FAIL_IMCL.Reason|null} [reason] MSG_IMPAWN_BET_FAIL_IMCL reason
     */

    /**
     * Constructs a new MSG_IMPAWN_BET_FAIL_IMCL.
     * @exports MSG_IMPAWN_BET_FAIL_IMCL
     * @classdesc Represents a MSG_IMPAWN_BET_FAIL_IMCL.
     * @implements IMSG_IMPAWN_BET_FAIL_IMCL
     * @constructor
     * @param {IMSG_IMPAWN_BET_FAIL_IMCL=} [properties] Properties to set
     */
    function MSG_IMPAWN_BET_FAIL_IMCL(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_IMPAWN_BET_FAIL_IMCL msgID.
     * @member {number} msgID
     * @memberof MSG_IMPAWN_BET_FAIL_IMCL
     * @instance
     */
    MSG_IMPAWN_BET_FAIL_IMCL.prototype.msgID = 0;

    /**
     * MSG_IMPAWN_BET_FAIL_IMCL pid.
     * @member {number} pid
     * @memberof MSG_IMPAWN_BET_FAIL_IMCL
     * @instance
     */
    MSG_IMPAWN_BET_FAIL_IMCL.prototype.pid = 0;

    /**
     * MSG_IMPAWN_BET_FAIL_IMCL isTwo.
     * @member {boolean} isTwo
     * @memberof MSG_IMPAWN_BET_FAIL_IMCL
     * @instance
     */
    MSG_IMPAWN_BET_FAIL_IMCL.prototype.isTwo = false;

    /**
     * MSG_IMPAWN_BET_FAIL_IMCL coinSum.
     * @member {number|Long} coinSum
     * @memberof MSG_IMPAWN_BET_FAIL_IMCL
     * @instance
     */
    MSG_IMPAWN_BET_FAIL_IMCL.prototype.coinSum = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * MSG_IMPAWN_BET_FAIL_IMCL reason.
     * @member {MSG_IMPAWN_BET_FAIL_IMCL.Reason} reason
     * @memberof MSG_IMPAWN_BET_FAIL_IMCL
     * @instance
     */
    MSG_IMPAWN_BET_FAIL_IMCL.prototype.reason = 0;

    /**
     * Creates a new MSG_IMPAWN_BET_FAIL_IMCL instance using the specified properties.
     * @function create
     * @memberof MSG_IMPAWN_BET_FAIL_IMCL
     * @static
     * @param {IMSG_IMPAWN_BET_FAIL_IMCL=} [properties] Properties to set
     * @returns {MSG_IMPAWN_BET_FAIL_IMCL} MSG_IMPAWN_BET_FAIL_IMCL instance
     */
    MSG_IMPAWN_BET_FAIL_IMCL.create = function create(properties) {
        return new MSG_IMPAWN_BET_FAIL_IMCL(properties);
    };

    /**
     * Encodes the specified MSG_IMPAWN_BET_FAIL_IMCL message. Does not implicitly {@link MSG_IMPAWN_BET_FAIL_IMCL.verify|verify} messages.
     * @function encode
     * @memberof MSG_IMPAWN_BET_FAIL_IMCL
     * @static
     * @param {IMSG_IMPAWN_BET_FAIL_IMCL} message MSG_IMPAWN_BET_FAIL_IMCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_IMPAWN_BET_FAIL_IMCL.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.pid);
        if (message.isTwo != null && message.hasOwnProperty("isTwo"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isTwo);
        if (message.coinSum != null && message.hasOwnProperty("coinSum"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.coinSum);
        if (message.reason != null && message.hasOwnProperty("reason"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.reason);
        return writer;
    };

    /**
     * Encodes the specified MSG_IMPAWN_BET_FAIL_IMCL message, length delimited. Does not implicitly {@link MSG_IMPAWN_BET_FAIL_IMCL.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_IMPAWN_BET_FAIL_IMCL
     * @static
     * @param {IMSG_IMPAWN_BET_FAIL_IMCL} message MSG_IMPAWN_BET_FAIL_IMCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_IMPAWN_BET_FAIL_IMCL.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_IMPAWN_BET_FAIL_IMCL message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_IMPAWN_BET_FAIL_IMCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_IMPAWN_BET_FAIL_IMCL} MSG_IMPAWN_BET_FAIL_IMCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_IMPAWN_BET_FAIL_IMCL.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_IMPAWN_BET_FAIL_IMCL();
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
                message.isTwo = reader.bool();
                break;
            case 4:
                message.coinSum = reader.uint64();
                break;
            case 5:
                message.reason = reader.int32();
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
     * Decodes a MSG_IMPAWN_BET_FAIL_IMCL message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_IMPAWN_BET_FAIL_IMCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_IMPAWN_BET_FAIL_IMCL} MSG_IMPAWN_BET_FAIL_IMCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_IMPAWN_BET_FAIL_IMCL.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_IMPAWN_BET_FAIL_IMCL message.
     * @function verify
     * @memberof MSG_IMPAWN_BET_FAIL_IMCL
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_IMPAWN_BET_FAIL_IMCL.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (!$util.isInteger(message.pid))
                return "pid: integer expected";
        if (message.isTwo != null && message.hasOwnProperty("isTwo"))
            if (typeof message.isTwo !== "boolean")
                return "isTwo: boolean expected";
        if (message.coinSum != null && message.hasOwnProperty("coinSum"))
            if (!$util.isInteger(message.coinSum) && !(message.coinSum && $util.isInteger(message.coinSum.low) && $util.isInteger(message.coinSum.high)))
                return "coinSum: integer|Long expected";
        if (message.reason != null && message.hasOwnProperty("reason"))
            switch (message.reason) {
            default:
                return "reason: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                break;
            }
        return null;
    };

    /**
     * Creates a MSG_IMPAWN_BET_FAIL_IMCL message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_IMPAWN_BET_FAIL_IMCL
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_IMPAWN_BET_FAIL_IMCL} MSG_IMPAWN_BET_FAIL_IMCL
     */
    MSG_IMPAWN_BET_FAIL_IMCL.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_IMPAWN_BET_FAIL_IMCL)
            return object;
        var message = new $root.MSG_IMPAWN_BET_FAIL_IMCL();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.pid != null)
            message.pid = object.pid >>> 0;
        if (object.isTwo != null)
            message.isTwo = Boolean(object.isTwo);
        if (object.coinSum != null)
            if ($util.Long)
                (message.coinSum = $util.Long.fromValue(object.coinSum)).unsigned = true;
            else if (typeof object.coinSum === "string")
                message.coinSum = parseInt(object.coinSum, 10);
            else if (typeof object.coinSum === "number")
                message.coinSum = object.coinSum;
            else if (typeof object.coinSum === "object")
                message.coinSum = new $util.LongBits(object.coinSum.low >>> 0, object.coinSum.high >>> 0).toNumber(true);
        switch (object.reason) {
        case "UNKNOW":
        case 0:
            message.reason = 0;
            break;
        case "OFFLINE":
        case 1:
            message.reason = 1;
            break;
        case "NO_CLIENT":
        case 2:
            message.reason = 2;
            break;
        case "NO_LOGIN":
        case 3:
            message.reason = 3;
            break;
        case "PARAM_ERROR":
        case 4:
            message.reason = 4;
            break;
        case "REDIS_ERROR":
        case 5:
            message.reason = 5;
            break;
        case "LACK_COIN":
        case 6:
            message.reason = 6;
            break;
        case "REDIS_FAIL":
        case 7:
            message.reason = 7;
            break;
        case "NO_STARTING":
        case 8:
            message.reason = 8;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a MSG_IMPAWN_BET_FAIL_IMCL message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_IMPAWN_BET_FAIL_IMCL
     * @static
     * @param {MSG_IMPAWN_BET_FAIL_IMCL} message MSG_IMPAWN_BET_FAIL_IMCL
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_IMPAWN_BET_FAIL_IMCL.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.pid = 0;
            object.isTwo = false;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.coinSum = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.coinSum = options.longs === String ? "0" : 0;
            object.reason = options.enums === String ? "UNKNOW" : 0;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = message.pid;
        if (message.isTwo != null && message.hasOwnProperty("isTwo"))
            object.isTwo = message.isTwo;
        if (message.coinSum != null && message.hasOwnProperty("coinSum"))
            if (typeof message.coinSum === "number")
                object.coinSum = options.longs === String ? String(message.coinSum) : message.coinSum;
            else
                object.coinSum = options.longs === String ? $util.Long.prototype.toString.call(message.coinSum) : options.longs === Number ? new $util.LongBits(message.coinSum.low >>> 0, message.coinSum.high >>> 0).toNumber(true) : message.coinSum;
        if (message.reason != null && message.hasOwnProperty("reason"))
            object.reason = options.enums === String ? $root.MSG_IMPAWN_BET_FAIL_IMCL.Reason[message.reason] : message.reason;
        return object;
    };

    /**
     * Converts this MSG_IMPAWN_BET_FAIL_IMCL to JSON.
     * @function toJSON
     * @memberof MSG_IMPAWN_BET_FAIL_IMCL
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_IMPAWN_BET_FAIL_IMCL.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Reason enum.
     * @name MSG_IMPAWN_BET_FAIL_IMCL.Reason
     * @enum {string}
     * @property {number} UNKNOW=0 UNKNOW value
     * @property {number} OFFLINE=1 OFFLINE value
     * @property {number} NO_CLIENT=2 NO_CLIENT value
     * @property {number} NO_LOGIN=3 NO_LOGIN value
     * @property {number} PARAM_ERROR=4 PARAM_ERROR value
     * @property {number} REDIS_ERROR=5 REDIS_ERROR value
     * @property {number} LACK_COIN=6 LACK_COIN value
     * @property {number} REDIS_FAIL=7 REDIS_FAIL value
     * @property {number} NO_STARTING=8 NO_STARTING value
     */
    MSG_IMPAWN_BET_FAIL_IMCL.Reason = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOW"] = 0;
        values[valuesById[1] = "OFFLINE"] = 1;
        values[valuesById[2] = "NO_CLIENT"] = 2;
        values[valuesById[3] = "NO_LOGIN"] = 3;
        values[valuesById[4] = "PARAM_ERROR"] = 4;
        values[valuesById[5] = "REDIS_ERROR"] = 5;
        values[valuesById[6] = "LACK_COIN"] = 6;
        values[valuesById[7] = "REDIS_FAIL"] = 7;
        values[valuesById[8] = "NO_STARTING"] = 8;
        return values;
    })();

    return MSG_IMPAWN_BET_FAIL_IMCL;
})();

module.exports = $root;
