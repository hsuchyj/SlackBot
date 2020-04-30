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
class UpdateCardMsgSetupDialog extends TriggerActionDialog_1.TriggerActionDialog {
    // setup the card message and then user can update the card using below update dialog file
    // microsoft-teams-sample-complete-node\src\dialogs\examples\teams\UpdateCardMsgDialog.ts
    static setupCardMessage(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let updateCardCounter = 0;
            let messageBackButtonValue = JSON.stringify({ updateCounterKey: updateCardCounter });
            let messageBackButton = builder.CardAction.messageBack(session, messageBackButtonValue)
                .displayText(locale_1.Strings.messageBack_button_display_text)
                .title(locale_1.Strings.update_card_button)
                .text("update card message"); // This must be a string that routes to UpdateCardMsgDialog, which handles card updates
            let card = new builder.HeroCard(session)
                .title(locale_1.Strings.default_title)
                .subtitle(locale_1.Strings.default_subtitle)
                .text(locale_1.Strings.default_text)
                .images([
                new builder.CardImage(session)
                    .url(config.get("app.baseUri") + "/assets/computer_person.jpg")
                    .alt(session.gettext(locale_1.Strings.img_default)),
            ])
                .buttons([messageBackButton]);
            let msg = new builder.Message(session)
                .addAttachment(card);
            session.endDialog(msg);
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.UpdateCardMsgSetupDialogId, DialogMatches_1.DialogMatches.UpdateCardMsgSetupDialogMatch, UpdateCardMsgSetupDialog.setupCardMessage);
    }
}
exports.UpdateCardMsgSetupDialog = UpdateCardMsgSetupDialog;

//# sourceMappingURL=UpdateCardMsgSetupDialog.js.map
