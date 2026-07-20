import { Card, StatCard, Table } from '../components/Card.jsx';
import { advisors, aunCriteria, courses, feedback, qaRecords, requests, riskStudents, studentCohorts, students } from '../data/mockData.js';

export default function QADashboard({ records }) {
  const all = records || requests;
  const complaints = all.filter((r) => r.type === 'ร้องเรียนลับ').length;
  const closed = all.filter((r) => r.status === 'ปิดเรื่องแล้ว').length;
  const syllabus = courses.filter((c) => c.syllabus === 'พร้อมใช้งาน').length;
  const improvements = qaRecords.length + feedback.length;
  const criteriaReady = aunCriteria.filter((item) => item.status === 'พร้อมใช้' || item.status === 'พร้อมใช้บางส่วน').length;
  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="นักศึกษาทั้งหมด" value={students.length} detail="ทะเบียนปี 1-4 และรหัส 65/64/63/62" />
        <StatCard label="นักศึกษาปี 1 / 2569" value={studentCohorts[0].total} detail="รหัสขึ้นต้น 69" tone="green" />
        <StatCard label="คำร้องทั้งหมด" value={all.length} detail="รวมคำร้องและร้องเรียน" tone="amber" />
        <StatCard label="ร้องเรียนรักษาความลับ" value={complaints} detail="มีการปกปิดข้อมูลผู้ร้อง" tone="rose" />
        <StatCard label="นักศึกษาได้รับคำปรึกษา" value={advisors.length} detail="บันทึกการติดตามรายภาค" tone="green" />
        <StatCard label="นักศึกษาเสี่ยงที่ติดตาม" value={riskStudents.length} detail="มี action และสถานะ" tone="amber" />
        <StatCard label="รายวิชามี syllabus" value={syllabus} detail="พร้อมใช้ประกอบ C4" tone="blue" />
        <StatCard label="ข้อเสนอแนะ" value={feedback.length} detail="เชื่อม C6/C8" tone="green" />
        <StatCard label="ประเด็นปรับปรุง" value={improvements} detail="สำหรับ improvement record" tone="amber" />
        <StatCard label="ปิดเรื่องแล้ว" value={closed} detail="มี log และผลดำเนินการ" tone="rose" />
        <StatCard label="AUN-QA รองรับแล้ว" value={`${criteriaReady}/${aunCriteria.length}`} detail="ดูรายละเอียดที่ AUN-QA Guide" tone="blue" />
      </section>
      <Card title="กราฟง่าย: สถานะเรื่องในระบบ">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-3">
            {['รับเรื่องแล้ว', 'อยู่ระหว่างตรวจสอบ', 'ดำเนินการแล้ว', 'ปิดเรื่องแล้ว'].map((status) => {
              const count = all.filter((r) => r.status === status).length;
              return <div key={status}><div className="mb-1 flex justify-between text-sm font-bold"><span>{status}</span><span>{count}</span></div><div className="h-3 rounded-full bg-slate-100"><div className="h-3 rounded-full bg-brand-blue" style={{ width: `${Math.max(8, (count / all.length) * 100)}%` }} /></div></div>;
            })}
          </div>
          <div className="space-y-3">
            {studentCohorts.map((cohort) => (
              <div key={cohort.year}>
                <div className="mb-1 flex justify-between text-sm font-bold"><span>{cohort.label} รหัส {cohort.prefix}</span><span>{cohort.total}</span></div>
                <div className="h-3 rounded-full bg-slate-100"><div className="h-3 rounded-full bg-brand-green" style={{ width: `${Math.max(8, (cohort.total / students.length) * 100)}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Card title="Improvement Record">
        <Table columns={['AUN-QA', 'ประเด็น', 'หลักฐาน', 'การปรับปรุง']} rows={qaRecords.map((q) => [q.criterion, q.title, q.evidence, q.improvement])} />
      </Card>
      <Card title="ประเด็นที่พบซ้ำ">
        <div className="grid gap-3 md:grid-cols-3">
          {['ช่องทางนัดหมายอาจารย์ที่ปรึกษา', 'ความชัดเจนของเกณฑ์รายวิชา', 'การบำรุงรักษาอุปกรณ์ห้องปฏิบัติการ'].map((item) => <p key={item} className="rounded-md bg-slate-50 p-3 text-sm font-bold text-slate-700">{item}</p>)}
        </div>
      </Card>
    </div>
  );
}
