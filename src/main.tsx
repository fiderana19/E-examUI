import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
          <App />
          <ReactQueryDevtools />
        <ToastContainer />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
);
