import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as mainAction from '../../../store/actions/mainAction';
import { withRouter, Link } from 'react-router-dom';
import Backdrop from '../../Backdrop/Backdrop';
import classes from './Edit.module.css';

const Edit = props => {
    const [notesState, setNotesState] = useState({
        note: 'Priority is everything',
        toggleNote: true
    })
    const [formState, setFormState] = useState({
        title: props.location.state.title,
        text: props.location.state.text
    })

    const updateState = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setNotesState({
                note: '',
                toggleNote: false
            });
        }, 2200);

        return () => clearTimeout(timer);
    }, [notesState.toggleNote]);

    const updateTodo = e => {
        e.preventDefault();
        if (formState.title === '') {
            return setNotesState({
                note: 'Title must be filled',
                toggleNote: true
            })
        }
        props.save(formState, props.userId, props.location.state.todoId, props.history);
    }

    return (
        <Fragment>
            <Backdrop toggle={notesState.toggleNote} message={notesState.note}/>
            <section className={classes.container}>
                <div className={classes.wrapper}>
                    <div className={classes.header}>
                        <h1>Change of plan ?</h1>
                        <Link to="/dashboard">
                        <i className="fas fa-backward"></i>
                        Back</Link>
                    </div>
                    <div>
                        <form onSubmit={(e) => updateTodo(e)}>
                            <div className={classes.input_field}>
                                <input type="text"
                                    onChange={(e) => updateState(e)}
                                    value={formState.title} 
                                    placeholder="Title" 
                                    name="title"/>
                            </div>
                            <div className={classes.input_area}>
                                <textarea type="text"
                                    onChange={(e) => updateState(e)}
                                    value={formState.text} 
                                    placeholder="..." 
                                    name="text"></textarea>
                            </div>
                            <div className={classes.btn_field}>
                                <button type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                    <hr />
                </div>
            </section>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.authReducer.user._id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        save: (data, user, id, history) => dispatch(mainAction.saveTodo(data, user, id, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit));