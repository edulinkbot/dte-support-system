import fs from 'node:fs';
import path from 'node:path';
import {
  advisors,
  aunCriteria,
  facultyMembers,
  feedback,
  qaRecords,
  requests,
  students,
  studentCohortStats,
  supportItems,
} from '../src/data/mockData.js';

const root = process.cwd();
const stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15);
const buildDir = path.join(root, 'outputs', `xlsx-build-${stamp}`);
const outputFile = path.join(root, 'outputs', `DTE-Support-Database-Template-${stamp}.xlsx`);

const sheets = [
  {
    name: 'students',
    rows: [
      ['student_id', 'student_name', 'year', 'display_year', 'academic_year', 'group', 'advisor', 'lifecycle_status', 'credits_passed', 'credits_plan', 'gpa', 'support_status', 'study_plan_status', 'note'],
      ...students.map((s) => [s.id, s.name, s.year, s.displayYear, s.academicYear, s.group, s.advisor, s.lifecycleStatus, s.creditsPassed, s.creditsPlan, s.gpa, s.supportStatus, s.studyPlanStatus, s.note]),
    ],
  },
  {
    name: 'cohorts',
    rows: [
      ['prefix', 'group', 'academic_year', 'label', 'admitted', 'inactive', 'graduated', 'current', 'graduation_rate', 'inactive_rate', 'source'],
      ...studentCohortStats.map((c) => [c.prefix, c.group, c.academicYear, c.label, c.admitted, c.inactive, c.graduated, c.current, c.graduationRate, c.inactiveRate, c.source]),
    ],
  },
  {
    name: 'faculty',
    rows: [
      ['faculty_id', 'name', 'role', 'position', 'image', 'expertise', 'qualifications', 'curriculum_2567', 'curriculum_2562'],
      ...facultyMembers.map((f) => [f.id, f.name, f.role, f.position, f.image, f.expertise.join('; '), f.qualifications.join('; '), f.curriculum2567.join('; '), f.curriculum2562.join('; ')]),
    ],
  },
  {
    name: 'requests',
    rows: [
      ['id', 'created_at', 'type', 'topic', 'student', 'detail', 'status', 'owner', 'updated_at', 'log'],
      ...requests.filter((r) => r.type !== 'ร้องเรียนลับ').map((r) => [r.id, '', r.type, r.topic, r.student, '', r.status, '', '', r.log.join(' | ')]),
    ],
  },
  {
    name: 'complaints',
    rows: [
      ['id', 'created_at', 'topic', 'anonymous', 'student', 'detail', 'status', 'owner', 'action', 'closed_at', 'log'],
      ...requests.filter((r) => r.type === 'ร้องเรียนลับ').map((r) => [r.id, '', r.topic, 'TRUE', r.student, '', r.status, '', '', '', r.log.join(' | ')]),
    ],
  },
  {
    name: 'advisor',
    rows: [
      ['id', 'date', 'student', 'year', 'status', 'issue', 'follow_up', 'advisor'],
      ...advisors.map((a, index) => [`ADV-${String(index + 1).padStart(4, '0')}`, '', a.student, a.year, a.status, a.issue, a.followUp, '']),
    ],
  },
  {
    name: 'feedback',
    rows: [
      ['id', 'date', 'type', 'target', 'score', 'issue', 'linked_aun', 'action'],
      ...feedback.map((f) => [f.id, '', f.type, f.target, f.score, f.issue, f.linked, '']),
    ],
  },
  {
    name: 'resources',
    rows: [
      ['id', 'name', 'type', 'status', 'note', 'owner', 'updated_at'],
      ...supportItems.map((item, index) => [`RES-${String(index + 1).padStart(4, '0')}`, item.name, item.type, item.status, item.note, '', '']),
    ],
  },
  {
    name: 'qa',
    rows: [
      ['id', 'aun_code', 'title', 'evidence', 'improvement', 'owner', 'updated_at'],
      ...qaRecords.map((q, index) => [`QA-${String(index + 1).padStart(4, '0')}`, q.criterion, q.title, q.evidence, q.improvement, '', '']),
    ],
  },
  {
    name: 'aun',
    rows: [
      ['code', 'title', 'thai', 'focus', 'evidence', 'system_help', 'next_action', 'status'],
      ...aunCriteria.map((c) => [c.code, c.title, c.thai, c.focus, c.evidence.join('; '), c.systemHelp.join('; '), c.nextAction, c.status]),
    ],
  },
  {
    name: 'settings',
    rows: [
      ['key', 'value', 'note'],
      ['system_name', 'DTE Support System', 'ชื่อระบบ'],
      ['department', 'สาขาวิชาเทคโนโลยีดิจิทัลเพื่อการศึกษา', 'หน่วยงาน'],
      ['faculty', 'คณะครุศาสตร์ มหาวิทยาลัยราชภัฏบ้านสมเด็จเจ้าพระยา', 'คณะ/มหาวิทยาลัย'],
      ['data_warning', 'prototype data', 'ควรตรวจข้อมูลจริงก่อนเผยแพร่'],
    ],
  },
];

function xmlEscape(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function columnName(index) {
  let name = '';
  let n = index + 1;
  while (n > 0) {
    const rem = (n - 1) % 26;
    name = String.fromCharCode(65 + rem) + name;
    n = Math.floor((n - 1) / 26);
  }
  return name;
}

function sheetXml(rows) {
  const body = rows.map((row, rIndex) => {
    const cells = row.map((cell, cIndex) => {
      const ref = `${columnName(cIndex)}${rIndex + 1}`;
      if (typeof cell === 'number') {
        return `<c r="${ref}"><v>${cell}</v></c>`;
      }
      return `<c r="${ref}" t="inlineStr"><is><t>${xmlEscape(cell)}</t></is></c>`;
    }).join('');
    return `<row r="${rIndex + 1}">${cells}</row>`;
  }).join('');
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetViews><sheetView workbookViewId="0"/></sheetViews>
  <sheetData>${body}</sheetData>
</worksheet>`;
}

fs.mkdirSync(path.join(buildDir, '_rels'), { recursive: true });
fs.mkdirSync(path.join(buildDir, 'xl', '_rels'), { recursive: true });
fs.mkdirSync(path.join(buildDir, 'xl', 'worksheets'), { recursive: true });

fs.writeFileSync(path.join(buildDir, '[Content_Types].xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  ${sheets.map((_, index) => `<Override PartName="/xl/worksheets/sheet${index + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('\n  ')}
</Types>`);

fs.writeFileSync(path.join(buildDir, '_rels', '.rels'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`);

fs.writeFileSync(path.join(buildDir, 'xl', 'workbook.xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    ${sheets.map((sheet, index) => `<sheet name="${xmlEscape(sheet.name)}" sheetId="${index + 1}" r:id="rId${index + 1}"/>`).join('\n    ')}
  </sheets>
</workbook>`);

fs.writeFileSync(path.join(buildDir, 'xl', '_rels', 'workbook.xml.rels'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  ${sheets.map((_, index) => `<Relationship Id="rId${index + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${index + 1}.xml"/>`).join('\n  ')}
</Relationships>`);

sheets.forEach((sheet, index) => {
  fs.writeFileSync(path.join(buildDir, 'xl', 'worksheets', `sheet${index + 1}.xml`), sheetXml(sheet.rows));
});

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(path.join(root, 'outputs', 'latest-xlsx-path.txt'), `${buildDir}\n${outputFile}\n`);
console.log(JSON.stringify({ buildDir, outputFile, sheets: sheets.map((sheet) => ({ name: sheet.name, rows: sheet.rows.length })) }, null, 2));
