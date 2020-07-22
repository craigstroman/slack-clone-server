export default `
  type Message {
    id: Int!
    text: String!
    user: User!
    channel: Channel!
    createdAt: String!
  }

  extend type Query {
    messages(channelId: Int!): [Message!]!
  }

  extend type Mutation {
    createMessage(channelId: Int!, text: String!): Boolean!
  }
`;
