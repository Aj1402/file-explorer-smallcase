import React from "react";
import "./common.css";
import { Apple14 } from "./fonts";

const SegmentControl = ({ options, selected, onSelect }) => (
  <div className="segments">
    {options.map((item, index) => (
      <button key={index}
        className={`segmentBtn ${selected === item ? "activeSegment" : null}`}
        onClick={() => onSelect(item)}
      >
        <Apple14>{item}</Apple14>
      </button>
    ))}
  </div>
);

export default SegmentControl;
