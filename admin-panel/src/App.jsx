import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Context
//import { SchoolThemeProvider } from "./context/SchoolThemeContext.jsx";

// Components
//import InstallButton from './components/InstallButton';
import GlobalBackButton from './components/GlobalBackButton'; // 👈 IMPORT KAREIN

// Common
import LandingPage from './pages/common/LandingPage';
import RoleSelection from './pages/common/RoleSelection';
import UniversalLogin from './pages/common/UniversalLogin';
import MobileLayout from './pages/common/MobileLayout';
import SchoolGateway from './pages/common/SchoolGateway';
import SchoolAppEntry from './pages/common/SchoolAppEntry';

// Super Admin
import SuperAdminLayout from './pages/super-admin/SuperAdminLayout';
import SuperAdminDashboard from './pages/super-admin/SuperAdminDashboard';
import SchoolManager from './pages/super-admin/SchoolManager';
import SubscriptionManager from './pages/super-admin/SubscriptionManager';
import FinanceManager from './pages/super-admin/FinanceManager';
import CommissionSettings from './pages/super-admin/CommissionSettings';
import GlobalSettings from './pages/super-admin/GlobalSettings';
import SupportTickets from './pages/super-admin/SupportTickets';
import AnalyticsReports from './pages/super-admin/AnalyticsReports';
import SystemLogs from './pages/super-admin/SystemLogs';
import Coupons from './pages/super-admin/Coupons';
import WebsiteCMS from './pages/super-admin/WebsiteCMS';
import Broadcast from './pages/super-admin/Broadcast';
import TeamManager from './pages/super-admin/TeamManager';
import Backups from './pages/super-admin/Backups';
import Integrations from './pages/super-admin/Integrations';
import AddSchool from './pages/super-admin/AddSchool';

// School Admin
import SchoolLayout from './pages/school/SchoolLayout';
import SchoolDashboard from './pages/school/SchoolDashboard';
import StudentManager from './pages/school/StudentManager';
import StaffManager from './pages/school/StaffManager';
import FeeManager from './pages/school/FeeManager';
import ExamManager from './pages/school/ExamManager';
import { TransportManager, LibraryManager } from './pages/school/FacilityManager';
import FrontOffice from './pages/school/FrontOffice';
import AttendanceManager from './pages/school/AttendanceManager';
import HostelManager from './pages/school/HostelManager';
import LMSManager from './pages/school/LMSManager';
import CommManager from './pages/school/CommManager';
import EventManager from './pages/school/EventManager';
import AcademicManager from './pages/school/AcademicManager';
import InventoryManager from './pages/school/InventoryManager';
import ReportsManager from './pages/school/ReportsManager';
import GatePass from './pages/school/GatePass';
import SchoolSettings from './pages/school/SchoolSettings';
import ExpenseManager from './pages/school/ExpenseManager';
import StudentPromotion from './pages/school/StudentPromotion';
import RoleManager from './pages/school/RoleManager';
import TransportTracking from './pages/school/TransportTracking';
import LibraryScanner from './pages/school/LibraryScanner';
import WhatsAppSender from './pages/school/WhatsAppSender';
import BulkImport from './pages/school/BulkImport';
import SchoolStore from './pages/school/SchoolStore';
import SchoolHelpDesk from './pages/school/SchoolHelpDesk';
import QuestionPaper from './pages/school/QuestionPaper';
import BirthdayWisher from './pages/school/BirthdayWisher';
import DataBackup from './pages/school/DataBackup';
import AdmissionForm from './pages/school/AdmissionForm';
import AddTeacher from './pages/school/AddTeacher';

// Teacher App
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import TeacherHomework from './pages/teacher/TeacherHomework';
import TeacherProfile from './pages/teacher/TeacherProfile';

// Student App
import StudentDashboard from './pages/student/StudentDashboard';
import StudentFees from './pages/student/StudentFees';
import StudentHomework from './pages/student/StudentHomework';
import StudentResults from './pages/student/StudentResults';

