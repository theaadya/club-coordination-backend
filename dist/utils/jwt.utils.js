"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`;
const publicKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA2rFhV6XgMQMk/UtkXarx
PIDtN3uWf/zZTQJOz7pUP486b4DpHQj0Dl++tf4xYJ7xRQu5gj+dFNx+B3rYGC8a
08zqB6jKtK+xh+0TRVQt2qk1er4XzsdkBomw+fUpl3NPTU2K0pjMVUO4xhuOc/KJ
B49hxg5eGnlbT+SSp3xcKiJhwu+bQnxekq0+w7XLlUhwtBM17C7/goleXxz1IWPc
rIJN01GnDX7HqB4PLiId6NLgI06MKslq/MB6S2hB8C2oFcBGvGWhxylsS0r7C7/1
wPf4g7MrtRt5a0aPnzOhv+Bn3Yve9Id0QHv7OTtGZKHEyoWyM+tp8VXABfuxj43P
li+TFhj4g+TKiHA58/uTYHACYCfC7/XTrFw4Q1EKtpMo/ykCB8qaZI3P4nJbCz6I
3eANypL6FdZEWecdUOMvODT6P/eNtxDYcAIxqQQQcdrDdjwyccNmTbX6KYMLc0wh
NRKwnfuUYV8H+6mrmnyibnuByDMT6snmoDe6QlC5Gug2szQHwVEBegyUUDomVRCw
jtns3lpXwVmozI7v+xLgafI31ZHCtR8XT0y+jyP0rVp9GjK+rlFf/9UQe/J3AolR
z+uTaGmUF6ESMClOU4K674KqXBETS/iwIY0oW74LHil60IAfkgpBKarUh9tAbixX
vn9foIB/5OcB+AD4+/l+UDMCAwEAAQ==
-----END PUBLIC KEY-----`;
// sign jwt
function signJWT(payload, expiresIn) {
    return jsonwebtoken_1.default.sign(payload, privateKey, { algorithm: "RS256", expiresIn });
}
exports.signJWT = signJWT;
function verifyJWT(token) {
    var _a;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, publicKey); // Explicitly cast the decoded object to JwtPayload
        return { payload: decoded, expired: false };
    }
    catch (error) {
        return { payload: null, expired: (_a = error) === null || _a === void 0 ? void 0 : _a.message.includes("jwt expired") };
    }
}
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=jwt.utils.js.map