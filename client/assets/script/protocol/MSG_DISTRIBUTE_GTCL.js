/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_DISTRIBUTE_GTCL = (function() {

    /**
     * Properties of a MSG_DISTRIBUTE_GTCL.
     * @exports IMSG_DISTRIBUTE_GTCL
     * @interface IMSG_DISTRIBUTE_GTCL
     * @property {number} msgID MSG_DISTRIBUTE_GTCL msgID
     * @property {MSG_DISTRIBUTE_GTCL.Result|null} [result] MSG_DISTRIBUTE_GTCL result
     * @property {string|null} [address] MSG_DISTRIBUTE_GTCL address
     * @property {string|null} [ticket] MSG_DISTRIBUTE_GTCL ticket
     * @property {string|null} [explain] MSG_DISTRIBUTE_GTCL explain
     */

    /**
     * Constructs a new MSG_DISTRIBUTE_GTCL.
     * @exports MSG_DISTRIBUTE_GTCL
     * @classdesc Represents a MSG_DISTRIBUTE_GTCL.
     * @implements IMSG_DISTRIBUTE_GTCL
     * @constructor
     * @param {IMSG_DISTRIBUTE_GTCL=} [properties] Properties to set
     */
    function MSG_DISTRIBUTE_GTCL(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_DISTRIBUTE_GTCL msgID.
     * @member {number} msgID
     * @memberof MSG_DISTRIBUTE_GTCL
     * @instance
     */
    MSG_DISTRIBUTE_GTCL.prototype.msgID = 0;

    /**
     * MSG_DISTRIBUTE_GTCL result.
     * @member {MSG_DISTRIBUTE_GTCL.Result} result
     * @memberof MSG_DISTRIBUTE_GTCL
     * @instance
     */
    MSG_DISTRIBUTE_GTCL.prototype.result = 0;

    /**
     * MSG_DISTRIBUTE_GTCL address.
     * @member {string} address
     * @memberof MSG_DISTRIBUTE_GTCL
     * @instance
     */
    MSG_DISTRIBUTE_GTCL.prototype.address = "";

    /**
     * MSG_DISTRIBUTE_GTCL ticket.
     * @member {string} ticket
     * @memberof MSG_DISTRIBUTE_GTCL
     * @instance
     */
    MSG_DISTRIBUTE_GTCL.prototype.ticket = "";

    /**
     * MSG_DISTRIBUTE_GTCL explain.
     * @member {string} explain
     * @memberof MSG_DISTRIBUTE_GTCL
     * @instance
     */
    MSG_DISTRIBUTE_GTCL.prototype.explain = "";

    /**
     * Creates a new MSG_DISTRIBUTE_GTCL instance using the specified properties.
     * @function create
     * @memberof MSG_DISTRIBUTE_GTCL
     * @static
     * @param {IMSG_DISTRIBUTE_GTCL=} [properties] Properties to set
     * @returns {MSG_DISTRIBUTE_GTCL} MSG_DISTRIBUTE_GTCL instance
     */
    MSG_DISTRIBUTE_GTCL.create = function create(properties) {
        return new MSG_DISTRIBUTE_GTCL(properties);
    };

    /**
     * Encodes the specified MSG_DISTRIBUTE_GTCL message. Does not implicitly {@link MSG_DISTRIBUTE_GTCL.verify|verify} messages.
     * @function encode
     * @memberof MSG_DISTRIBUTE_GTCL
     * @static
     * @param {IMSG_DISTRIBUTE_GTCL} message MSG_DISTRIBUTE_GTCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_DISTRIBUTE_GTCL.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.result != null && message.hasOwnProperty("result"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
        if (message.address != null && message.hasOwnProperty("address"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.address);
        if (message.ticket != null && message.hasOwnProperty("ticket"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.ticket);
        if (message.explain != null && message.hasOwnProperty("explain"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.explain);
        return writer;
    };

    /**
     * Encodes the specified MSG_DISTRIBUTE_GTCL message, length delimited. Does not implicitly {@link MSG_DISTRIBUTE_GTCL.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_DISTRIBUTE_GTCL
     * @static
     * @param {IMSG_DISTRIBUTE_GTCL} message MSG_DISTRIBUTE_GTCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_DISTRIBUTE_GTCL.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_DISTRIBUTE_GTCL message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_DISTRIBUTE_GTCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_DISTRIBUTE_GTCL} MSG_DISTRIBUTE_GTCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_DISTRIBUTE_GTCL.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_DISTRIBUTE_GTCL();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.msgID = reader.uint32();
                break;
            case 2:
                message.result = reader.int32();
                break;
            case 3:
                message.address = reader.string();
                break;
            case 4:
                message.ticket = reader.string();
                break;
            case 5:
                message.explain = reader.string();
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
     * Decodes a MSG_DISTRIBUTE_GTCL message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_DISTRIBUTE_GTCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_DISTRIBUTE_GTCL} MSG_DISTRIBUTE_GTCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_DISTRIBUTE_GTCL.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_DISTRIBUTE_GTCL message.
     * @function verify
     * @memberof MSG_DISTRIBUTE_GTCL
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_DISTRIBUTE_GTCL.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.result != null && message.hasOwnProperty("result"))
            switch (message.result) {
            default:
                return "result: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
                break;
            }
        if (message.address != null && message.hasOwnProperty("address"))
            if (!$util.isString(message.address))
                return "address: string expected";
        if (message.ticket != null && message.hasOwnProperty("ticket"))
            if (!$util.isString(message.ticket))
                return "ticket: string expected";
        if (message.explain != null && message.hasOwnProperty("explain"))
            if (!$util.isString(message.explain))
                return "explain: string expected";
        return null;
    };

    /**
     * Creates a MSG_DISTRIBUTE_GTCL message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_DISTRIBUTE_GTCL
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_DISTRIBUTE_GTCL} MSG_DISTRIBUTE_GTCL
     */
    MSG_DISTRIBUTE_GTCL.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_DISTRIBUTE_GTCL)
            return object;
        var message = new $root.MSG_DISTRIBUTE_GTCL();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        switch (object.result) {
        case "UNKNOW":
        case 0:
            message.result = 0;
            break;
        case "SUCCESS":
        case 1:
            message.result = 1;
            break;
        case "NO_SERVER":
        case 2:
            message.result = 2;
            break;
        case "FULL_PLAYER":
        case 3:
            message.result = 3;
            break;
        }
        if (object.address != null)
            message.address = String(object.address);
        if (object.ticket != null)
            message.ticket = String(object.ticket);
        if (object.explain != null)
            message.explain = String(object.explain);
        return message;
    };

    /**
     * Creates a plain object from a MSG_DISTRIBUTE_GTCL message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_DISTRIBUTE_GTCL
     * @static
     * @param {MSG_DISTRIBUTE_GTCL} message MSG_DISTRIBUTE_GTCL
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_DISTRIBUTE_GTCL.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.result = options.enums === String ? "UNKNOW" : 0;
            object.address = "";
            object.ticket = "";
            object.explain = "";
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.result != null && message.hasOwnProperty("result"))
            object.result = options.enums === String ? $root.MSG_DISTRIBUTE_GTCL.Result[message.result] : message.result;
        if (message.address != null && message.hasOwnProperty("address"))
            object.address = message.address;
        if (message.ticket != null && message.hasOwnProperty("ticket"))
            object.ticket = message.ticket;
        if (message.explain != null && message.hasOwnProperty("explain"))
            object.explain = message.explain;
        return object;
    };

    /**
     * Converts this MSG_DISTRIBUTE_GTCL to JSON.
     * @function toJSON
     * @memberof MSG_DISTRIBUTE_GTCL
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_DISTRIBUTE_GTCL.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Result enum.
     * @name MSG_DISTRIBUTE_GTCL.Result
     * @enum {string}
     * @property {number} UNKNOW=0 UNKNOW value
     * @property {number} SUCCESS=1 SUCCESS value
     * @property {number} NO_SERVER=2 NO_SERVER value
     * @property {number} FULL_PLAYER=3 FULL_PLAYER value
     */
    MSG_DISTRIBUTE_GTCL.Result = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOW"] = 0;
        values[valuesById[1] = "SUCCESS"] = 1;
        values[valuesById[2] = "NO_SERVER"] = 2;
        values[valuesById[3] = "FULL_PLAYER"] = 3;
        return values;
    })();

    return MSG_DISTRIBUTE_GTCL;
})();

module.exports = $root;
