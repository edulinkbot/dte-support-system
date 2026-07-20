export default function Flow({ title, steps }) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold text-brand-navy">{title}</h3>
      <div className="flow-row mt-4">
        {steps.map((step, index) => (
          <div key={step} className="flow-box">
            <p className="text-xs font-bold text-brand-blue">ขั้นตอนที่ {index + 1}</p>
            <p className="mt-2 font-semibold leading-6 text-slate-800">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
