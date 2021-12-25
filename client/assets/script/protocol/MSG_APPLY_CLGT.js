/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_APPLY_CLGT = (function() {

    /**
     * Properties of a MSG_APPLY_CLGT.
     * @exports IMSG_APPLY_CLGT
     * @interface IMSG_APPLY_CLGT
     * @property {number} msgID MSG_APPLY_CLGT msgID
     */

    /**
     * Constructs a new MSG_APPLY_CLGT.
     * @exports MSG_APPLY_CLGT
     * @classdesc Represents a MSG_APPLY_CLGT.
     * @implements IMSG_APPLY_CLGT
     * @constructor
     * @param {IMSG_APPLY_CLGT=} [properties] Properties to set
     */
    function MSG_APPLY_CLGT(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_APPLY_CLGT msgID.
     * @member {number} msgID
     * @memberof MSG_APPLY_CLGT
     * @instance
     */
    MSG_APPLY_CLGT.prototype.msgID = 0;

    /**
     * Creates a new MSG_APPLY_CLGT instance using the specified properties.
     * @function create
     * @memberof MSG_APPLY_CLGT
     * @static
     * @param {IMSG_APPLY_CLGT=} [properties] Properties to set
     * @returns {MSG_APPLY_CLGT} MSG_APPLY_CLGT instance
     */
    MSG_APPLY_CLGT.create = function create(properties) {
        return new MSG_APPLY_CLGT(properties);
    };

    /**
     * Encodes the specified MSG_APPLY_CLGT message. Does not implicitly {@link MSG_APPLY_CLGT.verify|verify} messages.
     * @function encode
     * @memberof MSG_APPLY_CLGT
     * @static
     * @param {IMSG_APPLY_CLGT} message MSG_APPLY_CLGT message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_APPLY_CLGT.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        return writer;
    };

    /**
     * Encodes the specified MSG_APPLY_CLGT message, length delimited. Does not implicitly {@link MSG_APPLY_CLGT.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_APPLY_CLGT
     * @static
     * @param {IMSG_APPLY_CLGT} message MSG_APPLY_CLGT message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_APPLY_CLGT.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_APPLY_CLGT message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_APPLY_CLGT
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_APPLY_CLGT} MSG_APPLY_CLGT
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_APPLY_CLGT.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_APPLY_CLGT();
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
     * Decodes a MSG_APPLY_CLGT message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_APPLY_CLGT
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_APPLY_CLGT} MSG_APPLY_CLGT
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_APPLY_CLGT.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_APPLY_CLGT message.
     * @function verify
     * @memberof MSG_APPLY_CLGT
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_APPLY_CLGT.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        return null;
    };

    /**
     * Creates a MSG_APPLY_CLGT message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_APPLY_CLGT
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_APPLY_CLGT} MSG_APPLY_CLGT
     */
    MSG_APPLY_CLGT.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_APPLY_CLGT)
            return object;
        var message = new $root.MSG_APPLY_CLGT();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a MSG_APPLY_CLGT message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_APPLY_CLGT
     * @static
     * @param {MSG_APPLY_CLGT} message MSG_APPLY_CLGT
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_APPLY_CLGT.toObject = function toObject(message, options) {
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
     * Converts this MSG_APPLY_CLGT to JSON.
     * @function toJSON
     * @memberof MSG_APPLY_CLGT
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_APPLY_CLGT.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MSG_APPLY_CLGT;
})();

module.exports = $root;
