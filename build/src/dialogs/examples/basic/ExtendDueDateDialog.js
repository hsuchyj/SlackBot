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
//import { request } from 'http';
class ExtendDueDateDialog extends TriggerActionDialog_1.TriggerActionDialog {
    //Asks for asssignment name in teams
    static step1(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            builder.Prompts.text(session, "What is the assignment name?");
        });
    }
    //stores assignment name, makes get request to determine id for PUT request, and asks for days extension
    static step2(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var aName = args.response;
            var rp = require('request-promise');
            var options = {
                uri: 'https://canvas.instructure.com/api/v1/courses/1845971/assignments',
                headers: {
                    'User-Agent': 'Request-Promise',
                    "Authorization": "Bearer 7~6a2J9SqGLbvKIzXUa2tGjnD2kkCpYWSsxWA8cc695YgTSVKhLR0fg5khbvuXiHs3"
                },
                json: true
            };
            yield rp(options).then(function (repos) {
                //console.log(repos);
                repos.forEach(function (assn) {
                    if (assn.name == aName) {
                        session.userData.assnID = assn.id;
                        session.userData.oldDate = assn.due_at;
                    }
                });
            }).catch(function (err) {
                console.log(err);
            });
            builder.Prompts.number(session, "How many days would you like to extend the assignment?");
        });
    }
    static step3(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            session.userData.assnDays = args.response;
            builder.Prompts.text(session, "Type \'All\' or Name the student.");
        });
    }
    //Send PUT request that updates old date by days entered
    static step4(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            session.userData.assnGroup = args.response;
            var aDays = session.userData.assnDays;
            var aGroup = session.userData.assnGroup;
            var aID = session.userData.assnID;
            var aOD = new Date(session.userData.oldDate);
            aOD.setDate(aOD.getDate() + parseInt(aDays, 10));
            var sDate = aOD.toISOString();
            var rp = require('request-promise');
            var options;
            if (aGroup == "All") {
                options = {
                    method: 'PUT',
                    uri: 'https://canvas.instructure.com/api/v1/courses/1845971/assignments/' + aID,
                    body: {
                        "assignment": {
                            "due_at": sDate
                        }
                    },
                    headers: {
                        'User-Agent': 'Request-Promise',
                        "Authorization": "Bearer 7~6a2J9SqGLbvKIzXUa2tGjnD2kkCpYWSsxWA8cc695YgTSVKhLR0fg5khbvuXiHs3"
                    },
                    json: true
                };
            }
            else {
                //Make GET request to find student ID based on name entered
                var stuID;
                var stu = {
                    uri: 'https://canvas.instructure.com/api/v1/courses/1845971/users',
                    headers: {
                        'User-Agent': 'Request-Promise',
                        "Authorization": "Bearer 7~6a2J9SqGLbvKIzXUa2tGjnD2kkCpYWSsxWA8cc695YgTSVKhLR0fg5khbvuXiHs3"
                    },
                    json: true
                };
                yield rp(stu).then(function (repos) {
                    //console.log(repos);
                    repos.forEach(function (data) {
                        if (data.name == aGroup) {
                            stuID = data.id;
                        }
                    });
                }).catch(function (err) {
                    console.log(err);
                });
                options = {
                    method: 'POST',
                    uri: 'https://canvas.instructure.com/api/v1/courses/1845971/assignments/' + aID + '/overrides',
                    body: {
                        "assignment_override": {
                            "due_at": sDate,
                            "student_ids": [
                                stuID
                            ]
                        }
                    },
                    headers: {
                        'User-Agent': 'Request-Promise',
                        "Authorization": "Bearer 7~6a2J9SqGLbvKIzXUa2tGjnD2kkCpYWSsxWA8cc695YgTSVKhLR0fg5khbvuXiHs3"
                    },
                    json: true
                };
            }
            yield rp(options).then(function (repos) {
                console.log(repos);
            }).catch(function (err) {
                console.log(err);
            });
            builder.Prompts.text(session, "Due date has been updated.");
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.ExtendDueDateDialogId, DialogMatches_1.DialogMatches.ExtendDueDateDialogMatch, [
            ExtendDueDateDialog.step1,
            ExtendDueDateDialog.step2,
            ExtendDueDateDialog.step3,
            ExtendDueDateDialog.step4,
        ]);
    }
}
exports.ExtendDueDateDialog = ExtendDueDateDialog;

//# sourceMappingURL=ExtendDueDateDialog.js.map
