import { useEffect, useState } from 'react'; // Import the useEffect hook that will run a function when the component is loaded
import Todo from './todo'; // Import the todo component

export default function App() {

  const [todos, setTodos] = useState(""); // useState is a hook that allows you to use state in a functional component
  const [content, setContent] = useState(""); // useState is a hook that allows you to use state in a functional component

  useEffect(() => { // get todos one time
    async function getTodos() { // await is used to wait for the response from the server
      const res = await fetch("/api/todos"); // fetch the todos from the server
      const todos = await res.json(); // convert the response to json
      
      setTodos(todos); // set the todo array from the server, msg is the json object we used in the server
    }

    getTodos(); // call the function
  }, []); // empty array to run once

  const createNewTodo = async (e) => { // create a new todo
      e.preventDefault(); // prevent the default form action
      if (content.length > 3){     
        const res = await fetch("/api/todos", {
        // fetch the todos from the server
        method: "POST", // post method
        headers: { "Content-Type": "application/json" }, // set the content type to json
        body: JSON.stringify({ todo: content }), // convert the content to json
      });
      const newTodo = await res.json(); // convert the response to json
      setContent(""); // clear the content
      setTodos([...todos, newTodo]); // set the new todo to the todos array
    }}


  return (
    <main className="container">
      <h1 className="title"> 😃 Todo List! </h1>
      <form className="form" onSubmit={createNewTodo}>
        <input
          className="form_input"
          type="text"
          placeholder="Add a todo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type= "submit" className="form_button">Add</button>
      </form>
      <div className="todos">
        {todos.length > 0 &&
          todos.map((todo) => (
            <Todo key={todo.id} todo={todo} setTodos={setTodos}/> // pass the todo to the todo component as a prop
          ))}
      </div>
    </main>
  );
}