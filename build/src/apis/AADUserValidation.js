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
// import { AADRequestAPI } from "./AADRequestAPI";
const MongoDbTempTokensStorage_1 = require("../storage/MongoDbTempTokensStorage");
const MongoDbAADObjectIdStorage_1 = require("../storage/MongoDbAADObjectIdStorage");
const AADAPI_1 = require("./AADAPI");
const DialogUtils_1 = require("../utils/DialogUtils");
class AADUserValidation {
    static validateUser(bot) {
        return function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let aadAPI = new AADAPI_1.AADAPI();
                    let authorizationUrl = yield aadAPI.getLoginURL(req.query.validationNumb);
                    res.redirect(authorizationUrl);
                }
                catch (e) {
                    // Don't log expected errors - error is probably from there not being example dialogs
                    res.send(`<html>
                    <body>
                    <p>
                        Sorry - There has been an error.` +
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
    static success(bot) {
        return function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    // return result
                    // }
                    // .post('grant_type=authorization_code&client_id=' + clientId + '&client_secret=' + clientSecret + '&redirect_uri=' + redirectUri + '&code=' + req.query.code + '&scope=User.Read%20Group.ReadWrite.All%20User.ReadWrite.All%20offline_access')((err, resp, body) =>
                    // .post()((err, resp, body) =>
                    //     @robot.logger.debug "#{LogPrefix} client err='#{err}'"
                    //     @robot.logger.debug "#{LogPrefix} client resp='#{resp}'"
                    //     @robot.logger.debug "#{LogPrefix} client body='#{body}'"
                    //     data = JSON.parse(body)
                    //     @robot.logger.debug "#{LogPrefix} client data='#{data}'"
                    //     res.send(data)
                    // );
                    // let tempTokensStorage = new MongoDbTempTokensStorage("temp-tokens-test", config.get("mongoDb.connectionString"));
                    let tempTokensDbConnection = yield MongoDbTempTokensStorage_1.MongoDbTempTokensStorage.createConnection();
                    // make this call something we can await?
                    let tempTokensEntry = yield tempTokensDbConnection.getTempTokensAsync(req.query.state);
                    yield tempTokensDbConnection.deleteTempTokensAsync(req.query.state);
                    yield tempTokensDbConnection.close();
                    let aadAPI = new AADAPI_1.AADAPI();
                    let validatedAADInfo = yield aadAPI.getValidatedAADInformation(req.query.code);
                    let htmlPage = `
                    <html>
                    <head>
                    </head>
                    <body>
                        <h1>You did it!!!</h1>
                        <p>`;
                    htmlPage += "Params: " +
                        JSON.stringify(req.params) +
                        "<br><br>Body: " +
                        JSON.stringify(req.body) +
                        "<br><br>Query: " +
                        JSON.stringify(req.query);
                    htmlPage += "<br><br>validatedAADInfo: " +
                        JSON.stringify(validatedAADInfo);
                    htmlPage += "<br><br>Cleaned Cert: " +
                        // result;
                        null;
                    htmlPage += "<br><br>Entry in DB:<br>" +
                        JSON.stringify(tempTokensEntry);
                    htmlPage += "<br><br>Token:<br>" +
                        tempTokensEntry.token;
                    htmlPage += "<br><br>RefreshToken:<br>" +
                        tempTokensEntry.refreshToken;
                    htmlPage += "<br><br>AAD Object Id:<br>" +
                        validatedAADInfo.oid;
                    // https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration
                    // https://login.microsoftonline.com/####/v2.0/.well-known/openid-configuration
                    htmlPage += `
                        </p>
                        <a href="${config.get("app.baseUri") + "/vstsAuthFlowEnd"}">Success</a>
                    </body>
                    </html>`;
                    let aadObjectId = validatedAADInfo.oid;
                    let vstsToken = tempTokensEntry.token;
                    let vstsRefreshToken = tempTokensEntry.refreshToken;
                    let botStateDb = yield MongoDbAADObjectIdStorage_1.MongoDbAADObjectIdStorage.createConnection();
                    let userData = yield botStateDb.getEntryByAADObjectId(aadObjectId);
                    if (DialogUtils_1.isEmptyObj(userData)) {
                        botStateDb.saveTokensByAADObjectId({
                            aadObjectId: aadObjectId,
                            vstsToken: vstsToken,
                            vstsRefreshToken: vstsRefreshToken,
                        });
                    }
                    else {
                        let vstsAuth = {
                            token: vstsToken,
                            refreshToken: vstsRefreshToken,
                        };
                        userData.vstsAuth = vstsAuth;
                        botStateDb.saveBotEntry(userData);
                    }
                    botStateDb.close();
                    res.send(htmlPage);
                }
                catch (e) {
                    // Don't log expected errors - error is probably from there not being example dialogs
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
}
exports.AADUserValidation = AADUserValidation;

//# sourceMappingURL=AADUserValidation.js.map
