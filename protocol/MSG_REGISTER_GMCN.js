/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_REGISTER_GMCN = (function() {

    /**
     * Properties of a MSG_REGISTER_GMCN.
     * @exports IMSG_REGISTER_GMCN
     * @interface IMSG_REGISTER_GMCN
     * @property {number} msgID MSG_REGISTER_GMCN msgID
     * @property {number|null} [connID] MSG_REGISTER_GMCN connID
     * @property {number|null} [id] MSG_REGISTER_GMCN id
     * @property {string|null} [name] MSG_REGISTER_GMCN name
     */

    /**
     * Constructs a new MSG_REGISTER_GMCN.
     * @exports MSG_REGISTER_GMCN
     * @classdesc Represents a MSG_REGISTER_GMCN.
     * @implements IMSG_REGISTER_GMCN
     * @constructor
     * @param {IMSG_REGISTER_GMCN=} [properties] Properties to set
     */
    function MSG_REGISTER_GMCN(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_REGISTER_GMCN msgID.
     * @member {number} msgID
     * @memberof MSG_REGISTER_GMCN
     * @instance
     */
    MSG_REGISTER_GMCN.prototype.msgID = 0;

    /**
     * MSG_REGISTER_GMCN connID.
     * @member {number} connID
     * @memberof MSG_REGISTER_GMCN
     * @instance
     */
    MSG_REGISTER_GMCN.prototype.connID = 0;

    /**
     * MSG_REGISTER_GMCN id.
     * @member {number} id
     * @memberof MSG_REGISTER_GMCN
     * @instance
     */
    MSG_REGISTER_GMCN.prototype.id = 0;

    /**
     * MSG_REGISTER_GMCN name.
     * @member {string} name
     * @memberof MSG_REGISTER_GMCN
     * @instance
     */
    MSG_REGISTER_GMCN.prototype.name = "";

    /**
     * Creates a new MSG_REGISTER_GMCN instance using the specified properties.
     * @function create
     * @memberof MSG_REGISTER_GMCN
     * @static
     * @param {IMSG_REGISTER_GMCN=} [properties] Properties to set
     * @returns {MSG_REGISTER_GMCN} MSG_REGISTER_GMCN instance
     */
    MSG_REGISTER_GMCN.create = function create(properties) {
        return new MSG_REGISTER_GMCN(properties);
    };

    /**
     * Encodes the specified MSG_REGISTER_GMCN message. Does not implicitly {@link MSG_REGISTER_GMCN.verify|verify} messages.
     * @function encode
     * @memberof MSG_REGISTER_GMCN
     * @static
     * @param {IMSG_REGISTER_GMCN} message MSG_REGISTER_GMCN message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_REGISTER_GMCN.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.connID != null && message.hasOwnProperty("connID"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.connID);
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.id);
        if (message.name != null && message.hasOwnProperty("name"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.name);
        return writer;
    };

    /**
     * Encodes the specified MSG_REGISTER_GMCN message, length delimited. Does not implicitly {@link MSG_REGISTER_GMCN.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_REGISTER_GMCN
     * @static
     * @param {IMSG_REGISTER_GMCN} message MSG_REGISTER_GMCN message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_REGISTER_GMCN.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_REGISTER_GMCN message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_REGISTER_GMCN
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_REGISTER_GMCN} MSG_REGISTER_GMCN
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_REGISTER_GMCN.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_REGISTER_GMCN();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.msgID = reader.uint32();
                break;
            case 2:
                message.connID = reader.uint32();
                break;
            case 3:
                message.id = reader.uint32();
                break;
            case 4:
                message.name = reader.string();
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
     * Decodes a MSG_REGISTER_GMCN message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_REGISTER_GMCN
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_REGISTER_GMCN} MSG_REGISTER_GMCN
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_REGISTER_GMCN.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_REGISTER_GMCN message.
     * @function verify
     * @memberof MSG_REGISTER_GMCN
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_REGISTER_GMCN.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.connID != null && message.hasOwnProperty("connID"))
            if (!$util.isInteger(message.connID))
                return "connID: integer expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id))
                return "id: integer expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        return null;
    };

    /**
     * Creates a MSG_REGISTER_GMCN message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_REGISTER_GMCN
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_REGISTER_GMCN} MSG_REGISTER_GMCN
     */
    MSG_REGISTER_GMCN.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_REGISTER_GMCN)
            return object;
        var message = new $root.MSG_REGISTER_GMCN();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.connID != null)
            message.connID = object.connID >>> 0;
        if (object.id != null)
            message.id = object.id >>> 0;
        if (object.name != null)
            message.name = String(object.name);
        return message;
    };

    /**
     * Creates a plain object from a MSG_REGISTER_GMCN message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_REGISTER_GMCN
     * @static
     * @param {MSG_REGISTER_GMCN} message MSG_REGISTER_GMCN
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_REGISTER_GMCN.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.connID = 0;
            object.id = 0;
            object.name = "";
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.connID != null && message.hasOwnProperty("connID"))
            object.connID = message.connID;
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        return object;
    };

    /**
     * Converts this MSG_REGISTER_GMCN to JSON.
     * @function toJSON
     * @memberof MSG_REGISTER_GMCN
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_REGISTER_GMCN.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MSG_REGISTER_GMCN;
})();

module.exports = $root;
