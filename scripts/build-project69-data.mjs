import fs from 'node:fs';
import path from 'node:path';

const root = 'D:\\codex\\DTE67\\งานสาขาเทคโนฯ งบ 69';
const outputRoot = 'D:\\codex\\DTE67\\dtesupport\\public\\projects';
const dataFile = 'D:\\codex\\DTE67\\dtesupport\\src\\data\\projectData.js';

const sources = [
  {
    budgetType: 'งบ บกศ.',
    fiscalYear: '2569',
    base: path.join(root, 'งานโครงการและกิจกรรมเข้าร่วมต่างๆ69', 'โครงการสาขาประเมินรอบ1-69'),
    folders: [
      '1นวัตกรรมมีรายได้ของสาขา',
      'โครงการกระบี่',
      'โครงการบริการวิชาการสาขารร.เผดิม',
      'โครงการปาล์มวิทยากรบ่มเพาะเตรียมความพร้อม110269',
      'โครงการสัมมนาการพัฒนาสมรรถนะการจัดการเรียนรู้',
    ],
  },
  {
    budgetType: 'งบ บกศ.',
    fiscalYear: '2569',
    base: path.join(root, 'งานโครงการและกิจกรรมเข้าร่วมต่างๆ69', 'โครงการสาขาประเมินรอบ2-69'),
    folders: ['โครงการปฐมนิเทศและเตรียมความพร้อมสาขา'],
  },
  {
    budgetType: 'งบแผ่นดิน',
    fiscalYear: '2569',
    base: path.join(root, 'แผนและงวดสาขา69', 'โครงการ69'),
    folders: ['โครงการ69มด', 'โครงการกระบี่69', 'โครงการสัมมนาเจ๊ก69'],
  },
];

const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const docExts = new Set(['.pdf', '.doc', '.docx', '.xls', '.xlsx']);
const videoExts = new Set(['.mp4', '.mov', '.avi', '.mkv', '.wmv']);

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function cleanTitle(name) {
  return name
    .replace(/^\d+/, '')
    .replace(/69$/, '')
    .replace(/110269$/, '')
    .trim();
}

function projectSummary(title, budgetType) {
  if (title.includes('ปฐมนิเทศ')) return 'เตรียมความพร้อมนักศึกษาใหม่ด้านการเรียน การใช้ชีวิตในมหาวิทยาลัย และระบบสนับสนุนของสาขา';
  if (title.includes('สัมมนา')) return 'พัฒนาสมรรถนะการจัดการเรียนรู้และแลกเปลี่ยนแนวปฏิบัติด้านเทคโนโลยีดิจิทัลเพื่อการศึกษา';
  if (title.includes('บริการวิชาการ')) return 'จัดบริการวิชาการแก่โรงเรียนและชุมชน โดยใช้ความเชี่ยวชาญของสาขาเป็นฐาน';
  if (title.includes('นวัตกรรม')) return 'ส่งเสริมการสร้างนวัตกรรมและบริการวิชาการที่ต่อยอดเป็นรายได้ของสาขา';
  if (title.includes('กระบี่')) return 'ดำเนินกิจกรรมพัฒนานักศึกษาและเครือข่ายวิชาการภายนอกพื้นที่มหาวิทยาลัย';
  if (title.includes('ปาล์ม')) return 'บ่มเพาะและเตรียมความพร้อมนักศึกษาผ่านกิจกรรมวิชาการและทักษะดิจิทัล';
  return `โครงการภายใต้${budgetType} เพื่อสนับสนุนพันธกิจสาขาและใช้เป็นหลักฐานการดำเนินงานประจำปี`;
}

function classifyDocument(fileName) {
  const name = fileName.toLowerCase();
  if (name.includes('คำสั่ง')) return 'คำสั่ง';
  if (name.includes('โครงการ')) return 'ไฟล์โครงการอนุมัติ';
  if (name.includes('รายงาน')) return 'รายงานผล';
  if (name.includes('ประเมิน')) return 'แบบประเมิน/ผลประเมิน';
  return 'เอกสารสำคัญอื่น ๆ';
}

function copyAsset(source, targetDir, prefix, index) {
  const ext = path.extname(source).toLowerCase();
  const fileName = `${prefix}-${String(index + 1).padStart(2, '0')}${ext}`;
  const target = path.join(targetDir, fileName);
  fs.copyFileSync(source, target);
  return fileName;
}

ensureDir(outputRoot);

const projects = [];

for (const group of sources) {
  for (const folder of group.folders) {
    const sourceDir = path.join(group.base, folder);
    const files = walk(sourceDir);
    const id = `prj-${projects.length + 1}`;
    const publicDir = path.join(outputRoot, id);
    ensureDir(publicDir);

    const images = files
      .filter((file) => imageExts.has(path.extname(file).toLowerCase()))
      .slice(0, 5)
      .map((file, index) => `/projects/${id}/${copyAsset(file, publicDir, 'photo', index)}`);

    const documents = files
      .filter((file) => docExts.has(path.extname(file).toLowerCase()))
      .map((file) => ({
        name: path.basename(file),
        type: classifyDocument(path.basename(file)),
      }));

    const videos = files
      .filter((file) => videoExts.has(path.extname(file).toLowerCase()))
      .map((file) => path.basename(file));

    const title = cleanTitle(folder);
    projects.push({
      id,
      title,
      fiscalYear: group.fiscalYear,
      budgetType: group.budgetType,
      status: 'ทำเสร็จแล้ว',
      owner: 'สาขาวิชาเทคโนโลยีดิจิทัลเพื่อการศึกษา',
      summary: projectSummary(title, group.budgetType),
      images,
      documents,
      videos,
      sourceFolder: sourceDir,
      aun: 'C5, C6, C8',
    });
  }
}

const content = `export const projectArchive = ${JSON.stringify(projects, null, 2)};\n`;
fs.writeFileSync(dataFile, content, 'utf8');

console.log(`Generated ${projects.length} projects`);
