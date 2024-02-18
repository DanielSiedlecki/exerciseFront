import { taskService } from "../services/taskService";
import { useState } from "react";
import { formatDate } from "../utils/convertDate";
import "./getTaskWindow.css";

function GetTaskWindow() {
  const [responseTask, setResponseTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleResponseTask = async () => {
    try {
      setIsLoading(true);
      const fetcher = new taskService();
      const response = await fetcher.get();
      setResponseTask(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <button onClick={handleResponseTask}>Get last Task</button>

      {isLoading && <p>Loading...</p>}

      {responseTask && !isLoading && (
        <div className="response-container">
          <h2>Last Task</h2>
          <ul className="lastTask-container">
            <li>Task Name: {responseTask.taskName}</li>
            <li>Count Occurrences: {responseTask.countOccurrences}</li>
            <li>Created day: {formatDate(responseTask.nowDate)}</li>
            <li>
              First Execution Date:{" "}
              {formatDate(responseTask.firstExecutionDate)}
            </li>
            <li>
              Last Execution Date: {formatDate(responseTask.lastExecutionDate)}
            </li>
            <li>
              Next Execution Date: {formatDate(responseTask.nextExecutionDate)}
            </li>
          </ul>
          <ul className="settings-container">
            <h2>Settings Task</h2>
            <li>Interval Day: {responseTask.intervalDay}</li>
            <li>Start Date: {formatDate(responseTask.startDate)}</li>
            <li>Interval Count: {responseTask.intervalCount}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export { GetTaskWindow };
