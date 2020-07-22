export default `
  type Channel {
    id: Int!
    uuid: String!
    name: String!
    public: Boolean!
    messages: [Message!]!
    users: [User!]!
  }

  type ChannelResponse {
    ok: Boolean!
    channel: Channel
    errors: [Error]!
  }

  extend type Mutation {
    createChannel(teamId: Int!, name: String!, public: Boolean=false): ChannelResponse!
  }
`;
