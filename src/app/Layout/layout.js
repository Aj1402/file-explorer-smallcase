import React from "react";
import { SideNav, Colors } from "../../common";
import "./layout.css";
import { connect } from "react-redux";
import NavBar from "../../common/navBar";
import { moveUp, search } from "../../actions";

const Layout = ({ SideNavContents, fileStructure, currentPath, moveUp, onSearch, searchString, children }) => {
  return (
    <div className="appLayout">
      <SideNav
        flex={3}
        backgroundColor={Colors.sideNavColor}
        title={"ROOT"}
        rootData={fileStructure.root}
      >
        {SideNavContents}
      </SideNav>
      <div className="appBody">
        <NavBar
          icon={require("../../images/arrow-up.png")}
          path={currentPath}
          onIconClick={moveUp}
          iconDisable={currentPath === "/"}
          onSearch={onSearch}
          searchString={searchString}
        />
        {children}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  fileStructure: state.fileStructure,
  currentPath: state.explorer.currentPath,
  searchString: state.explorer.searchString
});

const mapDispatchToProps = dispatch => {
  return {
    moveUp: () => {
      dispatch(moveUp());
    },
    onSearch: (searchStr) => {
      dispatch(search(searchStr));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
