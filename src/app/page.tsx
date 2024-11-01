"use client";
import TodoForm from "./_components/todo-form";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export default function Home() {
  const todos = useQuery(api.functions.listToDos);

  return (
    <div className="max-width-screen-md mx-auto p-4">
      <h1 className="text-xl font-bold">To do list</h1>
      <ul className="space-y-2">
        {todos?.map(({ _id, title, description, completed }, index) => (
          <ToDoItem
            key={index}
            id={_id}
            title={title}
            description={description}
            completed={completed}
          />
        ))}
      </ul>
      <TodoForm />
    </div>
  );
}

function ToDoItem({
  title,
  description,
  completed,
  id,
}: {
  id: Id<"todos">;
  title: string;
  description: string;
  completed: boolean;
}) {
  const updateToDo = useMutation(api.functions.updateToDo);
  const deleteToDo = useMutation(api.functions.deleteToDo);

  return (
    <li className="w-full flex gap-2 border rounded p-2 items-center">
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => updateToDo({ id, completed: e.target.checked })}
      />
      <div>
        <span className="font-semibold">{title}</span>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="ml-auto">
        <button className="text-red-500" onClick={() => deleteToDo({ id })}>
          Remove
        </button>
      </div>
    </li>
  );
}
