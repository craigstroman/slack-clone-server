export default `
  type Team {
    id: Int!
    uuid: String!
    name: String!
    directMessageMembers: [User!]!
    teamMembers: [User!]!
    channels: [Channel!]!
    admin: Boolean!
  }

  type CreateTeamResponse {
    ok: Boolean!
    team: Team
    uuid: String!
    errors: [Error!]
    channelUUID: String!
  }

  extend type Query {
    allTeams: [Team!]!
    inviteTeams: [Team!]!
    getTeamMembers(teamId: Int!): [User!]!
  }

  type VoidResponse {
    ok: Boolean!
    errors: [Error!]
  }

  extend type Mutation {
    createTeam(name: String!): CreateTeamResponse!
    addTeamMember(email: String!, teamId: Int!): VoidResponse!
  }
`;