import { useMemo, useState } from 'react';
import { Badge, Card, StatCard, Table } from '../components/Card.jsx';
import { studentCohortStats, studentCohorts, students } from '../data/mockData.js';

const statusTone = {
  ปกติ: 'green',
  เฝ้าระวัง: 'amber',
  ต้องติดตาม: 'rose',
  ได้รับคำปรึกษาแล้ว: 'blue',
};

const lifecycleTone = {
  คงอยู่: 'green',
  จบการศึกษา: 'blue',
  พ้นสภาพ: 'rose',
};

const allLabel = 'ทั้งหมด';

export default function StudentDirectory() {
  const [year, setYear] = useState(allLabel);
  const [keyword, setKeyword] = useState('');

  const filteredStudents = useMemo(() => {
    const normalized = keyword.trim().toLowerCase();
    return students.filter((student) => {
      const matchYear = year === allLabel || student.year === year;
      const matchKeyword =
        !normalized ||
        student.id.toLowerCase().includes(normalized) ||
        student.name.toLowerCase().includes(normalized) ||
        student.group.toLowerCase().includes(normalized);
      return matchYear && matchKeyword;
    });
  }, [keyword, year]);

  const totals = studentCohortStats.reduce((sum, cohort) => ({
    admitted: sum.admitted + cohort.admitted,
    inactive: sum.inactive + cohort.inactive,
    graduated: sum.graduated + cohort.graduated,
    current: sum.current + cohort.current,
  }), { admitted: 0, inactive: 0, graduated: 0, current: 0 });

  const maxTotal = Math.max(...studentCohortStats.map((cohort) => cohort.admitted));
  const followUpCount = students.filter((student) => student.supportStatus === 'ต้องติดตาม' || student.supportStatus === 'เฝ้าระวัง').length;

  return (
    <div className="space-y-6">
      <section className="student-hero rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-bold uppercase tracking-normal text-brand-green">Real Cohort Data from MIS</p>
          <h2 className="mt-2 text-3xl font-bold text-brand-navy">ทะเบียนนักศึกษาและสถานะตามรุ่นรหัส</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">
            ปรับจากข้อมูลจริงในระบบทะเบียนตามหมู่เรียนสาขาวิชาเทคโนโลยีดิจิทัลเพื่อการศึกษา ตั้งแต่รหัส 62-69
            โดยแยกยอดรับเข้า พ้นสภาพ จบการศึกษา และนักศึกษาคงอยู่ เพื่อใช้เป็นฐานข้อมูล cohort สำหรับงาน AUN-QA
          </p>
        </div>
        <div className="campus-visual" aria-hidden="true">
          <div className="visual-screen">
            <span />
            <span />
            <span />
          </div>
          <div className="visual-bars">
            {studentCohortStats.map((cohort) => (
              <i key={cohort.prefix} style={{ height: `${42 + (cohort.admitted / maxTotal) * 72}px` }} />
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="รับเข้ารวม" value={totals.admitted} detail="รหัส 62-69 จากข้อมูลทะเบียน" />
        <StatCard label="คงอยู่ปัจจุบัน" value={totals.current} detail="ยังมีสถานะปกติในระบบ" tone="green" />
        <StatCard label="จบการศึกษา" value={totals.graduated} detail="รุ่นที่มีผลสำเร็จการศึกษาแล้ว" tone="blue" />
        <StatCard label="พ้นสภาพ" value={totals.inactive} detail="ใช้ติดตาม retention/dropout" tone="rose" />
      </section>

      <Card title="สรุปข้อมูลจริงตามรุ่นรหัส">
        <Table
          columns={['รุ่นรหัส', 'หมู่เรียน', 'ปีที่รับเข้า', 'รับเข้า', 'พ้นสภาพ', 'จบการศึกษา', 'คงอยู่', 'อัตราจบ', 'อัตราพ้นสภาพ']}
          rows={studentCohortStats.map((cohort) => [
            cohort.label,
            cohort.group,
            cohort.academicYear,
            cohort.admitted,
            cohort.inactive,
            cohort.graduated,
            cohort.current,
            `${cohort.graduationRate}%`,
            `${cohort.inactiveRate}%`,
          ])}
        />
      </Card>

      <Card title="กราฟ cohort: รับเข้า / จบ / พ้นสภาพ / คงอยู่">
        <div className="space-y-4">
          {studentCohortStats.map((cohort) => (
            <div key={cohort.prefix} className="rounded-md border border-slate-200 p-3">
              <div className="mb-2 flex flex-wrap justify-between gap-2 text-sm font-bold text-slate-700">
                <span>{cohort.label} {cohort.group}</span>
                <span>รับเข้า {cohort.admitted} คน</span>
              </div>
              <div className="flex h-5 overflow-hidden rounded-full bg-slate-100">
                <div className="bg-brand-blue" style={{ width: `${(cohort.graduated / cohort.admitted) * 100}%` }} title="จบการศึกษา" />
                <div className="bg-rose-400" style={{ width: `${(cohort.inactive / cohort.admitted) * 100}%` }} title="พ้นสภาพ" />
                <div className="bg-brand-green" style={{ width: `${(cohort.current / cohort.admitted) * 100}%` }} title="คงอยู่" />
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold">
                <span className="rounded bg-blue-50 px-2 py-1 text-blue-800">จบ {cohort.graduated}</span>
                <span className="rounded bg-rose-50 px-2 py-1 text-rose-800">พ้นสภาพ {cohort.inactive}</span>
                <span className="rounded bg-emerald-50 px-2 py-1 text-emerald-800">คงอยู่ {cohort.current}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="รายการรายบุคคล" value={students.length} detail="สร้างจากยอดรับเข้าจริงเพื่อทดสอบระบบ" />
        <StatCard label="นักศึกษาปี 1 / 2569" value={studentCohorts[0].current} detail="รหัส 69 คงอยู่ 21 คน" tone="green" />
        <StatCard label="ต้องติดตาม/เฝ้าระวัง" value={followUpCount} detail="สำหรับงาน C6 และ C8" tone="amber" />
        <StatCard label="ชุดข้อมูล cohort" value={studentCohortStats.length} detail="รหัส 62-69" tone="rose" />
      </section>

      <Card title="บัญชีรายบุคคลสำหรับทดสอบระบบ">
        <p className="mb-4 rounded-md bg-amber-50 p-3 text-sm font-semibold leading-6 text-amber-900">
          หมายเหตุ: รายการนี้เป็นรหัสนิรนามที่สร้างจากยอดจริงระดับ cohort ยังไม่ใช่รายชื่อจริงรายบุคคลของนักศึกษา
          หากอ.มีไฟล์รายชื่อจริงครบ สามารถนำเข้าแทนชุดนี้ได้ภายหลัง
        </p>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <select className="rounded-md border border-slate-300 px-3 py-2" value={year} onChange={(event) => setYear(event.target.value)}>
            {[allLabel, ...studentCohorts.map((cohort) => cohort.year)].map((item) => (
              <option key={item} value={item}>{item === allLabel ? item : studentCohorts.find((cohort) => cohort.year === item)?.label || item}</option>
            ))}
          </select>
          <input
            className="min-h-11 flex-1 rounded-md border border-slate-300 px-3 py-2"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="ค้นหาด้วยรหัส หมู่เรียน หรือรหัสรุ่น เช่น 6921160001"
          />
        </div>
        <Table
          columns={['รหัสนักศึกษา', 'ชื่อในระบบทดสอบ', 'รุ่น/ชั้นปี', 'ปีรับเข้า', 'หมู่เรียน', 'สถานะทะเบียน', 'หน่วยกิต', 'GPA', 'สถานะดูแล', 'หมายเหตุ']}
          rows={filteredStudents.map((student) => [
            <span className="font-mono font-bold text-brand-blue">{student.id}</span>,
            student.name,
            student.displayYear,
            student.academicYear,
            student.group,
            <Badge tone={lifecycleTone[student.lifecycleStatus] || 'blue'}>{student.lifecycleStatus}</Badge>,
            `${student.creditsPassed}/${student.creditsPlan}`,
            student.gpa,
            <Badge tone={statusTone[student.supportStatus] || 'blue'}>{student.supportStatus}</Badge>,
            student.note,
          ])}
        />
      </Card>
    </div>
  );
}
