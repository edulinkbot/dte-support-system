import { assetPath } from '../utils/assets.js';

export default function Header() {
  return (
    <header className="site-header border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-4">
          <img className="site-logo" src={assetPath('/logoDTE.jpg')} alt="DTE logo" />
          <div>
            <h1 className="text-2xl font-bold text-brand-navy">DTE Support System</h1>
            <p className="mt-1 text-sm font-semibold text-slate-700">สาขาวิชาเทคโนโลยีดิจิทัลเพื่อการศึกษา</p>
            <p className="text-sm text-slate-600">คณะครุศาสตร์ มหาวิทยาลัยราชภัฏบ้านสมเด็จเจ้าพระยา</p>
          </div>
        </div>
        <div className="rounded-md border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-brand-navy">
          <p className="font-bold">Student Support and QA Evidence Center</p>
          <p className="mt-1 text-slate-600">Prototype สำหรับบริการนักศึกษาและหลักฐาน AUN-QA</p>
        </div>
      </div>
    </header>
  );
}
