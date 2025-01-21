const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  const codeGenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
    export const GenAiCode = model.startChat({
      generationConfig: codeGenerationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a  Vite Project . Follow these guidelines to create an organized structure:\n\nProject Structure Requirements:\n1. Include multiple components and organize them properly in relevant folders.\n2. The project should have a 'src' folder containing the main application logic but the starting point of Application is root Level App.js is /App.js file, such as:\n   - '/App.js': The main component.\n   - '/src/index.js': The entry point.\n   - '/src/components/': A folder with reusable components.\n3. Include Tailwind CSS setup for styling.\n4. Provide configuration files for Vite and Tailwind CSS.\n5. The 'public' folder should contain an 'index.html' file.\n\nReturn the response in valid JSON format with the following schema:\n\n{\n  \"projectTitle\": \"Project Title Here\",\n  \"explanation\": \"Brief explanation of the project.\",\n  \"files\": {\n    \"/public/index.html\": {\n      \"code\": \"<!DOCTYPE html>\\\\n<html lang='en'>\\\\n<head>\\\\n<meta charset='UTF-8'>\\\\n<meta name='viewport' content='width=device-width, initial-scale=1'>\\\\n<title>React App</title>\\\\n<script src='https://cdn.tailwindcss.com'></script>\\\\n</head>\\\\n<body>\\\\n<div id='root'></div>\\\\n</body>\\\\n</html>\"\n    },\n    \"/src/App.js\": {\n      \"code\": \"import React from 'react';\\\\nfunction App() {\\\\n return <h1>Hello Vite</h1>;\\\\n}\\\\nexport default App;\"\n    },\n    \"/src/index.js\": {\n      \"code\": \"import React from 'react';\\\\nimport ReactDOM from 'react-dom';\\\\nimport App from './App';\\\\nReactDOM.render(<App />, document.getElementById('root'));\"\n    },\n    \"/tailwind.config.js\": {\n      \"code\": \"module.exports = {\\\\n content: ['./src/**/*.{js,jsx,ts,tsx}'],\\\\n theme: { extend: {} },\\\\n plugins: [],\\\\n};\"\n    },\n    \"/vite.config.js\": {\n      \"code\": \"import { defineConfig } from 'vite';\\\\nimport react from '@vitejs/plugin-react';\\\\nexport default defineConfig({\\\\n plugins: [react()],\\\\n});\"\n    }\n  },\n  \"packages\": {\n    \"react\": \"^18.2.0\",\n    \"react-dom\": \"^18.2.0\",\n    \"vite\": \"^5.0.0\",\n    \"tailwindcss\": \"^3.4.0\"\n  },\n  \"generatedFiles\": [\n    \"/public/index.html\",\n    \"/src/App.js\",\n    \"/src/index.js\",\n    \"/tailwind.config.js\",\n    \"/vite.config.js\"\n  ]\n}\n\nEnsure the JSON response follows the provided schema accurately without additional explanations.  \nProvide only the JSON object without introductory text or descriptions.\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"projectTitle\": \"React Todo App\",\n  \"explanation\": \"A basic React todo app project using Vite, with Tailwind CSS.\",\n  \"files\": {\n    \"/public/index.html\": {\n      \"code\": \"<!DOCTYPE html>\\n<html lang='en'>\\n<head>\\n<meta charset='UTF-8'>\\n<meta name='viewport' content='width=device-width, initial-scale=1'>\\n<title>React App</title>\\n<script src='https://cdn.tailwindcss.com'></script>\\n</head>\\n<body>\\n<div id='root'></div>\\n</body>\\n</html>\"\n    },\n    \"/src/App.js\": {\n      \"code\": \"import React from 'react';\\nimport TodoList from './components/TodoList';\\n\\nfunction App() {\\n  return (\\n    <div className=\\\"container mx-auto p-4\\\">\\n      <h1 className=\\\"text-2xl font-bold mb-4\\\">Todo App</h1>\\n      <TodoList />\\n    </div>\\n  );\\n}\\n\\nexport default App;\"\n    },\n    \"/src/index.js\": {\n      \"code\": \"import React from 'react';\\nimport ReactDOM from 'react-dom/client';\\nimport App from './App';\\n\\nconst root = ReactDOM.createRoot(document.getElementById('root'));\\nroot.render(\\n  <React.StrictMode>\\n    <App />\\n  </React.StrictMode>\\n);\"\n    },\n    \"/src/components/TodoList.js\": {\n        \"code\": \"import React, { useState } from 'react';\\nimport TodoItem from './TodoItem';\\n\\nfunction TodoList() {\\n  const [todos, setTodos] = useState([]);\\n  const [newTodo, setNewTodo] = useState('');\\n\\n  const handleAddTodo = () => {\\n    if (newTodo.trim() !== '') {\\n      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);\\n      setNewTodo('');\\n    }\\n  };\\n\\n  const handleToggleComplete = (id) => {\\n    setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed } : todo));\\n  };\\n\\n    const handleDeleteTodo = (id) => {\\n    setTodos(todos.filter(todo => todo.id !== id));\\n  };\\n\\n  return (\\n    <div className=\\\"bg-white shadow-md rounded p-4\\\">\\n        <div className=\\\"flex mb-4\\\">\\n        <input\\n            type=\\\"text\\\"\\n            placeholder=\\\"Add todo...\\\"\\n            className=\\\"border border-gray-300 p-2 rounded mr-2 flex-grow\\\"\\n            value={newTodo}\\n            onChange={(e) => setNewTodo(e.target.value)}\\n        />\\n        <button onClick={handleAddTodo} className=\\\"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded\\\">Add</button>\\n    </div>\\n    <ul>\\n        {todos.map(todo => (\\n            <TodoItem key={todo.id} todo={todo} onToggleComplete={handleToggleComplete} onDelete={handleDeleteTodo}/>\\n        ))}\\n      </ul>\\n    </div>\\n  );\\n}\\n\\nexport default TodoList;\"\n    },\n    \"/src/components/TodoItem.js\": {\n        \"code\": \"import React from 'react';\\n\\nfunction TodoItem({ todo, onToggleComplete, onDelete }) {\\n    return (\\n        <li className=\\\"flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0\\\">\\n            <span\\n            className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}\\n            onClick={() => onToggleComplete(todo.id)}\\n            style={{cursor: 'pointer'}}\\n            >\\n            {todo.text}\\n            </span>\\n            <div>\\n                <button onClick={()=>onDelete(todo.id)} className=\\\"ml-2 text-red-500 hover:text-red-700 focus:outline-none\\\">Delete</button>\\n            </div>\\n        </li>\\n    );\\n}\\n\\nexport default TodoItem;\"\n    },\n    \"/tailwind.config.js\": {\n      \"code\": \"module.exports = {\\n content: ['./src/**/*.{js,jsx,ts,tsx}'],\\n theme: { extend: {} },\\n plugins: [],\\n};\"\n    },\n    \"/vite.config.js\": {\n      \"code\": \"import { defineConfig } from 'vite';\\nimport react from '@vitejs/plugin-react';\\nexport default defineConfig({\\n plugins: [react()],\\n});\"\n    }\n  },\n   \"packages\": {\n    \"react\": \"^18.2.0\",\n    \"react-dom\": \"^18.2.0\",\n    \"vite\": \"^5.0.0\",\n    \"tailwindcss\": \"^3.4.0\"\n  },\n  \"generatedFiles\": [\n    \"/public/index.html\",\n    \"/src/App.js\",\n    \"/src/index.js\",\n    \"/src/components/TodoList.js\",\n     \"/src/components/TodoItem.js\",\n    \"/tailwind.config.js\",\n    \"/vite.config.js\"\n  ]\n}\n```\n"},
          ],
        },
      ],
    })
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());