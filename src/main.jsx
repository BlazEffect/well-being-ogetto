import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import PageLoader from "@/components/PageLoader";
import AppLayout from "@/components/AppLayout.jsx";
import '@/assets/css/app.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <AppLayout/>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
)
