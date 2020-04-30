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
// Populates channelData property in session with channel data
// Channel data is specific to a Microsoft Teams channel for messages in channel context,
// for 1:1 messages it is the same as conversationData.
class LoadBotChannelData {
    constructor(channelStorage) {
        this.channelStorage = channelStorage;
        this.botbuilder = (session, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.channelStorage) {
                    let channelStorageData = session;
                    let channelId = DialogUtils.getChannelId(session.message);
                    if (channelId) {
                        let data = yield this.channelStorage.getData({ channelId: channelId });
                        channelStorageData.channelData = data.channelData || {};
                    }
                    else {
                        // In conversations not in channel context, the conversation data is the channel data
                        channelStorageData.channelData = session.conversationData;
                    }
                }
            }
            catch (e) {
                // console.log(e);
            }
            next();
        });
    }
}
exports.LoadBotChannelData = LoadBotChannelData;

//# sourceMappingURL=LoadBotChannelData.js.map
