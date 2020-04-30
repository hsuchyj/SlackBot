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
class MessageBackReceiverDialog extends TriggerActionDialog_1.TriggerActionDialog {
    static step1(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            session.send(locale_1.Strings.messageBack_receiver_msg);
            session.send(locale_1.Strings.messageBack_receiver_incoming_text, session.message.text);
            if (session.message && session.message.value) {
                let messageBackPayload = JSON.stringify(session.message.value);
                session.send(locale_1.Strings.messageBack_receiver_payload, messageBackPayload);
            }
            else {
                session.send(locale_1.Strings.messageBack_receiver_no_payload);
            }
            session.endDialog();
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.MessageBackReceiverDialogId, DialogMatches_1.DialogMatches.MessageBackReceiverDialogMatch, MessageBackReceiverDialog.step1);
    }
}
exports.MessageBackReceiverDialog = MessageBackReceiverDialog;

//# sourceMappingURL=MessageBackReceiverDialog.js.map
