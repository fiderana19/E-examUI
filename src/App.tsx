import { Route, Routes } from "react-router-dom";
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
import AdminAccount from "./pages/admin/AdminAccount";
import TeacherHome from "./pages/teacher/TeacherHome";
import TeacherAnnounce from "./pages/teacher/TeacherAnnounce";
import TeacherAnnounceEdit from "./pages/teacher/annonce/TeacherAnnonceEdit";
import TeacherTest from "./pages/teacher/TeacherTest";
import TeacherTestAdd from "./pages/teacher/test/TeacherTestAdd";
import TeacherTestEdit from "./pages/teacher/test/TeacherTestEdit";
import TeacherTestView from "./pages/teacher/test/TeacherTestView";
import TeacherQCMView from "./pages/teacher/test/TeacherQCMView";
import TeacherQuestionEdit from "./pages/teacher/test/TeacherQuestionEdit";
import TeacherCorrection from "./pages/teacher/TeacherCorrection";
import TeacherCorrectionView from "./pages/teacher/correction/TeacherCorrectionView";
import TeacherCorrectionAction from "./pages/teacher/correction/TeacherCorrectionAction";
import TeacherResult from "./pages/teacher/TeacherResult";
import TeacherResultView from "./pages/teacher/result/TeacherResultView";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import AdminHistory from "./pages/admin/AdminHistory";
import AdminHistoryView from "./pages/admin/history/AdminHistoryView";
import AdminResponseView from "./pages/admin/history/AdminResponseView";
import AdminResult from "./pages/admin/AdminResult";
import RoleBasedRoute from "./routes/RoleBasedRoute";
import TeacherTestLaunchedView from "./pages/teacher/test/TeacherTestLaunchedView";

function App() {
  return (
      <Routes>
        {/* Public routes */}
        <Route index path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Student route */}
        <Route path="/student" element={<RoleBasedRoute allowedRoles={['student']} />} >
          <Route path="home" element={<StudentHome />} />
          <Route path="announce" element={<StudentAnnonce />} />
          <Route path="test" element={<StudentTest />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="result" element={<StudentResult />} />
          <Route path="test/room/:id" element={<TestRoom />} />
        </Route>
        {/* Admin route */}
        <Route path="/admin" element={<RoleBasedRoute allowedRoles={['admin']} />} >
          <Route path="home" element={<AdminHome />} />
          <Route path="groupe" element={<AdminGroupe />} />
          <Route path="history" element={<AdminHistory />} />
          <Route path="history/view/:id" element={<AdminHistoryView />} />
          <Route path="result" element={<AdminResult />} />
          <Route path="response/view/:id" element={<AdminResponseView />} />
          <Route path="groupe/edit/:id" element={<AdminGroupeEdit />} />
          <Route path="account" element={<AdminAccount />} />
        </Route>
        {/* Teacher route */}
        <Route path="/teacher" element={<RoleBasedRoute allowedRoles={['teacher']} />} >
          <Route path="home" element={<TeacherHome />} />
          <Route path="announce" element={<TeacherAnnounce />} />
          <Route path="announce/edit/:id" element={<TeacherAnnounceEdit />} />
          <Route path="test" element={ <TeacherTest />} />
          <Route path="test/create" element={<TeacherTestAdd />} />
          <Route path="test/edit/:id" element={<TeacherTestEdit />} />
          <Route path="test/view/:id" element={<TeacherTestView />} />
          <Route path="test/launched/view/:id" element={<TeacherTestLaunchedView />} />
          <Route path="qcm/:id" element={<TeacherQCMView />} />
          <Route path="question/edit/:id" element={<TeacherQuestionEdit />} />
          <Route path="correction" element={<TeacherCorrection />} />
          <Route path="correction/view/:id" element={<TeacherCorrectionView />} />
          <Route path="correction/action/:id" element={<TeacherCorrectionAction />} />
          <Route path="result" element={<TeacherResult />} />
          <Route path="result/view/:id" element={<TeacherResultView />} />
          <Route path="profile" element={<TeacherProfile />} />
        </Route>
      </Routes>
  )
}

export default App