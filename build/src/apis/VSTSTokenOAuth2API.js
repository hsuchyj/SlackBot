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
const request = require("request");
const querystring = require("querystring");
const config = require("config");
let http = require("http");
// import { loadSessionAsync } from "../utils/DialogUtils";
// import { Strings } from "../locale/locale";
// import { DialogIds } from "../utils/DialogIds";
const MongoDbTempTokensStorage_1 = require("../storage/MongoDbTempTokensStorage");
// API wrapper
class VSTSTokenOAuth2API {
    static getUserAuthorizationURL() {
        let args = {
            client_id: config.get("vstsApp.appId"),
            response_type: "Assertion",
            state: "",
            scope: "vso.work",
            redirect_uri: config.get("app.baseUri") + "/api/VSTSOauthCallback",
        };
        let url = "https://app.vssps.visualstudio.com/oauth2/authorize/?" + querystring.stringify(args);
        return url;
    }
    static setUserAccessToken(bot) {
        return function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let code = req.query.code;
                    let auth = new VSTSTokenOAuth2API();
                    // change to be more "random" and robust than this
                    let randomValidationNumber = Math.floor((Math.random() * 1000000) + 1);
                    yield auth.tempSaveTokens(code, randomValidationNumber.toString());
                    // res.send(session.gettext(Strings.please_return_to_teams, randomValidationNumber));
                    res.redirect(config.get("app.baseUri") + "/api/validateUser?validationNumb=" + randomValidationNumber);
                }
                catch (e) {
                    // Don't log expected errors
                    res.send(`<html>
                    <body>
                    <p>
                        Sorry.  There has been an error.` +
                        e.toString() +
                        `</p>
                    <br>
                    <img src="/tab/error_generic.png" alt="default image" />
                    </body>
                    </html>`);
                }
            });
        };
    }
    constructor() {
        // do nothing
    }
    tempSaveTokens(code, randomValidationNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            let args = {
                assertion: code,
                tokenRequestType: "get_token",
            };
            let resp = yield this.postAsync("", args);
            let body = JSON.parse(resp);
            // session.userData.vstsAuth = {
            //     token: body.access_token,
            //     refreshToken: body.refresh_token,
            //     isValidated: false,
            //     randomValidationNumber: randomValidationNumber,
            // };
            let tempTokensEntry = {
                _id: randomValidationNumber,
                token: body.access_token,
                refreshToken: body.refresh_token,
            };
            // let tempTokensStorage = new MongoDbTempTokensStorage("temp-tokens-test", config.get("mongoDb.connectionString"));
            let tempTokensDbConnection = yield MongoDbTempTokensStorage_1.MongoDbTempTokensStorage.createConnection();
            // make this call something we can await?
            yield tempTokensDbConnection.saveTempTokensAsync(tempTokensEntry);
            yield tempTokensDbConnection.close();
        });
    }
    refreshTokens(session) {
        return __awaiter(this, void 0, void 0, function* () {
            session.sendTyping();
            let args = {
                vsts_refresh_token: session.userData.vstsAuth.refreshToken,
                tokenRequestType: "refresh_token",
            };
            let resp = yield this.postAsync("", args);
            let body = JSON.parse(resp);
            session.userData.vstsAuth.token = body.access_token;
            session.userData.vstsAuth.refreshToken = body.refresh_token;
            // used for debugging to let developer know tokens were refreshed
            // session.send(Strings.tokens_refreshed_confirmation);
            // try to save the tokens in case no other messages are sent
            session.save().sendBatch();
        });
    }
    // Make a POST request to API.
    // Syntax: .post(uri, [query], callback)
    post(uri, argsOrCallback, callback) {
        this.request("POST", uri, argsOrCallback, callback);
    }
    ;
    postAsync(uri, args) {
        return new Promise((resolve, reject) => {
            this.post(uri, args, (err, result) => {
                if (!err) {
                    resolve(result);
                }
                else {
                    reject(err);
                }
            });
        });
    }
    ;
    // Make a request to API.
    // Syntax: .request(method, uri, [query], callback)
    request(method, uri, argsOrCallback, callback) {
        let args;
        if (callback) {
            args = argsOrCallback;
        }
        else {
            callback = argsOrCallback;
            args = {};
        }
        let options = {
            url: "https://app.vssps.visualstudio.com/oauth2/token",
            method: method,
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
        };
        if (args.tokenRequestType === "get_token") {
            options.body = "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" +
                "&client_assertion=" + config.get("vstsApp.appSecret") +
                "&grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer" +
                "&assertion=" + args.assertion +
                "&redirect_uri=" + config.get("app.baseUri") + "/api/VSTSOauthCallback";
        }
        else if (args.tokenRequestType === "refresh_token") {
            options.body = "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" +
                "&client_assertion=" + config.get("vstsApp.appSecret") +
                "&grant_type=refresh_token" +
                "&assertion=" + args.vsts_refresh_token +
                "&redirect_uri=" + config.get("app.baseUri") + "/api/VSTSOauthCallback";
        }
        let requestCallback = function (err, response, body) {
            if (!err && response.statusCode >= 400) {
                err = new Error(body);
                err.statusCode = response.statusCode;
                err.responseBody = body;
                err.statusMessage = http.STATUS_CODES[response.statusCode];
            }
            callback(err, body);
        };
        request.post(options, requestCallback);
    }
    ;
}
exports.VSTSTokenOAuth2API = VSTSTokenOAuth2API;

//# sourceMappingURL=VSTSTokenOAuth2API.js.map
