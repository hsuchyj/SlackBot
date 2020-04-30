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
// import * as builder from "botbuilder";
let http = require("http");
// API wrapper
class AADRequestAPI {
    // Creates a new request wrapper for a given API.
    constructor() {
        // do nothing
    }
    // private isUserValidated(session: builder.Session): boolean {
    //     let isValidated = session.userData &&
    //         session.userData.vstsAuth &&
    //         session.userData.vstsAuth.isValidated;
    //     if (!isValidated) {
    //         session.send(Strings.need_to_log_in);
    //         session.beginDialog(DialogIds.VSTSLogInDialogId);
    //     }
    //     return isValidated;
    // }
    // private async getAccessToken(session: builder.Session): Promise<any> {
    //     if (!this.isUserValidated(session)) {
    //         return null;
    //     }
    //     let auth = new VSTSTokenOAuth2API();
    //     // sets tokens in session.userData.vstsAuth.token and session.userData.vstsAuth.refreshToken
    //     await auth.refreshTokens(session);
    //     session.sendTyping();
    //     let args = { vsts_access_token: session.userData.vstsAuth.token };
    //     return args;
    // };
    // Make a GET request to API.
    // Syntax: .get(uri, [query], callback)
    get(url, headers, bodyOrCallback, callback) {
        this.request("GET", url, headers, bodyOrCallback, callback);
    }
    ;
    // tslint:disable-next-line:member-ordering
    getAsync(url, headers, body) {
        return __awaiter(this, void 0, void 0, function* () {
            // let args = await this.getAccessToken(session);
            // if (!args) {
            //     return null;
            // }
            return new Promise((resolve, reject) => {
                this.get(url, headers, body, (err, result) => {
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
    del(url, headers, bodyOrCallback, callback) {
        this.request("DELETE", url, headers, bodyOrCallback, callback);
    }
    ;
    // tslint:disable-next-line:member-ordering
    delAsync(url, headers, body) {
        return __awaiter(this, void 0, void 0, function* () {
            // let args = await this.getAccessToken(session);
            // if (!args) {
            //     return null;
            // }
            return new Promise((resolve, reject) => {
                this.del(url, headers, body, (err, result) => {
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
    post(url, headers, bodyOrCallback, callback) {
        this.request("POST", url, headers, bodyOrCallback, callback);
    }
    ;
    // tslint:disable-next-line:member-ordering
    postAsync(url, headers, body) {
        return __awaiter(this, void 0, void 0, function* () {
            // let args = await this.getAccessToken(session);
            // if (!args) {
            //     return null;
            // }
            return new Promise((resolve, reject) => {
                this.post(url, headers, body, (err, result) => {
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
    put(url, headers, bodyOrCallback, callback) {
        this.request("PUT", url, headers, bodyOrCallback, callback);
    }
    ;
    // tslint:disable-next-line:member-ordering
    putAsync(url, headers, body) {
        return __awaiter(this, void 0, void 0, function* () {
            // let args = await this.getAccessToken(session);
            // if (!args) {
            //     return null;
            // }
            return new Promise((resolve, reject) => {
                this.put(url, headers, body, (err, result) => {
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
    request(method, url, headers, bodyOrCallback, callback) {
        let body;
        if (callback) {
            body = bodyOrCallback;
        }
        else {
            callback = bodyOrCallback;
            body = {};
        }
        let options = {
            url: url,
            method: method,
            headers: headers,
            form: body,
        };
        let requestCallback = function (err, response, responseBody) {
            if (!err && response.statusCode >= 400) {
                err = new Error(responseBody);
                err.statusCode = response.statusCode;
                err.responseBody = responseBody;
                err.statusMessage = http.STATUS_CODES[response.statusCode];
            }
            callback(err, responseBody);
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
exports.AADRequestAPI = AADRequestAPI;

//# sourceMappingURL=AADRequestAPI.js.map
