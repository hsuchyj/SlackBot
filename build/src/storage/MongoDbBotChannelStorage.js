"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const mongodb = require("mongodb");
/** Replacable storage system used by UniversalBot. */
class MongoDbBotChannelStorage {
    constructor(collectionName, connectionString) {
        this.collectionName = collectionName;
        this.connectionString = connectionString;
    }
    // Reads in data from storage
    getData(context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (context.channelId) {
                yield this.initialize();
                let filter = { "_id": this.getChannelDataId(context) };
                let document = yield this.botStateCollection.findOne(filter);
                if (document && document.data) {
                    return { channelData: document.data };
                }
                else {
                    return {};
                }
            }
            else {
                return {};
            }
        });
    }
    // Writes out data from storage
    saveData(context, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (context.teamId && context.channelId && data.channelData) {
                yield this.initialize();
                let filter = { "_id": this.getChannelDataId(context) };
                let document = {
                    teamId: context.teamId,
                    channelId: context.channelId,
                    data: data.channelData,
                };
                yield this.botStateCollection.updateOne(filter, document, { upsert: true });
            }
        });
    }
    // Returns a promise that is resolved when this instance is initialized
    initialize() {
        if (!this.initializePromise) {
            this.initializePromise = this.initializeWorker();
        }
        return this.initializePromise;
    }
    // Initialize this instance
    initializeWorker() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.mongoDb) {
                try {
                    this.mongoDb = yield mongodb.MongoClient.connect(this.connectionString);
                    this.botStateCollection = yield this.mongoDb.collection(this.collectionName);
                }
                catch (e) {
                    // console.log(e.toString());
                    this.close();
                    this.initializePromise = null;
                }
            }
        });
    }
    // Close the connection to the database
    close() {
        this.botStateCollection = null;
        if (this.mongoDb) {
            this.mongoDb.close();
            this.mongoDb = null;
        }
    }
    // Get id for channel data documents
    getChannelDataId(context) {
        assert(context.channelId);
        return `channel:${context.channelId}`;
    }
}
exports.MongoDbBotChannelStorage = MongoDbBotChannelStorage;

//# sourceMappingURL=MongoDbBotChannelStorage.js.map
