"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "\n  type User {\n    id: Int!\n    uuid: String!\n    firstName: String\n    lastName: String\n    phoneNumber: String\n    username: String!\n    email: String!\n    teams: [Team!]!\n  }\n\n  type Query {\n    me: User!\n    allUsers: [User!]!\n    getUser(userId: Int!): User\n    verifyUser(username: String): Boolean\n    verifyEmail(email: String): Boolean\n  }\n\n  type RegisterResponse {\n    ok: Boolean!\n    user: User\n    errors: [Error!]\n  }\n\n  type LoginResponse {\n    ok: Boolean\n    teamUUID: String\n    channelUUID: String\n    token: String\n    refreshToken: String\n    errors: [Error!]\n  }\n\n  type updateProfileResponse {\n    ok: Boolean!\n    errors: [Error!]    \n  }\n\n  type Mutation {\n    register(firstName: String!, lastName: String!, phoneNumber: String!, username: String!, email: String!, password: String!): RegisterResponse!\n    login(email: String!, password: String!): LoginResponse!\n    updateProfile(id: Int!, username: String!, firstName: String, lastName: String, phoneNumber: String): updateProfileResponse!\n  }\n";
exports["default"] = _default;
//# sourceMappingURL=user.js.map