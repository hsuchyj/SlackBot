"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder = require("botbuilder");
class BaseDialog extends builder.IntentDialog {
    constructor(dialogId, dialogOptions) {
        super(dialogOptions);
        this.dialogId = dialogId;
        this.dialogOptions = dialogOptions;
        this.onBegin((session, args, next) => {
            if (this.getDialogId() !== "TestGlobalTriggerDialog") {
                session.conversationData.currentDialogName = this.dialogId;
            }
            this._onBegin(session, args, next);
        });
        this.onDefault((session, args, next) => { this._onDefault(session, args, next); });
    }
    getDialogId() {
        return this.dialogId;
    }
    _onBegin(session, args, next) {
        // do this unless overwritten
        next(args);
    }
    _onDefault(session, args, next) {
        // do this unless overwritten
        session.send(session.gettext("I'm sorry, but there has been a problem") + " - " + this.dialogId);
        session.endDialog();
    }
}
exports.BaseDialog = BaseDialog;

//# sourceMappingURL=BaseDialog.js.map
