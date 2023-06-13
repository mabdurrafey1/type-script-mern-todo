interface Todo {
  _id: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TodoProps {
  todo: Todo;
}

type ApiDataType = {
  message: string;
  status: string;
  todos: Todo[];
  todo?: Todo;
};
