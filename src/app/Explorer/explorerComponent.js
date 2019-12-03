import React from "react";
import "./explorerComponent.css";
import { connect } from "react-redux";
import { getObjectFromPath, DFSSearch } from "../../common/utils";
import Item, { NewItem } from "../Item/item";
import {
  changeCurrentPath,
  deleteFileOrFolder,
  createNew
} from "../../actions";
import NewItemPopup from "../Popups/newItemPopup";

class ExplorerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newModalVisible: false
    };
  }

  handleModalClose = () => this.setState({ newModalVisible: false });

  newItemPopup = () => this.setState({ newModalVisible: true });

  createNewItem = obj => {
    this.props.createItem(this.props.currentPath, obj);
    this.handleModalClose();
  };

  getDirContents = currentDir => {
    let dirChildren = currentDir.children;
    if (!dirChildren) return [];
    if(this.props.searchString === "")
      return Object.entries(dirChildren);
    return DFSSearch(dirChildren,this.props.searchString);
  };
  render() {
    const currentDir = getObjectFromPath(
      this.props.currentPath,
      this.props.fileStructure.root
    );
    return (
      <div className="container">
        {this.getDirContents(currentDir).map(obj => (
          <Item
            deleteItem={this.props.deleteItem}
            parentPath={this.props.currentPath}
            openFolder={this.props.openFolder}
            key={obj[0]}
            item={obj[1]}
          />
        ))}
        <NewItem onClick={this.newItemPopup} />
        <NewItemPopup
          visible={this.state.newModalVisible}
          onClose={this.handleModalClose}
          onSubmit={this.createNewItem}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentPath: state.explorer.currentPath,
  fileStructure: state.fileStructure,
  searchString: state.explorer.searchString
});

const mapDispatchToProps = dispatch => {
  return {
    openFolder: path => {
      dispatch(changeCurrentPath(path));
    },
    deleteItem: (path, name) => {
      dispatch(deleteFileOrFolder(path, name));
    },
    createItem: (path, obj) => {
      dispatch(createNew(path, obj));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExplorerComponent);
