/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_IMPAWN_GAMEINFO_IMCL = (function() {

    /**
     * Properties of a MSG_IMPAWN_GAMEINFO_IMCL.
     * @exports IMSG_IMPAWN_GAMEINFO_IMCL
     * @interface IMSG_IMPAWN_GAMEINFO_IMCL
     * @property {number} msgID MSG_IMPAWN_GAMEINFO_IMCL msgID
     * @property {number|null} [pid] MSG_IMPAWN_GAMEINFO_IMCL pid
     * @property {number|Long|null} [twoImpawnTotal] MSG_IMPAWN_GAMEINFO_IMCL twoImpawnTotal
     * @property {number|Long|null} [threeImpawnTotal] MSG_IMPAWN_GAMEINFO_IMCL threeImpawnTotal
     * @property {number|null} [twoPlayerCount] MSG_IMPAWN_GAMEINFO_IMCL twoPlayerCount
     * @property {number|null} [threePlayerCount] MSG_IMPAWN_GAMEINFO_IMCL threePlayerCount
     * @property {number|null} [twoAwardRate] MSG_IMPAWN_GAMEINFO_IMCL twoAwardRate
     * @property {number|null} [threeAwardRate] MSG_IMPAWN_GAMEINFO_IMCL threeAwardRate
     * @property {number|null} [playerTwoImpawnTimes] MSG_IMPAWN_GAMEINFO_IMCL playerTwoImpawnTimes
     * @property {number|null} [playerThreeImpawnTimes] MSG_IMPAWN_GAMEINFO_IMCL playerThreeImpawnTimes
     * @property {number|Long|null} [playerTwoImpawnTotal] MSG_IMPAWN_GAMEINFO_IMCL playerTwoImpawnTotal
     * @property {number|Long|null} [playerThreeImpawnTotal] MSG_IMPAWN_GAMEINFO_IMCL playerThreeImpawnTotal
     * @property {Array.<MSG_IMPAWN_GAMEINFO_IMCL.IImpawn>|null} [impawnList] MSG_IMPAWN_GAMEINFO_IMCL impawnList
     * @property {Array.<boolean>|null} [recordList] MSG_IMPAWN_GAMEINFO_IMCL recordList
     * @property {number|null} [twoWinRecord] MSG_IMPAWN_GAMEINFO_IMCL twoWinRecord
     * @property {number|null} [threeWinRecord] MSG_IMPAWN_GAMEINFO_IMCL threeWinRecord
     * @property {number|null} [restartHour] MSG_IMPAWN_GAMEINFO_IMCL restartHour
     * @property {number|null} [pauseHour] MSG_IMPAWN_GAMEINFO_IMCL pauseHour
     */

    /**
     * Constructs a new MSG_IMPAWN_GAMEINFO_IMCL.
     * @exports MSG_IMPAWN_GAMEINFO_IMCL
     * @classdesc Represents a MSG_IMPAWN_GAMEINFO_IMCL.
     * @implements IMSG_IMPAWN_GAMEINFO_IMCL
     * @constructor
     * @param {IMSG_IMPAWN_GAMEINFO_IMCL=} [properties] Properties to set
     */
    function MSG_IMPAWN_GAMEINFO_IMCL(properties) {
        this.impawnList = [];
        this.recordList = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL msgID.
     * @member {number} msgID
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.msgID = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL pid.
     * @member {number} pid
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.pid = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL twoImpawnTotal.
     * @member {number|Long} twoImpawnTotal
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.twoImpawnTotal = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL threeImpawnTotal.
     * @member {number|Long} threeImpawnTotal
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.threeImpawnTotal = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL twoPlayerCount.
     * @member {number} twoPlayerCount
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.twoPlayerCount = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL threePlayerCount.
     * @member {number} threePlayerCount
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.threePlayerCount = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL twoAwardRate.
     * @member {number} twoAwardRate
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.twoAwardRate = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL threeAwardRate.
     * @member {number} threeAwardRate
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.threeAwardRate = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL playerTwoImpawnTimes.
     * @member {number} playerTwoImpawnTimes
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.playerTwoImpawnTimes = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL playerThreeImpawnTimes.
     * @member {number} playerThreeImpawnTimes
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.playerThreeImpawnTimes = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL playerTwoImpawnTotal.
     * @member {number|Long} playerTwoImpawnTotal
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.playerTwoImpawnTotal = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL playerThreeImpawnTotal.
     * @member {number|Long} playerThreeImpawnTotal
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.playerThreeImpawnTotal = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL impawnList.
     * @member {Array.<MSG_IMPAWN_GAMEINFO_IMCL.IImpawn>} impawnList
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.impawnList = $util.emptyArray;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL recordList.
     * @member {Array.<boolean>} recordList
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.recordList = $util.emptyArray;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL twoWinRecord.
     * @member {number} twoWinRecord
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.twoWinRecord = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL threeWinRecord.
     * @member {number} threeWinRecord
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.threeWinRecord = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL restartHour.
     * @member {number} restartHour
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.restartHour = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL pauseHour.
     * @member {number} pauseHour
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.pauseHour = 0;

    /**
     * Creates a new MSG_IMPAWN_GAMEINFO_IMCL instance using the specified properties.
     * @function create
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @static
     * @param {IMSG_IMPAWN_GAMEINFO_IMCL=} [properties] Properties to set
     * @returns {MSG_IMPAWN_GAMEINFO_IMCL} MSG_IMPAWN_GAMEINFO_IMCL instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.create = function create(properties) {
        return new MSG_IMPAWN_GAMEINFO_IMCL(properties);
    };

    /**
     * Encodes the specified MSG_IMPAWN_GAMEINFO_IMCL message. Does not implicitly {@link MSG_IMPAWN_GAMEINFO_IMCL.verify|verify} messages.
     * @function encode
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @static
     * @param {IMSG_IMPAWN_GAMEINFO_IMCL} message MSG_IMPAWN_GAMEINFO_IMCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_IMPAWN_GAMEINFO_IMCL.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.pid);
        if (message.twoImpawnTotal != null && message.hasOwnProperty("twoImpawnTotal"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.twoImpawnTotal);
        if (message.threeImpawnTotal != null && message.hasOwnProperty("threeImpawnTotal"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.threeImpawnTotal);
        if (message.twoPlayerCount != null && message.hasOwnProperty("twoPlayerCount"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.twoPlayerCount);
        if (message.threePlayerCount != null && message.hasOwnProperty("threePlayerCount"))
            writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.threePlayerCount);
        if (message.twoAwardRate != null && message.hasOwnProperty("twoAwardRate"))
            writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.twoAwardRate);
        if (message.threeAwardRate != null && message.hasOwnProperty("threeAwardRate"))
            writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.threeAwardRate);
        if (message.playerTwoImpawnTimes != null && message.hasOwnProperty("playerTwoImpawnTimes"))
            writer.uint32(/* id 9, wireType 0 =*/72).uint32(message.playerTwoImpawnTimes);
        if (message.playerThreeImpawnTimes != null && message.hasOwnProperty("playerThreeImpawnTimes"))
            writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.playerThreeImpawnTimes);
        if (message.playerTwoImpawnTotal != null && message.hasOwnProperty("playerTwoImpawnTotal"))
            writer.uint32(/* id 11, wireType 0 =*/88).uint64(message.playerTwoImpawnTotal);
        if (message.playerThreeImpawnTotal != null && message.hasOwnProperty("playerThreeImpawnTotal"))
            writer.uint32(/* id 12, wireType 0 =*/96).uint64(message.playerThreeImpawnTotal);
        if (message.impawnList != null && message.impawnList.length)
            for (var i = 0; i < message.impawnList.length; ++i)
                $root.MSG_IMPAWN_GAMEINFO_IMCL.Impawn.encode(message.impawnList[i], writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
        if (message.recordList != null && message.recordList.length)
            for (var i = 0; i < message.recordList.length; ++i)
                writer.uint32(/* id 14, wireType 0 =*/112).bool(message.recordList[i]);
        if (message.twoWinRecord != null && message.hasOwnProperty("twoWinRecord"))
            writer.uint32(/* id 15, wireType 0 =*/120).uint32(message.twoWinRecord);
        if (message.threeWinRecord != null && message.hasOwnProperty("threeWinRecord"))
            writer.uint32(/* id 16, wireType 0 =*/128).uint32(message.threeWinRecord);
        if (message.restartHour != null && message.hasOwnProperty("restartHour"))
            writer.uint32(/* id 17, wireType 0 =*/136).uint32(message.restartHour);
        if (message.pauseHour != null && message.hasOwnProperty("pauseHour"))
            writer.uint32(/* id 18, wireType 0 =*/144).uint32(message.pauseHour);
        return writer;
    };

    /**
     * Encodes the specified MSG_IMPAWN_GAMEINFO_IMCL message, length delimited. Does not implicitly {@link MSG_IMPAWN_GAMEINFO_IMCL.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @static
     * @param {IMSG_IMPAWN_GAMEINFO_IMCL} message MSG_IMPAWN_GAMEINFO_IMCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_IMPAWN_GAMEINFO_IMCL.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_IMPAWN_GAMEINFO_IMCL message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_IMPAWN_GAMEINFO_IMCL} MSG_IMPAWN_GAMEINFO_IMCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_IMPAWN_GAMEINFO_IMCL.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_IMPAWN_GAMEINFO_IMCL();
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
                message.twoImpawnTotal = reader.uint64();
                break;
            case 4:
                message.threeImpawnTotal = reader.uint64();
                break;
            case 5:
                message.twoPlayerCount = reader.uint32();
                break;
            case 6:
                message.threePlayerCount = reader.uint32();
                break;
            case 7:
                message.twoAwardRate = reader.uint32();
                break;
            case 8:
                message.threeAwardRate = reader.uint32();
                break;
            case 9:
                message.playerTwoImpawnTimes = reader.uint32();
                break;
            case 10:
                message.playerThreeImpawnTimes = reader.uint32();
                break;
            case 11:
                message.playerTwoImpawnTotal = reader.uint64();
                break;
            case 12:
                message.playerThreeImpawnTotal = reader.uint64();
                break;
            case 13:
                if (!(message.impawnList && message.impawnList.length))
                    message.impawnList = [];
                message.impawnList.push($root.MSG_IMPAWN_GAMEINFO_IMCL.Impawn.decode(reader, reader.uint32()));
                break;
            case 14:
                if (!(message.recordList && message.recordList.length))
                    message.recordList = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.recordList.push(reader.bool());
                } else
                    message.recordList.push(reader.bool());
                break;
            case 15:
                message.twoWinRecord = reader.uint32();
                break;
            case 16:
                message.threeWinRecord = reader.uint32();
                break;
            case 17:
                message.restartHour = reader.uint32();
                break;
            case 18:
                message.pauseHour = reader.uint32();
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
     * Decodes a MSG_IMPAWN_GAMEINFO_IMCL message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_IMPAWN_GAMEINFO_IMCL} MSG_IMPAWN_GAMEINFO_IMCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_IMPAWN_GAMEINFO_IMCL.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_IMPAWN_GAMEINFO_IMCL message.
     * @function verify
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_IMPAWN_GAMEINFO_IMCL.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (!$util.isInteger(message.pid))
                return "pid: integer expected";
        if (message.twoImpawnTotal != null && message.hasOwnProperty("twoImpawnTotal"))
            if (!$util.isInteger(message.twoImpawnTotal) && !(message.twoImpawnTotal && $util.isInteger(message.twoImpawnTotal.low) && $util.isInteger(message.twoImpawnTotal.high)))
                return "twoImpawnTotal: integer|Long expected";
        if (message.threeImpawnTotal != null && message.hasOwnProperty("threeImpawnTotal"))
            if (!$util.isInteger(message.threeImpawnTotal) && !(message.threeImpawnTotal && $util.isInteger(message.threeImpawnTotal.low) && $util.isInteger(message.threeImpawnTotal.high)))
                return "threeImpawnTotal: integer|Long expected";
        if (message.twoPlayerCount != null && message.hasOwnProperty("twoPlayerCount"))
            if (!$util.isInteger(message.twoPlayerCount))
                return "twoPlayerCount: integer expected";
        if (message.threePlayerCount != null && message.hasOwnProperty("threePlayerCount"))
            if (!$util.isInteger(message.threePlayerCount))
                return "threePlayerCount: integer expected";
        if (message.twoAwardRate != null && message.hasOwnProperty("twoAwardRate"))
            if (!$util.isInteger(message.twoAwardRate))
                return "twoAwardRate: integer expected";
        if (message.threeAwardRate != null && message.hasOwnProperty("threeAwardRate"))
            if (!$util.isInteger(message.threeAwardRate))
                return "threeAwardRate: integer expected";
        if (message.playerTwoImpawnTimes != null && message.hasOwnProperty("playerTwoImpawnTimes"))
            if (!$util.isInteger(message.playerTwoImpawnTimes))
                return "playerTwoImpawnTimes: integer expected";
        if (message.playerThreeImpawnTimes != null && message.hasOwnProperty("playerThreeImpawnTimes"))
            if (!$util.isInteger(message.playerThreeImpawnTimes))
                return "playerThreeImpawnTimes: integer expected";
        if (message.playerTwoImpawnTotal != null && message.hasOwnProperty("playerTwoImpawnTotal"))
            if (!$util.isInteger(message.playerTwoImpawnTotal) && !(message.playerTwoImpawnTotal && $util.isInteger(message.playerTwoImpawnTotal.low) && $util.isInteger(message.playerTwoImpawnTotal.high)))
                return "playerTwoImpawnTotal: integer|Long expected";
        if (message.playerThreeImpawnTotal != null && message.hasOwnProperty("playerThreeImpawnTotal"))
            if (!$util.isInteger(message.playerThreeImpawnTotal) && !(message.playerThreeImpawnTotal && $util.isInteger(message.playerThreeImpawnTotal.low) && $util.isInteger(message.playerThreeImpawnTotal.high)))
                return "playerThreeImpawnTotal: integer|Long expected";
        if (message.impawnList != null && message.hasOwnProperty("impawnList")) {
            if (!Array.isArray(message.impawnList))
                return "impawnList: array expected";
            for (var i = 0; i < message.impawnList.length; ++i) {
                var error = $root.MSG_IMPAWN_GAMEINFO_IMCL.Impawn.verify(message.impawnList[i]);
                if (error)
                    return "impawnList." + error;
            }
        }
        if (message.recordList != null && message.hasOwnProperty("recordList")) {
            if (!Array.isArray(message.recordList))
                return "recordList: array expected";
            for (var i = 0; i < message.recordList.length; ++i)
                if (typeof message.recordList[i] !== "boolean")
                    return "recordList: boolean[] expected";
        }
        if (message.twoWinRecord != null && message.hasOwnProperty("twoWinRecord"))
            if (!$util.isInteger(message.twoWinRecord))
                return "twoWinRecord: integer expected";
        if (message.threeWinRecord != null && message.hasOwnProperty("threeWinRecord"))
            if (!$util.isInteger(message.threeWinRecord))
                return "threeWinRecord: integer expected";
        if (message.restartHour != null && message.hasOwnProperty("restartHour"))
            if (!$util.isInteger(message.restartHour))
                return "restartHour: integer expected";
        if (message.pauseHour != null && message.hasOwnProperty("pauseHour"))
            if (!$util.isInteger(message.pauseHour))
                return "pauseHour: integer expected";
        return null;
    };

    /**
     * Creates a MSG_IMPAWN_GAMEINFO_IMCL message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_IMPAWN_GAMEINFO_IMCL} MSG_IMPAWN_GAMEINFO_IMCL
     */
    MSG_IMPAWN_GAMEINFO_IMCL.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_IMPAWN_GAMEINFO_IMCL)
            return object;
        var message = new $root.MSG_IMPAWN_GAMEINFO_IMCL();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.pid != null)
            message.pid = object.pid >>> 0;
        if (object.twoImpawnTotal != null)
            if ($util.Long)
                (message.twoImpawnTotal = $util.Long.fromValue(object.twoImpawnTotal)).unsigned = true;
            else if (typeof object.twoImpawnTotal === "string")
                message.twoImpawnTotal = parseInt(object.twoImpawnTotal, 10);
            else if (typeof object.twoImpawnTotal === "number")
                message.twoImpawnTotal = object.twoImpawnTotal;
            else if (typeof object.twoImpawnTotal === "object")
                message.twoImpawnTotal = new $util.LongBits(object.twoImpawnTotal.low >>> 0, object.twoImpawnTotal.high >>> 0).toNumber(true);
        if (object.threeImpawnTotal != null)
            if ($util.Long)
                (message.threeImpawnTotal = $util.Long.fromValue(object.threeImpawnTotal)).unsigned = true;
            else if (typeof object.threeImpawnTotal === "string")
                message.threeImpawnTotal = parseInt(object.threeImpawnTotal, 10);
            else if (typeof object.threeImpawnTotal === "number")
                message.threeImpawnTotal = object.threeImpawnTotal;
            else if (typeof object.threeImpawnTotal === "object")
                message.threeImpawnTotal = new $util.LongBits(object.threeImpawnTotal.low >>> 0, object.threeImpawnTotal.high >>> 0).toNumber(true);
        if (object.twoPlayerCount != null)
            message.twoPlayerCount = object.twoPlayerCount >>> 0;
        if (object.threePlayerCount != null)
            message.threePlayerCount = object.threePlayerCount >>> 0;
        if (object.twoAwardRate != null)
            message.twoAwardRate = object.twoAwardRate >>> 0;
        if (object.threeAwardRate != null)
            message.threeAwardRate = object.threeAwardRate >>> 0;
        if (object.playerTwoImpawnTimes != null)
            message.playerTwoImpawnTimes = object.playerTwoImpawnTimes >>> 0;
        if (object.playerThreeImpawnTimes != null)
            message.playerThreeImpawnTimes = object.playerThreeImpawnTimes >>> 0;
        if (object.playerTwoImpawnTotal != null)
            if ($util.Long)
                (message.playerTwoImpawnTotal = $util.Long.fromValue(object.playerTwoImpawnTotal)).unsigned = true;
            else if (typeof object.playerTwoImpawnTotal === "string")
                message.playerTwoImpawnTotal = parseInt(object.playerTwoImpawnTotal, 10);
            else if (typeof object.playerTwoImpawnTotal === "number")
                message.playerTwoImpawnTotal = object.playerTwoImpawnTotal;
            else if (typeof object.playerTwoImpawnTotal === "object")
                message.playerTwoImpawnTotal = new $util.LongBits(object.playerTwoImpawnTotal.low >>> 0, object.playerTwoImpawnTotal.high >>> 0).toNumber(true);
        if (object.playerThreeImpawnTotal != null)
            if ($util.Long)
                (message.playerThreeImpawnTotal = $util.Long.fromValue(object.playerThreeImpawnTotal)).unsigned = true;
            else if (typeof object.playerThreeImpawnTotal === "string")
                message.playerThreeImpawnTotal = parseInt(object.playerThreeImpawnTotal, 10);
            else if (typeof object.playerThreeImpawnTotal === "number")
                message.playerThreeImpawnTotal = object.playerThreeImpawnTotal;
            else if (typeof object.playerThreeImpawnTotal === "object")
                message.playerThreeImpawnTotal = new $util.LongBits(object.playerThreeImpawnTotal.low >>> 0, object.playerThreeImpawnTotal.high >>> 0).toNumber(true);
        if (object.impawnList) {
            if (!Array.isArray(object.impawnList))
                throw TypeError(".MSG_IMPAWN_GAMEINFO_IMCL.impawnList: array expected");
            message.impawnList = [];
            for (var i = 0; i < object.impawnList.length; ++i) {
                if (typeof object.impawnList[i] !== "object")
                    throw TypeError(".MSG_IMPAWN_GAMEINFO_IMCL.impawnList: object expected");
                message.impawnList[i] = $root.MSG_IMPAWN_GAMEINFO_IMCL.Impawn.fromObject(object.impawnList[i]);
            }
        }
        if (object.recordList) {
            if (!Array.isArray(object.recordList))
                throw TypeError(".MSG_IMPAWN_GAMEINFO_IMCL.recordList: array expected");
            message.recordList = [];
            for (var i = 0; i < object.recordList.length; ++i)
                message.recordList[i] = Boolean(object.recordList[i]);
        }
        if (object.twoWinRecord != null)
            message.twoWinRecord = object.twoWinRecord >>> 0;
        if (object.threeWinRecord != null)
            message.threeWinRecord = object.threeWinRecord >>> 0;
        if (object.restartHour != null)
            message.restartHour = object.restartHour >>> 0;
        if (object.pauseHour != null)
            message.pauseHour = object.pauseHour >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a MSG_IMPAWN_GAMEINFO_IMCL message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @static
     * @param {MSG_IMPAWN_GAMEINFO_IMCL} message MSG_IMPAWN_GAMEINFO_IMCL
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_IMPAWN_GAMEINFO_IMCL.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.impawnList = [];
            object.recordList = [];
        }
        if (options.defaults) {
            object.msgID = 0;
            object.pid = 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.twoImpawnTotal = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.twoImpawnTotal = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.threeImpawnTotal = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.threeImpawnTotal = options.longs === String ? "0" : 0;
            object.twoPlayerCount = 0;
            object.threePlayerCount = 0;
            object.twoAwardRate = 0;
            object.threeAwardRate = 0;
            object.playerTwoImpawnTimes = 0;
            object.playerThreeImpawnTimes = 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.playerTwoImpawnTotal = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.playerTwoImpawnTotal = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.playerThreeImpawnTotal = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.playerThreeImpawnTotal = options.longs === String ? "0" : 0;
            object.twoWinRecord = 0;
            object.threeWinRecord = 0;
            object.restartHour = 0;
            object.pauseHour = 0;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = message.pid;
        if (message.twoImpawnTotal != null && message.hasOwnProperty("twoImpawnTotal"))
            if (typeof message.twoImpawnTotal === "number")
                object.twoImpawnTotal = options.longs === String ? String(message.twoImpawnTotal) : message.twoImpawnTotal;
            else
                object.twoImpawnTotal = options.longs === String ? $util.Long.prototype.toString.call(message.twoImpawnTotal) : options.longs === Number ? new $util.LongBits(message.twoImpawnTotal.low >>> 0, message.twoImpawnTotal.high >>> 0).toNumber(true) : message.twoImpawnTotal;
        if (message.threeImpawnTotal != null && message.hasOwnProperty("threeImpawnTotal"))
            if (typeof message.threeImpawnTotal === "number")
                object.threeImpawnTotal = options.longs === String ? String(message.threeImpawnTotal) : message.threeImpawnTotal;
            else
                object.threeImpawnTotal = options.longs === String ? $util.Long.prototype.toString.call(message.threeImpawnTotal) : options.longs === Number ? new $util.LongBits(message.threeImpawnTotal.low >>> 0, message.threeImpawnTotal.high >>> 0).toNumber(true) : message.threeImpawnTotal;
        if (message.twoPlayerCount != null && message.hasOwnProperty("twoPlayerCount"))
            object.twoPlayerCount = message.twoPlayerCount;
        if (message.threePlayerCount != null && message.hasOwnProperty("threePlayerCount"))
            object.threePlayerCount = message.threePlayerCount;
        if (message.twoAwardRate != null && message.hasOwnProperty("twoAwardRate"))
            object.twoAwardRate = message.twoAwardRate;
        if (message.threeAwardRate != null && message.hasOwnProperty("threeAwardRate"))
            object.threeAwardRate = message.threeAwardRate;
        if (message.playerTwoImpawnTimes != null && message.hasOwnProperty("playerTwoImpawnTimes"))
            object.playerTwoImpawnTimes = message.playerTwoImpawnTimes;
        if (message.playerThreeImpawnTimes != null && message.hasOwnProperty("playerThreeImpawnTimes"))
            object.playerThreeImpawnTimes = message.playerThreeImpawnTimes;
        if (message.playerTwoImpawnTotal != null && message.hasOwnProperty("playerTwoImpawnTotal"))
            if (typeof message.playerTwoImpawnTotal === "number")
                object.playerTwoImpawnTotal = options.longs === String ? String(message.playerTwoImpawnTotal) : message.playerTwoImpawnTotal;
            else
                object.playerTwoImpawnTotal = options.longs === String ? $util.Long.prototype.toString.call(message.playerTwoImpawnTotal) : options.longs === Number ? new $util.LongBits(message.playerTwoImpawnTotal.low >>> 0, message.playerTwoImpawnTotal.high >>> 0).toNumber(true) : message.playerTwoImpawnTotal;
        if (message.playerThreeImpawnTotal != null && message.hasOwnProperty("playerThreeImpawnTotal"))
            if (typeof message.playerThreeImpawnTotal === "number")
                object.playerThreeImpawnTotal = options.longs === String ? String(message.playerThreeImpawnTotal) : message.playerThreeImpawnTotal;
            else
                object.playerThreeImpawnTotal = options.longs === String ? $util.Long.prototype.toString.call(message.playerThreeImpawnTotal) : options.longs === Number ? new $util.LongBits(message.playerThreeImpawnTotal.low >>> 0, message.playerThreeImpawnTotal.high >>> 0).toNumber(true) : message.playerThreeImpawnTotal;
        if (message.impawnList && message.impawnList.length) {
            object.impawnList = [];
            for (var j = 0; j < message.impawnList.length; ++j)
                object.impawnList[j] = $root.MSG_IMPAWN_GAMEINFO_IMCL.Impawn.toObject(message.impawnList[j], options);
        }
        if (message.recordList && message.recordList.length) {
            object.recordList = [];
            for (var j = 0; j < message.recordList.length; ++j)
                object.recordList[j] = message.recordList[j];
        }
        if (message.twoWinRecord != null && message.hasOwnProperty("twoWinRecord"))
            object.twoWinRecord = message.twoWinRecord;
        if (message.threeWinRecord != null && message.hasOwnProperty("threeWinRecord"))
            object.threeWinRecord = message.threeWinRecord;
        if (message.restartHour != null && message.hasOwnProperty("restartHour"))
            object.restartHour = message.restartHour;
        if (message.pauseHour != null && message.hasOwnProperty("pauseHour"))
            object.pauseHour = message.pauseHour;
        return object;
    };

    /**
     * Converts this MSG_IMPAWN_GAMEINFO_IMCL to JSON.
     * @function toJSON
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    MSG_IMPAWN_GAMEINFO_IMCL.Impawn = (function() {

        /**
         * Properties of an Impawn.
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL
         * @interface IImpawn
         * @property {boolean|null} [isTwo] Impawn isTwo
         * @property {number|Long|null} [coinSum] Impawn coinSum
         * @property {string|null} [nickname] Impawn nickname
         */

        /**
         * Constructs a new Impawn.
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL
         * @classdesc Represents an Impawn.
         * @implements IImpawn
         * @constructor
         * @param {MSG_IMPAWN_GAMEINFO_IMCL.IImpawn=} [properties] Properties to set
         */
        function Impawn(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Impawn isTwo.
         * @member {boolean} isTwo
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @instance
         */
        Impawn.prototype.isTwo = false;

        /**
         * Impawn coinSum.
         * @member {number|Long} coinSum
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @instance
         */
        Impawn.prototype.coinSum = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Impawn nickname.
         * @member {string} nickname
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @instance
         */
        Impawn.prototype.nickname = "";

        /**
         * Creates a new Impawn instance using the specified properties.
         * @function create
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @static
         * @param {MSG_IMPAWN_GAMEINFO_IMCL.IImpawn=} [properties] Properties to set
         * @returns {MSG_IMPAWN_GAMEINFO_IMCL.Impawn} Impawn instance
         */
        Impawn.create = function create(properties) {
            return new Impawn(properties);
        };

        /**
         * Encodes the specified Impawn message. Does not implicitly {@link MSG_IMPAWN_GAMEINFO_IMCL.Impawn.verify|verify} messages.
         * @function encode
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @static
         * @param {MSG_IMPAWN_GAMEINFO_IMCL.IImpawn} message Impawn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Impawn.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.isTwo != null && message.hasOwnProperty("isTwo"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.isTwo);
            if (message.coinSum != null && message.hasOwnProperty("coinSum"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.coinSum);
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.nickname);
            return writer;
        };

        /**
         * Encodes the specified Impawn message, length delimited. Does not implicitly {@link MSG_IMPAWN_GAMEINFO_IMCL.Impawn.verify|verify} messages.
         * @function encodeDelimited
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @static
         * @param {MSG_IMPAWN_GAMEINFO_IMCL.IImpawn} message Impawn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Impawn.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Impawn message from the specified reader or buffer.
         * @function decode
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MSG_IMPAWN_GAMEINFO_IMCL.Impawn} Impawn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Impawn.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_IMPAWN_GAMEINFO_IMCL.Impawn();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.isTwo = reader.bool();
                    break;
                case 2:
                    message.coinSum = reader.uint64();
                    break;
                case 3:
                    message.nickname = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Impawn message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {MSG_IMPAWN_GAMEINFO_IMCL.Impawn} Impawn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Impawn.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Impawn message.
         * @function verify
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Impawn.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.isTwo != null && message.hasOwnProperty("isTwo"))
                if (typeof message.isTwo !== "boolean")
                    return "isTwo: boolean expected";
            if (message.coinSum != null && message.hasOwnProperty("coinSum"))
                if (!$util.isInteger(message.coinSum) && !(message.coinSum && $util.isInteger(message.coinSum.low) && $util.isInteger(message.coinSum.high)))
                    return "coinSum: integer|Long expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            return null;
        };

        /**
         * Creates an Impawn message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {MSG_IMPAWN_GAMEINFO_IMCL.Impawn} Impawn
         */
        Impawn.fromObject = function fromObject(object) {
            if (object instanceof $root.MSG_IMPAWN_GAMEINFO_IMCL.Impawn)
                return object;
            var message = new $root.MSG_IMPAWN_GAMEINFO_IMCL.Impawn();
            if (object.isTwo != null)
                message.isTwo = Boolean(object.isTwo);
            if (object.coinSum != null)
                if ($util.Long)
                    (message.coinSum = $util.Long.fromValue(object.coinSum)).unsigned = true;
                else if (typeof object.coinSum === "string")
                    message.coinSum = parseInt(object.coinSum, 10);
                else if (typeof object.coinSum === "number")
                    message.coinSum = object.coinSum;
                else if (typeof object.coinSum === "object")
                    message.coinSum = new $util.LongBits(object.coinSum.low >>> 0, object.coinSum.high >>> 0).toNumber(true);
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            return message;
        };

        /**
         * Creates a plain object from an Impawn message. Also converts values to other types if specified.
         * @function toObject
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @static
         * @param {MSG_IMPAWN_GAMEINFO_IMCL.Impawn} message Impawn
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Impawn.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.isTwo = false;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.coinSum = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.coinSum = options.longs === String ? "0" : 0;
                object.nickname = "";
            }
            if (message.isTwo != null && message.hasOwnProperty("isTwo"))
                object.isTwo = message.isTwo;
            if (message.coinSum != null && message.hasOwnProperty("coinSum"))
                if (typeof message.coinSum === "number")
                    object.coinSum = options.longs === String ? String(message.coinSum) : message.coinSum;
                else
                    object.coinSum = options.longs === String ? $util.Long.prototype.toString.call(message.coinSum) : options.longs === Number ? new $util.LongBits(message.coinSum.low >>> 0, message.coinSum.high >>> 0).toNumber(true) : message.coinSum;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            return object;
        };

        /**
         * Converts this Impawn to JSON.
         * @function toJSON
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Impawn.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Impawn;
    })();

    return MSG_IMPAWN_GAMEINFO_IMCL;
})();

module.exports = $root;
