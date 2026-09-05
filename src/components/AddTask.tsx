import { ChangeEvent, FormEvent, useState } from "react";

interface User {
  id: number;
  name: string;
}

interface AddTaskProps {
  defaultUserId: number;
  users: User[];
  onAddTask: (title: string, userId: number) => void;
}

function AddTask(props: AddTaskProps) {
  const [draftUserId, setDraftUserId] = useState(0);
  const [draftTitle, setDraftTitle] = useState("");

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setDraftTitle(event.target.value);
  }

  function handleUserChange(event: ChangeEvent<HTMLSelectElement>) {
    setDraftUserId(Number(event.target.value));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    props.onAddTask(draftTitle, draftUserId);

    setDraftTitle("");
    setDraftUserId(props.defaultUserId);
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-task-input"
        placeholder="Add a new task..."
        value={draftTitle}
        onChange={handleTitleChange}
      />

      <select
        className="add-task-select"
        value={draftUserId}
        onChange={handleUserChange}
      >
        <option value={props.defaultUserId}>Select user</option>
        {props.users.map((user) => {
          return <option value={user.id}>{user.name}</option>;
        })}
      </select>

      <button className="add-task-button" type="submit">
        Add Task
      </button>
    </form>
  );
}

export default AddTask;
