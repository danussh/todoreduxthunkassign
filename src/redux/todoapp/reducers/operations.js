/* eslint-disable array-callback-return */
import { ADD_TODO, MARK_ALL_DONE, REMOVE_TODO, UPDATE_CHECKBOX, UPDATE_TODO, FETCH_DATA } from "../actions";

const initialState = [];

export const operationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA:
            return action.payload;
        case ADD_TODO:
            return [...state, action.payload];
        case MARK_ALL_DONE:
            let markArray = [];
            state.map((todo) => {
                todo.completed = true;
                markArray.push(todo);
            })
            return markArray;
        case REMOVE_TODO:
            const filteredTodos = state.filter((todo) => todo.id !== action.payload);
            return filteredTodos;
        case UPDATE_TODO:
            let data = action.payload;
            const updatedArray = [];
            state.map((item) => {
                if (item.id === data.id) {
                    item.id = data.id;
                    item.title = data.title;
                    item.completed = data.completed;
                }
                updatedArray.push(item);
            })
            return updatedArray;
        case UPDATE_CHECKBOX:
            let todoArray = [];
            state.map((item) => {
                if (item.id === action.payload) {
                    item.completed = !item.completed;
                }
                todoArray.push(item);
            })
            return todoArray;
        default: return state;
    }
}