import React from "react";
import ReactDOM from "react-dom";
import "./item.css";
import { LatoBold14, LatoRegular16 } from "../../common/fonts";
import { Colors, ContextMenu } from "../../common";
import InfoPopup from "../Popups/infoPopup";

const FolderImg = require("../../images/folder.png");
const FileImg = require("../../images/file.png");

export const NewItem = ({onClick}) => (
  <div onClick={onClick} className="newItem itemContainer">
    <img src={require("../../images/new-item.png")} alt="fileIcon" />
  </div>
);

export const Thumbnail = ({image, isFile, name}) => (
  <div className="thumbnail">
          <img src={image} alt="fileIcon" />
          {isFile && (
            <div className="imageCaption">
              <LatoBold14 color={Colors.imageCaption}>
                {"." + name.split(".").pop()}
              </LatoBold14>
            </div>
          )}
        </div>
);

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleContextMenu: false,
      contextX: null,
      contextY: null,
      offsetX: null,
      offsetY: null,
      showInfoPopup: false
    };
    this.itemRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("click", this.handleContextMenuHide);
    document.addEventListener("contextmenu", this.handleContextClick);
  }

  handleContextClick = e => {
    let el = e.target;
    while (el && el !== document) {
      if (el.id === this.props.item.name) return;
      el = el.parentElement;
    }
    this.handleContextMenuHide();
  };

  componentWillUnmount() {
    document.removeEventListener("contextmenu", this.handleContextClick);
    document.removeEventListener("click", this.handleContextMenuHide);
  }

  onDoubleClick = e => {
    e.preventDefault();
    if (this.props.item.type === "folder") {
      this.props.openFolder(this.props.item.path);
    }
    else {
      this.handleInfo();
    }
  };

  handleContextMenuHide = () =>
    this.setState({
      visibleContextMenu: false,
      contextX: null,
      contextY: null,
      offsetX: null,
      offsetY: null
    });

  handleContextMenu = e => {
    e.preventDefault();
    this.setState({
      visibleContextMenu: true,
      contextX: e.nativeEvent.offsetX,
      contextY: e.nativeEvent.offsetY,
      offsetX: ReactDOM.findDOMNode(this.itemRef).getBoundingClientRect().left,
      offsetY: ReactDOM.findDOMNode(this.itemRef).getBoundingClientRect().top
    });
  };

  handleOpen = () => this.props.openFolder(this.props.item.path);

  handleDelete = () => this.props.deleteItem(this.props.parentPath,this.props.item.name);

  handleInfo = () => this.setState({showInfoPopup: true});

  handleModalClose = () => this.setState({showInfoPopup: false});

  render() {
    const isFile = this.props.item.type !== "folder";
    return (
      <div
        id={this.props.item.name}
        ref={el => {
          this.itemRef = el;
        }}
        onDoubleClick={this.onDoubleClick}
        className="itemContainer"
        onContextMenu={this.handleContextMenu}
      >
        <ContextMenu
          visible={this.state.visibleContextMenu}
          x={this.state.offsetX + this.state.contextX}
          y={this.state.offsetY + this.state.contextY}
          onOpen={this.handleOpen}
          onInfo={this.handleInfo}
          onDelete={this.handleDelete}
          handleHide={this.handleContextMenuHide}
          showOpen={this.props.item.type === "folder"}
        />
          <Thumbnail image={!isFile ? FolderImg : FileImg} isFile={isFile} name={this.props.item.name} />
        <LatoRegular16 color={Colors.sideNavSubFont}>
          {this.props.item.name}
        </LatoRegular16>
        <InfoPopup visible={this.state.showInfoPopup} item={this.props.item} onClose={this.handleModalClose}/>
      </div>
    );
  }
}

export default Item;
