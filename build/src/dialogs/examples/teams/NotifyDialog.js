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
const DialogUtils_1 = require("../../../utils/DialogUtils");
class NotifyDialog extends TriggerActionDialog_1.TriggerActionDialog {
    static step1(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (session.message.source === "msteams") {
                if (DialogUtils_1.isMessageFromChannel(session.message)) {
                    // it won't work in channel
                    session.send(locale_1.Strings.notifyerror_msg);
                    session.endDialog();
                }
                else {
                    // Actvity notications will only work in 1 to 1 chat
                    let msg = new teams.TeamsMessage(session).text(locale_1.Strings.notify_msg);
                    let alertFlag = teams.TeamsMessage.alertFlag;
                    let notification = msg.sourceEvent({
                        "msteams": alertFlag,
                    });
                    session.send(notification);
                    session.endDialog();
                }
            }
            else if (session.message.source === "emulator") {
                session.send(locale_1.Strings.notifyerror_msg);
                session.endDialog();
            }
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.NotifyDialogId, DialogMatches_1.DialogMatches.NotifyDialogMatch, NotifyDialog.step1);
    }
}
exports.NotifyDialog = NotifyDialog;

//# sourceMappingURL=NotifyDialog.js.map
