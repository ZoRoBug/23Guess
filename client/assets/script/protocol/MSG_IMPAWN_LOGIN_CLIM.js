/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_IMPAWN_LOGIN_CLIM = (function() {

    /**
     * Properties of a MSG_IMPAWN_LOGIN_CLIM.
     * @exports IMSG_IMPAWN_LOGIN_CLIM
     * @interface IMSG_IMPAWN_LOGIN_CLIM
     * @property {number} msgID MSG_IMPAWN_LOGIN_CLIM msgID
     * @property {number|null} [pid] MSG_IMPAWN_LOGIN_CLIM pid
     */

    /**
     * Constructs a new MSG_IMPAWN_LOGIN_CLIM.
     * @exports MSG_IMPAWN_LOGIN_CLIM
     * @classdesc Represents a MSG_IMPAWN_LOGIN_CLIM.
     * @implements IMSG_IMPAWN_LOGIN_CLIM
     * @constructor
     * @param {IMSG_IMPAWN_LOGIN_CLIM=} [properties] Properties to set
     */
    function MSG_IMPAWN_LOGIN_CLIM(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_IMPAWN_LOGIN_CLIM msgID.
     * @member {number} msgID
     * @memberof MSG_IMPAWN_LOGIN_CLIM
     * @instance
     */
    MSG_IMPAWN_LOGIN_CLIM.prototype.msgID = 0;

    /**
     * MSG_IMPAWN_LOGIN_CLIM pid.
     * @member {number} pid
     * @memberof MSG_IMPAWN_LOGIN_CLIM
     * @instance
     */
    MSG_IMPAWN_LOGIN_CLIM.prototype.pid = 0;

    /**
     * Creates a new MSG_IMPAWN_LOGIN_CLIM instance using the specified properties.
     * @function create
     * @memberof MSG_IMPAWN_LOGIN_CLIM
     * @static
     * @param {IMSG_IMPAWN_LOGIN_CLIM=} [properties] Properties to set
     * @returns {MSG_IMPAWN_LOGIN_CLIM} MSG_IMPAWN_LOGIN_CLIM instance
     */
    MSG_IMPAWN_LOGIN_CLIM.create = function create(properties) {
        return new MSG_IMPAWN_LOGIN_CLIM(properties);
    };

    /**
     * Encodes the specified MSG_IMPAWN_LOGIN_CLIM message. Does not implicitly {@link MSG_IMPAWN_LOGIN_CLIM.verify|verify} messages.
     * @function encode
     * @memberof MSG_IMPAWN_LOGIN_CLIM
     * @static
     * @param {IMSG_IMPAWN_LOGIN_CLIM} message MSG_IMPAWN_LOGIN_CLIM message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_IMPAWN_LOGIN_CLIM.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.pid);
        return writer;
    };

    /**
     * Encodes the specified MSG_IMPAWN_LOGIN_CLIM message, length delimited. Does not implicitly {@link MSG_IMPAWN_LOGIN_CLIM.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_IMPAWN_LOGIN_CLIM
     * @static
     * @param {IMSG_IMPAWN_LOGIN_CLIM} message MSG_IMPAWN_LOGIN_CLIM message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_IMPAWN_LOGIN_CLIM.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_IMPAWN_LOGIN_CLIM message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_IMPAWN_LOGIN_CLIM
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_IMPAWN_LOGIN_CLIM} MSG_IMPAWN_LOGIN_CLIM
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_IMPAWN_LOGIN_CLIM.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_IMPAWN_LOGIN_CLIM();
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
     * Decodes a MSG_IMPAWN_LOGIN_CLIM message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_IMPAWN_LOGIN_CLIM
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_IMPAWN_LOGIN_CLIM} MSG_IMPAWN_LOGIN_CLIM
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_IMPAWN_LOGIN_CLIM.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_IMPAWN_LOGIN_CLIM message.
     * @function verify
     * @memberof MSG_IMPAWN_LOGIN_CLIM
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_IMPAWN_LOGIN_CLIM.verify = function verify(message) {
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
     * Creates a MSG_IMPAWN_LOGIN_CLIM message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_IMPAWN_LOGIN_CLIM
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_IMPAWN_LOGIN_CLIM} MSG_IMPAWN_LOGIN_CLIM
     */
    MSG_IMPAWN_LOGIN_CLIM.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_IMPAWN_LOGIN_CLIM)
            return object;
        var message = new $root.MSG_IMPAWN_LOGIN_CLIM();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.pid != null)
            message.pid = object.pid >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a MSG_IMPAWN_LOGIN_CLIM message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_IMPAWN_LOGIN_CLIM
     * @static
     * @param {MSG_IMPAWN_LOGIN_CLIM} message MSG_IMPAWN_LOGIN_CLIM
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_IMPAWN_LOGIN_CLIM.toObject = function toObject(message, options) {
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
     * Converts this MSG_IMPAWN_LOGIN_CLIM to JSON.
     * @function toJSON
     * @memberof MSG_IMPAWN_LOGIN_CLIM
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_IMPAWN_LOGIN_CLIM.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MSG_IMPAWN_LOGIN_CLIM;
})();

module.exports = $root;
