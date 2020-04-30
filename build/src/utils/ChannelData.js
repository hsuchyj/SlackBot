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
const DialogUtils = require("./DialogUtils");
// Helper class to manage channel data
class ChannelData {
    // Gets the channel data from the Session object
    static get(session) {
        return session.channelData;
    }
    // Saves the channel data to channel data storage
    static saveToStorage(session, storage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (storage) {
                let teamId = DialogUtils.getTeamId(session.message);
                let channelId = DialogUtils.getChannelId(session.message);
                let channelStorageData = session;
                if (channelId) {
                    let context = { teamId: teamId, channelId: channelId };
                    yield storage.saveData(context, channelStorageData);
                }
                else {
                    // This is not in the context of a channel
                    // Channel data is conversation data, which is saved automatically by bot framework SDK
                }
            }
        });
    }
}
exports.ChannelData = ChannelData;

//# sourceMappingURL=ChannelData.js.map
