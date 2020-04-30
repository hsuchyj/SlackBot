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
class HeroCardDialog extends TriggerActionDialog_1.TriggerActionDialog {
    static step1(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let cards = new Array();
            let numbCards = 3;
            for (let i = 0; i < numbCards; i++) {
                let buttons = new Array();
                /**
                 * This is an example of a button using invoke to begin a new dialog
                 * the response field is used as a way to pass data to the newly begun dialog
                 * the response field is not needed
                 *
                 * This is an example of getting the input data from the args
                 * when dialog is begun with beginDialog()
                 */
                // let input = "";
                // if (args.response) {
                //     input = args.response;
                // }
                buttons.push(new builder.CardAction(session)
                    .type("invoke")
                    .title(locale_1.Strings.invoke_button_hello_dialog)
                    .value("{" +
                    "\"dialog\": \"" + DialogIds_1.DialogIds.HelloDialogId + "\", " +
                    "\"response\": \"Information for called intent\"" +
                    "}"));
                buttons.push(builder.CardAction.imBack(session, session.gettext(locale_1.Strings.hello_imback), locale_1.Strings.imback_button_hello_dialog));
                let messageBackButtonValue = JSON.stringify({ anything: "abc12345" });
                let messageBackButton = builder.CardAction.messageBack(session, messageBackButtonValue, locale_1.Strings.messageBack_button_title)
                    .displayText(locale_1.Strings.messageBack_button_display_text)
                    .text(locale_1.Strings.messageBack_button_text); // this matches match for MessageBackReceiverDialog
                buttons.push(messageBackButton);
                let newCard = new builder.HeroCard(session)
                    .title(locale_1.Strings.default_title)
                    .subtitle(locale_1.Strings.default_subtitle)
                    .text(locale_1.Strings.default_text)
                    .images([
                    new builder.CardImage(session)
                        .url(config.get("app.baseUri") + "/assets/computer_person.jpg")
                        .alt(session.gettext(locale_1.Strings.img_default)),
                ])
                    .buttons(buttons)
                    .tap(builder.CardAction.imBack(session, session.gettext(locale_1.Strings.hello_imback)));
                cards.push(newCard);
            }
            session.send(new builder.Message(session)
                // .attachmentLayout("list")
                .attachmentLayout("carousel")
                .attachments(cards));
            session.endDialog();
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.HeroCardDialogId, DialogMatches_1.DialogMatches.HeroCardDialogMatch, HeroCardDialog.step1);
    }
}
exports.HeroCardDialog = HeroCardDialog;

//# sourceMappingURL=HeroCardDialog.js.map
