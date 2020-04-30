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
class O365ConnectorCardDialog extends TriggerActionDialog_1.TriggerActionDialog {
    static step1(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // get the input number for the example to show if the user passed it into the command - e.g. 'show connector card 2'
            let inputNumber = args.intent.matched[1].trim();
            let msg = new builder.Message(session);
            let o365Card = {};
            o365Card.contentType = "application/vnd.microsoft.teams.card.o365connector";
            // this is the default example's content
            let o365ConnectorCardContent = {
                title: session.gettext(locale_1.Strings.default_title),
                sections: [
                    {
                        text: session.gettext(locale_1.Strings.default_text) + "1",
                    },
                    {
                        text: session.gettext(locale_1.Strings.default_text) + "2",
                    },
                ],
            };
            o365Card.content = o365ConnectorCardContent;
            /**
             * Below are a few more examples of more complex connector cards
             * The default card's content will be overwritten if a different option is desired
             * and its number passed into the call to the bot
             *
             * To use: simply call 'show connector card 2' or 'show connector card 3'
             *
             * Note: these examples are just filled with demo data and that demo data is NOT using the localization system
             * as shown above
             *
             * Note: these examples are leveraging an actual JSON string as their input content - more examples can be found at
             * https://messagecardplayground.azurewebsites.net/ - it is recommended that the developer use the method
             * shown above in order to get the benefits of type checking from the teams.O365ConnectorCard interface
             */
            // Overwrite default card content if option 2 is desired
            if (inputNumber === "2") {
                o365Card.content = JSON.parse(`
                {
                    "themeColor": "fe9a13",
                    "sections": [
                        {
                            "title": "**New major event on omi10svr**",
                            "activityTitle": "Batch upload for TAX data on db-srv-hr1 aborted due to timeout. (ref324)",
                            "facts": [
                                {
                                    "name": "Receive Time",
                                    "value": "2016-05-30T16:50:02.503Z"
                                },
                                {
                                    "name": "Node",
                                    "value": "omi10svr"
                                },
                                {
                                    "name": "Category",
                                    "value": "job"
                                },
                                {
                                    "name": "Priority",
                                    "value": "medium"
                                }
                            ]
                        }
                    ]
                }
            `);
            }
            // Overwrite default card content if option 3 is desired
            if (inputNumber === "3") {
                o365Card.content = JSON.parse(`
                {
                    "summary": "Issue 176715375",
                    "themeColor": "0078D7",
                    "title": "Issue opened: Push notifications not working",
                    "sections": [
                        {
                            "activityTitle": "Miguel Garcie",
                            "activitySubtitle": "9/13/2016, 11:46am",
                            "activityImage": "http://connectorsdemo.azurewebsites.net/images/MSC12_Oscar_002.jpg",
                            "facts": [
                                {
                                    "name": "Repository:",
                                    "value": "mgarcia\\test"
                                },
                                {
                                    "name": "Issue #:",
                                    "value": "176715375"
                                }
                            ],
                            "text": "There is a problem with Push notifications, they don't seem to be picked up by the connector."
                        }
                    ]
                }
            `);
            }
            msg.addAttachment(o365Card);
            session.send(msg);
            session.endDialog();
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.O365ConnectorCardDialogId, DialogMatches_1.DialogMatches.O365ConnectorCardDialogMatch, O365ConnectorCardDialog.step1);
    }
}
exports.O365ConnectorCardDialog = O365ConnectorCardDialog;

//# sourceMappingURL=O365ConnectorCardDialog.js.map
