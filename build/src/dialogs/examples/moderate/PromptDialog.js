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
class PromptDialog extends TriggerActionDialog_1.TriggerActionDialog {
    static promptForName(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            builder.Prompts.text(session, locale_1.Strings.game_name_prompt);
        });
    }
    static promptForChoice(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = session.gettext(locale_1.Strings.game_name_response_template, args.response);
            console.log(args.response);
            session.send(msg);
            let buttonText = session.gettext(locale_1.Strings.game_button_text);
            builder.Prompts.choice(session, locale_1.Strings.game_button_prompt, buttonText, { listStyle: builder.ListStyle["button"] });
        });
    }
    static promptForCorrectChoice(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let choiceText = session.gettext(locale_1.Strings.game_button_response_template, args.response.entity);
            let buttonText = session.gettext(locale_1.Strings.game_button_yes) + "|" + session.gettext(locale_1.Strings.game_button_no);
            builder.Prompts.choice(session, choiceText, buttonText, { listStyle: builder.ListStyle["button"] });
        });
    }
    static showResult(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (args.response.entity === session.gettext(locale_1.Strings.game_button_yes)) {
                session.send(locale_1.Strings.game_success);
            }
            else {
                session.send(locale_1.Strings.game_failure_funny);
            }
            session.endDialog();
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.PromptDialogId, DialogMatches_1.DialogMatches.PromptDialogMatch, [
            PromptDialog.promptForName,
            PromptDialog.promptForChoice,
            PromptDialog.promptForCorrectChoice,
            PromptDialog.showResult,
        ]);
    }
}
exports.PromptDialog = PromptDialog;

//# sourceMappingURL=PromptDialog.js.map
