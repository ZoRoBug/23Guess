/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_SIGNIN_CLLB = (function() {

    /**
     * Properties of a MSG_SIGNIN_CLLB.
     * @exports IMSG_SIGNIN_CLLB
     * @interface IMSG_SIGNIN_CLLB
     * @property {number} msgID MSG_SIGNIN_CLLB msgID
     * @property {number|null} [pid] MSG_SIGNIN_CLLB pid
     */

    /**
     * Constructs a new MSG_SIGNIN_CLLB.
     * @exports MSG_SIGNIN_CLLB
     * @classdesc Represents a MSG_SIGNIN_CLLB.
     * @implements IMSG_SIGNIN_CLLB
     * @constructor
     * @param {IMSG_SIGNIN_CLLB=} [properties] Properties to set
     */
    function MSG_SIGNIN_CLLB(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_SIGNIN_CLLB msgID.
     * @member {number} msgID
     * @memberof MSG_SIGNIN_CLLB
     * @instance
     */
    MSG_SIGNIN_CLLB.prototype.msgID = 0;

    /**
     * MSG_SIGNIN_CLLB pid.
     * @member {number} pid
     * @memberof MSG_SIGNIN_CLLB
     * @instance
     */
    MSG_SIGNIN_CLLB.prototype.pid = 0;

    /**
     * Creates a new MSG_SIGNIN_CLLB instance using the specified properties.
     * @function create
     * @memberof MSG_SIGNIN_CLLB
     * @static
     * @param {IMSG_SIGNIN_CLLB=} [properties] Properties to set
     * @returns {MSG_SIGNIN_CLLB} MSG_SIGNIN_CLLB instance
     */
    MSG_SIGNIN_CLLB.create = function create(properties) {
        return new MSG_SIGNIN_CLLB(properties);
    };

    /**
     * Encodes the specified MSG_SIGNIN_CLLB message. Does not implicitly {@link MSG_SIGNIN_CLLB.verify|verify} messages.
     * @function encode
     * @memberof MSG_SIGNIN_CLLB
     * @static
     * @param {IMSG_SIGNIN_CLLB} message MSG_SIGNIN_CLLB message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_SIGNIN_CLLB.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.pid);
        return writer;
    };

    /**
     * Encodes the specified MSG_SIGNIN_CLLB message, length delimited. Does not implicitly {@link MSG_SIGNIN_CLLB.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_SIGNIN_CLLB
     * @static
     * @param {IMSG_SIGNIN_CLLB} message MSG_SIGNIN_CLLB message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_SIGNIN_CLLB.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_SIGNIN_CLLB message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_SIGNIN_CLLB
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_SIGNIN_CLLB} MSG_SIGNIN_CLLB
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_SIGNIN_CLLB.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_SIGNIN_CLLB();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.msgID = reader.uint32();
                break;
            case 2:
                message.pid = reader.uint32();
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
     * Decodes a MSG_SIGNIN_CLLB message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_SIGNIN_CLLB
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_SIGNIN_CLLB} MSG_SIGNIN_CLLB
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_SIGNIN_CLLB.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_SIGNIN_CLLB message.
     * @function verify
     * @memberof MSG_SIGNIN_CLLB
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_SIGNIN_CLLB.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (!$util.isInteger(message.pid))
                return "pid: integer expected";
        return null;
    };

    /**
     * Creates a MSG_SIGNIN_CLLB message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_SIGNIN_CLLB
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_SIGNIN_CLLB} MSG_SIGNIN_CLLB
     */
    MSG_SIGNIN_CLLB.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_SIGNIN_CLLB)
            return object;
        var message = new $root.MSG_SIGNIN_CLLB();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.pid != null)
            message.pid = object.pid >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a MSG_SIGNIN_CLLB message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_SIGNIN_CLLB
     * @static
     * @param {MSG_SIGNIN_CLLB} message MSG_SIGNIN_CLLB
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_SIGNIN_CLLB.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.pid = 0;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = message.pid;
        return object;
    };

    /**
     * Converts this MSG_SIGNIN_CLLB to JSON.
     * @function toJSON
     * @memberof MSG_SIGNIN_CLLB
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_SIGNIN_CLLB.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MSG_SIGNIN_CLLB;
})();

module.exports = $root;
