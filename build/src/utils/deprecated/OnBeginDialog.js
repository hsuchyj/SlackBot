"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDialog_1 = require("./BaseDialog");
class OnBeginDialog extends BaseDialog_1.BaseDialog {
    constructor(dialogId, match) {
        super(dialogId, {});
        this.dialogId = dialogId;
        this.match = match;
    }
    getMatch() {
        return this.match;
    }
    addMatchesToDialog(parentDialog) {
        let matchEntry = this.getMatch();
        if (matchEntry === null) {
            return;
        }
        if (Array.isArray(matchEntry)) {
            parentDialog.matchesAny(matchEntry, this.getDialogId());
        }
        else {
            parentDialog.matches(matchEntry, this.getDialogId());
        }
    }
}
exports.OnBeginDialog = OnBeginDialog;

//# sourceMappingURL=OnBeginDialog.js.map
