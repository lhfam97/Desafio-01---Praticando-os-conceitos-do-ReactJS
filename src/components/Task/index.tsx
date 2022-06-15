import { Trash } from "phosphor-react";

import styles from "./Task.module.css";

interface TaskProps {
  id: string;
  title: string;
  isComplete: boolean;
  onDelete: (taskId: string) => void;
  onCheck: (taskId: string) => void;
}

export function Task({ id, title, isComplete, onDelete, onCheck }: TaskProps) {
  return (
    <li
      key={id}
      className={
        `${styles.task}` + ` ${isComplete ? styles.taskCompleted : ""}`
      }
    >
      <label className={styles.checkboxContainer}>
        <input
          type="checkbox"
          checked={isComplete}
          readOnly
          onClick={() => onCheck(id)}
        />
        <span className={styles.checkMark}></span>
      </label>
      <p>{title}</p>
      <button title="Deletar comentário" onClick={() => onDelete(id)}>
        <Trash size={24} />
      </button>
    </li>
  );
}
