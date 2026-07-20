import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Nav from './components/Nav.jsx';
import Home from './pages/Home.jsx';
import StudentDirectory from './pages/StudentDirectory.jsx';
import ProgramInfo from './pages/ProgramInfo.jsx';
import FacultyInfo from './pages/FacultyInfo.jsx';
import AdvisorPlan from './pages/AdvisorPlan.jsx';
import CourseTimetable from './pages/CourseTimetable.jsx';
import AcademicRequest from './pages/AcademicRequest.jsx';
import ComplaintForm from './pages/ComplaintForm.jsx';
import TrackStatus from './pages/TrackStatus.jsx';
import Practicum from './pages/Practicum.jsx';
import Resources from './pages/Resources.jsx';
import Feedback from './pages/Feedback.jsx';
import QADashboard from './pages/QADashboard.jsx';
import AUNGuide from './pages/AUNGuide.jsx';
import FlowSystems from './pages/FlowSystems.jsx';
import Projects from './pages/Projects.jsx';
import { requests } from './data/mockData.js';

const pages = {
  home: Home,
  students: StudentDirectory,
  program: ProgramInfo,
  faculty: FacultyInfo,
  advisor: AdvisorPlan,
  courses: CourseTimetable,
  request: AcademicRequest,
  complaint: ComplaintForm,
  track: TrackStatus,
  practicum: Practicum,
  resources: Resources,
  feedback: Feedback,
  projects: Projects,
  qa: QADashboard,
  aun: AUNGuide,
  flows: FlowSystems,
};

export default function App() {
  const [active, setActive] = useState('home');
  const [records, setRecords] = useState(requests);
  const [notice, setNotice] = useState('');
  const Page = pages[active] || Home;

  const nextId = useMemo(() => `SUP-${String(records.length + 1).padStart(4, '0')}`, [records.length]);

  const addRecord = (record) => {
    const saved = { ...record, id: nextId, status: 'รับเรื่องแล้ว', log: ['รับข้อมูลผ่านระบบ', 'รอผู้รับผิดชอบกลางคัดแยก'] };
    setRecords((current) => [saved, ...current]);
    setNotice(`ระบบบันทึกข้อมูลแล้ว รหัสติดตามคือ ${saved.id}`);
    setActive('track');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-brand-ink">
      <Header />
      <Nav active={active} onNavigate={setActive} />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {notice && <div className="mb-5 border-l-4 border-brand-green bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-900">{notice}</div>}
        <Page records={records} addRecord={addRecord} onNavigate={setActive} />
      </main>
      <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center text-sm text-slate-600">
        Prototype for Student Support and AUN-QA Evidence | Digital Technology for Education
      </footer>
    </div>
  );
}
