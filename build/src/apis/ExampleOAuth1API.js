"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const querystring = require("querystring");
const config = require("config");
let http = require("http");
const apiBaseUri = "https://api.Template.com";
// API wrapper
class ExampleOAuth1API {
    // Creates a new request wrapper for a given API.
    constructor() {
        // do nothing in constructor
    }
    // Make a GET request to API.
    // Syntax: .get(uri, [query], callback)
    get(uri, argsOrCallback, callback) {
        this.request("GET", uri, argsOrCallback, callback);
    }
    ;
    getAsync(uri, args = {}) {
        return new Promise((resolve, reject) => {
            this.get(uri, args, (err, result) => {
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
    // Make a DELETE request to API.
    // Syntax: .delete(uri, [query], callback)
    del(uri, argsOrCallback, callback) {
        this.request("DELETE", uri, argsOrCallback, callback);
    }
    ;
    delAsync(uri, args = {}) {
        return new Promise((resolve, reject) => {
            this.del(uri, args, (err, result) => {
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
    // Make a PUT request to API.
    // Syntax: .put(uri, [query], callback)
    put(uri, argsOrCallback, callback) {
        this.request("PUT", uri, argsOrCallback, callback);
    }
    ;
    putAsync(uri, args) {
        return new Promise((resolve, reject) => {
            this.put(uri, args, (err, result) => {
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
        let url = apiBaseUri + (uri[0] === "/" ? "" : "/") + uri;
        if (method === "GET" || method === "DELETE") {
            url += "?" + querystring.stringify(this.parseQuery(uri, args));
        }
        let options = {
            url: url,
            method: method,
            oauth: {
                consumer_key: config.get("externalApp.consumer_key"),
                consumer_secret: config.get("externalApp.consumer_secret"),
                token: config.get("externalAppUser.token"),
                token_secret: config.get("externalAppUser.token_secret"),
            },
            json: true,
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
    // Parse the query string parameters in the uri into the arguments
    parseQuery(uri, args) {
        if (uri.indexOf("?") !== -1) {
            let ref = querystring.parse(uri.split("?")[1]);
            for (let key in ref) {
                let value = ref[key];
                args[key] = value;
            }
        }
        return args;
    }
    ;
}
exports.ExampleOAuth1API = ExampleOAuth1API;

//# sourceMappingURL=ExampleOAuth1API.js.map
