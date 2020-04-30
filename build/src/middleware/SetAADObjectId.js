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
const DialogUtils = require("../utils/DialogUtils");
const MongoDbAADObjectIdStorage_1 = require("../storage/MongoDbAADObjectIdStorage");
class SetAADObjectId {
    constructor() {
        this.botbuilder = (session, next) => {
            let message = session.message;
            // let botStorage = await MongoDbAADObjectIdStorage.createConnection();
            // let x = {
            //     aadObjectId: "",
            //     vstsToken: "token",
            //     vstsRefreshToken: "refresh_token",
            // };
            // await botStorage.saveTokensByAADObjectId(x);
            // await botStorage.close();
            // next();
            if (message) {
                // console.log("User data: " + JSON.stringify(session.userData));
                if (session.userData.aadObjectId) {
                    // Great! Do nothing.
                    // console.log("Did nothing - woo");
                    next();
                }
                else {
                    // casting to keep away typescript errors
                    let teamsChatConnector = session.connector;
                    let msgAddress = session.message.address;
                    let msgServiceUrl = msgAddress.serviceUrl;
                    // if a message is from a channel, use the team.id to fetch the roster
                    let currId = null;
                    if (DialogUtils.isMessageFromChannel(session.message)) {
                        currId = session.message.sourceEvent.team.id;
                    }
                    else {
                        currId = session.message.address.conversation.id;
                    }
                    teamsChatConnector.fetchMembers(msgServiceUrl, currId, (err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (!err) {
                            // get data for _id:aad_id - if doesn't exist, just add aad to userData
                            let aadObjectId = null;
                            for (let i = 0; i < result.length; i++) {
                                let curr = result[i];
                                if (curr.id === session.message.address.user.id) {
                                    aadObjectId = curr.objectId;
                                    break;
                                }
                            }
                            if (aadObjectId) {
                                session.userData.aadObjectId = aadObjectId;
                                let botStorage = yield MongoDbAADObjectIdStorage_1.MongoDbAADObjectIdStorage.createConnection();
                                let entry = yield botStorage.getEntryByAADObjectId(aadObjectId);
                                if (DialogUtils.isEmptyObj(entry)) {
                                    // no response from database so there is no entry from a tab first
                                    // console.log("Should have just saved AAD ID");
                                }
                                else {
                                    // console.log("Should have saved AAD ID, tokens, and deleted aadObjectId: entry");
                                    // write data to user data
                                    let vstsAuth = {
                                        token: entry.vstsToken,
                                        refreshToken: entry.vstsRefreshToken,
                                    };
                                    session.userData.vstsAuth = vstsAuth;
                                    // delete AAD entry
                                    yield botStorage.deleteEntryByAADObjectId(aadObjectId);
                                }
                                yield botStorage.close();
                            }
                        }
                        else {
                            session.error(err);
                        }
                        next();
                    }));
                    // see if just addId exists
                    // if it doesn't then just add addId to current session.userData
                }
            }
        };
    }
}
exports.SetAADObjectId = SetAADObjectId;

//# sourceMappingURL=SetAADObjectId.js.map
