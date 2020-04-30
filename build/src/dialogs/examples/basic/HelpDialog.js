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
const querystring = require("querystring");
class HelpDialog extends TriggerActionDialog_1.TriggerActionDialog {
    static step1(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let buttons = new Array();
            let botId = "28:" + config.get("bot.botId");
            let staticTabEntityId = "1on1test123"; // this comes from the manifest file
            let queryParams = querystring.stringify({
                conversationType: "chat",
                // context: "{\"subEntityId\":\"allCommands\"}",
                context: JSON.stringify({ subEntityId: "allCommands" }),
            });
            // hardCodedUrl has url encoded {"subEntityId":"allCommands"} set as the context
            let staticTabHardCodedUrl = "https://teams.microsoft.com/l/entity/" + botId + "/" + staticTabEntityId + "?" + queryParams;
            buttons.push(builder.CardAction.openUrl(session, staticTabHardCodedUrl, locale_1.Strings.all_commands_button));
            let newCard = new builder.HeroCard(session)
                .text(locale_1.Strings.help_msg)
                .buttons(buttons);
            session.send(new builder.Message(session)
                .addAttachment(newCard));
            session.endDialog();
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.HelpDialogId, DialogMatches_1.DialogMatches.HelpDialogMatch, HelpDialog.step1);
    }
}
exports.HelpDialog = HelpDialog;

//# sourceMappingURL=HelpDialog.js.map
