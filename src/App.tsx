import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const StudentHome = lazy(() => import("./pages/student/StudentHome"));
const StudentAnnonce = lazy(() => import("./pages/student/StudentAnnonce"));
const StudentTest = lazy(() => import("./pages/student/StudentTest"));
const StudentProfile = lazy(() => import("./pages/student/StudentProfile"));
const StudentResult = lazy(() => import("./pages/student/StudentResult"));
const TestRoom = lazy(() => import("./pages/student/ExamenSpace/TestRoom"));
const AdminHome = lazy(() => import("./pages/admin/AdminHome"));
const AdminGroupe = lazy(() => import("./pages/admin/AdminGroupe"));
const AdminGroupeEdit = lazy(() => import("./pages/admin/groupe/AdminGroupeEdit"));
const AdminAccount = lazy(() => import("./pages/admin/AdminAccount"));
const TeacherHome = lazy(() => import("./pages/teacher/TeacherHome"));
const TeacherAnnounce = lazy(() => import("./pages/teacher/TeacherAnnounce"));
const TeacherAnnounceEdit = lazy(() => import("./pages/teacher/annonce/TeacherAnnonceEdit"));
const TeacherTest = lazy(() => import("./pages/teacher/TeacherTest"));
const TeacherTestAdd = lazy(() => import("./pages/teacher/test/TeacherTestAdd"));
const TeacherTestEdit = lazy(() => import("./pages/teacher/test/TeacherTestEdit"));
const TeacherTestView = lazy(() => import("./pages/teacher/test/TeacherTestView"));
const TeacherQCMView = lazy(() => import("./pages/teacher/test/TeacherQCMView"));
const TeacherQuestionEdit = lazy(() => import("./pages/teacher/test/TeacherQuestionEdit"));
const TeacherCorrection = lazy(() => import("./pages/teacher/TeacherCorrection"));
const TeacherCorrectionView = lazy(() => import("./pages/teacher/correction/TeacherCorrectionView"));
const TeacherCorrectionAction = lazy(() => import("./pages/teacher/correction/TeacherCorrectionAction"));
const TeacherResult = lazy(() => import("./pages/teacher/TeacherResult"));
const TeacherResultView = lazy(() => import("./pages/teacher/result/TeacherResultView"));
const TeacherProfile = lazy(() => import("./pages/teacher/TeacherProfile"));
const AdminHistory = lazy(() => import("./pages/admin/AdminHistory"));
const AdminHistoryView = lazy(() => import("./pages/admin/history/AdminHistoryView"));
const AdminResponseView = lazy(() => import("./pages/admin/history/AdminResponseView"));
const AdminResult = lazy(() => import("./pages/admin/AdminResult"));
const RoleBasedRoute = lazy(() => import("./routes/RoleBasedRoute"));
const TeacherTestLaunchedView = lazy(() => import("./pages/teacher/test/TeacherTestLaunchedView"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));
import { USER_ROLE } from "./enum/user.enum";
const TeacherResultResponseView = lazy(() => import("./pages/teacher/result/TeacherResultResponseView"));
import { LoadingOutlined } from "@ant-design/icons";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route index path="/" element={
        <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
          <LoginPage />
        </Suspense>
      } />
      <Route path="/signup" element={
        <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
          <SignupPage />
        </Suspense>
        } />
      <Route path="/unauthorized" element={
        <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
          <Unauthorized />
        </Suspense>
        } />
      <Route path="*" element={
        <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
          <NotFound />
        </Suspense>
        } />
      {/* Student route */}
      <Route
        path="/student"
        element={<RoleBasedRoute allowedRoles={[`${USER_ROLE.ETUDIANT}`]} />}
      >
        <Route path="home" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <StudentHome />
          </Suspense>
          } />
        <Route path="announce" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <StudentAnnonce />
          </Suspense>
          } />
        <Route path="test" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <StudentTest />
          </Suspense>
          } />
        <Route path="profile" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <StudentProfile />
          </Suspense>
          } />
        <Route path="result" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <StudentResult />
          </Suspense>
          } />
        <Route path="test/room/:testId/:tentativeId" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <TestRoom />
          </Suspense>
          } />
      </Route>
      {/* Admin route */}
      <Route
        path="/admin"
        element={<RoleBasedRoute allowedRoles={[`${USER_ROLE.ADMIN}`]} />}
      >
        <Route path="home" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <AdminHome />
          </Suspense>
          } />
        <Route path="groupe" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <AdminGroupe />
          </Suspense>
          } />
        <Route path="history" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <AdminHistory />
          </Suspense>
          } />
        <Route path="history/view/:id" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <AdminHistoryView />
          </Suspense>
          } />
        <Route path="result" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <AdminResult />
          </Suspense>
          } />
        <Route path="response/view/:id" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <AdminResponseView />
          </Suspense>
          } />
        <Route path="groupe/edit/:id" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <AdminGroupeEdit />
          </Suspense>
          } />
        <Route path="account" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <AdminAccount />
          </Suspense>
          } />
      </Route>
      {/* Teacher route */}
      <Route
        path="/teacher"
        element={<RoleBasedRoute allowedRoles={[`${USER_ROLE.ENSEIGNANT}`]} />}
      >
        <Route path="home" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <TeacherHome />
          </Suspense>
          } />
        <Route path="announce" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <TeacherAnnounce />
          </Suspense>
          } />
        <Route path="announce/edit/:id" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <TeacherAnnounceEdit />
          </Suspense>
          } />
        <Route path="test" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <TeacherTest />
          </Suspense>
          } />
        <Route path="test/create" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <TeacherTestAdd />
          </Suspense>
          } />
        <Route path="test/edit/:id" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <TeacherTestEdit />
          </Suspense>
          } />
        <Route path="test/view/:id" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <TeacherTestView />
          </Suspense>
          } />
        <Route
          path="test/launched/view/:id"
          element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <TeacherTestLaunchedView />
          </Suspense>
          }
        />
        <Route path="qcm/:id" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <TeacherQCMView />
          </Suspense>
          } />
        <Route path="question/edit/:id" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <TeacherQuestionEdit />
          </Suspense>
          } />
        <Route path="correction" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <TeacherCorrection />
          </Suspense>
          } />
        <Route path="correction/view/:id" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <TeacherCorrectionView />
          </Suspense>
          } />
        <Route
          path="correction/action/:testId/:reponseId"
          element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <TeacherCorrectionAction />
          </Suspense>
         }
        />
        <Route path="result" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <TeacherResult />
          </Suspense>
          } />
        <Route path="result/view/:id" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <TeacherResultView />
          </Suspense>
          } />
        <Route
          path="result/response/view/:id"
          element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <TeacherResultResponseView />
          </Suspense>
         }
        />
        <Route path="profile" element={
          <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center"><LoadingOutlined className="text-7xl w-max m-auto" /></div>}>
            <TeacherProfile />
          </Suspense>
          } />
      </Route>
    </Routes>
  );
}

export default App;
