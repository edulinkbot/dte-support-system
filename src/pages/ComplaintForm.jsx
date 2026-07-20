import { Send } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/Card.jsx';
import { Input, Select, TextArea } from '../components/FormFields.jsx';

export default function ComplaintForm({ addRecord }) {
  const [anonymous, setAnonymous] = useState(true);
  const [form, setForm] = useState({ student: '', contact: '', topic: 'การจัดการเรียนการสอน', urgency: 'ปกติ', detail: '', confirmed: false });
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  return (
    <Card title="Confidential Complaint Form">
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); if (form.confirmed) addRecord({ type: 'ร้องเรียนลับ', topic: form.topic, student: anonymous ? 'ไม่เปิดเผยตัวตน' : form.student || 'นักศึกษาจำลอง' }); }}>
        <div className="grid gap-3 rounded-md bg-rose-50 p-4 sm:grid-cols-2">
          <label className="font-bold text-rose-900"><input type="radio" checked={!anonymous} onChange={() => setAnonymous(false)} /> เปิดเผยชื่อ</label>
          <label className="font-bold text-rose-900"><input type="radio" checked={anonymous} onChange={() => setAnonymous(true)} /> ไม่ประสงค์เปิดเผยชื่อ</label>
        </div>
        {!anonymous && <div className="grid gap-4 md:grid-cols-2"><Input label="ชื่อ-สกุล" value={form.student} onChange={(v) => set('student', v)} /><Input label="ช่องทางติดต่อกลับ" value={form.contact} onChange={(v) => set('contact', v)} /></div>}
        <div className="grid gap-4 md:grid-cols-2">
          <Select label="ประเภทข้อร้องเรียน" value={form.topic} onChange={(v) => set('topic', v)} options={['การจัดการเรียนการสอน', 'การวัดและประเมินผล', 'การสื่อสารข้อมูล', 'การให้คำปรึกษา', 'พฤติกรรมไม่เหมาะสม', 'อื่น ๆ']} />
          <Select label="ระดับความเร่งด่วน" value={form.urgency} onChange={(v) => set('urgency', v)} options={['ปกติ', 'เร่งด่วน', 'อ่อนไหว']} />
        </div>
        <TextArea label="รายละเอียดข้อร้องเรียน" value={form.detail} onChange={(v) => set('detail', v)} required />
        <label className="flex gap-2 text-sm"><input type="checkbox" checked={form.confirmed} onChange={(e) => set('confirmed', e.target.checked)} /> ยืนยันว่าข้อมูลเป็นความจริงตามที่ทราบ</label>
        <button disabled={!form.confirmed} className="inline-flex items-center gap-2 rounded-md bg-rose-700 px-5 py-3 font-bold text-white disabled:bg-slate-300"><Send size={18} /> ส่งเรื่อง</button>
      </form>
    </Card>
  );
}
