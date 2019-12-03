import { combineReducers } from 'redux';
import fileStructure from './fileStructure';
import explorer from './explorer';

export default combineReducers({
    fileStructure,
    explorer
});