import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical Error: Could not find root element in index.html");
} else {
  const root = ReactDOM.createRoot(rootElement);
  
  try {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("React Render Error:", error);
    rootElement.innerHTML = `
      <div style="padding: 40px; font-family: sans-serif; text-align: center; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ef4444;">Application Failed to Start</h2>
        <div style="text-align: left; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin-top: 20px;">
          <p><strong>Common Fixes:</strong></p>
          <ol>
            <li>Ensure <code>API_KEY</code> is set in Vercel Environment Variables.</li>
            <li>Check if the Vercel Framework Preset is set to <strong>Vite</strong>.</li>
            <li>Open the browser console (F12) to see the full technical error.</li>
          </ol>
        </div>
        <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #16a34a; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
          Try Reloading
        </button>
      </div>
    `;
  }
}