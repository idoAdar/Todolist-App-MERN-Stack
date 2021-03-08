import React from 'react';
import { connect } from 'react-redux';
import * as mainAction from '../../../store/actions/mainAction';
import { Link, withRouter } from 'react-router-dom';
import classes from './Todo.module.css';

const Todo = props => {
    return (
        <div className={classes.contaier}>
            <div className={classes.details_field}>
                <h4>{props.title}</h4>
                <p>{props.text}</p>
                <small>{props.date}</small>
            </div>
            <div className={classes.btns_field}>
                <Link to={{
                    pathname: `/dashboard/${props.id}`,
                    state: { title: props.title, text: props.text, todoId: props.id }}}>
                    <i className="fas fa-edit fa-lg"></i>
                </Link>
                <button onClick={() => props.delete(props.user._id, props.id)}>
                    <i className="fas fa-trash fa-lg"></i>
                </button>
            </div>
            <hr />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        delete: (user, id) => dispatch(mainAction.removeTodo(user, id))
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(withRouter(Todo));