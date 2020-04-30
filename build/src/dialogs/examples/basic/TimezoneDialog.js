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
class TimezoneDialog extends TriggerActionDialog_1.TriggerActionDialog {
    static step1(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // check to ensure all expectied fields are present
            if (!session.message || !session.message.timestamp || !session.message.localTimestamp) {
                session.send(locale_1.Strings.timezone_error_msg);
                session.endDialog();
                return;
            }
            session.send(locale_1.Strings.timezone_msg, session.message.timestamp, session.message.localTimestamp);
            session.endDialog();
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.TimezoneDialogId, DialogMatches_1.DialogMatches.TimezoneDialogMatch, TimezoneDialog.step1);
    }
}
exports.TimezoneDialog = TimezoneDialog;

//# sourceMappingURL=TimezoneDialog.js.map
