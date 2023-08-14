"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const jwt_utils_1 = require("../utils/jwt.utils");
function deserializeUser(req, res, next) {
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken) {
        return next();
    }
    const { payload, expired } = jwt_utils_1.verifyJWT(accessToken);
    // For a valid access token
    if (payload) {
        // @ts-ignore
        req.user = payload;
        return next();
    }
    // expired but valid access token
    const { payload: refresh } = expired && refreshToken ? jwt_utils_1.verifyJWT(refreshToken) : { payload: null };
    if (!refresh) {
        return next();
    }
    // @ts-ignore
    const session = db_1.getSession(refresh.sessionId);
    if (!session) {
        return next();
    }
    const newAccessToken = jwt_utils_1.signJWT(session, "5s");
    res.cookie("accessToken", newAccessToken, {
        maxAge: 300000,
        httpOnly: true,
    });
    // @ts-ignore
    req.user = jwt_utils_1.verifyJWT(newAccessToken).payload;
    return next();
}
exports.default = deserializeUser;
//# sourceMappingURL=deserializeUser.js.map