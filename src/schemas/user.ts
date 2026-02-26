import { gql } from 'apollo-server-express';

export const userSchema = gql`
    type User {
        id: Int!
        first_name: String!
        last_name: String!
        phone_number: String!
        email: String!
        username: String!
        password: String!
        created_at: String!
        updated_at: String!
    }
        
    type Query {
        me: User!
    }   

    type RegisterResponse {
        ok: Boolean!
        user: User
        errors: [Error!]
    }

    type LoginResponse {
        User
    }

    type Mutation {
        register(first_name: String!, last_name: String!, phone_number: String!, username: String!, email: String!, password: String!): RegisterResponse!
        login(email: String!, password: String!): LoginResponse!
    }   
`;
