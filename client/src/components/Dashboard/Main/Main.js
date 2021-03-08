import React, { Fragment, useState ,useEffect } from 'react';
import { connect } from 'react-redux';
import * as mainAction from '../../../store/actions/mainAction';
import { withRouter } from 'react-router-dom';
import Todo from '../Todo/Todo';
import Backdrop from '../../Backdrop/Backdrop';
import Spinner from '../../UI/Spinner/Spinner';
import classes from './Main.module.css';

const Dashboard = props => {
    const [notesState, setNotesState] = useState({
        note: 'Welcome Aboard',
        toggleNote: true
    })
    const [formState, setFormState] = useState({
        title: '',
        text: ''
    });

    useEffect(() => {
        props.fetchTodos();
        const timer = setTimeout(() => {
            setNotesState({
                note: '',
                toggleNote: false
            });
        }, 2200);
        return () => clearTimeout(timer);
    }, [notesState.toggleNote])

    const updateState = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const addNew = e => {
        e.preventDefault();
        if (formState.title === '') {
            return setNotesState({
                note: 'Please Enter Title',
                toggleNote: true
            })
        }
        setFormState({
            title: '',
            text: ''
        })
        props.add(formState);
    }

    const logout = () => {
        props.reset();
        props.history.push('/');
    }

    return (
        <Fragment>
            <Backdrop toggle={notesState.toggleNote} message={notesState.note}/>
            <section className={classes.container}>
                <div className={classes.wrapper}>
                    <div className={classes.header}>
                        <div>
                            <h1>Hi {props.user}! </h1>
                            <h4>What's the Plan For Today ?</h4>
                        </div>
                        <button onClick={logout}>
                        <i className="fas fa-sign-out-alt"></i>{' '}
                        Logout</button>
                    </div>
                    <div>
                        <form onSubmit={(e) => addNew(e)}>
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
                                <button type="submit">New</button>
                            </div>
                        </form>
                    </div>
                    <hr />
                    {props.isLoading ? (<div className={classes.positionFixed}><Spinner /></div>) : (<Fragment>
                           {props.list.map(todo => {
                               return (
                                   <div key={todo._id}>
                                       <Todo title={todo.title} text={todo.text} date={todo.date} id={todo._id}/>
                                   </div>
                               )
                            })}
                        </Fragment>)}
                </div>
            </section>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        list: state.mainReducer.list,
        isLoading: state.mainReducer.isLoading,
        user: state.authReducer.user.name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTodos: () => dispatch(mainAction.getAll()),
        add: (data) => dispatch(mainAction.newTodo(data)),
        reset: () => dispatch(mainAction.resetApp())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));