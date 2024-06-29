import { useEffect, useState } from 'react'; // Import the useEffect hook that will run a function when the component is loaded


export default function App() {

  const [todos, setTodos] = useState(""); // useState is a hook that allows you to use state in a functional component


  useEffect(() => { // get todos one time
    async function getTodos() { // await is used to wait for the response from the server
      const res = await fetch("/api/todos"); // fetch the todos from the server
      const todos = await res.json(); // convert the response to json
      
      setTodos(todos); // set the todo array from the server, msg is the json object we used in the server
    }

    getTodos(); // call the function
  }, []); // empty array to run once

  return (
    <main className="container">
        <h1 className = "title"> Hello World! </h1>
        <div className = "todos">
          {(todos.length > 0) && 
          todos.map((todo) => (
            <div key ={todo.id} className = "todo">
              <p>{todo.todo}</p>
              <div>
                <button className = "todo_status">{(todo.status) ? "☑" : "☐"}</button>
              </div>
            </div>
          ))}
        </div>
    </main>
  );
}