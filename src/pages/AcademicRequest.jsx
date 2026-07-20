import { Send } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/Card.jsx';
import { Input, Select, TextArea } from '../components/FormFields.jsx';

export default function AcademicRequest({ addRecord }) {
  const [form, setForm] = useState({ student: '', sid: '', year: '', contact: '', topic: 'เพิ่ม-ถอนรายวิชา', course: '', detail: '', confirmed: false });
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  return (
    <Card title="Academic Request Form">
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); if (form.confirmed) addRecord({ type: 'คำร้องทั่วไป', topic: form.topic, student: form.student || 'นักศึกษาจำลอง' }); }}>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="ชื่อ-สกุล" value={form.student} onChange={(v) => set('student', v)} required />
          <Input label="รหัสนักศึกษา" value={form.sid} onChange={(v) => set('sid', v)} required />
          <Input label="ชั้นปี" value={form.year} onChange={(v) => set('year', v)} required />
          <Input label="อีเมลหรือเบอร์โทร" value={form.contact} onChange={(v) => set('contact', v)} required />
          <Select label="ประเภทคำร้อง" value={form.topic} onChange={(v) => set('topic', v)} options={['เพิ่ม-ถอนรายวิชา', 'พักการเรียน', 'ขอสอบกรณีพิเศษ', 'ขอเอกสารทางการศึกษา', 'ขอสำเร็จการศึกษา', 'อื่น ๆ']} />
          <Input label="รายวิชาที่เกี่ยวข้อง" value={form.course} onChange={(v) => set('course', v)} />
        </div>
        <TextArea label="รายละเอียดคำร้อง" value={form.detail} onChange={(v) => set('detail', v)} required />
        <label className="flex gap-2 text-sm"><input type="checkbox" checked={form.confirmed} onChange={(e) => set('confirmed', e.target.checked)} /> ยืนยันว่าข้อมูลถูกต้อง</label>
        <button disabled={!form.confirmed} className="inline-flex items-center gap-2 rounded-md bg-brand-blue px-5 py-3 font-bold text-white disabled:bg-slate-300"><Send size={18} /> ส่งคำร้อง</button>
      </form>
    </Card>
  );
}
