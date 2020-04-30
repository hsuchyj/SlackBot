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
const TriggerActionDialog_1 = require("../../../utils/TriggerActionDialog");
const DialogUtils_1 = require("../../../utils/DialogUtils");
const DialogIds_1 = require("../../../utils/DialogIds");
const DialogMatches_1 = require("../../../utils/DialogMatches");
const locale_1 = require("../../../locale/locale");
class ProactiveMsgTo1to1Dialog extends TriggerActionDialog_1.TriggerActionDialog {
    static send1to1Msg(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // casting to keep away typescript error
            let msgAddress = session.message.address;
            let msgServiceUrl = msgAddress.serviceUrl;
            // to send a proactive message to a one to one chat create the address, but leave out the conversation id
            let newAddress = {
                channelId: "msteams",
                user: { id: session.message.address.user.id },
                channelData: {
                    tenant: {
                        id: session.message.sourceEvent.tenant.id,
                    },
                },
                bot: {
                    id: session.message.address.bot.id,
                },
                serviceUrl: msgServiceUrl,
                useAuth: true,
            };
            session.connector.startConversation(newAddress, (err, resultAddress) => __awaiter(this, void 0, void 0, function* () {
                if (!err) {
                    // create a new event based on the incoming message, but change
                    // the address to be the new result address
                    // this is done so the new session has the same locale setting as the original
                    // message
                    let createdEvent = Object.assign({}, session.message, { address: resultAddress });
                    // using this template and base trigger dialog, the bot is always present in args.constructorArgs.bot
                    let sessionFor1to1 = yield DialogUtils_1.loadSessionAsync(args.constructorArgs.bot, createdEvent);
                    sessionFor1to1.beginDialog(DialogIds_1.DialogIds.HelloDialogId);
                    // if you wish to only send one message rather than starting a dialog, you can
                    // skip the three steps above (comment them out), not create a new session,
                    // and run the commented out section below
                    // let proactiveMsg = new builder.Message(session)
                    //     .address(resultAddress)
                    //     .text(Strings.proactive_msg_one_to_one);
                    // session.send(proactiveMsg);
                    session.send(locale_1.Strings.one_to_one_message_sent);
                }
                else {
                    session.error(err);
                }
                session.endDialog();
            }));
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.ProactiveMsgTo1to1DialogId, DialogMatches_1.DialogMatches.ProactiveMsgTo1to1DialogMatch, ProactiveMsgTo1to1Dialog.send1to1Msg);
    }
}
exports.ProactiveMsgTo1to1Dialog = ProactiveMsgTo1to1Dialog;

//# sourceMappingURL=ProactiveMsgTo1to1Dialog.js.map
