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
const locale_1 = require("../../../locale/locale");
class FetchTeamInfoDialog extends TriggerActionDialog_1.TriggerActionDialog {
    static fetchTeamInfoPayload(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // casting to keep away typescript errors
            let teamsChatConnector = session.connector;
            let msgAddress = session.message.address;
            let msgServiceUrl = msgAddress.serviceUrl;
            // if a message is from a channel, use the team.id to fetch the roster
            if (!DialogUtils_1.isMessageFromChannel(session.message)) {
                session.send(locale_1.Strings.teaminfo_notinchannel_error);
            }
            else {
                let teamId = session.message.sourceEvent.team.id;
                teamsChatConnector.fetchTeamInfo(msgServiceUrl, teamId, (err, result) => {
                    if (!err) {
                        session.send(FetchTeamInfoDialog.generateTableForTeamInfo(result));
                    }
                    else {
                        session.send(locale_1.Strings.teaminfo_error + err.message);
                    }
                });
            }
            session.endDialog();
        });
    }
    // Generate the team info data in table format
    static generateTableForTeamInfo(teamDetails) {
        if (teamDetails) {
            // Currently, aadGroupId is present but is not defined in the TeamInfo typings
            return `<table border='1'>
                        <tr><td> Team id </td><td>${teamDetails.id}</td></tr>
                        <tr><td> Team name </td><td>${teamDetails.name}</td></tr>
                        <tr><td> AAD group id </td><td>${teamDetails.aadGroupId}</td><tr>
                    </table>`;
        }
        return "";
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.FetchTeamInfoDialogId, DialogMatches_1.DialogMatches.FetchTeamInfoDialogMatch, FetchTeamInfoDialog.fetchTeamInfoPayload);
    }
}
exports.FetchTeamInfoDialog = FetchTeamInfoDialog;

//# sourceMappingURL=FetchTeamInfoDialog.js.map
