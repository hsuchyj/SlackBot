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
class VSTSAuthValidateUserDialog extends TriggerActionDialog_1.TriggerActionDialog {
    static promptForValidationNumber(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            builder.Prompts.text(session, locale_1.Strings.prompt_for_validation_number);
        });
    }
    static validateInputNumber(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let userEnteredNumber = args.response.trim();
            let validationNumber = session.userData.vstsAuth.randomValidationNumber;
            if (userEnteredNumber === validationNumber) {
                session.userData.vstsAuth.isValidated = true;
                session.send(locale_1.Strings.successfully_logged_in);
                session.endDialog();
            }
            else {
                session.send(locale_1.Strings.error_validating_user);
                session.beginDialog(DialogIds_1.DialogIds.VSTSLogInDialogId);
            }
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.VSTSAuthValidateUserDialogId, DialogMatches_1.DialogMatches.VSTS_Auth_Validate_User_Dialog_Intent, [
            VSTSAuthValidateUserDialog.promptForValidationNumber,
            VSTSAuthValidateUserDialog.validateInputNumber,
        ]);
    }
}
exports.VSTSAuthValidateUserDialog = VSTSAuthValidateUserDialog;

//# sourceMappingURL=VSTSAuthValidateUserDialog.js.map
