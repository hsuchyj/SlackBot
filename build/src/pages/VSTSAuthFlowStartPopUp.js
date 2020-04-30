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
const VSTSTokenOAuth2API_1 = require("../apis/VSTSTokenOAuth2API");
class VSTSAuthFlowStartPopUp {
    static getRequestHandler() {
        return function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let htmlPage = `<!DOCTYPE html>
                    <html>
                    <head>
                        <title>Bot Info</title>
                        <meta charset="utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <script src='https://code.jquery.com/jquery-1.11.3.min.js'></script>
                    </head>

                    <body>
                        <p>Auth Flow Start</p>
                        <script>
                            $(document).ready(function () { 
                                window.location = "${VSTSTokenOAuth2API_1.VSTSTokenOAuth2API.getUserAuthorizationURL()}";
                            });
                        </script>
                    </body>
                    </html>`;
                    res.send(htmlPage);
                }
                catch (e) {
                    res.send(`<html>
                    <body>
                    <p>
                        Sorry. There was an error.
                    </p>
                    <br>
                    <img src="/tab/error_generic.png" alt="default image" />
                    </body>
                    </html>`);
                }
            });
        };
    }
}
exports.VSTSAuthFlowStartPopUp = VSTSAuthFlowStartPopUp;

//# sourceMappingURL=VSTSAuthFlowStartPopUp.js.map
