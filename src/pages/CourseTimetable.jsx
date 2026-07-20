import { useMemo, useState } from 'react';
import { Card, Badge, Table } from '../components/Card.jsx';
import { courses, teachingLoads } from '../data/mockData.js';

export default function CourseTimetable() {
  const [year, setYear] = useState('ทั้งหมด');
  const [term, setTerm] = useState('ทั้งหมด');
  const [category, setCategory] = useState('ทั้งหมด');
  const years = ['ทั้งหมด', ...new Set(courses.map((course) => course.year))];
  const terms = ['ทั้งหมด', ...new Set(courses.map((course) => course.term))];
  const categories = ['ทั้งหมด', ...new Set(courses.map((course) => course.category))];
  const filtered = useMemo(() => courses.filter((course) =>
    (year === 'ทั้งหมด' || course.year === year) &&
    (term === 'ทั้งหมด' || course.term === term) &&
    (category === 'ทั้งหมด' || course.category === category)
  ), [category, year, term]);

  return (
    <div className="space-y-6">
      <Card title="Course and Timetable">
        <p className="mb-4 text-sm leading-6 text-slate-600">
          ข้อมูลจากไฟล์ ตารางสอน 1-69.xls: ตารางสอนภาคปกติ ภาคเรียนที่ 1 ปีการศึกษา 2569
        </p>
        <div className="mb-4 flex flex-wrap gap-3">
          <select className="rounded-md border border-slate-300 px-3 py-2" value={year} onChange={(e) => setYear(e.target.value)}>
            {years.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select className="rounded-md border border-slate-300 px-3 py-2" value={term} onChange={(e) => setTerm(e.target.value)}>
            {terms.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select className="rounded-md border border-slate-300 px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <Table
          columns={['รหัสวิชา', 'ชื่อวิชา', 'หน่วยกิต', 'ชั้นปี', 'หมู่', 'ผู้สอน', 'ห้อง', 'วันเวลา', 'นิสิต', 'ประเภท', 'มคอ.3 / syllabus', 'CLO/PLO mapping']}
          rows={filtered.map((c) => [
            <span className="font-mono font-bold text-brand-blue">{c.code}</span>,
            c.name,
            c.credits,
            c.year,
            c.section || '-',
            c.teacher,
            c.room || '-',
            c.time,
            c.students || '-',
            c.category,
            <Badge tone={c.syllabus === 'พร้อมใช้งาน' ? 'green' : c.syllabus === 'รอตรวจทาน' ? 'amber' : 'rose'}>{c.syllabus}</Badge>,
            c.mapping,
          ])}
        />
      </Card>

      <Card title="สรุปภาระงานผู้สอนจากไฟล์ตารางสอน">
        <Table
          columns={['ผู้สอน', 'จำนวนวิชาเอก', 'จำนวนวิชานวัตกรรม', 'รวม']}
          rows={teachingLoads.map((load) => [load.teacher, load.majorCourses, load.innovationCourses, load.total])}
        />
      </Card>
    </div>
  );
}
