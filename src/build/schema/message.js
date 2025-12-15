"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "\n  type Message {\n    id: Int!\n    text: String!\n    user: User!\n    channel: Channel!\n    createdAt: String!\n  }\n\n  type Subscription {\n    newChannelMessage(channelId: Int!): Message!\n  }\n\n  type Query {\n    messages(channelId: Int!): [Message!]!\n  }\n\n  type Mutation {\n    createMessage(channelId: Int!, text: String!): Boolean!\n  }\n";
exports["default"] = _default;
//# sourceMappingURL=message.js.map