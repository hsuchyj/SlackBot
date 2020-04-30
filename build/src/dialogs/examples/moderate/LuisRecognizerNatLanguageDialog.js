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
const MultiTriggerActionDialog_1 = require("../../../utils/MultiTriggerActionDialog");
const DialogIds_1 = require("../../../utils/DialogIds");
const DialogMatches_1 = require("../../../utils/DialogMatches");
const locale_1 = require("../../../locale/locale");
class LuisRecognizerNatLanguageDialog extends MultiTriggerActionDialog_1.MultiTriggerActionDialog {
    static setAlarmIntent(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            session.send(locale_1.Strings.set_alarm_msg);
            session.endDialog();
        });
    }
    static deleteAlarmIntent(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            session.send(locale_1.Strings.delete_alarm_msg);
            session.endDialog();
        });
    }
    constructor(bot) {
        super(bot, [
            {
                dialogId: DialogIds_1.DialogIds.LuisRecognizerNatLanguageDialogId,
                match: DialogMatches_1.DialogMatches.Luis_Recognizer_Nat_Language_Dialog_Intent,
                action: LuisRecognizerNatLanguageDialog.setAlarmIntent,
            },
            {
                dialogId: DialogIds_1.DialogIds.LuisRecognizerNatLanguageDialog2Id,
                match: DialogMatches_1.DialogMatches.Luis_Recognizer_Nat_Language_Dialog_2_Intent,
                action: LuisRecognizerNatLanguageDialog.deleteAlarmIntent,
            },
        ]);
    }
}
exports.LuisRecognizerNatLanguageDialog = LuisRecognizerNatLanguageDialog;

//# sourceMappingURL=LuisRecognizerNatLanguageDialog.js.map
