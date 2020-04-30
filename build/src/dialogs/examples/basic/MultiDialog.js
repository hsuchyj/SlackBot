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
const DialogIds_1 = require("../../../utils/DialogIds");
const DialogMatches_1 = require("../../../utils/DialogMatches");
const MultiTriggerActionDialog_1 = require("../../../utils/MultiTriggerActionDialog");
const locale_1 = require("../../../locale/locale");
class MultiDialog extends MultiTriggerActionDialog_1.MultiTriggerActionDialog {
    static test1(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            session.send(locale_1.Strings.multi_dialog_1);
            session.endDialog();
        });
    }
    static test2(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            session.send(locale_1.Strings.multi_dialog_2);
            session.endDialog();
        });
    }
    constructor(bot) {
        super(bot, [
            {
                dialogId: DialogIds_1.DialogIds.MultiDialogId,
                match: DialogMatches_1.DialogMatches.MultiDialogMatch,
                action: MultiDialog.test1,
            },
            {
                dialogId: DialogIds_1.DialogIds.MultiDialog2Id,
                match: DialogMatches_1.DialogMatches.MultiDialog2Match,
                action: MultiDialog.test2,
            },
        ]);
    }
}
exports.MultiDialog = MultiDialog;

//# sourceMappingURL=MultiDialog.js.map
