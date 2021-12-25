/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_IMPAWN_SETTLEMENT_IMCL = (function() {

    /**
     * Properties of a MSG_IMPAWN_SETTLEMENT_IMCL.
     * @exports IMSG_IMPAWN_SETTLEMENT_IMCL
     * @interface IMSG_IMPAWN_SETTLEMENT_IMCL
     * @property {number} msgID MSG_IMPAWN_SETTLEMENT_IMCL msgID
     * @property {number|null} [pid] MSG_IMPAWN_SETTLEMENT_IMCL pid
     * @property {boolean|null} [isTwo] MSG_IMPAWN_SETTLEMENT_IMCL isTwo
     * @property {number|Long|null} [coinSum] MSG_IMPAWN_SETTLEMENT_IMCL coinSum
     * @property {number|Long|null} [gainCoin] MSG_IMPAWN_SETTLEMENT_IMCL gainCoin
     */

    /**
     * Constructs a new MSG_IMPAWN_SETTLEMENT_IMCL.
     * @exports MSG_IMPAWN_SETTLEMENT_IMCL
     * @classdesc Represents a MSG_IMPAWN_SETTLEMENT_IMCL.
     * @implements IMSG_IMPAWN_SETTLEMENT_IMCL
     * @constructor
     * @param {IMSG_IMPAWN_SETTLEMENT_IMCL=} [properties] Properties to set
     */
    function MSG_IMPAWN_SETTLEMENT_IMCL(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_IMPAWN_SETTLEMENT_IMCL msgID.
     * @member {number} msgID
     * @memberof MSG_IMPAWN_SETTLEMENT_IMCL
     * @instance
     */
    MSG_IMPAWN_SETTLEMENT_IMCL.prototype.msgID = 0;

    /**
     * MSG_IMPAWN_SETTLEMENT_IMCL pid.
     * @member {number} pid
     * @memberof MSG_IMPAWN_SETTLEMENT_IMCL
     * @instance
     */
    MSG_IMPAWN_SETTLEMENT_IMCL.prototype.pid = 0;

    /**
     * MSG_IMPAWN_SETTLEMENT_IMCL isTwo.
     * @member {boolean} isTwo
     * @memberof MSG_IMPAWN_SETTLEMENT_IMCL
     * @instance
     */
    MSG_IMPAWN_SETTLEMENT_IMCL.prototype.isTwo = false;

    /**
     * MSG_IMPAWN_SETTLEMENT_IMCL coinSum.
     * @member {number|Long} coinSum
     * @memberof MSG_IMPAWN_SETTLEMENT_IMCL
     * @instance
     */
    MSG_IMPAWN_SETTLEMENT_IMCL.prototype.coinSum = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * MSG_IMPAWN_SETTLEMENT_IMCL gainCoin.
     * @member {number|Long} gainCoin
     * @memberof MSG_IMPAWN_SETTLEMENT_IMCL
     * @instance
     */
    MSG_IMPAWN_SETTLEMENT_IMCL.prototype.gainCoin = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new MSG_IMPAWN_SETTLEMENT_IMCL instance using the specified properties.
     * @function create
     * @memberof MSG_IMPAWN_SETTLEMENT_IMCL
     * @static
     * @param {IMSG_IMPAWN_SETTLEMENT_IMCL=} [properties] Properties to set
     * @returns {MSG_IMPAWN_SETTLEMENT_IMCL} MSG_IMPAWN_SETTLEMENT_IMCL instance
     */
    MSG_IMPAWN_SETTLEMENT_IMCL.create = function create(properties) {
        return new MSG_IMPAWN_SETTLEMENT_IMCL(properties);
    };

    /**
     * Encodes the specified MSG_IMPAWN_SETTLEMENT_IMCL message. Does not implicitly {@link MSG_IMPAWN_SETTLEMENT_IMCL.verify|verify} messages.
     * @function encode
     * @memberof MSG_IMPAWN_SETTLEMENT_IMCL
     * @static
     * @param {IMSG_IMPAWN_SETTLEMENT_IMCL} message MSG_IMPAWN_SETTLEMENT_IMCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_IMPAWN_SETTLEMENT_IMCL.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.pid);
        if (message.isTwo != null && message.hasOwnProperty("isTwo"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isTwo);
        if (message.coinSum != null && message.hasOwnProperty("coinSum"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.coinSum);
        if (message.gainCoin != null && message.hasOwnProperty("gainCoin"))
            writer.uint32(/* id 5, wireType 0 =*/40).int64(message.gainCoin);
        return writer;
    };

    /**
     * Encodes the specified MSG_IMPAWN_SETTLEMENT_IMCL message, length delimited. Does not implicitly {@link MSG_IMPAWN_SETTLEMENT_IMCL.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_IMPAWN_SETTLEMENT_IMCL
     * @static
     * @param {IMSG_IMPAWN_SETTLEMENT_IMCL} message MSG_IMPAWN_SETTLEMENT_IMCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_IMPAWN_SETTLEMENT_IMCL.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_IMPAWN_SETTLEMENT_IMCL message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_IMPAWN_SETTLEMENT_IMCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_IMPAWN_SETTLEMENT_IMCL} MSG_IMPAWN_SETTLEMENT_IMCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_IMPAWN_SETTLEMENT_IMCL.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_IMPAWN_SETTLEMENT_IMCL();
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
                message.gainCoin = reader.int64();
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
     * Decodes a MSG_IMPAWN_SETTLEMENT_IMCL message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_IMPAWN_SETTLEMENT_IMCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_IMPAWN_SETTLEMENT_IMCL} MSG_IMPAWN_SETTLEMENT_IMCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_IMPAWN_SETTLEMENT_IMCL.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_IMPAWN_SETTLEMENT_IMCL message.
     * @function verify
     * @memberof MSG_IMPAWN_SETTLEMENT_IMCL
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_IMPAWN_SETTLEMENT_IMCL.verify = function verify(message) {
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
        if (message.gainCoin != null && message.hasOwnProperty("gainCoin"))
            if (!$util.isInteger(message.gainCoin) && !(message.gainCoin && $util.isInteger(message.gainCoin.low) && $util.isInteger(message.gainCoin.high)))
                return "gainCoin: integer|Long expected";
        return null;
    };

    /**
     * Creates a MSG_IMPAWN_SETTLEMENT_IMCL message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_IMPAWN_SETTLEMENT_IMCL
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_IMPAWN_SETTLEMENT_IMCL} MSG_IMPAWN_SETTLEMENT_IMCL
     */
    MSG_IMPAWN_SETTLEMENT_IMCL.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_IMPAWN_SETTLEMENT_IMCL)
            return object;
        var message = new $root.MSG_IMPAWN_SETTLEMENT_IMCL();
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
        if (object.gainCoin != null)
            if ($util.Long)
                (message.gainCoin = $util.Long.fromValue(object.gainCoin)).unsigned = false;
            else if (typeof object.gainCoin === "string")
                message.gainCoin = parseInt(object.gainCoin, 10);
            else if (typeof object.gainCoin === "number")
                message.gainCoin = object.gainCoin;
            else if (typeof object.gainCoin === "object")
                message.gainCoin = new $util.LongBits(object.gainCoin.low >>> 0, object.gainCoin.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a MSG_IMPAWN_SETTLEMENT_IMCL message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_IMPAWN_SETTLEMENT_IMCL
     * @static
     * @param {MSG_IMPAWN_SETTLEMENT_IMCL} message MSG_IMPAWN_SETTLEMENT_IMCL
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_IMPAWN_SETTLEMENT_IMCL.toObject = function toObject(message, options) {
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
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.gainCoin = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.gainCoin = options.longs === String ? "0" : 0;
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
        if (message.gainCoin != null && message.hasOwnProperty("gainCoin"))
            if (typeof message.gainCoin === "number")
                object.gainCoin = options.longs === String ? String(message.gainCoin) : message.gainCoin;
            else
                object.gainCoin = options.longs === String ? $util.Long.prototype.toString.call(message.gainCoin) : options.longs === Number ? new $util.LongBits(message.gainCoin.low >>> 0, message.gainCoin.high >>> 0).toNumber() : message.gainCoin;
        return object;
    };

    /**
     * Converts this MSG_IMPAWN_SETTLEMENT_IMCL to JSON.
     * @function toJSON
     * @memberof MSG_IMPAWN_SETTLEMENT_IMCL
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_IMPAWN_SETTLEMENT_IMCL.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MSG_IMPAWN_SETTLEMENT_IMCL;
})();

module.exports = $root;
