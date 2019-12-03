import React from "react";
import Colors from "./colors";
import { getPathText } from "./utils";
import { PNova24 } from "./fonts";
import "./common.css";

const NavBar = ({
  icon,
  onIconClick,
  iconDisable,
  path,
  onSearch,
  searchString
}) => {
  let [subPath, mainPath] = getPathText(path);
  return (
    <div className="navBar">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button
          disabled={iconDisable}
          className="btn-icon"
          onClick={onIconClick}
        >
          <img src={icon} alt={"up"} />
        </button>
        <PNova24 color={Colors.navbBarSecondary}>
          {subPath.length > 0 ? subPath + " /" : subPath} &nbsp;
        </PNova24>
        <PNova24 color={Colors.navBarPrimary}>{mainPath}</PNova24>
      </div>
      <div className="searchDiv">
        <input value={searchString} type="text" placeholder="Search here" className="searchBox" onChange={(e)=>onSearch(e.target.value)} />
        <img className="searchImg" src={require("../images/search.svg")} alt="search" />
        <span className="searchRemove" onClick={()=>onSearch("")}>&times;</span></div>
      </div>
  );
};

export default NavBar;
