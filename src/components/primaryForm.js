import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { taskService } from "../services/taskService";
import { convertDateToTimestamp } from "../utils/convertDate";
import "./primaryForm.css";

function PrimaryForm() {
  const [taskName, setTaskName] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [numericInput, setNumericInput] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [responseData, setResponseData] = useState(null);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };
  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleNumericInputChange = (event) => {
    const inputValue = event.target.value;
    // I check if value is number
    if (!isNaN(inputValue)) {
      setNumericInput(inputValue);
    }
  };
  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const postTask = async () => {
    try {
      // Validate the required fields
      if (!taskName || !selectedDate || !numericInput || !selectedDay) {
        alert("Please fill in all the required fields.");
        return;
      }

      const data = {
        taskName: taskName,
        intervalDay: selectedDay,
        intervalCount: numericInput,
        timestampStartDate: convertDateToTimestamp(selectedDate),
      };

      const fetcher = new taskService();
      const response = await fetcher.post(data);
      alert("Create task");
      setResponseData(response.data);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  return (
    <div className="container">
      <div className="form">
        <h1>Form</h1>
        <label>Task name</label>
        <input
          type="text"
          onChange={handleTaskNameChange}
          placeholder="Enter a task name"
        />
        <label htmlFor="datepicker">Select Date: </label>
        <DatePicker
          id="datepicker"
          selected={selectedDate}
          onChange={handleDateChange}
          maxDate={yesterday}
          placeholderText="Select a date"
        />
        <label htmlFor="numericInput">Interval</label>
        <input
          type="text"
          id="numericInput"
          value={numericInput}
          onChange={handleNumericInputChange}
          placeholder="Enter a number"
        />
        <select id="dayDropdown" value={selectedDay} onChange={handleDayChange}>
          <option value="" disabled>
            Select a day
          </option>
          {daysOfWeek.map((day, index) => (
            <option key={index} value={day}>
              {day}
            </option>
          ))}
        </select>
        <button onClick={postTask}>Create exercise</button>
        {responseData && (
          <div className="response-container">
            <ul>
              <h2>Task</h2>
              <li>Task Name: {responseData.taskName}</li>
              <li>Today date: {responseData.todayDate}</li>
              <li>First Execution Date: {responseData.firstExecutionDate}</li>
              <li>Last Execution Date: {responseData.lastExecutionDate}</li>
              <li>Next Execution Date: {responseData.nextExecutionDate}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default PrimaryForm;
