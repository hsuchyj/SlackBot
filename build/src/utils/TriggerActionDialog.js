"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseTriggerActionDialog_1 = require("./BaseTriggerActionDialog");
class TriggerActionDialog extends BaseTriggerActionDialog_1.BaseTriggerActionDialog {
    constructor(bot, dialogId, match, action, constructorArgs) {
        super(dialogId);
        this.bot = bot;
        this.dialogId = dialogId;
        this.match = match;
        this.action = action;
        this.constructorArgs = constructorArgs;
        this.addDialogWithTriggerActionToBot(bot, this.getDialogId(), match, action, constructorArgs);
    }
}
exports.TriggerActionDialog = TriggerActionDialog;

//# sourceMappingURL=TriggerActionDialog.js.map
