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
class LoadingTab {
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
                        <script src='https://statics.teams.microsoft.com/sdk/v1.0/js/MicrosoftTeams.min.js'></script>
                        <script src='https://code.jquery.com/jquery-1.11.3.min.js'></script>
                    </head>

                    <body>
                        <script>
                            var microsoftTeams;

                            $(document).ready(function () { 
                                microsoftTeams.initialize();
                            
                                microsoftTeams.getContext((context) => {
                                    switch (context.subEntityId) {
                                        case 'allCommands':
                                            window.location = window.location.protocol + '//' + window.location.host + '/allCommands';
                                            break;
                                        case 'vstsAuth':
                                            window.location = window.location.protocol + '//' + window.location.host + '/vstsAuth';
                                            break;
                                        default:
                                            window.location = window.location.protocol + '//' + window.location.host + '/default';
                                    }
                                });
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
exports.LoadingTab = LoadingTab;

//# sourceMappingURL=LoadingTab.js.map
