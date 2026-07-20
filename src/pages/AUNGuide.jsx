import { Badge, Card, Table } from '../components/Card.jsx';
import { aunCriteria, qaRecords } from '../data/mockData.js';

const statusTone = {
  'พร้อมใช้': 'green',
  'พร้อมใช้บางส่วน': 'amber',
  'กำลังพัฒนา': 'blue',
  'ควรเพิ่มหลักฐาน': 'rose',
  'ควรเพิ่มข้อมูลผลลัพธ์': 'rose',
};

export default function AUNGuide() {
  const readyCount = aunCriteria.filter((item) => item.status === 'พร้อมใช้' || item.status === 'พร้อมใช้บางส่วน').length;
  const urgentItems = aunCriteria.filter((item) => item.status.includes('ควรเพิ่ม'));

  return (
    <div className="space-y-6">
      <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-normal text-brand-green">AUN-QA Programme Level Version 4.0</p>
        <h2 className="mt-2 text-3xl font-bold text-brand-navy">ตัวช่วยวางระบบตามเกณฑ์ AUN-QA</h2>
        <p className="mt-3 max-w-4xl leading-7 text-slate-700">
          หน้านี้สรุปเกณฑ์หลัก 8 ด้านเป็นภาษาปฏิบัติการสำหรับสาขา เพื่อช่วยอาจารย์ตรวจว่าระบบ DTE Support System
          มีหลักฐานรองรับข้อใดแล้ว และควรพัฒนาส่วนใดเพิ่มก่อนใช้ประกอบงานประกันคุณภาพหลักสูตร
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <p className="text-sm font-bold text-slate-600">เกณฑ์ทั้งหมด</p>
          <p className="mt-2 text-3xl font-bold text-brand-navy">{aunCriteria.length}</p>
          <p className="mt-2 text-sm text-slate-600">C1-C8 ตาม AUN-QA v4.0</p>
        </Card>
        <Card>
          <p className="text-sm font-bold text-slate-600">รองรับแล้ว/บางส่วน</p>
          <p className="mt-2 text-3xl font-bold text-emerald-800">{readyCount}</p>
          <p className="mt-2 text-sm text-slate-600">มีหน้าระบบหรือข้อมูลหลักฐานตั้งต้น</p>
        </Card>
        <Card>
          <p className="text-sm font-bold text-slate-600">ควรเติมก่อนตรวจ</p>
          <p className="mt-2 text-3xl font-bold text-rose-800">{urgentItems.length}</p>
          <p className="mt-2 text-sm text-slate-600">เน้น rubric และ outcome dashboard</p>
        </Card>
        <Card>
          <p className="text-sm font-bold text-slate-600">Improvement Records</p>
          <p className="mt-2 text-3xl font-bold text-amber-800">{qaRecords.length}</p>
          <p className="mt-2 text-sm text-slate-600">ใช้เชื่อมระบบกับการปรับปรุงต่อเนื่อง</p>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {aunCriteria.map((criterion) => (
          <article key={criterion.code} className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-brand-blue">{criterion.code}</p>
                <h3 className="mt-1 text-xl font-bold text-brand-navy">{criterion.thai}</h3>
                <p className="text-sm font-semibold text-slate-500">{criterion.title}</p>
              </div>
              <Badge tone={statusTone[criterion.status] || 'blue'}>{criterion.status}</Badge>
            </div>
            <p className="mt-3 leading-7 text-slate-700">{criterion.focus}</p>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-bold text-slate-800">หลักฐานที่ควรมี</h4>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-700">
                  {criterion.evidence.map((item) => <li key={item}>- {item}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-800">ระบบช่วยได้อย่างไร</h4>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-700">
                  {criterion.systemHelp.map((item) => <li key={item}>- {item}</li>)}
                </ul>
              </div>
            </div>
            <p className="mt-4 rounded-md bg-slate-50 p-3 text-sm font-semibold leading-6 text-slate-700">
              ข้อเสนอแนะถัดไป: {criterion.nextAction}
            </p>
          </article>
        ))}
      </section>

      <Card title="ตารางสรุปสำหรับเตรียมหลักฐาน">
        <Table
          columns={['เกณฑ์', 'จุดเน้น', 'สถานะระบบ', 'สิ่งที่ควรทำต่อ']}
          rows={aunCriteria.map((criterion) => [
            `${criterion.code} ${criterion.thai}`,
            criterion.focus,
            <Badge tone={statusTone[criterion.status] || 'blue'}>{criterion.status}</Badge>,
            criterion.nextAction,
          ])}
        />
      </Card>
    </div>
  );
}
