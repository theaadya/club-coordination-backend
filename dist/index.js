"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const deserializeUser_1 = __importDefault(require("./middleware/deserializeUser"));
const database_service_1 = require("./services/database.service");
const events_router_1 = require("./routes/events.router");
const clubs_router_1 = require("./routes/clubs.router");
const auth_router_1 = require("./routes/auth.router");
const users_router_1 = require("./routes/users.router");
const app = express_1.default();
const port = 8080; // default port to listen
app.use(cookie_parser_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(deserializeUser_1.default);
app.use(cors_1.default({
    credentials: true,
    origin: "http://localhost:3000",
}));
database_service_1.connectToDatabase()
    .then(() => {
    app.use("/events", events_router_1.eventRouter);
    app.use("/clubs", clubs_router_1.clubRouter);
    app.use("/auth", auth_router_1.authRouter);
    app.use("/user", users_router_1.userRouter);
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
//# sourceMappingURL=index.js.map