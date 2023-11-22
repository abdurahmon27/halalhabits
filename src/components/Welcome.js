import React from "react";
import { Divider } from "antd";
import { Link } from "react-router-dom";
import Header from "./header";

const Welcome = () => {
  return (
    <>
    <Header />
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-slate-600 transition">
      <div className=" bg-white p-4 rounded-md shadow-inner text-center border border-double min-w-[350px]">
        <Divider orientation="center" plain={true}>
          <h1 className="text-3xl font-semibold mb-4 dark:text-gray-700 text-gray-800">
            Welcome to Your Todo App
          </h1>
        </Divider>
        <p className="text-gray-600 dark:text-gray-500 transition mb-8">
          Organize your tasks, stay productive, stay prayed up and make the most
          of your day.
        </p>

        <button className="bg-slate-500 text-white py-2 px-4 rounded-md hover:bg-slate-600 transition">
          <Link to="/signup"> Sign Up to Get Started</Link>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4 mt-5">
        <div className="bg-green-200 p-4 rounded-md shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2 dark:text-gray-700">
            Task Management
          </h2>
          <p className="text-gray-600 dark:text-gray-500 transition">
            Stay organized with a simple and intuitive task management system.
          </p>
        </div>
        <div className="bg-yellow-200 p-4 rounded-md shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2 dark:text-gray-700">
            Priority Setting
          </h2>
          <p className="text-gray-600 dark:text-gray-500 transition">
            Set priorities for your tasks and focus on what matters most.
          </p>
        </div>

        <div className="bg-pink-200 p-4 rounded-md shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2 dark:text-gray-700">
            Reminders & Notifications
          </h2>
          <p className="text-gray-600 dark:text-gray-500 transition">
            Receive timely reminders to ensure you never miss an important task.
          </p>
        </div>

        <div className="bg-blue-200 p-4 rounded-md shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2 dark:text-gray-700">
            Prayer Times
          </h2>
          <p className="text-gray-600 dark:text-gray-500 transition">
            Stay updated with accurate prayer times based on your location.
          </p>
        </div>

        <div className="bg-purple-200 p-4 rounded-md shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2 dark:text-gray-700">
            Quran Reading Tracker
          </h2>
          <p className="text-gray-600 dark:text-gray-500 transition">
            Keep track of your daily Quran reading progress.
          </p>
        </div>
        <div className="bg-orange-200 p-4 rounded-md shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2 dark:text-gray-700">
            Charity and Good Deeds Tracker
          </h2>
          <p className="text-gray-600 dark:text-gray-500 transition">
            Log your charitable acts and good deeds to stay consistent.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Welcome;
