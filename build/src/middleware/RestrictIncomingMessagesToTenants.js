"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
// Strip bot mentions from the message text
class RestrictIncomingMessagesToTenants {
    constructor() {
        this.botbuilder = (session, next) => {
            let targetTenant = config.office365TenantFilter;
            let currentMsgTenant = session.message.sourceEvent.tenant && session.message.sourceEvent.tenant.id;
            if (targetTenant && targetTenant !== "#ANY#") {
                if (targetTenant === currentMsgTenant) {
                    next();
                }
                else {
                    session.send("MS Teams: Attempted access from a different Office 365 tenant (" + currentMsgTenant + "): message rejected");
                }
            }
            else {
                next();
            }
        };
    }
}
exports.RestrictIncomingMessagesToTenants = RestrictIncomingMessagesToTenants;

//# sourceMappingURL=RestrictIncomingMessagesToTenants.js.map
