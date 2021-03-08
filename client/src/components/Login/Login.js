import React, { useState, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import * as authAction from '../../store/actions/authAction';
import { Link, withRouter } from 'react-router-dom';
import Backdrop from '../Backdrop/Backdrop';
import Spinner from '../UI/Spinner/Spinner';
import classes from './Login.module.css';

const Login = props => {
    const [spinnerState, setSpinnerState] = useState(false);
    const [notesState, setNotesState] = useState({
        note: 'Please make sure to login before adding your tasks',
        toggleNote: true
    });
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    })

    const updateState = e => {
        e.preventDefault();
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            props.clear();
            setNotesState({
                note: '',
                toggleNote: false
            });
        }, 2200);

        return () => clearTimeout(timer);
    }, [notesState.toggleNote]);

    const login = e => {
        e.preventDefault();
        if (formState.email === '' && !formState.email.includes('@')) {
            return setNotesState({
                note: 'A valid email is required',
                toggleNote: true
                });
        } else if (formState.password === '') {
            return setNotesState({
                note: 'Password must be filled',
                toggleNote: true
            })
        }
        setSpinnerState(true);
        props.loadUser(formState, props.history);
    }

    let spinner = null;
    if (spinnerState) {
        spinner = <Spinner />
    }

    if (props.error && spinnerState) {
        setSpinnerState(false);
        setNotesState({
            note: props.error.message,
            toggleNote: true
        });
    }

    return (
        <Fragment>
            <Backdrop toggle={notesState.toggleNote} message={notesState.note}/>
            <section className={classes.container}>
                <form onSubmit={(e) => login(e)} className={classes.wrapper}>
                    <div className={classes.header}>
                        <h1><i className="fas fa-sign-in-alt"></i> Login</h1>
                        <hr />
                    </div>
                    <div className={classes.input_field}>
                        <small>Your email:</small>
                        <input type="email" 
                            onChange={(e) => updateState(e)} 
                            value={formState.email} 
                            placeholder="username@gmail.com" 
                            name="email"></input>
                    </div>
                    <div className={classes.input_field}>
                        <small>Your password:</small>
                        <input type="password" 
                            onChange={(e) => updateState(e)} 
                            value={formState.password} 
                            placeholder="password" 
                            name="password"></input>
                    </div>
                    <div className={classes.btn_field}>
                        {spinner}
                        <button type="submit">Login</button>
                    </div>
                    <div className={classes.have_account_field}>
                        <p>Don't have account yet?<Link to="/"> Sign up</Link></p>
                    </div>
                </form>
            </section>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        error: state.authReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUser: (data, history) => dispatch(authAction.login(data, history)),
        clear: () => dispatch(authAction.clearReduxState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));