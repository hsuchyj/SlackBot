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
const config = require("config");
class UpdateCardMsgDialog extends TriggerActionDialog_1.TriggerActionDialog {
    // update the card, if user has already setup the card message from below dialog file using update button click
    // microsoft-teams-sample-complete-node\src\dialogs\examples\teams\UpdateCardMsgSetupDialog.ts
    static updateCardMessage(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (session.message.replyToId) {
                let updateCardCounter = session.message.value.updateCounterKey;
                let messageBackButtonValue = JSON.stringify({ updateCounterKey: ++updateCardCounter });
                let messageBackButton = builder.CardAction.messageBack(session, messageBackButtonValue)
                    .displayText(locale_1.Strings.messageBack_button_display_text)
                    .title(locale_1.Strings.update_card_button)
                    .text("update card message"); // This must be a string that routes to UpdateCardMsgDialog, which handles card updates
                let newCard = new builder.HeroCard(session)
                    .title(locale_1.Strings.updated_card_title, updateCardCounter)
                    .subtitle(locale_1.Strings.updated_card_subtitle)
                    .text(locale_1.Strings.default_text)
                    .images([
                    new builder.CardImage(session)
                        .url(config.get("app.baseUri") + "/assets/computer_person.jpg")
                        .alt(session.gettext(locale_1.Strings.img_default)),
                ])
                    .buttons([messageBackButton]);
                let addressOfMessageToUpdate = Object.assign({}, session.message.address, { id: session.message.replyToId });
                let msg = new builder.Message(session)
                    .address(addressOfMessageToUpdate)
                    .addAttachment(newCard);
                session.connector.update(msg.toMessage(), (err, address) => {
                    if (!err) {
                        session.send(locale_1.Strings.updated_msg_confirmation);
                    }
                    else {
                        session.send(locale_1.Strings.update_card_error + err.message);
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
        super(bot, DialogIds_1.DialogIds.UpdateCardMsgDialogId, DialogMatches_1.DialogMatches.UpdateCardMsgDialogMatch, UpdateCardMsgDialog.updateCardMessage);
    }
}
exports.UpdateCardMsgDialog = UpdateCardMsgDialog;

//# sourceMappingURL=UpdateCardMsgDialog.js.map
