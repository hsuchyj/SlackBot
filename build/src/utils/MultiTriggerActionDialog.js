"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseTriggerActionDialog_1 = require("./BaseTriggerActionDialog");
class MultiTriggerActionDialog extends BaseTriggerActionDialog_1.BaseTriggerActionDialog {
    constructor(bot, multiTriggerActionDialogEntryList, constructorArgs) {
        super(multiTriggerActionDialogEntryList ?
            multiTriggerActionDialogEntryList[0].dialogId :
            "Error: undefined dialogId");
        this.bot = bot;
        this.multiTriggerActionDialogEntryList = multiTriggerActionDialogEntryList;
        this.constructorArgs = constructorArgs;
        if (multiTriggerActionDialogEntryList) {
            for (let i = 0; i < multiTriggerActionDialogEntryList.length; i++) {
                let currEntry = multiTriggerActionDialogEntryList[i];
                this.addDialogWithTriggerActionToBot(bot, currEntry.dialogId, currEntry.match, currEntry.action, constructorArgs);
            }
        }
    }
}
exports.MultiTriggerActionDialog = MultiTriggerActionDialog;

//# sourceMappingURL=MultiTriggerActionDialog.js.map
