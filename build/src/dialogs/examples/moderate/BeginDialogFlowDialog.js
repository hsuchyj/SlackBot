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
const DialogMatches_1 = require("../../../utils/DialogMatches");
const DialogIds_1 = require("../../../utils/DialogIds");
const locale_1 = require("../../../locale/locale");
class BeginDialogFlowDialog extends TriggerActionDialog_1.TriggerActionDialog {
    static step1(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            session.send(locale_1.Strings.step_1);
            next();
        });
    }
    static step2(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            session.send(locale_1.Strings.step_2);
            session.beginDialog(DialogIds_1.DialogIds.HelloDialogId);
            // IMPORTANT: within a waterfall step make sure you do not call anything after next(), beginDialog(), builder.Prompts, or any other built in function
            // that will start a new dialog
        });
    }
    static step3(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            session.send(locale_1.Strings.step_3);
            session.endDialog();
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.BeginDialogFlowDialogId, DialogMatches_1.DialogMatches.BeginDialogFlowDialogMatch, [
            BeginDialogFlowDialog.step1,
            BeginDialogFlowDialog.step2,
            BeginDialogFlowDialog.step3,
        ]);
    }
}
exports.BeginDialogFlowDialog = BeginDialogFlowDialog;

//# sourceMappingURL=BeginDialogFlowDialog.js.map
