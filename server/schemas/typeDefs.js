const { gql } = require('apollo-server');

const typeDefs = gql`

    type Results {
        job_id: ID
        Company: String
        Website: String
        employer_company_type: String
        LinkedIn: String
        job_publisher: String
        job_employment_type: String
        job_title: String
        job_apply_link: String
        job_apply_is_direct: String
        Description: String
        job_is_remote: Boolean
        job_post_at_datetime: String
        job_posted_at_timestamp: String
        Days_since_posted: String
        City: String
        State: String
        Country: String
        job_min_salary: String
        job_max_salary: String
        job_salary_period: String
        job_salary_currency: String
        job_job_title: String
    }

    type Query {
        getJobs(location: String!, title: String!): [Results]
    }

    type Account {
        email: String
        userName: String
    }

    type Auth {
        token: ID!
        account: Account
    }

    type Mutation {
        login(email: String!, 
            password: String!
        ): Auth
    }
   
`;

module.exports = typeDefs;