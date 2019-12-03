import * as types from './types';

export function changeCurrentPath(path) {
    return {
        type: types.CHANGE_PATH,
        path
    };
}

export function moveUp() {
    return {
        type: types.MOVE_UP
    };
}

export function createNew(path,object) {
    return {
        type: types.CREATE_NEW_FILE_FOLDER,
        path, object
    };
}

export function deleteFileOrFolder(path,name) {
    return {
        type: types.DELETE_FILE_FOLDER,
        path, name
    };
}

export function search(searchStr) {
    return {
        type: types.SEARCH,
        searchStr
    };
}