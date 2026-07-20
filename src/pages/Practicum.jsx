import { Card, Badge, Table } from '../components/Card.jsx';

const practicum = [
  ['โรงเรียนเครือข่าย ก', 'นักศึกษา ก', 'เตรียมความพร้อม', 'จัดส่งเอกสารแล้ว'],
  ['โรงเรียนเครือข่าย ข', 'นักศึกษา ข', 'ฝึกปฏิบัติ', 'อาจารย์นิเทศติดตามแล้ว'],
  ['โรงเรียนเครือข่าย ค', 'นักศึกษา ค', 'สรุปผล', 'รอรายงานสะท้อนคิด'],
];

export default function Practicum() {
  return (
    <div className="space-y-6">
      <Card title="ฝึกประสบการณ์วิชาชีพครู">
        <p className="leading-7 text-slate-700">หน้าจอนี้จำลองการติดตามนักศึกษาฝึกประสบการณ์ แหล่งฝึก อาจารย์นิเทศ เอกสาร และผลการติดตามเพื่อใช้เป็นหลักฐาน C6/C8</p>
      </Card>
      <Card title="รายการติดตาม">
        <Table columns={['แหล่งฝึก', 'นักศึกษา', 'สถานะ', 'ผลการติดตาม']} rows={practicum.map((p) => [p[0], p[1], <Badge tone="blue">{p[2]}</Badge>, p[3]])} />
      </Card>
    </div>
  );
}
