const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const axios = require('axios').default;
const { DateTime, Interval } = require("luxon");
require('dotenv').config()

const resolvers = {
    Query: {
        getJobs: async (parent, { location, title }) => {
            const excludedPublishers = ['robert half', 'staffing'];
            const opts = {
                method: 'POST',
                url: 'https://jobs-search-api.p.rapidapi.com/getjobs',
                headers: {
                  'x-rapidapi-key': '6e610169c4mshd34ac7712c807bbp1b62b7jsn3a157c454c37',
                  'x-rapidapi-host': 'jobs-search-api.p.rapidapi.com',
                  'Content-Type': 'application/json'
                },
                data: {
                  search_term: title,
                  location: location,
                  site_name: [
                    'indeed',
                    'linkedin',
                    'zip_recruiter',
                    'glassdoor'
                  ],
                  distance: 50,
                  linkedin_fetch_description: false,
                }
            }
            const options = {
                method: 'GET',
                url: 'https://jsearch.p.rapidapi.com/search',
                params: {
                  query: `${title} in ${location}, USA`,
                  page: '1',
                  num_pages: '10',
                  date_posted: 'all'
                },
                headers: {
                  'x-rapidapi-key': '6e610169c4mshd34ac7712c807bbp1b62b7jsn3a157c454c37',
                  'x-rapidapi-host': 'jsearch.p.rapidapi.com'
                }
              };
              
              try {
                const resp = await axios.request(opts);
                const respData = resp.data.jobs.map((e) => {
                    const date1 = DateTime.now();
                    const date2 = new Date(e.date_posted);
                    const diff = !!date2 && Interval?.fromDateTimes(date2, date1);

                    return {
                        Company: e.company,
                        job_id: e.id,
                        Website: e.company_url_direct,
                        employer_company_type: e.company_industry,
                        LinkedIn: e.employer_linkedin,
                        job_publisher: e.site,
                        job_employment_type: e.job_type,
                        job_title: e.title,
                        job_apply_link: e.job_url,
                        job_apply_is_direct: e.job_apply_is_direct,
                        Description: e.job_description,
                        job_is_remote: e.is_remote === true ? true : false,
                        job_posted_at_timestamp: e.job_posted_at_timestamp,
                        job_post_at_datetime: e.date_posted,
                        Days_since_posted: !!diff ? diff?.length('days') : null,
                        City: e.location,
                        State: e.job_state,
                        Country: 'not jsearch',
                        job_min_salary: e.min_amount,
                        job_max_salary: e.max_amount,
                        job_salary_period: e.interval,
                        job_salary_currency: e.currency,
                        job_job_title: e.title,
                    }
                })
                const response = await axios.request(options);
                const data = response.data.data.map((e) => { 
                    const date1 = DateTime.now();
                    const date2 = new Date(e?.job_posted_at_timestamp * 1000);
                    const diff = !!date2 && Interval?.fromDateTimes(date2, date1);

                    return {
                    Company: e.employer_name,
                    job_id: e.job_id,
                    Website: e.employer_website,
                    employer_company_type: e.employer_company_type,
                    LinkedIn: e.employer_linkedin,
                    job_publisher: e.job_publisher,
                    job_employment_type: e.job_employment_type,
                    job_title: e.job_title,
                    job_apply_link: e.job_apply_link,
                    job_apply_is_direct: e.job_apply_is_direct,
                    Description: e.job_description,
                    job_is_remote: e.job_is_remote,
                    job_posted_at_timestamp: e.job_posted_at_timestamp,
                    job_post_at_datetime: e.job_post_at_datetime,
                    Days_since_posted: !!diff ? diff?.length('days') : null,
                    City: e.job_city,
                    State: e.job_state,
                    Country: e.job_country,
                    job_min_salary: e.job_min_salary,
                    job_max_salary: e.job_max_salary,
                    job_salary_period: e.job_salary_period,
                    job_salary_currency: e.job_salary_currency,
                    job_job_title: e.job_job_title,
                  }});
                  const allData = data.concat(respData)
                  return allData.filter((e) => !excludedPublishers.includes(e.job_publisher.toLowerCase()));
              } catch (error) {
                  console.error(error);
              }
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const checkEmail = email.toLowerCase();
            const confEmail = process.env.REACT_APP_CLIENT_LOGIN
            const confPassword = process.env.REACT_APP_CLIENT_PASS
            if(checkEmail !== confEmail || password !== confPassword) {
                throw new AuthenticationError('Incorrect Credentials');
            }

            const token = signToken({ email, password });
            return { token }
        },
    }
}

module.exports = resolvers;
