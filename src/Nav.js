import React, { useState, useEffect } from 'react';
import './Nav.css';

function Nav() {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);

    return (
        <div className={`nav ${show && 'nav__black'}`}>
            {/* Always has nav but if show -> true, extra class is added */}
            <img
                className='nav__logo'
                src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
                alt='Netflix Logo'
            />
            <img
                className='nav__avatar'
                src='https://occ-0-2162-3647.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABSUh5vTXaNW1xUVnK-poES8g1_JY-i91igMvNwDyQANKvlNfhGpcibSZA-Y8QqnOOXWqeT7ST5pYDvPMqrIvrrY.png?r=8aa'
            />
        </div>
    )
}

export default Nav
