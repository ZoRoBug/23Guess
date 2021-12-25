/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MsgID = (function() {

    /**
     * Properties of a MsgID.
     * @exports IMsgID
     * @interface IMsgID
     * @property {number} msgID MsgID msgID
     */

    /**
     * Constructs a new MsgID.
     * @exports MsgID
     * @classdesc Represents a MsgID.
     * @implements IMsgID
     * @constructor
     * @param {IMsgID=} [properties] Properties to set
     */
    function MsgID(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MsgID msgID.
     * @member {number} msgID
     * @memberof MsgID
     * @instance
     */
    MsgID.prototype.msgID = 0;

    /**
     * Creates a new MsgID instance using the specified properties.
     * @function create
     * @memberof MsgID
     * @static
     * @param {IMsgID=} [properties] Properties to set
     * @returns {MsgID} MsgID instance
     */
    MsgID.create = function create(properties) {
        return new MsgID(properties);
    };

    /**
     * Encodes the specified MsgID message. Does not implicitly {@link MsgID.verify|verify} messages.
     * @function encode
     * @memberof MsgID
     * @static
     * @param {IMsgID} message MsgID message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MsgID.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        return writer;
    };

    /**
     * Encodes the specified MsgID message, length delimited. Does not implicitly {@link MsgID.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MsgID
     * @static
     * @param {IMsgID} message MsgID message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MsgID.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MsgID message from the specified reader or buffer.
     * @function decode
     * @memberof MsgID
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MsgID} MsgID
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MsgID.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MsgID();
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
     * Decodes a MsgID message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MsgID
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MsgID} MsgID
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MsgID.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MsgID message.
     * @function verify
     * @memberof MsgID
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MsgID.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        return null;
    };

    /**
     * Creates a MsgID message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MsgID
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MsgID} MsgID
     */
    MsgID.fromObject = function fromObject(object) {
        if (object instanceof $root.MsgID)
            return object;
        var message = new $root.MsgID();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a MsgID message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MsgID
     * @static
     * @param {MsgID} message MsgID
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MsgID.toObject = function toObject(message, options) {
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
     * Converts this MsgID to JSON.
     * @function toJSON
     * @memberof MsgID
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MsgID.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MsgID;
})();

module.exports = $root;
