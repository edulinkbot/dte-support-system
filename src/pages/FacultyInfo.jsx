import { Badge, Card, Table } from '../components/Card.jsx';
import { curriculumVersions, facultyMembers } from '../data/mockData.js';

export default function FacultyInfo() {
  const sortedFaculty = [...facultyMembers].sort((a, b) => Number(b.chair) - Number(a.chair));

  return (
    <div className="space-y-6">
      <section className="faculty-hero rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-bold uppercase tracking-normal text-brand-green">Faculty Profiles from TQF2</p>
          <h2 className="mt-2 text-3xl font-bold text-brand-navy">ข้อมูลอาจารย์ประจำหลักสูตร</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">
            อ้างอิงรายชื่อและคุณวุฒิจากเล่ม มคอ.2/หลักสูตรในโฟลเดอร์ DTE67 พร้อมรูปภาพโปรไฟล์ประกอบ
            และสรุปรายวิชาที่เกี่ยวข้องในหลักสูตรปรับปรุง พ.ศ. 2567 และ พ.ศ. 2562
          </p>
        </div>
        <div className="faculty-stack" aria-hidden="true">
          {sortedFaculty.slice(0, 4).map((teacher) => (
            <img key={teacher.id} src={teacher.image} alt="" />
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {curriculumVersions.map((version) => (
          <Card key={version.year} title={`หลักสูตรปรับปรุง พ.ศ. ${version.year}`}>
            <p className="font-bold text-brand-navy">{version.name}</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{version.focus}</p>
            <p className="mt-2 text-xs font-bold text-slate-500">{version.source}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {version.highlights.map((item) => <Badge key={item} tone="blue">{item}</Badge>)}
            </div>
          </Card>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {sortedFaculty.map((teacher) => (
          <article key={teacher.id} className={`faculty-card rounded-md border bg-white p-5 shadow-sm ${teacher.chair ? 'border-amber-200 ring-2 ring-amber-100' : 'border-slate-200'}`}>
            <div className="flex gap-4">
              <img className="faculty-photo" src={teacher.image} alt={teacher.name} />
              <div className="min-w-0">
                {teacher.chair && <Badge tone="amber">ประธานหลักสูตร</Badge>}
                <h3 className="text-xl font-bold text-brand-navy">{teacher.name}</h3>
                <p className="mt-1 text-sm font-semibold text-brand-green">{teacher.position}</p>
                <p className="mt-1 text-sm text-slate-600">{teacher.role}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {teacher.expertise.map((item) => <Badge key={item} tone="green">{item}</Badge>)}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-bold text-slate-800">คุณวุฒิ</h4>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-700">
                  {teacher.qualifications.map((item) => <li key={item}>- {item}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-800">รายวิชาที่เกี่ยวข้อง</h4>
                <div className="mt-2 space-y-3 text-sm leading-6 text-slate-700">
                  <p><strong>2567:</strong> {teacher.curriculum2567.join(', ')}</p>
                  <p><strong>2562:</strong> {teacher.curriculum2562.join(', ')}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <Card title="ตารางสรุปอาจารย์และหลักสูตรที่เกี่ยวข้อง">
        <Table
          columns={['อาจารย์', 'บทบาท', 'ตำแหน่ง', 'หลักสูตร 2567', 'หลักสูตร 2562']}
          rows={sortedFaculty.map((teacher) => [
            teacher.name,
            teacher.role,
            teacher.position,
            teacher.curriculum2567.slice(0, 2).join(', '),
            teacher.curriculum2562.slice(0, 2).join(', '),
          ])}
        />
      </Card>
    </div>
  );
}
