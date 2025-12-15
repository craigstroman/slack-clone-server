"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "\n  type Team {\n    id: Int!\n    uuid: String!\n    name: String!\n    directMessageMembers: [User!]!\n    teamMembers: [User!]!\n    channels: [Channel!]!\n    admin: Boolean!\n  }\n\n  type CreateTeamResponse {\n    ok: Boolean!\n    team: Team\n    uuid: String!\n    errors: [Error!]\n    channelUUID: String!\n  }\n\n  type Query {\n    allTeams: [Team!]!\n    inviteTeams: [Team!]!\n    getTeamMembers(teamId: Int!): [User!]!\n  }\n\n  type VoidResponse {\n    ok: Boolean!\n    errors: [Error!]\n  }\n\n  type Mutation {\n    createTeam(name: String!): CreateTeamResponse!\n    addTeamMember(email: String!, teamId: Int!): VoidResponse!\n  }\n";
exports["default"] = _default;
//# sourceMappingURL=team.js.map