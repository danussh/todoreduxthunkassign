import axios from "axios"

export const ADD_TODO = 'ADD_TODO';
export const MARK_ALL_DONE = 'MARK_ALL_DONE';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const UPDATE_CHECKBOX = 'UPDATE_CHECKBOX';
export const FETCH_DATA = 'FETCH_DATA';

export const addTodo = (payload) => {
    return async (dispatch) => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((response) => response.json())
            .then((json) => {
                json.id = new Date().getTime();
                dispatch({
                    type: ADD_TODO,
                    payload: json
                })
            }).catch((err) => {
                console.log(err);
                alert("Something went wrong on Add");
            })
    }
}

export const allTodosCompleted = () => {
    return {
        type: MARK_ALL_DONE
    }
}

export const removeTodo = (payload) => {
    return async (dispatch) => {
        fetch('https://jsonplaceholder.typicode.com/posts/' + payload, {
            method: 'DELETE',
        }).then((res) => {
            dispatch({
                type: REMOVE_TODO,
                payload: payload
            })
        }).catch((err) => {
            console.log(err);
            alert("Something went wrong on delete");
        })
    }
}

export const handleEditSubmit = (payload) => {
    console.log(payload);
    return async (dispatch) => {
        fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => dispatch({
                type: UPDATE_TODO,
                payload: json
            }));
    }
}

export const handleCheckbox = (payload) => {
    return {
        type: UPDATE_CHECKBOX,
        payload
    }
}

export const fetchdata = () => {
    return async (dispatch) => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        const todo = [];
        response.data.map((val) => {
            return todo.push(val)
        })
        var todos = todo.slice(0, 5);
        dispatch({
            type: "FETCH_DATA",
            payload: todos
        })
    }
}

