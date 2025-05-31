import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StagewiseToolbar } from '@stagewise/toolbar-react';
import "./index.css";
import App from "./App.jsx";
import "./i18n"; // Import i18n configuration

// Initialize main app
createRoot(document.getElementById("root")).render(<App />);

// Initialize stagewise toolbar in development mode
if (process.env.NODE_ENV === 'development') {
  const stagewiseConfig = {
    plugins: []
  };
  
  const toolbarRoot = document.createElement('div');
  toolbarRoot.id = 'stagewise-root';
  document.body.appendChild(toolbarRoot);
  
  createRoot(toolbarRoot).render(
    <StagewiseToolbar config={stagewiseConfig} />
  );
}
