import { gql } from '@apollo/client';

export const QUERY_JOBS = gql`
    query getJobs($location: String!, $title: String!) {
        getJobs(location: $location, title: $title) {
            job_id
            Company
            Website
            employer_company_type
            LinkedIn
            job_publisher
            job_employment_type
            job_title
            job_apply_link
            job_apply_is_direct
            Description
            job_is_remote
            job_post_at_datetime
            job_posted_at_timestamp
            Days_since_posted
            City
            State
            Country
            job_min_salary
            job_max_salary
            job_salary_period
            job_salary_currency
            job_job_title
        }
    }
`;
