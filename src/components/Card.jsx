export function Card({ title, children, className = '' }) {
  return (
    <section className={`rounded-md border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      {title && <h2 className="text-xl font-bold text-brand-navy">{title}</h2>}
      <div className={title ? 'mt-4' : ''}>{children}</div>
    </section>
  );
}

export function StatCard({ label, value, detail, tone = 'blue' }) {
  const tones = {
    blue: 'bg-blue-50 text-blue-900 border-blue-100',
    green: 'bg-emerald-50 text-emerald-900 border-emerald-100',
    amber: 'bg-amber-50 text-amber-900 border-amber-100',
    rose: 'bg-rose-50 text-rose-900 border-rose-100',
  };
  return (
    <div className={`rounded-md border p-4 ${tones[tone]}`}>
      <p className="text-sm font-semibold opacity-80">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      <p className="mt-2 text-sm opacity-80">{detail}</p>
    </div>
  );
}

export function Table({ columns, rows }) {
  return (
    <div className="overflow-x-auto rounded-md border border-slate-200">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-slate-100 text-slate-700">
          <tr>{columns.map((col) => <th key={col} className="px-3 py-3 font-bold">{col}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {rows.map((row, index) => (
            <tr key={index} className="hover:bg-slate-50">
              {row.map((cell, cellIndex) => <td key={cellIndex} className="px-3 py-3 align-top">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Badge({ children, tone = 'blue' }) {
  const tones = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-emerald-100 text-emerald-800',
    amber: 'bg-amber-100 text-amber-800',
    rose: 'bg-rose-100 text-rose-800',
  };
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${tones[tone]}`}>{children}</span>;
}
