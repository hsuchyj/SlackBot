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
const fs = require("fs");
const Zip = require("node-zip");
class ManifestCreatorEnd {
    static getRequestHandler() {
        return function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                let baseUri = config.get("app.baseUri");
                let appId = config.get("bot.botId");
                let baseUriDomain = baseUri.replace(/^https:\/\/|^http:\/\//, "");
                fs.readFile("../../manifest/manifest.json", "utf8", (err, data) => {
                    if (!err) {
                        fs.mkdir("../../manifest/createdManifest", (err2) => {
                            if (!err2 || (err2.code && err2.code === "EEXIST")) {
                                data = data.replace(/<<BASE_URI>>/g, baseUri);
                                data = data.replace(/<<REGISTERED_BOT_ID>>/g, appId);
                                data = data.replace(/<<BASE_URI_DOMAIN>>/g, baseUriDomain);
                                fs.writeFile("../../manifest/createdManifest/manifest.json", data, (err3) => {
                                    if (!err3) {
                                        fs.readFile("../../manifest/createdManifest/bot_blue.png", (err4, data2) => {
                                            if (!err4) {
                                                let zip = new Zip;
                                                zip.file("manifest.json", data);
                                                zip.file("bot_blue.png", data2);
                                                let options = { base64: false, compression: "DEFLATE" };
                                                let zippedData = zip.generate(options);
                                                fs.writeFile("../../manifest/createdManifest/createdManifest.zip", zippedData, "binary", (err5) => {
                                                    if (!err5) {
                                                        res.set("Content-Type", "application/zip");
                                                        res.end(zippedData, "binary");
                                                    }
                                                    else {
                                                        console.log(err5);
                                                    }
                                                });
                                            }
                                            else {
                                                console.log(err4);
                                            }
                                        });
                                    }
                                    else {
                                        console.log(err3);
                                    }
                                });
                            }
                            else {
                                console.log(err2);
                            }
                        });
                    }
                    else {
                        console.log(err);
                    }
                });
            });
        };
    }
}
exports.ManifestCreatorEnd = ManifestCreatorEnd;

//# sourceMappingURL=ManifestCreatorEnd.js.map
