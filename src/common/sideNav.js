import React, { useState } from "react";
import Colors from "./colors";
import { getSubDir } from "./utils";
import { LatoBold12, LatoRegular16 } from "./fonts";
import "./common.css";
import { connect } from 'react-redux';
import { changeCurrentPath } from "../actions";

const MainLinkItem = ({ item, changeCurrentPath, currentPath, isSubDir = false }) => {
  let [expanded, setExpanded] = useState(false);
  const subDir = getSubDir(item);
  const isExpandable = subDir.length > 0;
  return (
    <div className="mainNavLink">
      <div className={`linkDetails ${ item.path === currentPath ? "activeLink": null}`} >
        <button className="navButton" onClick={()=> changeCurrentPath(item.path)}>
        <LatoRegular16
          color={isSubDir ? Colors.sideNavSubFont : Colors.sideNavFont}
        >
          {item.name}
        </LatoRegular16>
        </button>
        {isExpandable ? (
          <div
            className={`icon ${expanded ? "inverted" : null}`}
            onClick={() => setExpanded(!expanded)}
          >
            <img src={require("../images/dropdown.svg")} alt={"expand"} />
          </div>
        ) : (
          <div style={{ height: "24px" }}></div>
        )}
      </div>
      {isExpandable && expanded && (
        <div className="subMenu">
          {subDir.map((item, index) => (
            <MainLink item={item} isSubDir={true} key={index}/>
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentPath: state.explorer.currentPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCurrentPath: path => {
      dispatch(changeCurrentPath(path))
    }
  };
};

const MainLink = connect(mapStateToProps, mapDispatchToProps)(MainLinkItem);

const SideNav = ({ flex, backgroundColor, title, rootData }) => (
  <div
    style={{
      flex: flex,
      flexDirection: "column",
      backgroundColor: backgroundColor,
      overflowY: "auto",
      paddingTop: 10
    }}
  >
    <div style={{padding: "10px", paddingLeft: "20px"}}>
        <LatoBold12 color={Colors.sideNavTitle}>{title}</LatoBold12>
    </div>
    {rootData &&
      rootData.children &&
      Object.entries(rootData.children).map(
        (item, index) =>
          item[1].type === "folder" && <MainLink key={index} item={item[1]} />
      )}
  </div>
);

export default SideNav;
