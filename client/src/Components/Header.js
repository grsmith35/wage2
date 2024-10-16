import React from 'react';
import image from '../assets/images/large-logo.png';

export default function Nav() {

    return (
        <nav className='navbar bg-color-lightorange w-100'>
            <div className='row w-100'>
                
                <a className='navbar-brand col-md-3 p-3 pl-5' href='/Home'>
                    <img src={image} alt="Wage Analyser Logo" width="200" className='' /> 
                </a>
                <div className='col-md-8 p-5'>

                    <h1 className='name-font'>Wage Analyzer</h1>
                </div>

            </div>
        </nav>
    )
}