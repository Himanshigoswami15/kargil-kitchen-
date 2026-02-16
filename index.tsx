import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Failed to mount application:", error);
  // Fallback UI in case of catastrophic failure
  rootElement.innerHTML = '<div style="color: white; padding: 20px; text-align: center; font-family: sans-serif;"><h1>Unable to load menu</h1><p>Please check the console for details or refresh the page.</p></div>';
}