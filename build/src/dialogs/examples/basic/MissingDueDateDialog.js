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
class MissingDueDateDialog extends TriggerActionDialog_1.TriggerActionDialog {
    static step1(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const https = require('https');
            var assignmentList = "Your assignments are:<br>";
            var data2 = [];
            let assignments_noDueDates = new Array();
            //refactor this to use student token instead of global token?8[[y]
            https.get('https://canvas.instructure.com/api/v1/courses/1845971/assignments?access_token=7~6a2J9SqGLbvKIzXUa2tGjnD2kkCpYWSsxWA8cc695YgTSVKhLR0fg5khbvuXiHs3', (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    data2 = JSON.parse(data);
                    data2.forEach(function (assignment) {
                        if (assignment.due_at == null) {
                            var aName = assignment.name;
                            assignmentList = assignmentList + aName + "<br>";
                            //signments_noDueDates.push(aName);
                        }
                    });
                    /*(assignments_noDueDates.length <= 1)
                      assignmentList += "Yes, there are assignments missing due dates."*/
                    session.send(assignmentList);
                });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
            session.endDialog();
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.MissingDueDateDialogId, DialogMatches_1.DialogMatches.MissingDueDateDialogMatch, MissingDueDateDialog.step1);
    }
}
exports.MissingDueDateDialog = MissingDueDateDialog;

//# sourceMappingURL=MissingDueDateDialog.js.map
