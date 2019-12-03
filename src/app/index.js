import React from "react";
import Layout from './Layout/layout';
import Explorer from './Explorer/explorerComponent';

export default class App extends React.Component {
  render() {
    return (
      <Layout SideNavContents={<p>SideNav</p>}>
        <Explorer />
      </Layout>
    );
  }
}
