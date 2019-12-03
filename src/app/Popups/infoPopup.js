import React from "react";
import { Modal, Colors } from "../../common";
import "./popups.css";
import { Thumbnail } from "../Item/item";
import { Apple16 } from "../../common/fonts";

const FolderImg = require("../../images/folder.png");
const FileImg = require("../../images/file.png");

const InfoPopup = ({ visible, onClose, item }) => {
  const isFile = item.type !== "folder";
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={isFile ? "File Info" : "Folder Info"}
    >
      <div className="infoModalContent">
        <Thumbnail
          image={!isFile ? FolderImg : FileImg}
          isFile={isFile}
          name={item.name}
        />
      </div>
      <div className="infoContent">
        {KeyValuePair("Name", item.name)}
        {KeyValuePair("Size", item.metadata.size)}
        {KeyValuePair("Creator Name", item.metadata.createdBy)}
        {KeyValuePair("Creator date", item.metadata.createdDate)}
      </div>
    </Modal>
  );
};

const KeyValuePair = (key, value) => (
  <div className="keyValuePair">
    <div className="keyData">
      <Apple16 color={Colors.sideNavFont}>{key}:</Apple16>
    </div>
    <div className="valueData">
      <Apple16 color={Colors.infoSecondary}>&nbsp; {value}</Apple16>
    </div>
  </div>
);

export default InfoPopup;
