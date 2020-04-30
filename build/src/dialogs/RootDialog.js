"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder = require("botbuilder");
const locale_1 = require("../locale/locale");
const DialogIds_1 = require("../utils/DialogIds");
// let config = require("config");
// *************************** BEGINNING OF EXAMPLES ***************************
const GetStudentsDialog_1 = require("./examples/basic/GetStudentsDialog");
const ExtendDueDateDialog_1 = require("./examples/basic/ExtendDueDateDialog");
const MissingDueDateDialog_1 = require("./examples/basic/MissingDueDateDialog");
const FailingGradesDialog_1 = require("./examples/basic/FailingGradesDialog");
const ResetUserStateDialog_1 = require("./examples/auth/ResetUserStateDialog");
const VSTSAPICallDialog_1 = require("./examples/auth/VSTSAPICallDialog");
const VSTSAuthValidateUserDialog_1 = require("./examples/auth/VSTSAuthValidateUserDialog");
const VSTSLogInDialog_1 = require("./examples/auth/VSTSLogInDialog");
const GetLastDialogUsedDialog_1 = require("./examples/basic/GetLastDialogUsedDialog");
const HelloDialog_1 = require("./examples/basic/HelloDialog");
const HelpDialog_1 = require("./examples/basic/HelpDialog");
const HeroCardDialog_1 = require("./examples/basic/HeroCardDialog");
const MessageBackReceiverDialog_1 = require("./examples/basic/MessageBackReceiverDialog");
const MultiDialog_1 = require("./examples/basic/MultiDialog");
const O365ConnectorCardActionsDialog_1 = require("./examples/basic/O365ConnectorCardActionsDialog");
const O365ConnectorCardDialog_1 = require("./examples/basic/O365ConnectorCardDialog");
const ThumbnailCardDialog_1 = require("./examples/basic/ThumbnailCardDialog");
const TimezoneDialog_1 = require("./examples/basic/TimezoneDialog");
const BeginDialogFlowDialog_1 = require("./examples/moderate/BeginDialogFlowDialog");
const ConstructorArgsDialog_1 = require("./examples/moderate/ConstructorArgsDialog");
const ListNamesDialog_1 = require("./examples/moderate/ListNamesDialog");
const LuisRecognizerNatLanguageDialog_1 = require("./examples/moderate/LuisRecognizerNatLanguageDialog");
const PromptDialog_1 = require("./examples/moderate/PromptDialog");
const QuizFullDialog_1 = require("./examples/moderate/QuizFullDialog");
const QuizQ1Dialog_1 = require("./examples/moderate/QuizQ1Dialog");
const QuizQ2Dialog_1 = require("./examples/moderate/QuizQ2Dialog");
const QuizQ3Dialog_1 = require("./examples/moderate/QuizQ3Dialog");
const AtMentionDialog_1 = require("./examples/teams/AtMentionDialog");
const ChannelDataDialog_1 = require("./examples/teams/ChannelDataDialog");
const DeeplinkDialog_1 = require("./examples/teams/DeeplinkDialog");
const FetchRosterDialog_1 = require("./examples/teams/FetchRosterDialog");
const FetchTeamInfoDialog_1 = require("./examples/teams/FetchTeamInfoDialog");
const ProactiveMsgTo1to1Dialog_1 = require("./examples/teams/ProactiveMsgTo1to1Dialog");
const ProactiveMsgToChannelDialog_1 = require("./examples/teams/ProactiveMsgToChannelDialog");
const UpdateCardMsgDialog_1 = require("./examples/teams/UpdateCardMsgDialog");
const UpdateCardMsgSetupDialog_1 = require("./examples/teams/UpdateCardMsgSetupDialog");
const UpdateTextMsgDialog_1 = require("./examples/teams/UpdateTextMsgDialog");
const UpdateTextMsgSetupDialog_1 = require("./examples/teams/UpdateTextMsgSetupDialog");
const NotifyDialog_1 = require("./examples/teams/NotifyDialog");
const PopupSignInDialog_1 = require("./examples/basic/PopupSignInDialog");
// *************************** END OF EXAMPLES *********************************
// Add imports for dialogs
// Main dialog that handles commands
class RootDialog extends builder.IntentDialog {
    constructor(bot) {
        super();
        this.bot = bot;
        this.onDefault((session) => { this._onDefault(session); });
        bot.dialog(DialogIds_1.DialogIds.RootDialogId, this);
        // Add LUIS recognizer for natural language processing
        // let luisEndpoint = config.get("luis.endpointUri");
        // if (luisEndpoint) {
        //     bot.recognizer(new builder.LuisRecognizer(luisEndpoint));
        // }
    }
    // Create the child dialogs and attach them to the bot
    createChildDialogs() {
        let bot = this.bot;
        //console.log(bot);
        // *************************** BEGINNING OF EXAMPLES ***************************
        new GetStudentsDialog_1.GetStudentsDialog(bot);
        new ExtendDueDateDialog_1.ExtendDueDateDialog(bot);
        new MissingDueDateDialog_1.MissingDueDateDialog(bot);
        new FailingGradesDialog_1.FailingGradesDialog(bot);
        new ResetUserStateDialog_1.ResetUserStateDialog(bot);
        new VSTSAPICallDialog_1.VSTSAPICallDialog(bot);
        new VSTSAuthValidateUserDialog_1.VSTSAuthValidateUserDialog(bot);
        new VSTSLogInDialog_1.VSTSLogInDialog(bot);
        new GetLastDialogUsedDialog_1.GetLastDialogUsedDialog(bot);
        new HelloDialog_1.HelloDialog(bot);
        new HelpDialog_1.HelpDialog(bot);
        new HeroCardDialog_1.HeroCardDialog(bot);
        new MessageBackReceiverDialog_1.MessageBackReceiverDialog(bot);
        new MultiDialog_1.MultiDialog(bot);
        new O365ConnectorCardActionsDialog_1.O365ConnectorCardActionsDialog(bot);
        new O365ConnectorCardDialog_1.O365ConnectorCardDialog(bot);
        new ThumbnailCardDialog_1.ThumbnailCardDialog(bot);
        new TimezoneDialog_1.TimezoneDialog(bot);
        new BeginDialogFlowDialog_1.BeginDialogFlowDialog(bot);
        new ConstructorArgsDialog_1.ConstructorArgsDialog(bot, "12345");
        new ListNamesDialog_1.ListNamesDialog(bot);
        new LuisRecognizerNatLanguageDialog_1.LuisRecognizerNatLanguageDialog(bot);
        new PromptDialog_1.PromptDialog(bot);
        new QuizFullDialog_1.QuizFullDialog(bot);
        new QuizQ1Dialog_1.QuizQ1Dialog(bot);
        new QuizQ2Dialog_1.QuizQ2Dialog(bot);
        new QuizQ3Dialog_1.QuizQ3Dialog(bot);
        new AtMentionDialog_1.AtMentionDialog(bot);
        new ChannelDataDialog_1.ChannelDataDialog(bot);
        new DeeplinkDialog_1.DeeplinkDialog(bot);
        new FetchRosterDialog_1.FetchRosterDialog(bot);
        new FetchTeamInfoDialog_1.FetchTeamInfoDialog(bot);
        new ProactiveMsgTo1to1Dialog_1.ProactiveMsgTo1to1Dialog(bot);
        new ProactiveMsgToChannelDialog_1.ProactiveMsgToChannelDialog(bot);
        new UpdateCardMsgDialog_1.UpdateCardMsgDialog(bot);
        new UpdateCardMsgSetupDialog_1.UpdateCardMsgSetupDialog(bot);
        new UpdateTextMsgDialog_1.UpdateTextMsgDialog(bot);
        new UpdateTextMsgSetupDialog_1.UpdateTextMsgSetupDialog(bot);
        new NotifyDialog_1.NotifyDialog(bot);
        new PopupSignInDialog_1.PopupSignInDialog(bot);
        // *************************** END OF EXAMPLES *********************************
        // Add child dialogs
    }
    // Handle unrecognized input
    _onDefault(session) {
        session.conversationData.currentDialogName = DialogIds_1.DialogIds.RootDialogId;
        session.send(locale_1.Strings.root_dialog_on_default);
    }
}
exports.RootDialog = RootDialog;

//# sourceMappingURL=RootDialog.js.map
