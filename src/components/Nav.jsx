import { BarChart3, BookOpen, CalendarDays, ClipboardCheck, FileText, FolderKanban, GitBranch, Home, LifeBuoy, MessageSquare, ShieldAlert, Sparkles, UserCheck, UserRound, UsersRound, Wrench } from 'lucide-react';

export const navItems = [
  ['home', 'Home', Home],
  ['students', 'ข้อมูลนักศึกษา', UsersRound],
  ['program', 'ข้อมูลหลักสูตร', BookOpen],
  ['faculty', 'ข้อมูลอาจารย์', UserCheck],
  ['advisor', 'อาจารย์ที่ปรึกษา', UserRound],
  ['courses', 'รายวิชา/ตารางเรียน', CalendarDays],
  ['request', 'คำร้องวิชาการ', FileText],
  ['complaint', 'ร้องเรียนลับ', ShieldAlert],
  ['track', 'ติดตามสถานะ', ClipboardCheck],
  ['practicum', 'ฝึกประสบการณ์', LifeBuoy],
  ['resources', 'สิ่งสนับสนุน', Wrench],
  ['feedback', 'ประเมิน/ข้อเสนอแนะ', MessageSquare],
  ['projects', 'โครงการ/กิจกรรม', FolderKanban],
  ['qa', 'QA Dashboard', BarChart3],
  ['aun', 'AUN-QA Guide', Sparkles],
  ['flows', 'Flow Systems', GitBranch],
];

export default function Nav({ active, onNavigate }) {
  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200 bg-slate-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-3 sm:px-6 lg:px-8">
        {navItems.map(([id, label, Icon]) => (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(id)}
            className={`flex min-h-10 items-center gap-2 rounded-md px-3 py-2 text-sm font-bold transition ${
              active === id ? 'bg-brand-navy text-white shadow-sm' : 'border border-slate-200 bg-white text-slate-600 hover:border-brand-blue hover:text-brand-navy'
            }`}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
