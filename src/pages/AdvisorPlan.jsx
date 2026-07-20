import Flow from '../components/Flow.jsx';
import { Card, Table } from '../components/Card.jsx';
import { advisors, riskStudents, students } from '../data/mockData.js';

export default function AdvisorPlan() {
  return (
    <div className="space-y-6">
      <Flow title="Flow อาจารย์ที่ปรึกษาและการวางแผนการเรียน" steps={['แต่งตั้งอาจารย์ที่ปรึกษา', 'นักศึกษาศึกษาโครงสร้างหลักสูตร', 'ปรึกษาอาจารย์ที่ปรึกษา', 'วางแผนรายวิชาที่จะลงทะเบียน', 'ตรวจสอบเงื่อนไขรายวิชาและหน่วยกิต', 'อาจารย์ให้ข้อเสนอแนะ', 'ติดตามความก้าวหน้ารายภาคเรียน']} />
      <Card title="Mock Data การให้คำปรึกษา">
        <Table columns={['นักศึกษา', 'ชั้นปี', 'สถานะ', 'ประเด็นที่ปรึกษา', 'ผลการติดตาม']} rows={advisors.map((a) => [a.student, a.year, a.status, a.issue, a.followUp])} />
      </Card>
      <Card title="ภาพรวมรายชื่อนักศึกษาที่ใช้วางแผนการเรียน">
        <Table
          columns={['รหัสนักศึกษา', 'ชื่อจำลอง', 'ชั้นปี', 'ปีการศึกษาเข้า', 'สถานะแผนการเรียน', 'อาจารย์ที่ปรึกษา']}
          rows={students.slice(0, 21).map((student) => [student.id, student.name, `ปี ${student.year}`, student.academicYear, student.studyPlanStatus, student.advisor])}
        />
      </Card>
      <Card title="นักศึกษาเสี่ยงที่ต้องติดตาม">
        <Table columns={['นักศึกษา', 'ชั้นปี', 'ความเสี่ยง', 'การช่วยเหลือ', 'สถานะ']} rows={riskStudents.map((s) => [s.student, s.year, s.risk, s.action, s.status])} />
      </Card>
    </div>
  );
}
