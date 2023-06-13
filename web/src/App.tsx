import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Button, CardContent } from "@mui/material";

import { getTodos, deleteTodo, addTodo } from "./API";
import { AxiosResponse } from "axios";

// type Todo = {
//   text: string;
//   id: number;
// };

function App() {
  const [todoVal, setTodoVal] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addToDo = async () => {
    if (todoVal === "") return;
    const newTodo = { text: todoVal };

    let res = await addTodo(newTodo);

    // setTodos([...todos, newTodo]);
    fetchTodos();
    setTodoVal("");
  };

  const removeToDo = async (_id: string) => {
    let response = (await deleteTodo(_id)) as AxiosResponse<any>;
    const data = response.data as ApiDataType;

    console.log(data);

    if (data.message === "Todo deleted") {
      setTodos(todos.filter((todo) => todo._id !== _id));
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async (): Promise<void> => {
    let response = await getTodos();
    const data = response.data.todos as Todo[];
    console.log(data);
    setTodos(data);
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4"> Todo App</Typography>
        <hr></hr>
        <Box
          sx={{ display: "flex", flexDirection: "row", gap: 2, width: "500px" }}
        >
          <TextField
            fullWidth
            label="Todo"
            variant="outlined"
            value={todoVal}
            onChange={(e) => setTodoVal(e.target.value)}
          ></TextField>

          <Button variant="contained" onClick={addToDo}>
            Add
          </Button>
        </Box>
        <hr></hr>
        <Typography variant="h6">All My Todos </Typography>
        <div>
          {todos.map((todo) => (
            <div>
              <br></br>
              <Card key={todo._id} sx={{ width: "500px" }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body1">{todo.text}</Typography>
                    <Button color="error" onClick={() => removeToDo(todo._id)}>
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default App;
