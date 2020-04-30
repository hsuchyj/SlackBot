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
const DialogIds_1 = require("../../../utils/DialogIds");
const DialogMatches_1 = require("../../../utils/DialogMatches");
const locale_1 = require("../../../locale/locale");
const teams = require("botbuilder-teams");
class AtMentionDialog extends TriggerActionDialog_1.TriggerActionDialog {
    static atMentionUser(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let atMention = {
                // name to display for at-mention
                name: session.message.address.user.name,
                // user id of person to at-mention
                id: session.message.address.user.id,
            };
            // because of the way .text and .addMentionToText work you, first, have to add the text to the message
            // then you can add the at-mention to the text
            let msg = new teams.TeamsMessage(session).text(locale_1.Strings.at_mention);
            let msgWithAtMention = msg.addMentionToText(atMention);
            session.send(msgWithAtMention);
            session.endDialog();
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.AtMentionDialogId, DialogMatches_1.DialogMatches.AtMentionDialogMatch, AtMentionDialog.atMentionUser);
    }
}
exports.AtMentionDialog = AtMentionDialog;

//# sourceMappingURL=AtMentionDialog.js.map
