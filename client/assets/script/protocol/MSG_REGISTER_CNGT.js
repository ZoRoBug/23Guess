/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_REGISTER_CNGT = (function() {

    /**
     * Properties of a MSG_REGISTER_CNGT.
     * @exports IMSG_REGISTER_CNGT
     * @interface IMSG_REGISTER_CNGT
     * @property {number} msgID MSG_REGISTER_CNGT msgID
     * @property {number|null} [id] MSG_REGISTER_CNGT id
     * @property {string|null} [address] MSG_REGISTER_CNGT address
     * @property {number|null} [nowPlayer] MSG_REGISTER_CNGT nowPlayer
     * @property {number|null} [maxPlayer] MSG_REGISTER_CNGT maxPlayer
     * @property {number|null} [overPlayer] MSG_REGISTER_CNGT overPlayer
     */

    /**
     * Constructs a new MSG_REGISTER_CNGT.
     * @exports MSG_REGISTER_CNGT
     * @classdesc Represents a MSG_REGISTER_CNGT.
     * @implements IMSG_REGISTER_CNGT
     * @constructor
     * @param {IMSG_REGISTER_CNGT=} [properties] Properties to set
     */
    function MSG_REGISTER_CNGT(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_REGISTER_CNGT msgID.
     * @member {number} msgID
     * @memberof MSG_REGISTER_CNGT
     * @instance
     */
    MSG_REGISTER_CNGT.prototype.msgID = 0;

    /**
     * MSG_REGISTER_CNGT id.
     * @member {number} id
     * @memberof MSG_REGISTER_CNGT
     * @instance
     */
    MSG_REGISTER_CNGT.prototype.id = 0;

    /**
     * MSG_REGISTER_CNGT address.
     * @member {string} address
     * @memberof MSG_REGISTER_CNGT
     * @instance
     */
    MSG_REGISTER_CNGT.prototype.address = "";

    /**
     * MSG_REGISTER_CNGT nowPlayer.
     * @member {number} nowPlayer
     * @memberof MSG_REGISTER_CNGT
     * @instance
     */
    MSG_REGISTER_CNGT.prototype.nowPlayer = 0;

    /**
     * MSG_REGISTER_CNGT maxPlayer.
     * @member {number} maxPlayer
     * @memberof MSG_REGISTER_CNGT
     * @instance
     */
    MSG_REGISTER_CNGT.prototype.maxPlayer = 0;

    /**
     * MSG_REGISTER_CNGT overPlayer.
     * @member {number} overPlayer
     * @memberof MSG_REGISTER_CNGT
     * @instance
     */
    MSG_REGISTER_CNGT.prototype.overPlayer = 0;

    /**
     * Creates a new MSG_REGISTER_CNGT instance using the specified properties.
     * @function create
     * @memberof MSG_REGISTER_CNGT
     * @static
     * @param {IMSG_REGISTER_CNGT=} [properties] Properties to set
     * @returns {MSG_REGISTER_CNGT} MSG_REGISTER_CNGT instance
     */
    MSG_REGISTER_CNGT.create = function create(properties) {
        return new MSG_REGISTER_CNGT(properties);
    };

    /**
     * Encodes the specified MSG_REGISTER_CNGT message. Does not implicitly {@link MSG_REGISTER_CNGT.verify|verify} messages.
     * @function encode
     * @memberof MSG_REGISTER_CNGT
     * @static
     * @param {IMSG_REGISTER_CNGT} message MSG_REGISTER_CNGT message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_REGISTER_CNGT.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.id);
        if (message.address != null && message.hasOwnProperty("address"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.address);
        if (message.nowPlayer != null && message.hasOwnProperty("nowPlayer"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.nowPlayer);
        if (message.maxPlayer != null && message.hasOwnProperty("maxPlayer"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.maxPlayer);
        if (message.overPlayer != null && message.hasOwnProperty("overPlayer"))
            writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.overPlayer);
        return writer;
    };

    /**
     * Encodes the specified MSG_REGISTER_CNGT message, length delimited. Does not implicitly {@link MSG_REGISTER_CNGT.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_REGISTER_CNGT
     * @static
     * @param {IMSG_REGISTER_CNGT} message MSG_REGISTER_CNGT message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_REGISTER_CNGT.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_REGISTER_CNGT message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_REGISTER_CNGT
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_REGISTER_CNGT} MSG_REGISTER_CNGT
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_REGISTER_CNGT.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_REGISTER_CNGT();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.msgID = reader.uint32();
                break;
            case 2:
                message.id = reader.uint32();
                break;
            case 3:
                message.address = reader.string();
                break;
            case 4:
                message.nowPlayer = reader.uint32();
                break;
            case 5:
                message.maxPlayer = reader.uint32();
                break;
            case 6:
                message.overPlayer = reader.uint32();
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
     * Decodes a MSG_REGISTER_CNGT message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_REGISTER_CNGT
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_REGISTER_CNGT} MSG_REGISTER_CNGT
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_REGISTER_CNGT.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_REGISTER_CNGT message.
     * @function verify
     * @memberof MSG_REGISTER_CNGT
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_REGISTER_CNGT.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id))
                return "id: integer expected";
        if (message.address != null && message.hasOwnProperty("address"))
            if (!$util.isString(message.address))
                return "address: string expected";
        if (message.nowPlayer != null && message.hasOwnProperty("nowPlayer"))
            if (!$util.isInteger(message.nowPlayer))
                return "nowPlayer: integer expected";
        if (message.maxPlayer != null && message.hasOwnProperty("maxPlayer"))
            if (!$util.isInteger(message.maxPlayer))
                return "maxPlayer: integer expected";
        if (message.overPlayer != null && message.hasOwnProperty("overPlayer"))
            if (!$util.isInteger(message.overPlayer))
                return "overPlayer: integer expected";
        return null;
    };

    /**
     * Creates a MSG_REGISTER_CNGT message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_REGISTER_CNGT
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_REGISTER_CNGT} MSG_REGISTER_CNGT
     */
    MSG_REGISTER_CNGT.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_REGISTER_CNGT)
            return object;
        var message = new $root.MSG_REGISTER_CNGT();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.id != null)
            message.id = object.id >>> 0;
        if (object.address != null)
            message.address = String(object.address);
        if (object.nowPlayer != null)
            message.nowPlayer = object.nowPlayer >>> 0;
        if (object.maxPlayer != null)
            message.maxPlayer = object.maxPlayer >>> 0;
        if (object.overPlayer != null)
            message.overPlayer = object.overPlayer >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a MSG_REGISTER_CNGT message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_REGISTER_CNGT
     * @static
     * @param {MSG_REGISTER_CNGT} message MSG_REGISTER_CNGT
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_REGISTER_CNGT.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.id = 0;
            object.address = "";
            object.nowPlayer = 0;
            object.maxPlayer = 0;
            object.overPlayer = 0;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.address != null && message.hasOwnProperty("address"))
            object.address = message.address;
        if (message.nowPlayer != null && message.hasOwnProperty("nowPlayer"))
            object.nowPlayer = message.nowPlayer;
        if (message.maxPlayer != null && message.hasOwnProperty("maxPlayer"))
            object.maxPlayer = message.maxPlayer;
        if (message.overPlayer != null && message.hasOwnProperty("overPlayer"))
            object.overPlayer = message.overPlayer;
        return object;
    };

    /**
     * Converts this MSG_REGISTER_CNGT to JSON.
     * @function toJSON
     * @memberof MSG_REGISTER_CNGT
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_REGISTER_CNGT.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MSG_REGISTER_CNGT;
})();

module.exports = $root;
