import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ITask } from "../../models/Task.model";
import { EmptyTask } from "../EmptyTask";
import { Task } from "../Task";
import styles from "./TaskBoard.module.css";

export function TaskBoard() {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  const completedTasksCount = tasks.filter((task) => task.isComplete).length;

  function handleChangeTaskName(event: ChangeEvent) {
    setNewTaskTitle(event.target.value);
  }

  function handleSubmitTask(event: FormEvent) {
    event.preventDefault();

    if (newTaskTitle === "") {
      return;
    }

    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        title: newTaskTitle,
        isComplete: false,
      },
    ]);
    setNewTaskTitle("");
  }

  function handleDeleteTask(taskId: string) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  function handleCompleteTask(taskId: string) {
    setTasks(
      tasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }
        return {
          ...task,
          isComplete: !task.isComplete,
        };
      })
    );
  }

  return (
    <main className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmitTask}>
        <input
          className={styles.input}
          onChange={handleChangeTaskName}
          placeholder="Adicione uma nova tarefa"
          value={newTaskTitle}
        ></input>
        <button type="submit" className={styles.button}>
          Criar <PlusCircle size={16} />
        </button>
      </form>

      <div className={styles.boardHeader}>
        <div className={styles.createdTask}>
          <strong>Tarefas criadas</strong>
          <span>{tasks.length}</span>
        </div>
        <div className={styles.finishedTask}>
          <strong>Concluídas</strong>
          <span>
            {completedTasksCount} de {tasks.length}
          </span>
        </div>
      </div>
      {tasks.length === 0 ? (
        <EmptyTask />
      ) : (
        <ul className={styles.taskContainer}>
          {tasks.map((task) => (
            <Task
              id={task.id}
              title={task.title}
              isComplete={task.isComplete}
              onCheck={handleCompleteTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </ul>
      )}
    </main>
  );
}
