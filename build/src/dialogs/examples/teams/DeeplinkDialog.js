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
const DialogUtils_1 = require("../../../utils/DialogUtils");
class DeeplinkDialog extends TriggerActionDialog_1.TriggerActionDialog {
    static step1(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let buttons = new Array();
            if (DialogUtils_1.isMessageFromChannel(session.message)) {
                // create button to deep link to the configurable channel tab - configurable channel tab must have been added for this to work
                // pattern for configurable channel tab deep link:
                // https://teams.microsoft.com/l/entity/APP_ID/ENTITY_ID?webUrl=ENTITY_WEB_URL&label=<entityLabel>&context=CONTEXT
                // APP_ID is the appId assigned in the manifest
                // ENTITY_ID is the entityId that is set for that channel tab when your config page creates it
                // ENTITY_WEB_URL is a url that is opened in a browswer on a mobile device if this url is opened on a mobile device
                // CONTEXT is a url encoded json object with a channelId parameter inside of it
                let appId = config.get("app.appId");
                let configTabEntityId = "test123";
                let queryParams = querystring.stringify({ context: "{\"channelId\":\"" + session.message.sourceEvent.channel.id + "\"}" });
                let configTabHardCodedUrl = "https://teams.microsoft.com/l/entity/" + appId + "/" + configTabEntityId + "?" + queryParams;
                buttons.push(builder.CardAction.openUrl(session, configTabHardCodedUrl, locale_1.Strings.open_configurable_tab));
            }
            // create a button to deep link to the static tab located in the 1:1 chat with the bot
            // pattern for static tab deep link:
            // (at a minimum to get to the static tab)
            // https://teams.microsoft.com/l/entity/28:BOT_ID/ENTITY_ID?conversationType=chat
            // (for sending data to that tab) - look at the HelpDialog for an example
            // https://teams.microsoft.com/l/entity/28:BOT_ID/ENTITY_ID?conversationType=chat&context=CONTEXT
            // BOT_ID is the bot id that comes from your bot registration with 28: added to the front
            // ENTITY_ID is the entityId that is set for that static tab in the manifest
            // CONTEXT is a url encoded json object with a subEntityId parameter inside of it – this is how you can pass data to your static tab
            // e.g. %7B%22subEntityId%22%3A%22SUB_ENTITY_ID_DATA%22%7D
            let botId = "28:" + config.get("bot.botId");
            let staticTabEntityId = "1on1test123"; // this comes from the manifest file
            let queryParams = querystring.stringify({
                conversationType: "chat",
                context: JSON.stringify({ subEntityId: "stuff" }),
            });
            let staticTabHardCodedUrl = "https://teams.microsoft.com/l/entity/" + botId + "/" + staticTabEntityId + "?" + queryParams;
            buttons.push(builder.CardAction.openUrl(session, staticTabHardCodedUrl, locale_1.Strings.open_static_tab));
            let newCard = new builder.HeroCard(session)
                .text(locale_1.Strings.deeplink_card_text, staticTabHardCodedUrl)
                .buttons(buttons);
            session.send(new builder.Message(session)
                .addAttachment(newCard));
            session.endDialog();
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.DeeplinkDialogId, DialogMatches_1.DialogMatches.DeeplinkDialogMatch, DeeplinkDialog.step1);
    }
}
exports.DeeplinkDialog = DeeplinkDialog;

//# sourceMappingURL=DeeplinkDialog.js.map
