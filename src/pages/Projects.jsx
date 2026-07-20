import { useEffect, useMemo, useState } from 'react';
import { Badge, Card, StatCard, Table } from '../components/Card.jsx';

const storageKey = 'dte-project-records';

const starterProjects = [
  {
    id: 'PRJ-2569-001',
    title: 'โครงการเตรียมความพร้อมนักศึกษาเทคโนโลยีดิจิทัลเพื่อการศึกษา',
    year: '2569',
    owner: 'ผศ.ดร.รวยทรัพย์ เดชชัยศรี',
    audience: 'นักศึกษาสาขาวิชาเทคโนโลยีดิจิทัลเพื่อการศึกษา',
    budget: '15,000',
    status: 'วางแผน',
    aun: 'C1, C2, C6',
    objective: 'พัฒนาความพร้อมด้านการเรียน การใช้เทคโนโลยี และการปรับตัวของนักศึกษา',
    evidenceUrl: '',
    files: ['ร่างกำหนดการ.pdf', 'แบบประเมินความต้องการ.xlsx'],
  },
  {
    id: 'PRJ-2568-002',
    title: 'กิจกรรมส่งเสริมการใช้สื่อดิจิทัลและ Roblox เพื่อการเรียนรู้',
    year: '2568',
    owner: 'ผศ.สุรเชษฐ์ มีฤทธิ์',
    audience: 'นักศึกษาและอาจารย์ผู้สอนรายวิชาเอก',
    budget: '8,000',
    status: 'สรุปผลแล้ว',
    aun: 'C3, C4, C6, C8',
    objective: 'ทดลองใช้แพลตฟอร์มดิจิทัลเพื่อออกแบบประสบการณ์การเรียนรู้',
    evidenceUrl: '',
    files: ['ภาพกิจกรรม.zip', 'รายงานสรุปผล.pdf', 'ผลประเมินความพึงพอใจ.xlsx'],
  },
  {
    id: 'PRJ-2567-003',
    title: 'โครงการพัฒนาทักษะผลิตสื่อและนวัตกรรมการศึกษา',
    year: '2567',
    owner: 'อาจารย์ประจำหลักสูตร',
    audience: 'นักศึกษาชั้นปีที่ 3-4',
    budget: '12,000',
    status: 'สรุปผลแล้ว',
    aun: 'C3, C5, C6',
    objective: 'สนับสนุนให้นักศึกษาผลิตสื่อดิจิทัลและเก็บผลงานเป็นหลักฐานสมรรถนะ',
    evidenceUrl: '',
    files: ['รายชื่อผู้เข้าร่วม.xlsx', 'ผลงานนักศึกษา.pdf'],
  },
];

const emptyForm = {
  title: '',
  year: '2569',
  owner: '',
  audience: '',
  budget: '',
  status: 'วางแผน',
  aun: 'C6',
  objective: '',
  evidenceUrl: '',
  files: [],
};

function loadProjects() {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : starterProjects;
  } catch {
    return starterProjects;
  }
}

