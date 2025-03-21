import React, { useState } from 'react';
import ReportForm from '../Components/ReportForm';
import Login from './Login';
import { useLazyQuery } from '@apollo/client';
import { QUERY_JOBS } from '../utils/queries';
import auth from '../utils/auth';
import { exportPayReport } from '../utils/helpers';

export default function OneTimeReport() {
    const [getJobs, { data }] = useLazyQuery(QUERY_JOBS);
    const [runningReport, setRunningReport] = useState(false);

    const searchResults = async (args) => {
        setRunningReport(true);
        const results = await getJobs({
            variables: args
        });
        if(results) {
            setRunningReport(false);
            exportPayReport(results.data.getJobs, args.title)
        }
    };

    if(auth.loggedIn()) {
        return (
            <div className='container bg-main-window'>
                <div className='row'>
                    <ReportForm onSubmit={searchResults}></ReportForm>
                </div>
                <div className='row'>
                    {runningReport && (
                        <div className='spinner-border spinner-border-lg' role="status">
                            <span className='visually-hidden'></span>
                        </div>
                    )}
                </div>
            </div>
        )
    } else {
        return (
            <Login />
        )
    }
};