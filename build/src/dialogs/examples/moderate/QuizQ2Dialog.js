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
let config = require("config");
const DialogIds_1 = require("../../../utils/DialogIds");
const DialogMatches_1 = require("../../../utils/DialogMatches");
const locale_1 = require("../../../locale/locale");
class QuizQ2Dialog extends TriggerActionDialog_1.TriggerActionDialog {
    static step1(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let buttons = new Array();
            buttons.push(builder.CardAction.imBack(session, "y_e_s", session.gettext(locale_1.Strings.game_button_yes) + "2"));
            buttons.push(builder.CardAction.imBack(session, "n_o", session.gettext(locale_1.Strings.game_button_no) + "2"));
            let newCard = new builder.HeroCard(session)
                .title(session.gettext(locale_1.Strings.default_title) + "2")
                .subtitle(locale_1.Strings.default_subtitle)
                .text(locale_1.Strings.quiz_choose)
                .images([
                new builder.CardImage(session)
                    .url(config.get("app.baseUri") + "/assets/computer_person.jpg")
                    .alt(session.gettext(locale_1.Strings.img_default)),
            ])
                .buttons(buttons);
            let msg = new builder.Message(session)
                .addAttachment(newCard);
            builder.Prompts.choice(session, msg, ["y_e_s", "n_o"]);
        });
    }
    static step2(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (args.response) {
                if (args.response.entity === "y_e_s") {
                    session.send(locale_1.Strings.quiz_right);
                }
                else {
                    session.send(locale_1.Strings.quiz_wrong);
                }
                session.endDialog();
            }
            else {
                session.endDialog(locale_1.Strings.something_went_wrong);
            }
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.QuizQ2DialogId, DialogMatches_1.DialogMatches.QuizQ2DialogMatch, [
            QuizQ2Dialog.step1,
            QuizQ2Dialog.step2,
        ]);
    }
}
exports.QuizQ2Dialog = QuizQ2Dialog;

//# sourceMappingURL=QuizQ2Dialog.js.map
