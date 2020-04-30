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
const TriggerActionDialog_1 = require("../../../utils/TriggerActionDialog");
const DialogUtils_1 = require("../../../utils/DialogUtils");
const DialogIds_1 = require("../../../utils/DialogIds");
const DialogMatches_1 = require("../../../utils/DialogMatches");
class FetchRosterDialog extends TriggerActionDialog_1.TriggerActionDialog {
    static fetchRosterPayload(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // casting to keep away typescript errors
            let teamsChatConnector = session.connector;
            let msgAddress = session.message.address;
            let msgServiceUrl = msgAddress.serviceUrl;
            // if a message is from a channel, use the team.id to fetch the roster
            let currId = null;
            if (DialogUtils_1.isMessageFromChannel(session.message)) {
                currId = session.message.sourceEvent.team.id;
            }
            else {
                currId = session.message.address.conversation.id;
            }
            teamsChatConnector.fetchMembers(msgServiceUrl, currId, (err, result) => {
                if (!err) {
                    session.send(JSON.stringify(result));
                }
                else {
                    session.error(err);
                }
                session.endDialog();
            });
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.FetchRosterDialogId, DialogMatches_1.DialogMatches.FetchRosterDialogMatch, FetchRosterDialog.fetchRosterPayload);
    }
}
exports.FetchRosterDialog = FetchRosterDialog;

//# sourceMappingURL=FetchRosterDialog.js.map
