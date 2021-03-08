import React from 'react';
import './Backdrop.css';

const Backdrop = props => {
    return (
        <div className={props.toggle ? 'backdrop modalOpen' : 'backdrop modalClose'}>
            <div className='note'>
                <p>{props.message}</p>
            </div>
        </div>
    )
}

export default Backdrop;