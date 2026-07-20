import { Card, Table } from '../components/Card.jsx';
import { curriculumVersions, facultyMembers, plos, programInfo, qaRecords } from '../data/mockData.js';

export default function ProgramInfo() {
  return (
    <div className="space-y-6">
      <Card title="Program Information">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-3 leading-7 text-slate-700">
            <p><strong>ชื่อหลักสูตร:</strong> {programInfo.name}</p>
            <p><strong>ชื่อปริญญา:</strong> {programInfo.degree}</p>
            <p><strong>จำนวนหน่วยกิต:</strong> {programInfo.credits}</p>
            <p><strong>ปรัชญา/จุดเด่น:</strong> {programInfo.philosophy}</p>
            <p><strong>ช่องทางติดต่อ:</strong> {programInfo.contact}</p>
          </div>
          <Table columns={['โครงสร้างหลักสูตร', 'จำนวนหน่วยกิต']} rows={programInfo.structure} />
        </div>
      </Card>
      <Card title="PLOs ของหลักสูตร 8 ข้อ">
        <div className="grid gap-3 md:grid-cols-2">
          {plos.map((plo, index) => <div key={plo} className="rounded-md bg-slate-50 p-3 text-sm leading-6"><strong>PLO{index + 1}</strong> {plo}</div>)}
        </div>
      </Card>
      <Card title="อาชีพหลังสำเร็จการศึกษา">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {programInfo.careers.map((career) => <p key={career} className="rounded-md bg-brand-mint p-3 text-sm font-bold text-emerald-900">{career}</p>)}
        </div>
      </Card>
      <Card title="ข้อมูลหลักสูตร 2567 และ 2562">
        <Table
          columns={['ปีหลักสูตร', 'ชื่อหลักสูตร', 'จุดเน้น', 'รายวิชา/ประเด็นเด่น']}
          rows={curriculumVersions.map((version) => [version.year, version.name, version.focus, version.highlights.join(', ')])}
        />
      </Card>
      <Card title="อาจารย์ประจำหลักสูตร">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facultyMembers.map((teacher) => (
            <div key={teacher.id} className="rounded-md border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center gap-3">
                <img className="h-14 w-14 rounded-md object-cover" src={teacher.image} alt={teacher.name} />
                <div>
                  <p className="font-bold text-brand-navy">{teacher.name}</p>
                  <p className="text-xs text-slate-600">{teacher.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="ความสัมพันธ์กับ AUN-QA">
        <Table columns={['Criterion', 'ประเด็น', 'หลักฐานในระบบ', 'แนวปรับปรุง']} rows={qaRecords.map((r) => [r.criterion, r.title, r.evidence, r.improvement])} />
      </Card>
    </div>
  );
}
