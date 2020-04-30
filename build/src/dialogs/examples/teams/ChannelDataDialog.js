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
const DialogIds_1 = require("../../../utils/DialogIds");
const DialogMatches_1 = require("../../../utils/DialogMatches");
const locale_1 = require("../../../locale/locale");
const ChannelData_1 = require("../../../utils/ChannelData");
class ChannelDataDialog extends TriggerActionDialog_1.TriggerActionDialog {
    static step1(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Currently, using the channel data works as follows:
             *
             * There is middleware, LoadBotChannelData, in src/Bot.ts that loads the channel data
             * on every incoming message - this allows you to get it with ChannelData.get(session)
             *
             * In order to update the channel data, though, (and this could be placed in middleware
             * if you so desired so that it would automatically happen with every outgoing message)
             * currently you must manually call await ChannelData.saveToStorage(...) - the choice
             * to not have it save automatically now was to save one less call to the database for
             * every outgoing message because the number of times we update the channelData is
             * relatively low
             */
            // this dialog can be used to show the differences of conversationData and channelData
            // in a 1:1 chat the two are the same
            // in a channel each reply chain has its own conversationData, but the channelData
            // is the same throughout every reply chain
            let channelData = ChannelData_1.ChannelData.get(session);
            if (!channelData.testNumb) {
                channelData.testNumb = 0;
            }
            channelData.testNumb++;
            if (!session.conversationData.testNumb) {
                session.conversationData.testNumb = 0;
            }
            session.conversationData.testNumb++;
            session.send(locale_1.Strings.channel_data_testNumb, channelData.testNumb);
            session.send(locale_1.Strings.conversation_data_testNumb, session.conversationData.testNumb);
            // the channelStorage field is set at the bot's creation in src/app.ts
            yield ChannelData_1.ChannelData.saveToStorage(session, args.constructorArgs.bot.get("channelStorage"));
            session.endDialog();
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.ChannelDataDialogId, DialogMatches_1.DialogMatches.ChannelDataDialogMatch, // /channel data/i,
        ChannelDataDialog.step1);
    }
}
exports.ChannelDataDialog = ChannelDataDialog;

//# sourceMappingURL=ChannelDataDialog.js.map
