import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StudentHome from "./pages/student/StudentHome";
import StudentAnnonce from "./pages/student/StudentAnnonce";
import StudentTest from "./pages/student/StudentTest";
import StudentProfile from "./pages/student/StudentProfile";
import StudentResult from "./pages/student/StudentResult";
import TestRoom from "./pages/student/ExamenSpace/TestRoom";
import AdminHome from "./pages/admin/AdminHome";
import AdminGroupe from "./pages/admin/AdminGroupe";
import AdminGroupeEdit from "./pages/admin/groupe/AdminGroupeEdit";

function App() {
  return (
      <Routes>
        {/* Public routes */}
        <Route index path="/" element={
          <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
            <LoginPage />
          </Suspense>} />
          <Route path="/signup" element={
          <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
            <SignupPage />
          </Suspense>} />
          <Route path="/student/home" element={
          <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
            <StudentHome />
          </Suspense>} />
          <Route path="/student/announce" element={
          <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
            <StudentAnnonce />
          </Suspense>} />
          <Route path="/student/test" element={
          <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
            <StudentTest />
          </Suspense>} />
          <Route path="/student/profile" element={
          <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
            <StudentProfile />
          </Suspense>} />
          <Route path="/student/result" element={
          <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
            <StudentResult />
          </Suspense>} />
          <Route path="/student/test/room" element={
          <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
            <TestRoom />
          </Suspense>} />
          <Route path="/admin/home" element={
          <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
            <AdminHome />
          </Suspense>} />
          <Route path="/admin/groupe" element={
          <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
            <AdminGroupe />
          </Suspense>} />
          <Route path="/admin/groupe/edit" element={
          <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
            <AdminGroupeEdit />
          </Suspense>} />
      </Routes>
  )
}

export default App