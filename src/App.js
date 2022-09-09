import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import "./App.css";

import { addTasks, updateTask, deleteTask } from "./redux/reducer";

function App() {
  const ref = useRef();

  const [tampVal, setTampVal] = useState({ id: null, index: null, task: "" });

  const [input, setInput] = useState({ id: 0, task: "" });

  const [addProp, setAddProp] = useState("inline");

  const [saveProp, setSaveProp] = useState("none");

  const reduxState = useSelector((state) => state);

  const dispatch = useDispatch();

  const addTodo = (e) => {
    e.preventDefault();
    input.task.trim() ? dispatch(addTasks(input)) : <h1>enter a value</h1>;
    setInput({ task: "" });
    ref.current.focus();
  };

  const changeHandler = (e) => {
    e.preventDefault();
    setTampVal({ id: tampVal.id, index: tampVal.index, task: e.target.value });
    setInput({
      id: e.target.id,
      task: e.target.value,
    });
  };

  const editTask = (value, ind) => {
    setInput({ id: value.id, task: value.task });
    setTampVal({ id: value.id, index: ind, task: value.task });
    setAddProp("none");
    setSaveProp("inline");
    ref.current.focus();
  };

  const updateTodo = () => {
    return (
      <div>
        {input.task.trim()
          ? (setTampVal({ task: input.task }),
            dispatch(updateTask(tampVal)),
            setInput({ task: "" }),
            setAddProp("inline"),
            setSaveProp("none"),
            ref.current.focus())
          : null}
        ;
      </div>
    );
  };

  const deleteTodo = (id) => {
    dispatch(deleteTask(id));
    setAddProp("inline");
    setSaveProp("none");
    ref.current.focus();
  };

  return (
    <div className="App">
      <h1>Todo App</h1>

      <Box
        component="form"
        onSubmit={addTodo}
        sx={{ display: "flex", mx: 2, justifyContent: "center" }}
        noValidate
      >
        <TextField
          sx={{ flex: 1, maxWidth: "440px" }}
          ref={ref}
          id={new Date().valueOf()}
          label="Add your tasks..."
          variant="outlined"
          value={input.task}
          size="medium"
          onChange={changeHandler}
        />
        <Button
          variant="contained"
          onClick={addTodo}
          sx={{ display: addProp, width: "30px", mx: 1 }}
        >
          Add
        </Button>
        <Button
          variant="contained"
          onClick={updateTodo}
          sx={{ display: saveProp, width: "30px", mx: 1 }}
        >
          Save
        </Button>
      </Box>
      {reduxState.value.map((x, index) => (
        <Stack
          key={index}
          sx={{
            flexDirection: "row",
            borderBottom: "2px solid #222222",
            borderRadius: "4px",
            maxWidth: "300px",
            mx: "auto",
            my: 1,
          }}
          component="p"
        >
          <p
            key={index}
            onClick={() => editTask(x, index)}
            style={{
              textAlign: "left",
              flex: 1,
            }}
            className="item"
          >
            {index + 1}
            {". "}
            {x.task}
          </p>

          <IconButton aria-label="delete">
            <DeleteIcon onClick={() => deleteTodo(x.id)} />
          </IconButton>
        </Stack>
      ))}
    </div>
  );
}
export default App;
