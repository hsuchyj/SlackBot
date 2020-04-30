"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DialogUtils_1 = require("../utils/DialogUtils");
// Set the textLocale field on message events so the botframework's automatic localization features take effect
class SetLocaleFromTeamsSetting {
    constructor() {
        this.receive = (event, next) => {
            let currEvent = event;
            let locale = DialogUtils_1.getLocaleFromEvent(event);
            if (locale) {
                currEvent.textLocale = locale;
            }
            next();
        };
    }
}
exports.SetLocaleFromTeamsSetting = SetLocaleFromTeamsSetting;

//# sourceMappingURL=SetLocaleFromTeamsSetting.js.map
