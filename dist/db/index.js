"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = exports.invalidateSession = exports.getSession = exports.sessions = void 0;
exports.sessions = {};
function getSession(sessionId) {
    const session = exports.sessions[sessionId];
    return session && session.valid ? session : null;
}
exports.getSession = getSession;
function invalidateSession(sessionId) {
    const session = exports.sessions[sessionId];
    if (session) {
        exports.sessions[sessionId].valid = false;
    }
    return exports.sessions[sessionId];
}
exports.invalidateSession = invalidateSession;
function createSession(email, name) {
    const sessionId = String(Object.keys(exports.sessions).length + 1);
    const session = { sessionId, email, valid: true, name };
    exports.sessions[sessionId] = session;
    return session;
}
exports.createSession = createSession;
//# sourceMappingURL=index.js.map