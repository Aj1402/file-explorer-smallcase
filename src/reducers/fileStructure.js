import * as types from "../actions/types";
import { createNewFolderFile, deleteFileFolder } from "../common/utils";

const intialStructure = require("../fileStructure.json");
let initialState = {
  root: { ...intialStructure }
};

export default function fileStructure(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_NEW_FILE_FOLDER:
      const newRoot = createNewFolderFile(
        action.path,
        action.object,
        state.root
      );
      return { root: newRoot };
    case types.DELETE_FILE_FOLDER:
      const newRootAfterDelete = deleteFileFolder(
        action.path,
        action.name,
        state.root
      );
      return { root: newRootAfterDelete };
    default:
      return state;
  }
}
