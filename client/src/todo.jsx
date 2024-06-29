

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

    const deleteTodo = async (_id) => {
        const res = await fetch(`/api/todos/${_id}`, { // fetch the todos from the server
            method: "DELETE", // delete method
        });
        const deletedTodo = await res.json(); // convert the response to json
        if (deletedTodo.acknowledged) { // if the todo is deleted
            setTodos((currentTodos) => { // set the todos
            return currentTodos.filter((todo) => todo._id !== _id); // filter the todos
            });
    }}

    return (
      <div className="todo">
        <p>{todo.todo}</p>
        <div>
          <button
            className="todo_status"
            onClick={() => updateTodo(todo._id, todo.status)}>
            {todo.status ? "☑" : "☐"}
          </button>
          <button className="todo_delete" onClick={() => deleteTodo(todo._id)}>
            ❌
          </button>
        </div>
      </div>
    );
}