export default function Projects() {
  const [projects, setProjects] = useState(loadProjects);
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState('ทั้งหมด');

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(projects));
  }, [projects]);

  const years = useMemo(() => ['ทั้งหมด', ...Array.from(new Set(projects.map((project) => project.year))).sort().reverse()], [projects]);
  const filteredProjects = filter === 'ทั้งหมด' ? projects : projects.filter((project) => project.year === filter);
  const completed = projects.filter((project) => project.status === 'สรุปผลแล้ว').length;
  const totalBudget = projects.reduce((sum, project) => sum + Number(String(project.budget).replace(/,/g, '') || 0), 0);

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleFiles = (event) => {
    updateForm('files', Array.from(event.target.files || []).map((file) => file.name));
  };

  const addProject = (event) => {
    event.preventDefault();
    const next = {
      ...form,
      id: `PRJ-${form.year}-${String(projects.length + 1).padStart(3, '0')}`,
      files: form.files.length ? form.files : ['ยังไม่มีไฟล์แนบ'],
    };
    setProjects((current) => [next, ...current]);
    setForm(emptyForm);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-normal text-brand-green">Project Evidence Center</p>
        <h2 className="mt-2 text-3xl font-bold text-brand-navy">ระบบอัปโหลดโครงการ/กิจกรรมสาขา</h2>
        <p className="mt-3 max-w-4xl leading-7 text-slate-700">
          ใช้บันทึกทะเบียนโครงการ ผู้รับผิดชอบ งบประมาณ สถานะ และหลักฐานประกอบ AUN-QA โดยแนบลิงก์ Google Drive
          สำหรับไฟล์จริง เช่น หนังสืออนุมัติ รูปกิจกรรม รายชื่อผู้เข้าร่วม แบบประเมิน และรายงานสรุปผล
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="จำนวนโครงการ" value={projects.length} detail="รวมทุกปีการศึกษา" />
        <StatCard label="สรุปผลแล้ว" value={completed} detail="พร้อมใช้เป็นหลักฐาน" tone="green" />
        <StatCard label="กำลังดำเนินการ" value={projects.length - completed} detail="ต้องติดตามหลักฐาน" tone="amber" />
        <StatCard label="งบประมาณรวม" value={totalBudget.toLocaleString('th-TH')} detail="บาท" tone="rose" />
      </section>

      <Card title="เพิ่มข้อมูลโครงการ">
        <form onSubmit={addProject} className="grid gap-4 lg:grid-cols-2">
          <label className="space-y-2 text-sm font-bold text-slate-700">
            <span>ชื่อโครงการ</span>
            <input required value={form.title} onChange={(event) => updateForm('title', event.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>
          <label className="space-y-2 text-sm font-bold text-slate-700">
            <span>ปีการศึกษา/ปีงบประมาณ</span>
            <input value={form.year} onChange={(event) => updateForm('year', event.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>
          <label className="space-y-2 text-sm font-bold text-slate-700">
            <span>ผู้รับผิดชอบ</span>
            <input value={form.owner} onChange={(event) => updateForm('owner', event.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>
          <label className="space-y-2 text-sm font-bold text-slate-700">
            <span>กลุ่มเป้าหมาย</span>
            <input value={form.audience} onChange={(event) => updateForm('audience', event.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>
          <label className="space-y-2 text-sm font-bold text-slate-700">
            <span>งบประมาณ</span>
            <input value={form.budget} onChange={(event) => updateForm('budget', event.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>
          <label className="space-y-2 text-sm font-bold text-slate-700">
            <span>สถานะ</span>
            <select value={form.status} onChange={(event) => updateForm('status', event.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2">
              <option>วางแผน</option>
              <option>ขออนุมัติ</option>
              <option>ดำเนินการ</option>
              <option>สรุปผลแล้ว</option>
            </select>
          </label>
          <label className="space-y-2 text-sm font-bold text-slate-700">
            <span>เชื่อม AUN-QA</span>
            <input value={form.aun} onChange={(event) => updateForm('aun', event.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>
          <label className="space-y-2 text-sm font-bold text-slate-700">
            <span>ลิงก์หลักฐาน Google Drive</span>
            <input type="url" value={form.evidenceUrl} onChange={(event) => updateForm('evidenceUrl', event.target.value)} placeholder="https://drive.google.com/..." className="w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>
          <label className="space-y-2 text-sm font-bold text-slate-700 lg:col-span-2">
            <span>วัตถุประสงค์/ผลลัพธ์ที่ต้องการ</span>
            <textarea value={form.objective} onChange={(event) => updateForm('objective', event.target.value)} rows="3" className="w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>
          <label className="space-y-2 text-sm font-bold text-slate-700 lg:col-span-2">
            <span>เลือกไฟล์หลักฐานในเครื่อง</span>
            <input type="file" multiple onChange={handleFiles} className="w-full rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 py-3" />
            <span className="block text-xs font-semibold text-slate-500">
              หมายเหตุ: GitHub Pages ยังไม่รับไฟล์ขึ้นเซิร์ฟเวอร์โดยตรง ระบบนี้จะเก็บชื่อไฟล์ไว้ และควรแนบลิงก์ Google Drive ของไฟล์จริง
            </span>
          </label>
          <div className="lg:col-span-2">
            <button type="submit" className="rounded-md bg-brand-blue px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-brand-navy">
              บันทึกโครงการ
            </button>
          </div>
        </form>
      </Card>

      <Card title="ทะเบียนโครงการ">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold">
            {years.map((year) => <option key={year}>{year}</option>)}
          </select>
          <Badge tone="green">ใช้เป็นหลักฐาน C6/C8 ได้</Badge>
        </div>
        <Table
          columns={['รหัส', 'ชื่อโครงการ', 'ปี', 'ผู้รับผิดชอบ', 'สถานะ', 'AUN-QA', 'หลักฐาน']}
          rows={filteredProjects.map((project) => [
            project.id,
            <div>
              <p className="font-bold text-brand-navy">{project.title}</p>
              <p className="mt-1 text-xs text-slate-500">{project.objective}</p>
              <p className="mt-2 text-xs text-slate-500">ไฟล์: {project.files.join(', ')}</p>
            </div>,
            project.year,
            project.owner || '-',
            <Badge tone={project.status === 'สรุปผลแล้ว' ? 'green' : project.status === 'ดำเนินการ' ? 'blue' : 'amber'}>{project.status}</Badge>,
            project.aun,
            project.evidenceUrl ? <a className="font-bold text-brand-blue underline" href={project.evidenceUrl} target="_blank" rel="noreferrer">เปิดหลักฐาน</a> : <span className="text-slate-400">รอแนบลิงก์</span>,
          ])}
        />
      </Card>
    </div>
  );
}
