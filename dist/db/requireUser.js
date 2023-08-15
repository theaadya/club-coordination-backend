"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireUser = void 0;
function requireUser(req, res, next) {
    // @ts-ignore
    if (!req.user) {
        return res.status(403).send("Invalid session");
    }
    return next();
}
exports.requireUser = requireUser;
//# sourceMappingURL=requireUser.js.map