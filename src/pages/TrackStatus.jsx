import { useState } from 'react';
import { Badge, Card, Table } from '../components/Card.jsx';

export default function TrackStatus({ records }) {
  const [query, setQuery] = useState(records[0]?.id || '');
  const found = records.find((record) => record.id.toLowerCase() === query.trim().toLowerCase());
  return (
    <div className="space-y-5">
      <Card title="ติดตามสถานะคำร้อง">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input className="min-h-12 flex-1 rounded-md border border-slate-300 px-4 font-mono" value={query} onChange={(e) => setQuery(e.target.value)} />
          <button className="rounded-md bg-brand-blue px-5 py-3 font-bold text-white">ค้นหา</button>
        </div>
      </Card>
      {found ? (
        <Card title={`ผลการติดตาม ${found.id}`}>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-3 text-sm leading-6">
              <p><strong>ประเภท:</strong> {found.type}</p>
              <p><strong>ประเด็น:</strong> {found.topic}</p>
              <p><strong>ผู้ร้อง:</strong> {found.student === 'ไม่เปิดเผยตัวตน' ? 'ปกปิดข้อมูลผู้ร้อง' : found.student}</p>
              <p><strong>สถานะ:</strong> <Badge tone={found.status === 'ปิดเรื่องแล้ว' ? 'green' : 'amber'}>{found.status}</Badge></p>
            </div>
            <Table columns={['ลำดับ', 'Log การดำเนินการ']} rows={found.log.map((log, index) => [index + 1, log])} />
          </div>
        </Card>
      ) : <Card><p className="text-amber-800">ไม่พบรหัสในข้อมูลจำลอง</p></Card>}
    </div>
  );
}
