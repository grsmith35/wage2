import React from "react";
// import automationimg from '../../assets/images/automation.jpg';

export default function Home() {

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h3 className="row h3"><u>Wage Analyzer</u></h3>
                    <div className="row">
                        <p>Thank you for visiting Wage Analyzer!</p>
                        <p>
                            Wage Analyzer(WA) is a tool companies can use to <b>automate</b> the process of analyzing wages for a job title in a specific area.
                            By automating tedious, time consuming tasks such as gathering wage data, companies can give time back to their teams
                            to focus on what truely matters, the customer.
                            WA is built to search for jobs in an given area based on the job title searched. With this information, WA will return a 
                            list of jobs that resemble that job title. Job company, title, and pay will all be included to help the company make wage
                            decisions to help make their own company more attractive to job seekers in such a competitive market.
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    {/* <img src={automationimg} className="auto-border" alt="Automation image"/>  */}
                </div>
            </div>
        </div>
    )
}

