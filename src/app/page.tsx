"use client";
import { useState } from "react";
import TodoForm from "./_components/todo-form";

type ToDOItem = {
  title: string;
  description: string;
  completed: boolean;
};
export default function Home() {
  const [todos, setTodos] = useState<ToDOItem[]>([
    {
      title: "Clean my room",
      description: "Make the bed. Hang my jackets",
      completed: false,
    },
  ]);

  return (
    <div className="max-width-screen-md mx-auto p-4">
      <h1 className="text-xl font-bold">To do list</h1>
      <ul className="space-y-2">
        {todos.map(({ title, description, completed }, index) => (
          <ToDoItem
            key={index}
            title={title}
            description={description}
            completed={completed}
            onCompleteChange={(newValue) => {
              setTodos((prev) => {
                const newTodos = [...prev];
                newTodos[index].completed = newValue;
                return newTodos;
              });
            }}
            onRemove={() =>
              setTodos((prev) => {
                const newTodos = [...prev].filter((_, i) => i !== index);
                return newTodos;
              })
            }
          />
        ))}
      </ul>
      <TodoForm
        oncreate={(title, description) => {
          setTodos((prev) => {
            const newTodos = [...prev];
            newTodos.push({ title, description, completed: false });
            return newTodos;
          });
        }}
      />
    </div>
  );
}

function ToDoItem({
  title,
  description,
  completed,
  onCompleteChange,
  onRemove,
}: {
  title: string;
  description: string;
  completed: boolean;
  onCompleteChange: (newValue: boolean) => void;
  onRemove: () => void;
}) {
  return (
    <li className="w-full flex gap-2 border rounded p-2 items-center">
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => onCompleteChange(e.target.checked)}
      />
      <div>
        <span className="font-semibold">{title}</span>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="ml-auto">
        <button className="text-red-500" onClick={() => onRemove()}>
          Remove
        </button>
      </div>
    </li>
  );
}
