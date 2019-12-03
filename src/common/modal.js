import React from "react";
import "./common.css";
import { Apple18 } from "./fonts";
import { Colors } from ".";

const Modal = ({ visible, onClose, title, children }) => {
    if(!visible) return null;
    return (
    <div className="modal" onClick={onClose}>
        <div className="modalBody" onClick={(e) => e.stopPropagation()}>
            <section className="modalHeader">
                <Apple18 color={Colors.sideNavFont}>{title}</Apple18>
                <button className="btn-icon modalCloseIcon" onClick={onClose}>
                    <img src={require("../images/close.svg")} alt="close" />
                </button>
            </section>
            {children}
        </div>
    </div>
);
    }

export default Modal;