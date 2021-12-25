/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_KICK_LBCL = (function() {

    /**
     * Properties of a MSG_KICK_LBCL.
     * @exports IMSG_KICK_LBCL
     * @interface IMSG_KICK_LBCL
     * @property {number} msgID MSG_KICK_LBCL msgID
     * @property {number|null} [pid] MSG_KICK_LBCL pid
     * @property {MSG_KICK_LBCL.Reason|null} [reason] MSG_KICK_LBCL reason
     */

    /**
     * Constructs a new MSG_KICK_LBCL.
     * @exports MSG_KICK_LBCL
     * @classdesc Represents a MSG_KICK_LBCL.
     * @implements IMSG_KICK_LBCL
     * @constructor
     * @param {IMSG_KICK_LBCL=} [properties] Properties to set
     */
    function MSG_KICK_LBCL(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_KICK_LBCL msgID.
     * @member {number} msgID
     * @memberof MSG_KICK_LBCL
     * @instance
     */
    MSG_KICK_LBCL.prototype.msgID = 0;

    /**
     * MSG_KICK_LBCL pid.
     * @member {number} pid
     * @memberof MSG_KICK_LBCL
     * @instance
     */
    MSG_KICK_LBCL.prototype.pid = 0;

    /**
     * MSG_KICK_LBCL reason.
     * @member {MSG_KICK_LBCL.Reason} reason
     * @memberof MSG_KICK_LBCL
     * @instance
     */
    MSG_KICK_LBCL.prototype.reason = 0;

    /**
     * Creates a new MSG_KICK_LBCL instance using the specified properties.
     * @function create
     * @memberof MSG_KICK_LBCL
     * @static
     * @param {IMSG_KICK_LBCL=} [properties] Properties to set
     * @returns {MSG_KICK_LBCL} MSG_KICK_LBCL instance
     */
    MSG_KICK_LBCL.create = function create(properties) {
        return new MSG_KICK_LBCL(properties);
    };

    /**
     * Encodes the specified MSG_KICK_LBCL message. Does not implicitly {@link MSG_KICK_LBCL.verify|verify} messages.
     * @function encode
     * @memberof MSG_KICK_LBCL
     * @static
     * @param {IMSG_KICK_LBCL} message MSG_KICK_LBCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_KICK_LBCL.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.pid);
        if (message.reason != null && message.hasOwnProperty("reason"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.reason);
        return writer;
    };

    /**
     * Encodes the specified MSG_KICK_LBCL message, length delimited. Does not implicitly {@link MSG_KICK_LBCL.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_KICK_LBCL
     * @static
     * @param {IMSG_KICK_LBCL} message MSG_KICK_LBCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_KICK_LBCL.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_KICK_LBCL message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_KICK_LBCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_KICK_LBCL} MSG_KICK_LBCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_KICK_LBCL.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_KICK_LBCL();
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
                message.reason = reader.int32();
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
     * Decodes a MSG_KICK_LBCL message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_KICK_LBCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_KICK_LBCL} MSG_KICK_LBCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_KICK_LBCL.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_KICK_LBCL message.
     * @function verify
     * @memberof MSG_KICK_LBCL
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_KICK_LBCL.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (!$util.isInteger(message.pid))
                return "pid: integer expected";
        if (message.reason != null && message.hasOwnProperty("reason"))
            switch (message.reason) {
            default:
                return "reason: enum value expected";
            case 0:
            case 1:
                break;
            }
        return null;
    };

    /**
     * Creates a MSG_KICK_LBCL message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_KICK_LBCL
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_KICK_LBCL} MSG_KICK_LBCL
     */
    MSG_KICK_LBCL.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_KICK_LBCL)
            return object;
        var message = new $root.MSG_KICK_LBCL();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.pid != null)
            message.pid = object.pid >>> 0;
        switch (object.reason) {
        case "UNKNOW":
        case 0:
            message.reason = 0;
            break;
        case "OTHER_LOGIN":
        case 1:
            message.reason = 1;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a MSG_KICK_LBCL message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_KICK_LBCL
     * @static
     * @param {MSG_KICK_LBCL} message MSG_KICK_LBCL
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_KICK_LBCL.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.pid = 0;
            object.reason = options.enums === String ? "UNKNOW" : 0;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = message.pid;
        if (message.reason != null && message.hasOwnProperty("reason"))
            object.reason = options.enums === String ? $root.MSG_KICK_LBCL.Reason[message.reason] : message.reason;
        return object;
    };

    /**
     * Converts this MSG_KICK_LBCL to JSON.
     * @function toJSON
     * @memberof MSG_KICK_LBCL
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_KICK_LBCL.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Reason enum.
     * @name MSG_KICK_LBCL.Reason
     * @enum {string}
     * @property {number} UNKNOW=0 UNKNOW value
     * @property {number} OTHER_LOGIN=1 OTHER_LOGIN value
     */
    MSG_KICK_LBCL.Reason = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOW"] = 0;
        values[valuesById[1] = "OTHER_LOGIN"] = 1;
        return values;
    })();

    return MSG_KICK_LBCL;
})();

module.exports = $root;
