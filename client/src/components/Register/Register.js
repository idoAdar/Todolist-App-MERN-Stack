import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Backdrop from '../Backdrop/Backdrop';
import * as authAction from '../../store/actions/authAction';
import Spinner from '../UI/Spinner/Spinner';
import classes from './Register.module.css';

const Register = props => {
    const [spinnerState, setSpinnerState] = useState(false);
    const [notesState, setNotesState] = useState({
        note: 'A simple todolist project built with React, Express, NodeJS & Mongodb',
        toggleNote: true
    });
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''
    });

    const updateState = e => {
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

    const register = (e) => {
        e.preventDefault();
        if (formState.name === '') {
            return setNotesState({
                note: 'Name is required',
                toggleNote: true
                });
        } else if (formState.email === '' && !formState.email.includes('@')) {
            return setNotesState({
                note: 'A valid email is required',
                toggleNote: true
                });
        } else if (formState.password === '' && formState.confirm === '') {
            return setNotesState({
                note: 'Password must be filled and confirm',
                toggleNote: true
                });
        } else if (formState.password !== formState.confirm) {
            return setNotesState({
                note: 'Password must be confirm correctly',
                toggleNote: true
                });
        } else if (formState.password.length < 9) {
            return setNotesState({
                note: 'Password must be at least 9 characters',
                toggleNote: true
                });
        }
        setSpinnerState(true);
        setFormState({
            name: '',
            email: '',
            password: '',
            confirm: ''
        })
        props.send(formState, props.history);
    };

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
                <form onSubmit={(e) => register(e)} className={classes.wrapper}>
                    <div className={classes.header}>
                        <h1><i className="fas fa-user-plus"></i> Sign up</h1>
                        <hr />
                    </div>
                    <div className={classes.input_field}>
                        <small>Your name:</small>
                        <input 
                            type="text" 
                            onChange={(e) => updateState(e)} 
                            value={formState.name} 
                            placeholder="username" 
                            name="name"></input>
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
                    <div className={classes.input_field}>
                        <small>Please confirm your password:</small>
                        <input type="password" 
                            onChange={(e) => updateState(e)} 
                            value={formState.confirm} 
                            placeholder="confirmation" 
                            name="confirm"></input>
                    </div>
                    <div className={classes.btn_field}>
                        {spinner}
                        <button type="submit">Sign Up</button>
                    </div>
                    <div className={classes.have_account_field}>
                        <p>Already have account?<Link to="/login"> Login</Link></p>
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
        send: (data, history) => dispatch(authAction.register(data, history)),
        clear: () => dispatch(authAction.clearReduxState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));