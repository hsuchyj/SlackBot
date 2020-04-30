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
// import * as assert from "assert";
const mongodb = require("mongodb");
// import { IBotChannelStorageContext, IBotChannelStorageData, IBotChannelStorage } from "./BotChannelStorage";
const config = require("config");
;
/** Replacable storage system used by UniversalBot. */
class MongoDbTempTokensStorage {
    constructor(collectionName, connectionString) {
        this.collectionName = collectionName;
        this.connectionString = connectionString;
    }
    static createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            let collectionName = config.get("mongoDb.tempTokensCollection");
            let connectionString = config.get("mongoDb.connectionString");
            let resultMongoDbTempTokensStorage = new MongoDbTempTokensStorage(collectionName, connectionString);
            yield resultMongoDbTempTokensStorage.initialize();
            return resultMongoDbTempTokensStorage;
        });
    }
    // Reads in data from storage
    getTempTokensAsync(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (context.channelId) {
            // await this.initialize();
            if (!this.tempTokensCollection) {
                return {};
            }
            let filter = { "_id": _id };
            let tempTokensEntry = yield this.tempTokensCollection.findOne(filter);
            // await this.close();
            if (tempTokensEntry) {
                return tempTokensEntry;
            }
            else {
                return {};
            }
            // } else {
            //     return { };
            // }
        });
    }
    // Writes out data from storage
    saveTempTokensAsync(tempTokensEntry) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (context.teamId && context.channelId && data.channelData) {
            // await this.initialize();
            if (!this.tempTokensCollection) {
                return;
            }
            let filter = { "_id": tempTokensEntry._id };
            // let document = {
            //     teamId: context.teamId,
            //     channelId: context.channelId,
            //     data: data.channelData,
            // };
            // let document = {
            //     token: tokens.token,
            //     refreshToken: tokens.refreshToken,
            // };
            yield this.tempTokensCollection.updateOne(filter, tempTokensEntry, { upsert: true });
            // await this.close();
            // }
        });
    }
    // Writes out data from storage
    deleteTempTokensAsync(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (context.teamId && context.channelId && data.channelData) {
            // await this.initialize();
            if (!this.tempTokensCollection) {
                return;
            }
            let filter = { "_id": _id };
            // let document = {
            //     teamId: context.teamId,
            //     channelId: context.channelId,
            //     data: data.channelData,
            // };
            // let document = {
            //     token: tokens.token,
            //     refreshToken: tokens.refreshToken,
            // };
            yield this.tempTokensCollection.deleteMany(filter);
            // await this.close();
            // }
        });
    }
    // Close the connection to the database
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            // this.initializePromise = null;
            this.tempTokensCollection = null;
            if (this.mongoDb) {
                yield this.mongoDb.close();
                this.mongoDb = null;
            }
        });
    }
    // Returns a promise that is resolved when this instance is initialized
    // private initialize(): Promise<void> {
    //     if (!this.initializePromise) {
    //         this.initializePromise = this.initializeWorker();
    //     }
    //     return this.initializePromise;
    // }
    // Initialize this instance
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.mongoDb) {
                try {
                    this.mongoDb = yield mongodb.MongoClient.connect(this.connectionString);
                    this.tempTokensCollection = yield this.mongoDb.collection(this.collectionName);
                }
                catch (e) {
                    // console.log(e.toString());
                    yield this.close();
                    // this.initializePromise = null;
                }
            }
        });
    }
}
exports.MongoDbTempTokensStorage = MongoDbTempTokensStorage;

//# sourceMappingURL=MongoDbTempTokensStorage.js.map