function App() {
    return (
        // <SchoolThemeProvider>
        <BrowserRouter>


            {/* 👇 GLOBAL BUTTONS (Har page par rahenge) */}
            <GlobalBackButton />
            <Routes>
                {/* Public */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/app" element={<SchoolAppEntry />} />
                <Route path="/portal" element={<SchoolGateway />} />
                <Route path="/select-role" element={<RoleSelection />} />
                <Route path="/login/:role" element={<UniversalLogin />} />

                {/* Super Admin */}
                <Route path="/super-admin" element={<SuperAdminLayout />}>
                    <Route index element={<SuperAdminDashboard />} />
                    <Route path="schools" element={<SchoolManager />} />
                    <Route path="team" element={<TeamManager />} />
                    <Route path="subscriptions" element={<SubscriptionManager />} />
                    <Route path="finance" element={<FinanceManager />} />
                    <Route path="commission-rules" element={<CommissionSettings />} />
                    <Route path="support" element={<SupportTickets />} />
                    <Route path="coupons" element={<Coupons />} />
                    <Route path="broadcast" element={<Broadcast />} />
                    <Route path="cms" element={<WebsiteCMS />} />
                    <Route path="analytics" element={<AnalyticsReports />} />
                    <Route path="logs" element={<SystemLogs />} />
                    <Route path="backups" element={<Backups />} />
                    <Route path="integrations" element={<Integrations />} />
                    <Route path="settings" element={<GlobalSettings />} />
                    <Route path="/super-admin/add-school" element={<AddSchool />} />
                </Route>

                {/* School Admin */}
                <Route path="/school" element={<SchoolLayout />}>
                    <Route index element={<SchoolDashboard />} />
                    <Route path="admission" element={<AdmissionForm />} />
                    <Route path="students" element={<StudentManager />} />
                    <Route path="staff" element={<StaffManager />} />
                    <Route path="fees" element={<FeeManager />} />
                    <Route path="exams" element={<ExamManager />} />
                    <Route path="transport" element={<TransportManager />} />
                    <Route path="library" element={<LibraryManager />} />
                    <Route path="front-office" element={<FrontOffice />} />
                    <Route path="attendance" element={<AttendanceManager />} />
                    <Route path="hostel" element={<HostelManager />} />
                    <Route path="lms" element={<LMSManager />} />
                    <Route path="communication" element={<CommManager />} />
                    <Route path="events" element={<EventManager />} />
                    <Route path="academics" element={<AcademicManager />} />
                    <Route path="inventory" element={<InventoryManager />} />
                    <Route path="reports" element={<ReportsManager />} />
                    <Route path="gate-pass" element={<GatePass />} />
                    <Route path="settings" element={<SchoolSettings />} />
                    <Route path="expenses" element={<ExpenseManager />} />
                    <Route path="promotion" element={<StudentPromotion />} />
                    <Route path="roles" element={<RoleManager />} />
                    <Route path="tracking" element={<TransportTracking />} />
                    <Route path="library-scan" element={<LibraryScanner />} />
                    <Route path="whatsapp" element={<WhatsAppSender />} />
                    <Route path="import" element={<BulkImport />} />
                    <Route path="store" element={<SchoolStore />} />
                    <Route path="help-desk" element={<SchoolHelpDesk />} />
                    <Route path="paper-generator" element={<QuestionPaper />} />
                    <Route path="birthdays" element={<BirthdayWisher />} />
                    <Route path="backup" element={<DataBackup />} />
                    <Route path="add-teacher" element={<AddTeacher />} />
                </Route>
                {/* Teacher App (Mobile) */}
                <Route path="/teacher" element={<MobileLayout />}>
                    <Route index element={<TeacherDashboard />} />
                    <Route path="attendance" element={<TeacherAttendance />} />
                    <Route path="homework" element={<TeacherHomework />} />
                    <Route path="profile" element={<TeacherProfile />} />
                </Route>

                {/* Student App (Mobile) */}
                <Route path="/student" element={<MobileLayout />}>
                    <Route index element={<StudentDashboard />} />
                    <Route path="fees" element={<StudentFees />} />
                    <Route path="homework" element={<StudentHomework />} />
                    <Route path="results" element={<StudentResults />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={<div className="text-center p-10">404 Not Found</div>} />
            </Routes>

        </BrowserRouter >
        //</SchoolThemeProvider>
    );
}

export default App;