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
const DialogUtils_1 = require("../../../utils/DialogUtils");
const DialogIds_1 = require("../../../utils/DialogIds");
const DialogMatches_1 = require("../../../utils/DialogMatches");
const locale_1 = require("../../../locale/locale");
class ProactiveMsgToChannelDialog extends TriggerActionDialog_1.TriggerActionDialog {
    static step1(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!DialogUtils_1.isMessageFromChannel(session.message)) {
                session.send(locale_1.Strings.cmd_only_works_in_channel);
                session.endDialog();
                return;
            }
            let channelNameInput = args.intent.matched[1].trim();
            if (channelNameInput) {
                next({ response: channelNameInput });
            }
            else {
                builder.Prompts.text(session, locale_1.Strings.choose_channel_prompt);
            }
        });
    }
    static step2(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let inputChannelName = args.response.trim();
            // casting to keep away typescript error
            let teamsChatConnector = session.connector;
            let msgAddress = session.message.address;
            let msgServiceUrl = msgAddress.serviceUrl;
            let teamId = session.message.sourceEvent.team.id;
            teamsChatConnector.fetchChannelList(msgServiceUrl, teamId, (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (!err) {
                    let desiredChannelId = null;
                    for (let i = 0; i < result.length; i++) {
                        let currentChannelName = result[i].name;
                        // Do this change of name because the fetchChannelList call will return the General
                        // channel without a name - string of "General" channel's name needs to be localized
                        if (!currentChannelName) {
                            currentChannelName = session.gettext(locale_1.Strings.general_channel_name);
                        }
                        if (inputChannelName.toUpperCase() === currentChannelName.toUpperCase()) {
                            desiredChannelId = result[i].id;
                            break;
                        }
                    }
                    if (!desiredChannelId) {
                        session.send(locale_1.Strings.channel_choice_failure);
                        session.endDialog();
                        return;
                    }
                    let proactiveMsg = new builder.Message(session).text(locale_1.Strings.proactive_channel_msg);
                    // send the first proactive message to a channel using this function in order to get the updated
                    // conversation.id in the address of the response
                    let replyChainAddress = yield DialogUtils_1.startReplyChainInChannel(session.connector, proactiveMsg, desiredChannelId);
                    // use this newly returned address with its updated conversation.id in order to send a proactive message
                    // as a reply to the first proactive message
                    let proactiveMsgInReplyChain = new builder.Message(session).text(locale_1.Strings.proactive_msg_in_reply_chain).address(replyChainAddress);
                    session.send(proactiveMsgInReplyChain);
                    session.send(locale_1.Strings.proactive_channel_msg_sent);
                    session.endDialog();
                }
                else {
                    session.endDialog(locale_1.Strings.error_proactive_channel_msg);
                }
            }));
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.ProactiveMsgToChannelDialogId, DialogMatches_1.DialogMatches.ProactiveMsgToChannelDialogMatch, [
            ProactiveMsgToChannelDialog.step1,
            ProactiveMsgToChannelDialog.step2,
        ]);
    }
}
exports.ProactiveMsgToChannelDialog = ProactiveMsgToChannelDialog;

//# sourceMappingURL=ProactiveMsgToChannelDialog.js.map
