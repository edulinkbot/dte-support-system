import { navItems } from '../components/Nav.jsx';
import { Card, StatCard } from '../components/Card.jsx';
import { advisors, courses, facultyMembers, feedback, riskStudents, studentCohorts, students } from '../data/mockData.js';

export default function Home({ onNavigate }) {
  const chairman = facultyMembers.find((teacher) => teacher.chair);

  return (
    <div className="space-y-6">
      <section className="home-hero rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-bold uppercase tracking-normal text-brand-green">Student Support and AUN-QA Evidence Center</p>
          <h2 className="mt-3 text-3xl font-bold text-brand-navy sm:text-4xl">DTE Support System</h2>
          <p className="mt-2 text-xl font-semibold text-slate-800">ระบบสนับสนุนบริการนักศึกษาและงานประกันคุณภาพหลักสูตร</p>
          <p className="mt-4 leading-8 text-slate-700">
            ระบบนี้จัดทำขึ้นเพื่อเป็นศูนย์กลางข้อมูล บริการนักศึกษา การให้คำปรึกษา การรับคำร้องทางวิชาการ
            ข้อร้องเรียนแบบรักษาความลับ และการติดตามข้อมูลเพื่อการปรับปรุงหลักสูตรตามแนวทาง AUN-QA
          </p>
          <button
            type="button"
            onClick={() => onNavigate('students')}
            className="mt-5 rounded-md bg-brand-blue px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-brand-navy"
          >
            เปิดทะเบียนนักศึกษา 2569
          </button>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => onNavigate('track')} className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-brand-navy hover:border-brand-blue">ติดตามคำร้อง</button>
            <button type="button" onClick={() => onNavigate('advisor')} className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-brand-navy hover:border-brand-blue">อาจารย์ที่ปรึกษา</button>
            <button type="button" onClick={() => onNavigate('qa')} className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-brand-navy hover:border-brand-blue">QA Dashboard</button>
          </div>
        </div>
        <div className="hero-dashboard" aria-hidden="true">
          <div className="hero-brand">
            <img src="/logoDTE.jpg" alt="" />
            <div>
              <span>Digital Technology for Education</span>
              <strong>DTE</strong>
            </div>
          </div>
          <div className="hero-card wide">
            <span>Student Cohorts</span>
            <strong>{students.length}</strong>
          </div>
          {studentCohorts.map((cohort) => (
            <div key={cohort.year} className="hero-card">
              <span>{cohort.label}</span>
              <strong>{cohort.total}</strong>
              <small>รหัส {cohort.prefix}</small>
            </div>
          ))}
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="นักศึกษาทั้งหมด" value={students.length} detail="รวมรหัส 69/68/67/66/65/64/63/62" />
        <StatCard label="นักศึกษาปี 1" value={studentCohorts[0].total} detail="ประจำปีการศึกษา 2569" tone="green" />
        <StatCard label="ประธานหลักสูตร" value="1" detail={chairman?.name || 'ผศ.ดร.รวยทรัพย์ เดชชัยศรี'} tone="amber" />
        <StatCard label="ข้อเสนอแนะ" value={feedback.length} detail="เชื่อม C6/C7/C8" tone="rose" />
      </section>
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {navItems.slice(1).map(([id, label, Icon]) => (
          <button key={id} type="button" onClick={() => onNavigate(id)} className="rounded-md border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-brand-blue hover:shadow-md">
            <Icon className="text-brand-blue" size={22} />
            <p className="mt-3 font-bold text-brand-navy">{label}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">เปิดดูข้อมูลและหลักฐานเชิงระบบสำหรับงานสาขาและ AUN-QA</p>
          </button>
        ))}
      </section>
      <Card title="สัญญาณที่ต้องติดตาม">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-3">
            {riskStudents.map((item) => <p key={item.student} className="rounded-md bg-amber-50 p-3 text-sm text-amber-900">{item.student}: {item.risk}</p>)}
          </div>
          <div className="space-y-3">
            {studentCohorts.map((cohort) => (
              <div key={cohort.year}>
                <div className="mb-1 flex justify-between text-sm font-bold text-slate-700">
                  <span>{cohort.label} / รหัส {cohort.prefix}</span>
                  <span>{cohort.total} คน</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div className="h-3 rounded-full bg-brand-blue" style={{ width: `${Math.max(12, (cohort.total / studentCohorts[0].total) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
