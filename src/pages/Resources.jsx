import { Badge, Card, Table } from '../components/Card.jsx';
import { supportItems } from '../data/mockData.js';

export default function Resources() {
  return (
    <div className="space-y-6">
      <Card title="สิ่งสนับสนุนการเรียนรู้">
        <Table
          columns={['รายการ', 'ประเภท', 'สถานะ', 'หมายเหตุ / ช่องทางบริการ']}
          rows={supportItems.map((item) => [item.name, item.type, <Badge tone={item.status === 'พร้อมใช้งาน' ? 'green' : item.status === 'อยู่ระหว่างซ่อม' ? 'rose' : 'amber'}>{item.status}</Badge>, item.note])}
        />
      </Card>
      <Card title="ช่องทางขอใช้บริการหรือแจ้งปัญหา">
        <div className="grid gap-3 md:grid-cols-3">
          {['แจ้งเจ้าหน้าที่ห้องปฏิบัติการ', 'ส่งคำร้องผ่านระบบสนับสนุน', 'บันทึกปัญหาเพื่อใช้ปรับปรุง C7'].map((item) => <p key={item} className="rounded-md bg-brand-sky p-3 text-sm font-bold text-brand-navy">{item}</p>)}
        </div>
      </Card>
    </div>
  );
}
