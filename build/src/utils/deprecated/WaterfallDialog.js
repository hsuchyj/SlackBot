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
const BaseDialog_1 = require("./BaseDialog");
class WaterfallDialog extends BaseDialog_1.BaseDialog {
    constructor(dialogId, match, action) {
        super(dialogId, {});
        this.dialogId = dialogId;
        this.match = match;
        this.action = action;
        let newActionList = [];
        newActionList.push((session, args, next) => { this.setDialogIdAsCurrent(session, args, next); });
        newActionList.push((session, args, next) => {
            // tslint:disable-next-line:no-shadowed-variable
            this.onDefault((session, args, next) => { this._onDefault(session, args, next); });
            next(args);
        });
        if (Array.isArray(action)) {
            newActionList = newActionList.concat(action);
        }
        else {
            newActionList.push(action);
        }
        this.action = newActionList;
    }
    getMatch() {
        return this.match;
    }
    getAction() {
        return this.action;
    }
    addMatchesToDialog(parentDialog) {
        let matchEntry = this.getMatch();
        if (matchEntry === null) {
            return;
        }
        if (Array.isArray(matchEntry)) {
            parentDialog.matchesAny(matchEntry, this.getAction());
        }
        else {
            parentDialog.matches(matchEntry, this.getAction());
        }
    }
    _onBegin(session, args, next) {
        session.userData.args = args;
        this.onDefault(this.getAction());
        next(args);
    }
    setDialogIdAsCurrent(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            session.conversationData.currentDialogName = this.dialogId;
            next(args);
        });
    }
}
exports.WaterfallDialog = WaterfallDialog;

//# sourceMappingURL=WaterfallDialog.js.map
