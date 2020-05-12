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
            let response = ""
            let data2 = []; //array to hold all the assignments of the class
            let index = 0; //variable to store the index of the array with assignments that have no due dates
            let assignments_noDueDates = [];//array to hold all the assignments with no due dates

            https.get('https://canvas.instructure.com/api/v1/courses/1845971/assignments?access_token=7~6a2J9SqGLbvKIzXUa2tGjnD2kkCpYWSsxWA8cc695YgTSVKhLR0fg5khbvuXiHs3', (resp) => {
                //acquiring a string containing all of the assignments of the course
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                resp.on('end', () => {
                    data2 = JSON.parse(data); //parsing the string of assignments in order to separate them and put them into the array
                    data2.forEach(function (assignment) //looping through all of the assignments
                    {
                        if (assignment.due_at == null) {//checking if the assignments have a due date
                            assignments_noDueDates[index] = assignment.name; //if they don't then they are added to the array and the index is increased by 1
                            index += 1;
                        }
                    });
                    if (assignments_noDueDates.length > 0) { //checking to see if there were any assignments without due dates added to the array
                        response = "Yes, the assignments missing due dates are:<br>"; //if there are, then they are all combined into a string
                        for (let i = 0; i < assignments_noDueDates.length; i++) {
                            response += assignments_noDueDates[i] + "<br>";
                        }
                    } else
                        response = "No, there are no assignments missing due dates."
                    session.send(response); //printing the string
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
