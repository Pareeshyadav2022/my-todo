import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";

import { addTasks, updateTask, deleteTask } from "./redux/reducer";

function App() {
  const ref = useRef("");
  //const [upadated, setUpdated] = useState(null);
  const [tampVal, setTampVal] = useState({ id: null, index: null, task: "" });

  const [input, setInput] = useState({ id: 0, task: "" });

  const getState = useSelector((state) => state);

  const dispatch = useDispatch();

  const addTodo = () => {
    dispatch(addTasks(input));
    setInput({ task: "" });
    ref.current.focus();
    //console.log(getState.value.map((x) => x.task));
  };

  const changeHandler = (e) => {
    setTampVal({ id: tampVal.id, index: tampVal.index, task: e.target.value });
    setInput({
      id: e.target.id,
      task: e.target.value,
    });
  };

  const editTask = (value, ind) => {
    setInput({ id: value.id, task: value.task });
    setTampVal({ id: value.id, index: ind, task: value.task });
    ref.current.focus();
  };

  const updateTodo = () => {
    setTampVal({ task: input.task });
    dispatch(updateTask(tampVal));
    setInput({ task: "" });
    ref.current.focus();
  };

  useEffect(() => {
    ref.current.focus();
    console.log("useEffect", getState.value);
  }, [getState]);

  const deleteTodo = (value, ind) => {
    setTampVal({ id: value.id, index: ind, task: value.task });
    dispatch(deleteTask(tampVal));
    ref.current.focus();
  };

  function dltBtn(x, index) {
    x.task !== "" ? (
      console.log("dltBtn")
    ) : (
      <button onClick={() => deleteTodo(x, index)}>dlt</button>
    );
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      <input
        ref={ref}
        type="text"
        value={input.task}
        id={new Date().valueOf()}
        placeholder="Write a todo..."
        onChange={changeHandler}
      />
      <button onClick={addTodo}>Add</button>
      <button onClick={updateTodo}>Save</button>
      {useEffect(() => {}, [])}
      {getState.value.map((x, index) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "35px",
              width: "27%",
              marginLeft: "36%",
              padding: "0px",
            }}
          >
            <p
              key={index}
              onClick={() => editTask(x, index)}
              style={{ margin: "10px" }}
            >
              {x.task}
            </p>
            {dltBtn(x, index)}
          </div>
        );
      })}
    </div>
  );
}
export default App;
