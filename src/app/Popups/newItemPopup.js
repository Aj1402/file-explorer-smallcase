import React, { useState } from "react";
import { Modal, SegmentControl } from "../../common";
import "./popups.css";

const NewItemPopup = ({ visible, onClose, onSubmit }) => {
  let [itemType, setItemType] = useState("File");
  let [name, setName] = useState("");
  let [createdBy, setCreatedBy] = useState("");
  let [size, setSize] = useState("");
  let [createdAt, setCreatedAt] = useState("");
  return (
    <Modal visible={visible} onClose={onClose} title={"Create New"}>
      <div className="modalContent">
        <SegmentControl
          options={["File", "Folder"]}
          onSelect={setItemType}
          selected={itemType}
        />
        <input
          type="text"
          placeholder="Name"
          className="textInput"
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Creator"
          className="textInput"
          onChange={e => setCreatedBy(e.target.value)}
        />
        <input
          type="text"
          placeholder="Size"
          className="textInput"
          onChange={e => setSize(e.target.value)}
        />
        <input
          type="text"
          placeholder="Date"
          className="textInput"
          onChange={e => setCreatedAt(e.target.value)}
        />
        <button
        disabled={!name || !createdAt || !createdAt || !size}
          onClick={() =>
            onSubmit({
              type: itemType.toLowerCase(),
              name: name,
              createdBy: createdBy,
              size: size,
              createdAt: createdAt
            })
          }
          className="submitBtn"
        >
          Create
        </button>
      </div>
    </Modal>
  );
};

export default NewItemPopup;
