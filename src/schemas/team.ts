export const TeamType = `
    type Team {
        id: Int!
        name: String!
        owner: Int!
        user_id: Int!
        creator: User!
        created_at: String!
        updated_at: String!
    }

    type CreateTeamResponse {
        ok: Boolean!
        team: Team
        errors: [Error!]
    }

    type Query {
        allTeams: [Team!]!
    }

  type Mutation {
    createTeam(name: String!): CreateTeamResponse!
  }
`;
