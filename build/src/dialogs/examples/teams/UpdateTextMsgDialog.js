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
const builder = require("botbuilder");
const TriggerActionDialog_1 = require("../../../utils/TriggerActionDialog");
const DialogIds_1 = require("../../../utils/DialogIds");
const DialogMatches_1 = require("../../../utils/DialogMatches");
const locale_1 = require("../../../locale/locale");
class UpdateTextMsgDialog extends TriggerActionDialog_1.TriggerActionDialog {
    static updateTextMessage(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (session.conversationData.lastTextMessage) {
                let msg = new builder.Message(session)
                    .address(session.conversationData.lastTextMessage)
                    .text(locale_1.Strings.updated_text_msg);
                session.connector.update(msg.toMessage(), (err, address) => {
                    if (!err) {
                        // do not need to save the incoming address because Teams does not change it
                        session.send(locale_1.Strings.updated_msg_confirmation);
                    }
                    else {
                        session.error(err);
                    }
                    session.endDialog();
                });
            }
            else {
                session.send(locale_1.Strings.no_msg_to_update);
                session.endDialog();
            }
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.UpdateTextMsgDialogId, DialogMatches_1.DialogMatches.UpdateTextMsgDialogMatch, UpdateTextMsgDialog.updateTextMessage);
    }
}
exports.UpdateTextMsgDialog = UpdateTextMsgDialog;

//# sourceMappingURL=UpdateTextMsgDialog.js.map
