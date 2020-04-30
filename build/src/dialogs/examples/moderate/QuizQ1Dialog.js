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
class QuizQ1Dialog extends TriggerActionDialog_1.TriggerActionDialog {
    static step1(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let buttons = new Array();
            buttons.push(builder.CardAction.imBack(session, "y_e_s", locale_1.Strings.game_button_yes));
            buttons.push(builder.CardAction.imBack(session, "n_o", locale_1.Strings.game_button_no));
            let newCard = new builder.HeroCard(session)
                .title(locale_1.Strings.default_title)
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
        super(bot, DialogIds_1.DialogIds.QuizQ1DialogId, DialogMatches_1.DialogMatches.QuizQ1DialogMatch, [
            QuizQ1Dialog.step1,
            QuizQ1Dialog.step2,
        ]);
    }
}
exports.QuizQ1Dialog = QuizQ1Dialog;

//# sourceMappingURL=QuizQ1Dialog.js.map
