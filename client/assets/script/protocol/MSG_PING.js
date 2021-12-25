/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_PING = (function() {

    /**
     * Properties of a MSG_PING.
     * @exports IMSG_PING
     * @interface IMSG_PING
     * @property {number} msgID MSG_PING msgID
     */

    /**
     * Constructs a new MSG_PING.
     * @exports MSG_PING
     * @classdesc Represents a MSG_PING.
     * @implements IMSG_PING
     * @constructor
     * @param {IMSG_PING=} [properties] Properties to set
     */
    function MSG_PING(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_PING msgID.
     * @member {number} msgID
     * @memberof MSG_PING
     * @instance
     */
    MSG_PING.prototype.msgID = 0;

    /**
     * Creates a new MSG_PING instance using the specified properties.
     * @function create
     * @memberof MSG_PING
     * @static
     * @param {IMSG_PING=} [properties] Properties to set
     * @returns {MSG_PING} MSG_PING instance
     */
    MSG_PING.create = function create(properties) {
        return new MSG_PING(properties);
    };

    /**
     * Encodes the specified MSG_PING message. Does not implicitly {@link MSG_PING.verify|verify} messages.
     * @function encode
     * @memberof MSG_PING
     * @static
     * @param {IMSG_PING} message MSG_PING message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_PING.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        return writer;
    };

    /**
     * Encodes the specified MSG_PING message, length delimited. Does not implicitly {@link MSG_PING.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_PING
     * @static
     * @param {IMSG_PING} message MSG_PING message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_PING.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_PING message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_PING
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_PING} MSG_PING
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_PING.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_PING();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.msgID = reader.uint32();
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
     * Decodes a MSG_PING message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_PING
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_PING} MSG_PING
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_PING.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_PING message.
     * @function verify
     * @memberof MSG_PING
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_PING.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        return null;
    };

    /**
     * Creates a MSG_PING message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_PING
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_PING} MSG_PING
     */
    MSG_PING.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_PING)
            return object;
        var message = new $root.MSG_PING();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a MSG_PING message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_PING
     * @static
     * @param {MSG_PING} message MSG_PING
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_PING.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.msgID = 0;
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        return object;
    };

    /**
     * Converts this MSG_PING to JSON.
     * @function toJSON
     * @memberof MSG_PING
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_PING.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MSG_PING;
})();

module.exports = $root;
