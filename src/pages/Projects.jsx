import { useEffect, useMemo, useState } from 'react';
import { Badge, Card, StatCard } from '../components/Card.jsx';
import { projectArchive } from '../data/projectData.js';
import { assetPath } from '../utils/assets.js';

const storageKey = 'dte-completed-project-uploads';

const emptyForm = {
  title: '',
  fiscalYear: '2569',
  budgetType: 'งบ บกศ.',
  owner: 'สาขาวิชาเทคโนโลยีดิจิทัลเพื่อการศึกษา',
  summary: '',
  approvedFile: '',
  orderFile: '',
  evidenceUrl: '',
  activityFiles: [],
  videoFiles: [],
  otherFiles: [],
};

function loadUploads() {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function fileNames(fileList) {
  return Array.from(fileList || []).map((file) => file.name);
}

function groupDocuments(project) {
  const groups = {
    'ไฟล์โครงการอนุมัติ': [],
    'คำสั่ง': [],
    'รายงานผล': [],
    'แบบประเมิน/ผลประเมิน': [],
    'เอกสารสำคัญอื่น ๆ': [],
  };
  for (const doc of project.documents || []) {
    const key = groups[doc.type] ? doc.type : 'เอกสารสำคัญอื่น ๆ';
    groups[key].push(doc.name);
  }
  return groups;
}

export default function Projects() {
  const [uploads, setUploads] = useState(loadUploads);
  const [form, setForm] = useState(emptyForm);
  const [budgetFilter, setBudgetFilter] = useState('ทั้งหมด');
  const [yearFilter, setYearFilter] = useState('ทั้งหมด');
  const [selectedId, setSelectedId] = useState(projectArchive[0]?.id || '');

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(uploads));
  }, [uploads]);

  const uploadedProjects = uploads.map((item, index) => ({
    id: `upload-${index + 1}`,
    title: item.title,
    fiscalYear: item.fiscalYear,
    budgetType: item.budgetType,
    status: 'ทำเสร็จแล้ว',
    owner: item.owner,
    summary: item.summary,
    images: [],
    documents: [
      item.approvedFile && { type: 'ไฟล์โครงการอนุมัติ', name: item.approvedFile },
      item.orderFile && { type: 'คำสั่ง', name: item.orderFile },
      ...item.activityFiles.map((name) => ({ type: 'ภาพกิจกรรมการทำงาน', name })),
      ...item.videoFiles.map((name) => ({ type: 'วีดิโอ', name })),
      ...item.otherFiles.map((name) => ({ type: 'เอกสารสำคัญอื่น ๆ', name })),
    ].filter(Boolean),
    videos: item.videoFiles,
    evidenceUrl: item.evidenceUrl,
    aun: 'C5, C6, C8',
    isLocalUpload: true,
  }));

  const allProjects = [...projectArchive, ...uploadedProjects];

  const years = useMemo(() => ['ทั้งหมด', ...Array.from(new Set(allProjects.map((project) => project.fiscalYear))).sort().reverse()], [allProjects]);
  const budgetTypes = ['ทั้งหมด', 'งบ บกศ.', 'งบแผ่นดิน'];
  const filteredProjects = allProjects.filter((project) => (
    (budgetFilter === 'ทั้งหมด' || project.budgetType === budgetFilter)
    && (yearFilter === 'ทั้งหมด' || project.fiscalYear === yearFilter)
  ));
  const selectedProject = allProjects.find((project) => project.id === selectedId) || filteredProjects[0] || allProjects[0];
  const summaryByBudget = budgetTypes.slice(1).map((budgetType) => ({
    budgetType,
    count: allProjects.filter((project) => project.budgetType === budgetType).length,
  }));

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const addProject = (event) => {
    event.preventDefault();
    setUploads((current) => [form, ...current]);
    setForm(emptyForm);
  };

  const docs = selectedProject ? groupDocuments(selectedProject) : {};

  return (
    <div className="space-y-6">
      <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-normal text-brand-green">Project Archive and Budget Evidence</p>
        <h2 className="mt-2 text-3xl font-bold text-brand-navy">ระบบอัปโหลดและสรุปโครงการประจำปีงบประมาณ</h2>
        <p className="mt-3 max-w-4xl leading-7 text-slate-700">
          จัดเก็บโครงการที่สาขาดำเนินการแล้ว แยกตามแหล่งงบประมาณและปีงบประมาณ พร้อมภาพกิจกรรมและรายการเอกสารสำคัญ
          เพื่อใช้สรุปงานย้อนหลังและเป็นหลักฐานประกอบการประกันคุณภาพ
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="โครงการทั้งหมด" value={allProjects.length} detail="รวมจากโฟลเดอร์ปีงบ 2569 และที่เพิ่มเอง" />
        <StatCard label="งบ บกศ." value={summaryByBudget[0].count} detail="โครงการจากงบรายได้/บกศ." tone="green" />
        <StatCard label="งบแผ่นดิน" value={summaryByBudget[1].count} detail="โครงการจากงบประมาณแผ่นดิน" tone="amber" />
        <StatCard label="ปีงบประมาณ" value={years.length - 1} detail="แยกดูย้อนหลังได้ตามปี" tone="rose" />
      </section>

      <Card title="ตัวกรองโครงการ">
        <div className="flex flex-wrap gap-3">
          <select value={budgetFilter} onChange={(event) => setBudgetFilter(event.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold">
            {budgetTypes.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={yearFilter} onChange={(event) => setYearFilter(event.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold">
            {years.map((item) => <option key={item}>{item}</option>)}
          </select>
          <Badge tone="green">เอกสารหลักฐาน: โครงการอนุมัติ / คำสั่ง / ภาพ / วีดิโอ / เอกสารอื่น ๆ</Badge>
        </div>
      </Card>

      <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <Card title="รายการโครงการ">
          <div className="space-y-3">
            {filteredProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setSelectedId(project.id)}
                className={`w-full rounded-md border p-4 text-left transition ${
                  selectedProject?.id === project.id ? 'border-brand-blue bg-blue-50' : 'border-slate-200 bg-white hover:border-brand-blue'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold text-brand-navy">{project.title}</p>
                  <Badge tone={project.budgetType === 'งบ บกศ.' ? 'green' : 'amber'}>{project.budgetType}</Badge>
                </div>
                <p className="mt-2 text-sm text-slate-600">ปีงบประมาณ {project.fiscalYear} | {project.status}</p>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{project.summary}</p>
              </button>
            ))}
            {!filteredProjects.length && <p className="rounded-md bg-slate-50 p-4 text-sm text-slate-500">ยังไม่พบโครงการตามตัวกรองนี้</p>}
          </div>
        </Card>

        {selectedProject && (
          <Card title={selectedProject.title}>
            <div className="flex flex-wrap gap-2">
              <Badge tone={selectedProject.budgetType === 'งบ บกศ.' ? 'green' : 'amber'}>{selectedProject.budgetType}</Badge>
              <Badge>ปีงบประมาณ {selectedProject.fiscalYear}</Badge>
              <Badge tone="rose">{selectedProject.status}</Badge>
              <Badge tone="blue">{selectedProject.aun}</Badge>
            </div>

            <p className="mt-4 leading-7 text-slate-700">{selectedProject.summary}</p>
            <p className="mt-2 text-sm font-semibold text-slate-600">ผู้รับผิดชอบ: {selectedProject.owner}</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-5">
              {(selectedProject.images || []).slice(0, 5).map((image, index) => (
                <a key={image} href={assetPath(image)} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                  <img className="h-32 w-full object-cover" src={assetPath(image)} alt={`ภาพกิจกรรม ${index + 1}`} />
                </a>
              ))}
              {!(selectedProject.images || []).length && (
                <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500 sm:col-span-5">
                  โครงการที่เพิ่มจากฟอร์มจะแสดงชื่อไฟล์ภาพไว้ในรายการเอกสาร หากต้องการให้ภาพขึ้นบนเว็บจริงให้วางไฟล์ไว้ในโฟลเดอร์ public/projects แล้วให้จาวิชจัด path ให้
                </div>
              )}
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {Object.entries(docs).map(([type, items]) => (
                <div key={type} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                  <p className="font-bold text-brand-navy">{type}</p>
                  {items.length ? (
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                      {items.slice(0, 8).map((item) => <li key={item}>• {item}</li>)}
                      {items.length > 8 && <li className="font-bold text-slate-500">และอีก {items.length - 8} ไฟล์</li>}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm text-slate-400">ยังไม่พบไฟล์ประเภทนี้</p>
                  )}
                </div>
              ))}
              <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <p className="font-bold text-brand-navy">วีดิโอ</p>
                {(selectedProject.videos || []).length ? (
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                    {selectedProject.videos.map((item) => <li key={item}>• {item}</li>)}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-slate-400">ไม่มีวีดิโอในโฟลเดอร์นี้</p>
                )}
              </div>
              {selectedProject.evidenceUrl && (
                <a className="rounded-md border border-blue-200 bg-blue-50 p-4 font-bold text-brand-blue underline" href={selectedProject.evidenceUrl} target="_blank" rel="noreferrer">
                  เปิดโฟลเดอร์หลักฐาน Google Drive
                </a>
              )}
            </div>
          </Card>
        )}
      </section>

      <Card title="อัปโหลดข้อมูลโครงการที่ทำเสร็จแล้ว">
        <form onSubmit={addProject} className="grid gap-4 lg:grid-cols-2">
          <label className="space-y-2 text-sm font-bold text-slate-700">
            <span>ชื่อโครงการ</span>
            <input required value={form.title} onChange={(event) => updateForm('title', event.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>
          <label className="space-y-2 text-sm font-bold text-slate-700">
            <span>ปีงบประมาณ</span>
            <input value={form.fiscalYear} onChange={(event) => updateForm('fiscalYear', event.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>
          <label className="space-y-2 text-sm font-bold text-slate-700">
            <span>แหล่งงบประมาณ</span>
            <select value={form.budgetType} onChange={(event) => updateForm('budgetType', event.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2">
              <option>งบ บกศ.</option>
              <option>งบแผ่นดิน</option>
            </select>
          </label>
          <label className="space-y-2 text-sm font-bold text-slate-700">
            <span>ผู้รับผิดชอบ</span>
            <input value={form.owner} onChange={(event) => updateForm('owner', event.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>
          <label className="space-y-2 text-sm font-bold text-slate-700 lg:col-span-2">
            <span>รายละเอียดโครงการอย่างย่อ</span>
            <textarea required value={form.summary} onChange={(event) => updateForm('summary', event.target.value)} rows="3" className="w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>
          <label className="space-y-2 text-sm font-bold text-slate-700">
            <span>ไฟล์โครงการอนุมัติ</span>
            <input type="file" onChange={(event) => updateForm('approvedFile', event.target.files?.[0]?.name || '')} className="w-full rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 py-3" />
          </label>
          <label className="space-y-2 text-sm font-bold text-slate-700">
            <span>คำสั่ง</span>
            <input type="file" onChange={(event) => updateForm('orderFile', event.target.files?.[0]?.name || '')} className="w-full rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 py-3" />
          </label>
          <label className="space-y-2 text-sm font-bold text-slate-700">
            <span>ภาพกิจกรรมการทำงาน</span>
            <input type="file" multiple accept="image/*" onChange={(event) => updateForm('activityFiles', fileNames(event.target.files))} className="w-full rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 py-3" />
          </label>
          <label className="space-y-2 text-sm font-bold text-slate-700">
            <span>วีดิโอ (ถ้ามี)</span>
            <input type="file" multiple accept="video/*" onChange={(event) => updateForm('videoFiles', fileNames(event.target.files))} className="w-full rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 py-3" />
          </label>
          <label className="space-y-2 text-sm font-bold text-slate-700">
            <span>เอกสารสำคัญอื่น ๆ</span>
            <input type="file" multiple onChange={(event) => updateForm('otherFiles', fileNames(event.target.files))} className="w-full rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 py-3" />
          </label>
          <label className="space-y-2 text-sm font-bold text-slate-700">
            <span>ลิงก์โฟลเดอร์หลักฐาน Google Drive</span>
            <input type="url" value={form.evidenceUrl} onChange={(event) => updateForm('evidenceUrl', event.target.value)} placeholder="https://drive.google.com/..." className="w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>
          <div className="lg:col-span-2">
            <p className="mb-3 rounded-md bg-amber-50 p-3 text-sm font-semibold text-amber-900">
              ระบบบน GitHub Pages จะบันทึกข้อมูลที่กรอกไว้ใน browser เครื่องนี้ หากต้องการให้หลายคนอัปโหลดไฟล์จริงร่วมกัน ควรใช้ Google Form/Drive เป็นตัวรับไฟล์ แล้วนำลิงก์มาแสดงในเว็บ
            </p>
            <button type="submit" className="rounded-md bg-brand-blue px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-brand-navy">
              บันทึกโครงการที่ทำเสร็จแล้ว
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
