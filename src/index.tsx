import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';
// import './styles/tailwind.css'; // Uncomment if Tailwind is set up

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} 