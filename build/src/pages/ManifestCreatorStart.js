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
const config = require("config");
class ManifestCreatorStart {
    static getRequestHandler() {
        return function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                let baseUri = config.get("app.baseUri");
                // a valid base uri cannot simply be your locally running instance
                let validBaseUri = baseUri && !(/^https:\/\/localhost|^http:\/\/localhost|^localhost/i.test(baseUri));
                let appId = config.get("bot.botId");
                // this is to check against the default value I put in the env variable for the Glitch deployment
                let validAppId = appId && appId !== "NeedToSetThis";
                res.render("manifest-creator/manifestCreatorStart", {
                    baseUri: baseUri,
                    validBaseUri: validBaseUri,
                    appId: appId,
                    validAppId: validAppId,
                    createManifestEnabled: validBaseUri && validAppId,
                });
            });
        };
    }
}
exports.ManifestCreatorStart = ManifestCreatorStart;

//# sourceMappingURL=ManifestCreatorStart.js.map
