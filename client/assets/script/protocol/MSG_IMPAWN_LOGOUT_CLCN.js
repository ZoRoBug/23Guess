/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_IMPAWN_LOGOUT_CLCN = (function() {

    /**
     * Properties of a MSG_IMPAWN_LOGOUT_CLCN.
     * @exports IMSG_IMPAWN_LOGOUT_CLCN
     * @interface IMSG_IMPAWN_LOGOUT_CLCN
     * @property {number} msgID MSG_IMPAWN_LOGOUT_CLCN msgID
     */

    /**
     * Constructs a new MSG_IMPAWN_LOGOUT_CLCN.
     * @exports MSG_IMPAWN_LOGOUT_CLCN
     * @classdesc Represents a MSG_IMPAWN_LOGOUT_CLCN.
     * @implements IMSG_IMPAWN_LOGOUT_CLCN
     * @constructor
     * @param {IMSG_IMPAWN_LOGOUT_CLCN=} [properties] Properties to set
     */
    function MSG_IMPAWN_LOGOUT_CLCN(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_IMPAWN_LOGOUT_CLCN msgID.
     * @member {number} msgID
     * @memberof MSG_IMPAWN_LOGOUT_CLCN
     * @instance
     */
    MSG_IMPAWN_LOGOUT_CLCN.prototype.msgID = 0;

    /**
     * Creates a new MSG_IMPAWN_LOGOUT_CLCN instance using the specified properties.
     * @function create
     * @memberof MSG_IMPAWN_LOGOUT_CLCN
     * @static
     * @param {IMSG_IMPAWN_LOGOUT_CLCN=} [properties] Properties to set
     * @returns {MSG_IMPAWN_LOGOUT_CLCN} MSG_IMPAWN_LOGOUT_CLCN instance
     */
    MSG_IMPAWN_LOGOUT_CLCN.create = function create(properties) {
        return new MSG_IMPAWN_LOGOUT_CLCN(properties);
    };

    /**
     * Encodes the specified MSG_IMPAWN_LOGOUT_CLCN message. Does not implicitly {@link MSG_IMPAWN_LOGOUT_CLCN.verify|verify} messages.
     * @function encode
     * @memberof MSG_IMPAWN_LOGOUT_CLCN
     * @static
     * @param {IMSG_IMPAWN_LOGOUT_CLCN} message MSG_IMPAWN_LOGOUT_CLCN message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_IMPAWN_LOGOUT_CLCN.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        return writer;
    };

    /**
     * Encodes the specified MSG_IMPAWN_LOGOUT_CLCN message, length delimited. Does not implicitly {@link MSG_IMPAWN_LOGOUT_CLCN.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_IMPAWN_LOGOUT_CLCN
     * @static
     * @param {IMSG_IMPAWN_LOGOUT_CLCN} message MSG_IMPAWN_LOGOUT_CLCN message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_IMPAWN_LOGOUT_CLCN.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_IMPAWN_LOGOUT_CLCN message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_IMPAWN_LOGOUT_CLCN
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_IMPAWN_LOGOUT_CLCN} MSG_IMPAWN_LOGOUT_CLCN
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_IMPAWN_LOGOUT_CLCN.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_IMPAWN_LOGOUT_CLCN();
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
     * Decodes a MSG_IMPAWN_LOGOUT_CLCN message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_IMPAWN_LOGOUT_CLCN
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_IMPAWN_LOGOUT_CLCN} MSG_IMPAWN_LOGOUT_CLCN
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_IMPAWN_LOGOUT_CLCN.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_IMPAWN_LOGOUT_CLCN message.
     * @function verify
     * @memberof MSG_IMPAWN_LOGOUT_CLCN
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_IMPAWN_LOGOUT_CLCN.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        return null;
    };

    /**
     * Creates a MSG_IMPAWN_LOGOUT_CLCN message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_IMPAWN_LOGOUT_CLCN
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_IMPAWN_LOGOUT_CLCN} MSG_IMPAWN_LOGOUT_CLCN
     */
    MSG_IMPAWN_LOGOUT_CLCN.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_IMPAWN_LOGOUT_CLCN)
            return object;
        var message = new $root.MSG_IMPAWN_LOGOUT_CLCN();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a MSG_IMPAWN_LOGOUT_CLCN message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_IMPAWN_LOGOUT_CLCN
     * @static
     * @param {MSG_IMPAWN_LOGOUT_CLCN} message MSG_IMPAWN_LOGOUT_CLCN
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_IMPAWN_LOGOUT_CLCN.toObject = function toObject(message, options) {
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
     * Converts this MSG_IMPAWN_LOGOUT_CLCN to JSON.
     * @function toJSON
     * @memberof MSG_IMPAWN_LOGOUT_CLCN
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_IMPAWN_LOGOUT_CLCN.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MSG_IMPAWN_LOGOUT_CLCN;
})();

module.exports = $root;
