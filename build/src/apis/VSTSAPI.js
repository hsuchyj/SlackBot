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
const VSTSRequestAPI_1 = require("./VSTSRequestAPI");
const querystring = require("querystring");
class VSTSAPI {
    constructor() {
        this.requestAPI = new VSTSRequestAPI_1.VSTSRequestAPI();
    }
    getWorkItem(id, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let args = {
                "ids": id,
                "api-version": "1.0",
            };
            let url = "https://teamsbot.visualstudio.com/DefaultCollection/_apis/wit/workitems?" + querystring.stringify(args);
            let resp = yield this.requestAPI.getAsync(url, session);
            let body = JSON.parse(resp);
            return body;
        });
    }
}
exports.VSTSAPI = VSTSAPI;

//# sourceMappingURL=VSTSAPI.js.map
