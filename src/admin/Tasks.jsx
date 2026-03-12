import React from "react";

const CreateTask = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Task
        </h2>

        <form className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Task Title"
            className="border px-4 py-2 rounded-md"
          />

          <textarea
            placeholder="Task Description"
            className="border px-4 py-2 rounded-md"
          />

          <input
            type="date"
            className="border px-4 py-2 rounded-md"
          />

          <select className="border px-4 py-2 rounded-md">
            <option>Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select className="border px-4 py-2 rounded-md">
            <option>Status</option>
            <option>Pending</option>
            <option>Started</option>
            <option>Completed</option>
          </select>

          <button
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Create Task
          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateTask;