"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDialog_1 = require("./BaseDialog");
class GlobalTriggerDialog extends BaseDialog_1.BaseDialog {
    constructor(bot, dialogId, match) {
        super(dialogId, {});
        this.bot = bot;
        this.dialogId = dialogId;
        this.match = match;
        bot.dialog(this.getDialogId(), this).triggerAction({
            matches: match,
        });
    }
    addMatchesToDialog(parentDialog) {
        // do nothing; match is added globally in constructor
    }
}
exports.GlobalTriggerDialog = GlobalTriggerDialog;

//# sourceMappingURL=GlobalTriggerDialog.js.map
