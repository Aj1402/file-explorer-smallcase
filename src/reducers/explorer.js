import * as types from '../actions/types';

function moveUpOnce(path) {
    let pathIndex = path.lastIndexOf("/");
    if(pathIndex === 0) return "/";
    return path.substring(0,pathIndex);
}

let initialState = {
    currentPath: "/",
    searchString: ""
}

export default function explorer(state = initialState, action) {
    switch(action.type) {
        case types.CHANGE_PATH:
            return { ...state, currentPath: action.path, searchString: "" };
        case types.MOVE_UP: 
            return {...state, currentPath: moveUpOnce(state.currentPath), searchString: ""};
        case types.SEARCH: 
            return{ ...state, searchString: action.searchStr };
        default: 
            return state;
    }
}