

export default function Todo(props)
{
    const { todo, setTodos } = props;

    const updateTodo = async (_id, status) => {
      // create a new todo
      const res = await fetch(`/api/todos/${_id}`, {
        // fetch the todos from the server
        method: "PUT", // post method
        body: JSON.stringify({ status: !status }), // convert the content to json
        headers: { "Content-Type": "application/json" }, // set the content type to json
      });
      const updatedTodo = await res.json(); // convert the response to json
      if (updatedTodo.acknowledged) {
        setTodos((currentTodos) => {
            return currentTodos.map((todo) => {
              if (todo._id === _id) {
                return { ...todo, status: !status };
              }
              return todo;
      });
      })
    }}

    return (
      <div className="todo">
        <p>{todo.todo}</p>
        <div>
          <button className="todo_status"
                  onClick ={() => updateTodo(todo._id, todo.status)}>
                  {todo.status ? "☑" : "☐"}</button>
        </div>
      </div>
    );
}