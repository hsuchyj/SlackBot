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
// Demonstrates using a signin action to show a login page in a popup
class PopupSignInDialog extends TriggerActionDialog_1.TriggerActionDialog {
    static sendPopupSigninCard(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let popUpUrl = config.get("app.baseUri") + "/tab/tabConfig/popUpSignin.html?height=400&width=400";
            session.send(new builder.Message(session).addAttachment(new builder.HeroCard(session)
                .title(locale_1.Strings.popupsignin_card_title)
                .buttons([
                new builder.CardAction(session)
                    .type("signin")
                    .title(locale_1.Strings.popupsignin_button_title)
                    .value(popUpUrl)
            ])));
            session.endDialog();
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.PopupSignInDialogId, DialogMatches_1.DialogMatches.PopUpSignInDialogMatch, PopupSignInDialog.sendPopupSigninCard);
    }
}
exports.PopupSignInDialog = PopupSignInDialog;

//# sourceMappingURL=PopupSignInDialog.js.map
