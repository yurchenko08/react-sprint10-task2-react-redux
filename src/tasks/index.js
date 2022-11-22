import React from "react";
import { Route, Link, useLocation, Routes } from "react-router-dom";

import { Task as ReactRedux } from "./02-react-redux";
const task = {
  title: "React-Redux",
  slug: "react-redux",
  component: <ReactRedux />,
};

function Tasks({ match }) {
  let location = useLocation();
  return (
    <div>
      <Routes>
        <Route path={`/task/${task.slug}`} element={task.component} />
        <Route path={location.path} element={<h3>Please select a topic.</h3>} />
      </Routes>
    </div>
  );
}

function List() {
  return (
    <div>
      <Link to={`/task/${task.slug}`}>{task.title}</Link>
    </div>
  );
}

export default Tasks;

export { List };
