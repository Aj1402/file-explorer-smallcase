import React from "react";
import "./common.css";
import { LatoRegular16 } from "./fonts";

const ContextMenu = ({ x, y, visible, onInfo, onDelete, onOpen, showOpen }) => {
  if (!visible) return null;
  return (
    <div
      className="contextMenu"
      style={{
        position: "absolute",
        left: x,
        top: y,
        visibility: visible ? "visible" : "hidden"
      }}
    >
      {showOpen && (
        <button onClick={onOpen} className="contextBtn">
          <LatoRegular16>Open</LatoRegular16>
        </button>
      )}
      <button className="contextBtn" onClick={onInfo}>
        <LatoRegular16>Get Info</LatoRegular16>
      </button>
      <button className="contextBtn deleteBtn" onClick={onDelete}>
        <LatoRegular16>Delete</LatoRegular16>
      </button>
    </div>
  );
};

export default ContextMenu;
