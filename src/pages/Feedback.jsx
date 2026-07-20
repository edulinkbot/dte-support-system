import { useState } from 'react';
import { Card, Table } from '../components/Card.jsx';
import { Input, Select, TextArea } from '../components/FormFields.jsx';
import { feedback } from '../data/mockData.js';

export default function Feedback() {
  const [items, setItems] = useState(feedback);
  const [form, setForm] = useState({ type: 'รายวิชา', target: '', score: '4', issue: '', contact: 'ไม่ต้องการ' });
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event) => {
    event.preventDefault();
    setItems((current) => [{ id: `FB-${String(current.length + 1).padStart(3, '0')}`, ...form, linked: 'C6, C8' }, ...current]);
  };

  return (
    <div className="space-y-6">
      <Card title="Feedback and Evaluation">
        <form className="space-y-4" onSubmit={submit}>
          <div className="grid gap-4 md:grid-cols-2">
            <Select label="ประเภทข้อเสนอแนะ" value={form.type} onChange={(v) => set('type', v)} options={['รายวิชา', 'กิจกรรม', 'บริการนักศึกษา', 'สิ่งสนับสนุน', 'อื่น ๆ']} />
            <Input label="รายวิชา/กิจกรรมที่เกี่ยวข้อง" value={form.target} onChange={(v) => set('target', v)} required />
            <Select label="ระดับความพึงพอใจ" value={form.score} onChange={(v) => set('score', v)} options={['1', '2', '3', '4', '5']} />
            <Select label="ต้องการให้ติดต่อกลับหรือไม่" value={form.contact} onChange={(v) => set('contact', v)} options={['ไม่ต้องการ', 'ต้องการ']} />
          </div>
          <TextArea label="ข้อเสนอแนะ" value={form.issue} onChange={(v) => set('issue', v)} required />
          <button className="rounded-md bg-brand-blue px-5 py-3 font-bold text-white">ส่งแบบประเมิน</button>
        </form>
      </Card>
      <Card title="รายการข้อเสนอแนะที่เชื่อมกับ AUN-QA">
        <Table columns={['รหัส', 'ประเภท', 'เป้าหมาย', 'คะแนน', 'ข้อเสนอแนะ', 'AUN-QA']} rows={items.map((f) => [f.id, f.type, f.target, f.score, f.issue, f.linked])} />
      </Card>
    </div>
  );
}
