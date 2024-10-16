import React, { useState } from 'react';
import Login from '../pages/Login';

export default function ReportForm({onSubmit}) {
    const [formFields, setFormFields] = useState({title: "", location: ""});
    const [searchClicked, setSearchClicked] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchClicked(true);
        onSubmit(formFields)
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        let newValue;
        if (name === 'radius' || name === 'count') {
            newValue = parseInt(value);
        } else newValue = value;

        setFormFields({
            ...formFields,
            [name]: newValue
        });
    };

    const handleReset = () => {
        window.location.reload(false)
    };

    if(localStorage.id_token) {
        return (
            <div className='container'>
                <form onSubmit={handleSubmit} onChange={handleFormChange}>
                    <div className=' mb-3 pt-2'>
                        <label htmlFor="title">Job Title</label>  
                        <input placeholder='"Forklift Driver"' value={formFields.title} id="title" name='title' type='text' className='form-control'/> 
                    </div>
                    <div className=' mb-3'>
                        <label htmlFor="location">Job Location</label>
                        <input placeholder='"Salt Lake City"' value={formFields.location} id='location' name='location' className='form-control' />
                    </div>
                            
                    <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                        {!searchClicked ? (
                            <button type='submit' className='btn btn-success mr-2'>Submit</button>
                        ): (
                            <button className='btn btn-danger ml-2' onClick={handleReset}>Reset</button>    
                        )}
                    </div>
                </form>
            </div>
        )
    } else {
        return (<Login></Login>)
    }
}