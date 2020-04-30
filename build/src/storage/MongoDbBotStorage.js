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
const async = require("async");
const mongodb = require("mongodb");
// tslint:disable-next-line:variable-name
const Fields = {
    userData: "userData",
    conversationData: "conversationData",
    privateConversationData: "privateConversationData",
};
/** Replacable storage system used by UniversalBot. */
class MongoDbBotStorage {
    constructor(collectionName, connectionString) {
        this.collectionName = collectionName;
        this.connectionString = connectionString;
    }
    // Reads in data from storage
    getData(context, callback) {
        this.initialize().then(() => {
            // Build list of read commands
            let list = [];
            if (context.userId) {
                if (context.persistUserData) {
                    // Read userData
                    list.push({
                        id: this.getUserDataId(context),
                        field: Fields.userData,
                    });
                }
                if (context.conversationId) {
                    // Read privateConversationData
                    list.push({
                        id: this.getPrivateConversationDataId(context),
                        field: Fields.privateConversationData,
                    });
                }
            }
            if (context.persistConversationData && context.conversationId) {
                // Read conversationData
                list.push({
                    id: this.getConversationDataId(context),
                    field: Fields.conversationData,
                });
            }
            // Execute reads in parallel
            let data = {};
            async.each(list, (entry, cb) => {
                let filter = { "_id": entry.id };
                this.botStateCollection.findOne(filter, (error, entity) => {
                    if (!error) {
                        if (entity) {
                            // let botData = entity.data || {};
                            let botData = entity || {};
                            try {
                                data[entry.field] = botData != null ? botData : null;
                            }
                            catch (e) {
                                error = e;
                            }
                            cb(error);
                        }
                        else {
                            data[entry.field] = null;
                            cb(error);
                        }
                    }
                    else {
                        cb(error);
                    }
                });
            }, (err) => {
                if (!err) {
                    callback(null, data);
                }
                else {
                    let m = err.toString();
                    callback(err instanceof Error ? err : new Error(m), null);
                }
            });
        }).catch(err => callback(err, null));
    }
    // Writes out data from storage
    saveData(context, data, callback) {
        // We initialize on every call, but only block on the first call. The reason for this is that we can't run asynchronous initialization in the class ctor
        this.initialize().then(() => {
            // Build list of write commands
            let list = [];
            if (context.userId) {
                if (context.persistUserData) {
                    // Write userData
                    list.push({
                        id: this.getUserDataId(context),
                        userId: context.userId,
                        field: Fields.userData,
                        botData: data.userData,
                    });
                }
                if (context.conversationId) {
                    // Write privateConversationData
                    list.push({
                        id: this.getPrivateConversationDataId(context),
                        userId: context.userId,
                        conversationId: context.conversationId,
                        field: Fields.privateConversationData,
                        botData: data.privateConversationData,
                    });
                }
            }
            if (context.persistConversationData && context.conversationId) {
                // Write conversationData
                list.push({
                    id: this.getConversationDataId(context),
                    conversationId: context.conversationId,
                    field: Fields.conversationData,
                    botData: data.conversationData,
                });
            }
            // Execute writes in parallel
            async.each(list, (entry, errorCallback) => {
                let filter = { "_id": entry.id };
                // let document = {
                //     // Tag each document with user id so we can find all user data later
                //     userId: entry.userId || "",
                //     data: entry.botData,
                // };
                let document = entry.botData;
                document.userId = entry.userId || "";
                this.botStateCollection.updateOne(filter, document, { upsert: true }, err => errorCallback(err));
            }, (err) => {
                if (callback) {
                    if (!err) {
                        callback(null);
                    }
                    else {
                        let m = err.toString();
                        callback(err instanceof Error ? err : new Error(m));
                    }
                }
            });
        }, (err) => callback(err));
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
                    this.botStateCollection.createIndex({ userId: 1 });
                }
                catch (e) {
                    // console.log(`Error initializing MongoDB: ${e.message}`, e);
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
    // Get id for user data documents
    getUserDataId(context) {
        assert(context.userId);
        return `user:${context.userId}`;
    }
    // Get id for conversation data documents
    getConversationDataId(context) {
        assert(context.conversationId);
        return `conversation:${context.conversationId}`;
    }
    // Get id for conversation data documents
    getPrivateConversationDataId(context) {
        assert(context.conversationId && context.userId);
        return `conversation:${context.conversationId}/user:${context.userId}`;
    }
}
exports.MongoDbBotStorage = MongoDbBotStorage;

//# sourceMappingURL=MongoDbBotStorage.js.map
