"use client";

import { EnvelopeOpenIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function AskOfferForm({ serviceId, translated }) {
  const [inputValues, setInputValues] = useState({
    id: serviceId,
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((oldState) => ({
      ...oldState,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("Input Values:", inputValues);
  }, [inputValues]);

  return (
    <div className="w-sm sm:w-96 lg:w-128 xl:w-160 p-4 text-slate-700 dark:text-slate-300">
      <div className="flex items-center mb-4 space-x-6 border-b border-slate-900 dark:border-slate-200 py-4">
        <EnvelopeOpenIcon className="h-8 w-8" />

        <h2 className="text-2xl font-bold uppercase text-center">
          {translated.title}
        </h2>
      </div>

      <form className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium dark:text-slate-300"
          >
            <span className="text-red-500 text-2xl">*</span>{translated.nameLabel}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={translated.namePlaceholder}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {translated.emailLabel}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={translated.emailPlaceholder}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            <span className="text-red-500 text-2xl">*</span>{translated.phoneLabel}
          </label>
          <input
            type="phone"
            id="phone"
            name="phone"
            placeholder={translated.phonePlaceholder}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            <span className="text-red-500 text-2xl">*</span>{translated.messageLabel}
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder={translated.messagePlaceholder}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          ></textarea>
        </div>
      </form>
    </div>
  );
}
