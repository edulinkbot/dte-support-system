import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = 'D:\\codex\\DTE67\\dteproject\\งบ บกศ.69';
const outputRoot = 'D:\\codex\\DTE67\\dtesupport\\public\\projects';
const dataFile = 'D:\\codex\\DTE67\\dtesupport\\src\\data\\projectData.js';

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

function listProjectDirs() {
  if (!fs.existsSync(sourceRoot)) return [];

  return fs.readdirSync(sourceRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((category) => {
      const categoryDir = path.join(sourceRoot, category.name);
      return fs.readdirSync(categoryDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((project) => ({
          category: category.name,
          dir: path.join(categoryDir, project.name),
          folderName: project.name,
        }));
    });
}

function cleanTitle(name) {
  return name
    .replace(/^\d+/, '')
    .replace(/69$/, '')
    .replace(/110269$/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function projectSummary(title, category) {
  if (title.includes('ปฐมนิเทศ')) return 'กิจกรรมเตรียมความพร้อมนักศึกษาใหม่และแนะนำระบบสนับสนุนของสาขา';
  if (title.includes('สัมมนา')) return 'โครงการพัฒนาสมรรถนะและแลกเปลี่ยนเรียนรู้ด้านการจัดการเรียนรู้ด้วยเทคโนโลยีดิจิทัล';
  if (title.includes('บริการวิชาการ')) return 'โครงการบริการวิชาการแก่โรงเรียนหรือชุมชน โดยใช้ความเชี่ยวชาญของสาขาเป็นฐาน';
  if (title.includes('นวัตกรรม')) return 'โครงการส่งเสริมการสร้างนวัตกรรมและต่อยอดบริการวิชาการเพื่อสร้างรายได้ของสาขา';
  if (title.includes('กระบี่')) return 'โครงการหรือกิจกรรมพัฒนานักศึกษาและเครือข่ายวิชาการภายนอกมหาวิทยาลัย';
  if (title.includes('ปาล์ม')) return 'กิจกรรมบ่มเพาะและเตรียมความพร้อมด้านวิชาการ ทักษะดิจิทัล และการทำงาน';
  if (title.includes('ประกัน')) return 'กิจกรรมสนับสนุนงานประกันคุณภาพและการจัดเก็บหลักฐานของหลักสูตร';
  if (title.includes('นิเทศ')) return 'กิจกรรมส่งตัว นิเทศ และติดตามนักศึกษาในการฝึกประสบการณ์หรือกิจกรรมวิชาชีพ';
  if (title.includes('ประชุม')) return 'กิจกรรมประชุม วางแผน ติดตาม และสรุปการดำเนินงานของหลักสูตรหรือคณะ';
  return `กิจกรรมภายใต้${category} สำหรับสรุปผลการดำเนินงานงบ บกศ. ประจำปีงบประมาณ 2569`;
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

const projects = listProjectDirs().map((projectDir, index) => {
  const files = walk(projectDir.dir);
  const id = `prj-${index + 1}`;
  const publicDir = path.join(outputRoot, id);
  ensureDir(publicDir);

  const images = files
    .filter((file) => imageExts.has(path.extname(file).toLowerCase()))
    .slice(0, 5)
    .map((file, imageIndex) => `/projects/${id}/${copyAsset(file, publicDir, 'photo', imageIndex)}`);

  const documents = files
    .filter((file) => docExts.has(path.extname(file).toLowerCase()))
    .map((file) => ({
      name: path.basename(file),
      type: classifyDocument(path.basename(file)),
    }));

  const videos = files
    .filter((file) => videoExts.has(path.extname(file).toLowerCase()))
    .map((file) => path.basename(file));

  const title = cleanTitle(projectDir.folderName);
  return {
    id,
    title,
    fiscalYear: '2569',
    budgetType: 'งบ บกศ.',
    category: projectDir.category,
    status: 'ทำเสร็จแล้ว',
    owner: 'สาขาวิชาเทคโนโลยีดิจิทัลเพื่อการศึกษา',
    summary: projectSummary(title, projectDir.category),
    images,
    documents,
    videos,
    sourceFolder: projectDir.dir,
    aun: 'C5, C6, C8',
  };
});

fs.writeFileSync(dataFile, `export const projectArchive = ${JSON.stringify(projects, null, 2)};\n`, 'utf8');
console.log(`Generated ${projects.length} projects from ${sourceRoot}`);
