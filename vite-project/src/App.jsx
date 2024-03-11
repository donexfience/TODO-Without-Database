import React, { useState, useRef } from "react";
import { IoIosDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    if (todo.trim() !== "") {
      if (editId) {
        const updatedTodos = todos.map((to) =>
          to.id === editId ? { ...to, list: todo } : to
        );
        setTodos(updatedTodos);
        setEditId(0);
      } else {
        setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      }
      setTodo("");
    }
  };

  const OnDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id));
  };

  const onComplete = (id) => {
    let complete = todos.map((todoItem) => {
      if (todoItem.id === id) {
        return { ...todoItem, status: !todoItem.status };
      }
      return todoItem;
    });
    setTodos(complete);
  };

  const onEdit = (id) => {
    const editTodo = todos.find((todoItem) => todoItem.id === id);
    setTodo(editTodo.list);
    setEditId(editTodo.id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className={flag?true:"bg-orange-300 text-white": "p-8 roundedshadow-lg"}{  }>
        <h2 className="text-2xl font-bold mb-4 text-center">TODO APP</h2>
        <form className="mb-4 form-group" onSubmit={handleSubmit}>
          <input
            className="border-2 text-slate-950 border-gray-300 p-2 rounded-md mr-2"
            type="text"
            value={todo}
            placeholder="Enter your todo"
            onChange={(event) => setTodo(event.target.value)}
          />

          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md"
            onClick={addTodo}
          >
            {editId ? "EDIT" : "ADD"}
          </button>
        </form>
        <div>
          <ul>
            {todos.map((to) => (
              <li
                key={to.id}
                className="mb-1 form-control bg-white text-black rounded-md flex justify-between items-center"
              >
                <span className={to.status ? "line-through opacity-25" : ""}>
                  {to.list}
                </span>

                <span className="flex space-x-4">
                  <IoIosDoneAll
                    className="text-green-500 cursor-pointer"
                    title="Complete"
                    onClick={() => onComplete(to.id)}
                  />
                  <FiEdit
                    className="text-blue-500 cursor-pointer"
                    title="Edit"
                    onClick={() => onEdit(to.id)}
                  />
                  <MdDelete
                    className="text-red-500 cursor-pointer"
                    title="Delete"
                    onClick={() => OnDelete(to.id)}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todo;
