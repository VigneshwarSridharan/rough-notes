import React from "react";
import "./assets/styles/styles.css";
import Layout from "./Layout";
import Notes from "./views/Notes";
import List from "./List";

export default function App() {
  return (
    <Layout>
      <Notes />
      {/* <List /> */}
    </Layout>
  );
}
