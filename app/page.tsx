"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";

// Below lines are needed for backend, commented out because its not initialized yet
/* import outputs from "@/amplify_outputs.json";

 * Amplify.configure(outputs);

 * const client = generateClient<Schema>();
 */

// listTodos() and createTodos() also need backend
export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  // function listTodos() {
  //   client.models.Todo.observeQuery().subscribe({
  //     next: (data) => setTodos([...data.items]),
  //   });
  // }

  // useEffect(() => {
  //   listTodos();
  // }, []);

  // function createTodo() {
  //   client.models.Todo.create({
  //     content: window.prompt("Todo content"),
  //   });
  // }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-500 to-white flex justify-center items-center m-0 font-sans">
      <main className="flex flex-col items-stretch">
        <h1>My todos</h1>
        <button 
          // onClick={createTodo}
          className="rounded-lg border border-transparent px-5 py-2 text-base font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-250 text-white hover:border-[#646cff] focus:outline-none focus:ring focus:ring-blue-300"
        >
          + new
        </button>
        <ul className="p-0 m-0 my-2 list-none flex flex-col border border-black gap-px bg-black rounded-lg overflow-auto">
          {todos.map((todo) => (
            <li key={todo.id} className="bg-white p-2 hover:bg-[#dadbf9]">
              {todo.content}
            </li>
          ))}
        </ul>
        <div>
          🥳 App successfully hosted. Try creating a new todo.
          <br />
          <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/" className="font-extrabold no-underline">
            Review next steps of this tutorial.
          </a>
        </div>
      </main>
    </div>
  );
}
