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
// used this format due to how url-join is created and packaged in node_modules
const urlJoin = require("url-join");
function loadSessionAsync(bot, event) {
    let address = event.address;
    return new Promise((resolve, reject) => {
        bot.loadSession(address, (err, session) => {
            if (!err) {
                let locale = getLocaleFromEvent(event);
                if (locale) {
                    session._locale = locale;
                    session.localizer.load(locale, (err2) => {
                        resolve(session);
                    });
                }
                else {
                    resolve(session);
                }
            }
            else {
                reject(err);
            }
        });
    });
}
exports.loadSessionAsync = loadSessionAsync;
;
function getLocaleFromEvent(event) {
    // casting to keep away typescript errors
    let currEvent = event;
    if (currEvent.entities && currEvent.entities.length) {
        for (let i = 0; i < currEvent.entities.length; i++) {
            if (currEvent.entities[i].type &&
                currEvent.entities[i].type === "clientInfo" &&
                currEvent.entities[i].locale) {
                return currEvent.entities[i].locale;
            }
        }
    }
    return null;
}
exports.getLocaleFromEvent = getLocaleFromEvent;
function isMessageFromChannel(message) {
    return (message.sourceEvent && message.sourceEvent.channel && message.sourceEvent.channel.id);
}
exports.isMessageFromChannel = isMessageFromChannel;
// simply checks to see if the incoming object is an empty object, i.e. {}
// returns true on a null or undefined input
function isEmptyObj(obj) {
    if (obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }
    return true;
}
exports.isEmptyObj = isEmptyObj;
// Starts a new reply chain by posting a message to a channel.
// Parameters:
//      chatConnector: Chat connector instance.
//      message: The message to post. The address in this message is ignored, and the message is posted to the specified channel.
//      channelId: Id of the channel to post the message to.
// Returns: A copy of "message.address", with the "conversation" property referring to the new reply chain.
function startReplyChainInChannel(chatConnector, message, channelId) {
    return __awaiter(this, void 0, void 0, function* () {
        let activity = message.toMessage();
        // Build request
        let options = {
            method: "POST",
            // We use urlJoin to concatenate urls. url.resolve should not be used here,
            // since it resolves urls as hrefs are resolved, which could result in losing
            // the last fragment of the serviceUrl
            url: urlJoin(activity.address.serviceUrl, "/v3/conversations"),
            body: {
                isGroup: true,
                activity: activity,
                channelData: {
                    teamsChannelId: channelId,
                },
            },
            json: true,
        };
        let response = yield sendRequestWithAccessToken(chatConnector, options);
        if (response && response.hasOwnProperty("id")) {
            let address = createAddressFromResponse(activity.address, response);
            if (address.user) {
                delete address.user;
            }
            if (address.correlationId) {
                delete address.correlationId;
            }
            return address;
        }
        else {
            throw new Error("Failed to start reply chain: no conversation ID returned.");
        }
    });
}
exports.startReplyChainInChannel = startReplyChainInChannel;
// Send an authenticated request
function sendRequestWithAccessToken(chatConnector, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // Add access token
        yield addAccessToken(chatConnector, options);
        // Execute request
        return new Promise((resolve, reject) => {
            request(options, (err, response, body) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (response.statusCode < 400) {
                        try {
                            let result = typeof body === "string" ? JSON.parse(body) : body;
                            resolve(result);
                        }
                        catch (e) {
                            reject(e instanceof Error ? e : new Error(e.toString()));
                        }
                    }
                    else {
                        let txt = "Request to '" + options.url + "' failed: [" + response.statusCode + "] " + response.statusMessage;
                        reject(new Error(txt));
                    }
                }
            });
        });
    });
}
// Add access token to request options
function addAccessToken(chatConnector, options) {
    return new Promise((resolve, reject) => {
        // ChatConnector type definition doesn't include getAccessToken
        chatConnector.getAccessToken((err, token) => {
            if (err) {
                reject(err);
            }
            else {
                options.headers = {
                    "Authorization": "Bearer " + token,
                };
                resolve();
            }
        });
    });
}
// Create a copy of address with the data from the response
function createAddressFromResponse(address, response) {
    let result = Object.assign({}, address, { conversation: { id: response["id"] }, useAuth: true });
    if (result.id) {
        delete result.id;
    }
    if (response["activityId"]) {
        result.id = response["activityId"];
    }
    return result;
}
// Get the channel id in the event
function getChannelId(event) {
    let sourceEvent = event.sourceEvent;
    if (sourceEvent) {
        if (sourceEvent.teamsChannelId) {
            return sourceEvent.teamsChannelId;
        }
        else if (sourceEvent.channel) {
            return sourceEvent.channel.id;
        }
    }
    return "";
}
exports.getChannelId = getChannelId;
// Get the team id in the event
function getTeamId(event) {
    let sourceEvent = event.sourceEvent;
    if (sourceEvent) {
        if (sourceEvent.team) {
            return sourceEvent.team.id;
        }
        else if (sourceEvent.teamsTeamId) {
            return sourceEvent.teamsTeamId;
        }
    }
    return "";
}
exports.getTeamId = getTeamId;

//# sourceMappingURL=DialogUtils.js.map
