"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let express = require("express");
let exphbs = require("express-handlebars");
let favicon = require("serve-favicon");
let http = require("http");
let path = require("path");
let config = require("config");
const Bot_1 = require("./Bot");
const VSTSTokenOAuth2API_1 = require("./apis/VSTSTokenOAuth2API");
const teams = require("botbuilder-teams");
const LoadingTab_1 = require("./pages/LoadingTab");
const DefaultTab_1 = require("./pages/DefaultTab");
const AllCommandsTab_1 = require("./pages/AllCommandsTab");
const VSTSAuthTab_1 = require("./pages/VSTSAuthTab");
const VSTSAuthFlowStartPopUp_1 = require("./pages/VSTSAuthFlowStartPopUp");
const VSTSAuthFlowEndPopUp_1 = require("./pages/VSTSAuthFlowEndPopUp");
const ComposeExtensionSettingsPopUp_1 = require("./pages/ComposeExtensionSettingsPopUp");
const MongoDbBotStorage_1 = require("./storage/MongoDbBotStorage");
const MongoDbBotChannelStorage_1 = require("./storage/MongoDbBotChannelStorage");
const AADUserValidation_1 = require("./apis/AADUserValidation");
const ValidateAADToken_1 = require("./apis/ValidateAADToken");
const ManifestCreatorStart_1 = require("./pages/ManifestCreatorStart");
const ManifestCreatorEnd_1 = require("./pages/ManifestCreatorEnd");
const builder = require("botbuilder");
// Configure instrumentation - tooling with Azure
// let appInsights = require("applicationinsights");
// let instrumentationKey = config.get("app.instrumentationKey");
// if (instrumentationKey) {
//     appInsights.setup(instrumentationKey).start();
// }
let app = express();
app.set("port", process.env.PORT || 3978);
app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "./public"))); // used for static dialogs
app.use(favicon(path.join(__dirname, "../../public/assets", "favicon.ico")));
let handlebars = exphbs.create({
    extname: ".hbs",
    helpers: {
        appId: () => { return config.get("app.appId"); },
    },
});
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");
// Tab and Popup urls
app.get("/loading", LoadingTab_1.LoadingTab.getRequestHandler());
app.get("/default", DefaultTab_1.DefaultTab.getRequestHandler());
app.get("/allCommands", AllCommandsTab_1.AllCommandsTab.getRequestHandler());
app.get("/vstsAuth", VSTSAuthTab_1.VSTSAuthTab.getRequestHandler());
app.get("/vstsAuthFlowStart", VSTSAuthFlowStartPopUp_1.VSTSAuthFlowStartPopUp.getRequestHandler());
app.get("/vstsAuthFlowEnd", VSTSAuthFlowEndPopUp_1.VSTSAuthFlowEndPopUp.getRequestHandler());
app.get("/composeExtensionSettings", ComposeExtensionSettingsPopUp_1.ComposeExtensionSettingsPopUp.getRequestHandler());
// Tab authentication sample routes
app.get("/tab-auth/simple", (req, res) => { res.render("tab-auth/simple"); });
app.get("/tab-auth/simple-start", (req, res) => { res.render("tab-auth/simple-start"); });
app.get("/tab-auth/simple-start-v2", (req, res) => { res.render("tab-auth/simple-start-v2"); });
app.get("/tab-auth/simple-end", (req, res) => { res.render("tab-auth/simple-end"); });
app.get("/tab-auth/silent", (req, res) => { res.render("tab-auth/silent"); });
app.get("/tab-auth/silent-start", (req, res) => { res.render("tab-auth/silent-start"); });
app.get("/tab-auth/silent-end", (req, res) => { res.render("tab-auth/silent-end"); });
app.get("/", ManifestCreatorStart_1.ManifestCreatorStart.getRequestHandler());
app.get("/createdManifest", ManifestCreatorEnd_1.ManifestCreatorEnd.getRequestHandler());
// Create Teams connector for the bot
let connector = new teams.TeamsChatConnector({
    appId: config.get("bot.botId"),
    appPassword: config.get("bot.botPassword"),
});
// Create storage for the bot
let channelStorage = null;
// This defaults to using the botbuilder's in memory storage
let botStorage = new builder.MemoryBotStorage();
if (config.get("channelStorageType") === "mongoDb") {
    channelStorage = new MongoDbBotChannelStorage_1.MongoDbBotChannelStorage(config.get("mongoDb.botStateCollection"), config.get("mongoDb.connectionString"));
    botStorage = new MongoDbBotStorage_1.MongoDbBotStorage(config.get("mongoDb.botStateCollection"), config.get("mongoDb.connectionString"));
}
let botSettings = {
    channelStorage: channelStorage,
    storage: botStorage,
};
let bot = new Bot_1.Bot(connector, botSettings);
// Configure bot routes
app.post("/api/messages", connector.listen());
app.get("/api/VSTSOauthCallback", VSTSTokenOAuth2API_1.VSTSTokenOAuth2API.setUserAccessToken(bot));
app.get("/api/validateUser", AADUserValidation_1.AADUserValidation.validateUser(bot));
app.get("/api/success", AADUserValidation_1.AADUserValidation.success(bot));
app.get("/api/validateToken", ValidateAADToken_1.ValidateAADToken.listen());
// catch 404 and forward to error handler
// app.use((req: Request, res: Response, next: Function) => {
//     let err: any = new Error("Not Found");
//     err.status = 404;
//     next(err);
// });
// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err,
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {},
    });
});
let baseUri = config.get("app.baseUri");
let validBaseUri = !(/^https:\/\/localhost|^http:\/\/localhost|^localhost/i.test(baseUri));
http.createServer(app).listen(app.get("port"), function () {
    console.log(""); // for blank line for readability
    console.log("Express server listening on port " + app.get("port"));
    console.log(""); // for blank line for readability
    console.log("Server running successfully");
    // only return message to register in Bot Framework if it is set to something other than your locally running instance
    if (validBaseUri) {
        console.log("Endpoint to register in Bot Framework:");
        console.log(baseUri + "/api/messages");
    }
});
module.exports = app;

//# sourceMappingURL=app.js.map
