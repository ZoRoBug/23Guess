/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_REGISTER_GTCN = (function() {

    /**
     * Properties of a MSG_REGISTER_GTCN.
     * @exports IMSG_REGISTER_GTCN
     * @interface IMSG_REGISTER_GTCN
     * @property {number} msgID MSG_REGISTER_GTCN msgID
     * @property {boolean|null} [success] MSG_REGISTER_GTCN success
     */

    /**
     * Constructs a new MSG_REGISTER_GTCN.
     * @exports MSG_REGISTER_GTCN
     * @classdesc Represents a MSG_REGISTER_GTCN.
     * @implements IMSG_REGISTER_GTCN
     * @constructor
     * @param {IMSG_REGISTER_GTCN=} [properties] Properties to set
     */
    function MSG_REGISTER_GTCN(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_REGISTER_GTCN msgID.
     * @member {number} msgID
     * @memberof MSG_REGISTER_GTCN
     * @instance
     */
    MSG_REGISTER_GTCN.prototype.msgID = 0;

    /**
     * MSG_REGISTER_GTCN success.
     * @member {boolean} success
     * @memberof MSG_REGISTER_GTCN
     * @instance
     */
    MSG_REGISTER_GTCN.prototype.success = false;

    /**
     * Creates a new MSG_REGISTER_GTCN instance using the specified properties.
     * @function create
     * @memberof MSG_REGISTER_GTCN
     * @static
     * @param {IMSG_REGISTER_GTCN=} [properties] Properties to set
     * @returns {MSG_REGISTER_GTCN} MSG_REGISTER_GTCN instance
     */
    MSG_REGISTER_GTCN.create = function create(properties) {
        return new MSG_REGISTER_GTCN(properties);
    };

    /**
     * Encodes the specified MSG_REGISTER_GTCN message. Does not implicitly {@link MSG_REGISTER_GTCN.verify|verify} messages.
     * @function encode
     * @memberof MSG_REGISTER_GTCN
     * @static
     * @param {IMSG_REGISTER_GTCN} message MSG_REGISTER_GTCN message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_REGISTER_GTCN.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.success != null && message.hasOwnProperty("success"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.success);
        return writer;
    };

    /**
     * Encodes the specified MSG_REGISTER_GTCN message, length delimited. Does not implicitly {@link MSG_REGISTER_GTCN.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_REGISTER_GTCN
     * @static
     * @param {IMSG_REGISTER_GTCN} message MSG_REGISTER_GTCN message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_REGISTER_GTCN.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_REGISTER_GTCN message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_REGISTER_GTCN
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_REGISTER_GTCN} MSG_REGISTER_GTCN
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_REGISTER_GTCN.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_REGISTER_GTCN();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.msgID = reader.uint32();
                break;
            case 2:
                message.success = reader.bool();
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
     * Decodes a MSG_REGISTER_GTCN message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_REGISTER_GTCN
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_REGISTER_GTCN} MSG_REGISTER_GTCN
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_REGISTER_GTCN.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_REGISTER_GTCN message.
     * @function verify
     * @memberof MSG_REGISTER_GTCN
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_REGISTER_GTCN.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.success != null && message.hasOwnProperty("success"))
            if (typeof message.success !== "boolean")
                return "success: boolean expected";
        return null;
    };

    /**
     * Creates a MSG_REGISTER_GTCN message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_REGISTER_GTCN
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_REGISTER_GTCN} MSG_REGISTER_GTCN
     */
    MSG_REGISTER_GTCN.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_REGISTER_GTCN)
            return object;
        var message = new $root.MSG_REGISTER_GTCN();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.success != null)
            message.success = Boolean(object.success);
        return message;
    };

    /**
     * Creates a plain object from a MSG_REGISTER_GTCN message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_REGISTER_GTCN
     * @static
     * @param {MSG_REGISTER_GTCN} message MSG_REGISTER_GTCN
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_REGISTER_GTCN.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.success = false;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.success != null && message.hasOwnProperty("success"))
            object.success = message.success;
        return object;
    };

    /**
     * Converts this MSG_REGISTER_GTCN to JSON.
     * @function toJSON
     * @memberof MSG_REGISTER_GTCN
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_REGISTER_GTCN.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MSG_REGISTER_GTCN;
})();

module.exports = $root;
