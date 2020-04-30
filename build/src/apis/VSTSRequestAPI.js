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
let http = require("http");
const VSTSTokenOAuth2API_1 = require("./VSTSTokenOAuth2API");
const DialogIds_1 = require("../utils/DialogIds");
const locale_1 = require("../locale/locale");
// API wrapper
class VSTSRequestAPI {
    // Creates a new request wrapper for a given API.
    constructor() {
        // do nothing
    }
    isUserValidated(session) {
        // let isValidated = session.userData &&
        //     session.userData.vstsAuth &&
        //     session.userData.vstsAuth.isValidated;
        let isValidated = session.userData &&
            session.userData.vstsAuth &&
            session.userData.vstsAuth.token &&
            session.userData.vstsAuth.refreshToken;
        if (!isValidated) {
            session.send(locale_1.Strings.need_to_log_in);
            session.beginDialog(DialogIds_1.DialogIds.VSTSLogInDialogId);
        }
        return isValidated;
    }
    getAccessToken(session) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isUserValidated(session)) {
                return null;
            }
            let auth = new VSTSTokenOAuth2API_1.VSTSTokenOAuth2API();
            // sets tokens in session.userData.vstsAuth.token and session.userData.vstsAuth.refreshToken
            yield auth.refreshTokens(session);
            session.sendTyping();
            let args = { vsts_access_token: session.userData.vstsAuth.token };
            return args;
        });
    }
    ;
    // Make a GET request to API.
    // Syntax: .get(uri, [query], callback)
    get(url, argsOrCallback, callback) {
        this.request("GET", url, argsOrCallback, callback);
    }
    ;
    // tslint:disable-next-line:member-ordering
    getAsync(url, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let args = yield this.getAccessToken(session);
            if (!args) {
                return null;
            }
            return new Promise((resolve, reject) => {
                this.get(url, args, (err, result) => {
                    if (!err) {
                        resolve(result);
                    }
                    else {
                        reject(err);
                    }
                });
            });
        });
    }
    ;
    // Make a DELETE request to API.
    // Syntax: .delete(uri, [query], callback)
    del(url, argsOrCallback, callback) {
        this.request("DELETE", url, argsOrCallback, callback);
    }
    ;
    // tslint:disable-next-line:member-ordering
    delAsync(url, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let args = yield this.getAccessToken(session);
            if (!args) {
                return null;
            }
            return new Promise((resolve, reject) => {
                this.del(url, args, (err, result) => {
                    if (!err) {
                        resolve(result);
                    }
                    else {
                        reject(err);
                    }
                });
            });
        });
    }
    ;
    // Make a POST request to API.
    // Syntax: .post(uri, [query], callback)
    post(url, argsOrCallback, callback) {
        this.request("POST", url, argsOrCallback, callback);
    }
    ;
    // tslint:disable-next-line:member-ordering
    postAsync(url, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let args = yield this.getAccessToken(session);
            if (!args) {
                return null;
            }
            return new Promise((resolve, reject) => {
                this.post(url, args, (err, result) => {
                    if (!err) {
                        resolve(result);
                    }
                    else {
                        reject(err);
                    }
                });
            });
        });
    }
    ;
    // Make a PUT request to API.
    // Syntax: .put(uri, [query], callback)
    put(url, argsOrCallback, callback) {
        this.request("PUT", url, argsOrCallback, callback);
    }
    ;
    // tslint:disable-next-line:member-ordering
    putAsync(url, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let args = yield this.getAccessToken(session);
            if (!args) {
                return null;
            }
            return new Promise((resolve, reject) => {
                this.put(url, args, (err, result) => {
                    if (!err) {
                        resolve(result);
                    }
                    else {
                        reject(err);
                    }
                });
            });
        });
    }
    ;
    // Make a request to API.
    // Syntax: .request(method, uri, [query], callback)
    request(method, url, argsOrCallback, callback) {
        let args;
        if (callback) {
            args = argsOrCallback;
        }
        else {
            callback = argsOrCallback;
            args = {};
        }
        let options = {
            url: url,
            method: method,
            headers: {
                "authorization": "bearer " + args.vsts_access_token,
            },
        };
        let requestCallback = function (err, response, body) {
            if (!err && response.statusCode >= 400) {
                err = new Error(body);
                err.statusCode = response.statusCode;
                err.responseBody = body;
                err.statusMessage = http.STATUS_CODES[response.statusCode];
            }
            callback(err, body);
        };
        switch (method.toLowerCase()) {
            case "get":
                request.get(options, requestCallback);
                break;
            case "post":
                request.post(options, requestCallback);
                break;
            case "put":
                request.put(options, requestCallback);
                break;
            case "delete":
                request.delete(options, requestCallback);
                break;
        }
    }
    ;
}
exports.VSTSRequestAPI = VSTSRequestAPI;

//# sourceMappingURL=VSTSRequestAPI.js.map
