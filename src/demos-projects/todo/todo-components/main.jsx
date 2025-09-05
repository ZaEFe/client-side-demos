import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useState, useEffect, useRef } from 'react';
import '../../../styles/todo.css';
import '../../../styles/sitewide.scss';
import Navbar from "../../react-components/todoNavbar";
import { openDB, deleteDB } from 'idb';


async function upgradeToV1(db) {
  //gives the parameter db a new object store called todos
  await db.createObjectStore("todos", { 
    keyPath: "id",
    autoIncrement: true,
  });
}
async function getDbPromise() {
  // comment in or out when you need to clear the database
  // await deleteDB("to-do-app-db");
  return await openDB("to-do-app-db", 1, {upgrade: upgradeToV1});
}
const DB_PROM = getDbPromise();
const db = {
  async add(todo) { 
    const db = await DB_PROM;
    const tx = db.transaction("todos", "readwrite");
    const store = tx.objectStore("todos");
    await store.add(todo);
    await tx.done;
  },
  async getAll() {
    const db = await DB_PROM;
    const tx = db.transaction("todos", "readonly");
    const store = tx.objectStore("todos");
    return store.getAll();
  },
  async remove(id) {
    const db = await DB_PROM;
    const tx = db.transaction("todos", "readwrite");
    const store = tx.objectStore("todos");
    await store.delete(id);
    await tx.done;
  },
  async update(todo) {
    const db = await DB_PROM;
    const tx = db.transaction("todos", "readwrite");
    const store = tx.objectStore("todos");
    await store.put(todo);
    await tx.done;
  },
  async clear() { 
    const db = await DB_PROM;
    const tx = db.transaction("todos", "readwrite");
    const store = tx.objectStore("todos");
    store.clear();
    await tx.done;
  }
}

// Simple example of a to do item
// const todoItemEx = {
//   id: Date.now(),
//   text: "item " + Date.now(),
// };
// const dataArrEx = [todoItemEx];

function App() {
  const [todos, setTodos] = useState([]);
  const statusPEl = useRef(null);
  const [status, setStatus] = useState("No record updates");
  useEffect(() => {
    db.getAll().then(setTodos);
  }, []);
  
  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      text: new FormData(e.target).get("todo-text").trim(),
    };
    db.add(newTodo)
      .then(db.getAll)
      .then((newTodos) => {
        setTodos(newTodos);
        const found = newTodos.find((todo) => todo.id === newTodo.id && todo.text === newTodo.text);
        if (found) {
          updateStatus('Added a to do item');
        }
      });
  }
  const todoRemover = (todo) => () => {
    // const setter = (todo) => (prevTodos) =>
    //   prevTodos.filter((prevTodo) => prevTodo.id !== todo.id);
    // setTodos(setter(todo));
    // The below line of code does the same as the two lines above once adding the database in
    db.remove(todo.id)
      .then(db.getAll)
      .then((newTodos) => {
        setTodos(newTodos);
        const found = newTodos.find( (t) => t.id === todo.id && t.text === todo.text);
        if (!found) {
          updateStatus('Removed a to do item');
        }
      });
  };
  const todoUpdater = (todo) => {
    // const setter = (t2) => (prevTodos) => {
    //   const index = prevTodos.findIndex((t1) => t1.id === t2.id);
    //   const newTodos = [...prevTodos];
    //   newTodos[index] = t2;
    //   return newTodos;
    // };
    // setTodos(setter(todo));
    db.update(todo).then(db.getAll).then(setTodos);
  };
  const clearTodos = () => 
    db
      .clear()
      .then(db.getAll)
      .then((allTodos) => {
        setTodos(allTodos);
        if (allTodos.length === 0) {
          updateStatus("Cleared all to do items");
          //another way of doing the above line of code
          // const datetime = new Date().toLocaleString();
          // setStatus('Cleared to do items at ' + datetime);
        }
      }
    );
  function updateStatus(action) {
    const datetime = new Date().toLocaleString();
    setStatus(action + ' at ' + datetime);
    // statusPEl.current.focus();
  }
  return (
    <>
      <header>
        <div id="title">
          <h1 class="no-margin">Frontend Portfolio</h1>
          <p class="no-margin">by Zachary F.</p>
        </div>
        < Navbar />
        <img id="logo" src="/client-side-demos/todo.svg" alt="Black check mark on Cyan" />
        <h2>To Do App</h2>
      </header>
      <main>
        <p role="status" ref={statusPEl} tabIndex={-1}>{status}</p>
        {/* <form onSubmit={handleSubmit}>
          <input type="text"  name="todo-text"/>
          <button type="submit">Add</button>
        </form> 
        The below code does the same as what is above through the function at the bottom of the page*/}
        <SingleTextInputForm
          onSubmit={handleSubmit}
          inputName="todo-text"
          buttonText="Add"
        />
        <button onClick={clearTodos}>Clear All To Do Items</button>
        <article>
          <h2>To Do List</h2>
          <ul>
            {todos.map((todo) => (
              <TodoListItem key={todo.id} {...{ todo, todoRemover, todoUpdater }} />
              // <li key={id}>
              //   <input type="checkbox" />
              //   <span>
              //     {text}   {id}
              //   </span>
              //   <button onClick={todoRemover({ id, text })}>Delete</button>
              //   <button>Edit</button>
              // </li>
            ))}
          </ul>
        </article>
      </main>
      <footer>Created by Zachary F. w/ instruction from Nicholas Gardella 02/2025</footer>
    </>
  );
}

function TodoListItem({ todo, todoRemover, todoUpdater }) {
  const updateInputRef = useRef(null);
  const { id, text } = todo;
  const [editing, setEditing] = useState(false);
  const inputName = "updater-todo-text";
  const buttonText = "Update";
  const placeholder = text;
  const defaultValue = text;

  useEffect(() => {
    if (editing && updateInputRef.current) {  
      updateInputRef.current.focus();
    }
  }, [editing]);

  function onSubmit(e) {
    e.preventDefault();
    const newText = new FormData(e.target).get(inputName).trim();
    const newTodo = { id, text: newText };
    todoUpdater(newTodo);
    setEditing(false);
  }
  if (editing) {
    return <SingleTextInputForm {...{ onSubmit, inputName, buttonText, placeholder, defaultValue, inputRef: updateInputRef, }} />;
  }
  function onEditClick() {
    setEditing(true);
    
  }
  return (
    <li>
      <input type="checkbox" />
      <span>{text}</span>
      <button onClick={todoRemover({ id, text })}>Delete</button>
      <button onClick={onEditClick}>Edit</button>
    </li>
  );
}

function SingleTextInputForm({ onSubmit, inputName, buttonText, placeholder = "", defaultValue = "", inputRef, }) 
{
  function customValidator(e) {
    const input = e.target;
    input.setCustomValidity("");

    if (!input.validity.valid && input.validity.patternMismatch) {
      input.setCustomValidity("Entry must not be all white spaces, or begin with a white space.");
    }
  }
  return (
    <form {...{ onSubmit }}>
      <fieldset>
        <legend>Add a to do item</legend>
        <label htmlFor={inputName}>Text Content</label>
        <input 
        id={inputName}
        name={inputName} 
        type="text"  
        {...{placeholder, defaultValue }} 
        required
        autoComplete="off"
        // pattern for allowing spaces between words but not only spaces
        pattern="^(\S+\s*)+$"
        ref={inputRef}
        onInvalid={customValidator}
        onInput={customValidator}
        // pattern for no whitespace characters only
        // pattern="^\S+$"
        />
        <button type="submit">{buttonText}</button>
      </fieldset>
    </form>
  );
}


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
