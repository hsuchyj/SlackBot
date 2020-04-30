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
// import { VSTSTokenOAuth2API } from "../../../apis/VSTSTokenOAuth2API";
const locale_1 = require("../../../locale/locale");
const config = require("config");
const querystring = require("querystring");
class VSTSLogInDialog extends TriggerActionDialog_1.TriggerActionDialog {
    static sendAuthorizeMsg(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // let url = VSTSTokenOAuth2API.getUserAuthorizationURL();
            // let newCard = new builder.SigninCard(session)
            //     .button(
            //         Strings.sign_in,
            //         url,
            //     )
            //     .text(Strings.default_text);
            let buttons = [];
            // buttons.push(builder.CardAction.openUrl(session, url, Strings.sign_in));
            let botId = "28:" + config.get("bot.botId");
            let staticTabEntityId = "1on1test123"; // this comes from the manifest file
            let queryParams = querystring.stringify({
                conversationType: "chat",
                // context: "{\"subEntityId\":\"allCommands\"}",
                context: JSON.stringify({ subEntityId: "vstsAuth" }),
            });
            let staticTabHardCodedUrl = "https://teams.microsoft.com/l/entity/" + botId + "/" + staticTabEntityId + "?" + queryParams;
            buttons.push(builder.CardAction.openUrl(session, staticTabHardCodedUrl, locale_1.Strings.sign_in));
            let newCard = new builder.ThumbnailCard(session)
                .title(locale_1.Strings.default_title)
                .subtitle(locale_1.Strings.default_subtitle)
                .text(locale_1.Strings.default_text)
                .images([
                new builder.CardImage(session)
                    .url(config.get("app.baseUri") + "/assets/computer_person.jpg")
                    .alt(locale_1.Strings.img_default),
            ])
                .buttons(buttons);
            // Just for development to see what the session.message.address values are
            // session.send(encodeURIComponent(JSON.stringify(session.message.address)));
            session.endDialog(new builder.Message(session).addAttachment(newCard));
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.VSTSLogInDialogId, DialogMatches_1.DialogMatches.VSTSLogInDialogMatch, VSTSLogInDialog.sendAuthorizeMsg);
    }
}
exports.VSTSLogInDialog = VSTSLogInDialog;

//# sourceMappingURL=VSTSLogInDialog.js.map
