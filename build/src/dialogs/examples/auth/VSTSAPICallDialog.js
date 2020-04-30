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
const VSTSAPI_1 = require("../../../apis/VSTSAPI");
class VSTSAPICallDialog extends TriggerActionDialog_1.TriggerActionDialog {
    static promptForWorkItemId(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            builder.Prompts.text(session, locale_1.Strings.prompt_for_work_item_id);
        });
    }
    static showWorkItem(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let desiredWorkItemId = args.response.trim();
            let vstsAPI = new VSTSAPI_1.VSTSAPI();
            let body = yield vstsAPI.getWorkItem(desiredWorkItemId, session);
            if (!body) {
                session.endDialog();
                // return is needed because endDialog does not quit out of function
                return;
            }
            // session.send, when given a template, will substitute values where
            // indicated in the string template
            session.send(locale_1.Strings.title_of_work_item_template, body.value[0].fields["System.Title"]);
            session.send(locale_1.Strings.get_html_info_for_work_item_template, body.value[0].url);
            let urlEncodedProject = encodeURIComponent(body.value[0].fields["System.TeamProject"]);
            let hardCodedUrl = "https://teamsbot.visualstudio.com/" + urlEncodedProject + "/_workitems?id=" + desiredWorkItemId + "&_a=edit";
            session.send(locale_1.Strings.go_to_work_item_template, hardCodedUrl);
            session.endDialog();
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.VSTSAPICallDialogId, DialogMatches_1.DialogMatches.VSTSAPICallDialogMatch, [
            VSTSAPICallDialog.promptForWorkItemId,
            VSTSAPICallDialog.showWorkItem,
        ]);
    }
}
exports.VSTSAPICallDialog = VSTSAPICallDialog;

//# sourceMappingURL=VSTSAPICallDialog.js.map
