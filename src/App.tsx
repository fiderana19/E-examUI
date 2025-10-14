import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
      <Routes>
        {/* Public routes */}
        <Route index path="/" element={
          <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
            <LoginPage />
          </Suspense>} />
      </Routes>
  )
}

export default App