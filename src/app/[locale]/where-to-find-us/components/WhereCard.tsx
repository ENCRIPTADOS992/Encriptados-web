export default function WhereCard({
  leftNumber = "36,732",
  leftTitle = "Puntos de pago",
  leftDescription = "Lugares donde puedes comprar rápido tus licencias cripto",
  rightNumber = "76",
  rightTitle = "Países disponibles",
  rightDescription = "La mayor cobertura disponible para ti",
  leftGradient = "from-emerald-900 to-emerald-950",
  rightGradient = "from-indigo-950 to-slate-950",
}: {
  leftNumber?: string;
  leftTitle?: string;
  leftDescription?: string;
  rightNumber?: string;
  rightTitle?: string;
  rightDescription?: string;
  leftGradient?: string;
  rightGradient?: string;
} = {}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-3xl mx-auto p-4">
      <div
        className={`flex-1 rounded-2xl bg-gradient-to-br ${leftGradient} p-6 text-white`}
      >
        <h3 className="text-sm font-medium text-gray-200">{leftTitle}</h3>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight">
            {leftNumber}
          </span>
          <svg
            className="h-4 w-4 text-emerald-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 12 7-7 7 7" />
            <path d="M12 19V5" />
          </svg>
        </div>
        <hr className="my-4 border-[#0C3E24]" />
        <p className="mt-4 text-sm text-gray-300">{leftDescription}</p>
      </div>

      <div
        className={`flex-1 rounded-2xl bg-gradient-to-br ${rightGradient} p-6 text-white`}
      >
        <h3 className="text-sm font-medium text-gray-200">{rightTitle}</h3>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight">
            {rightNumber}
          </span>
          <svg
            className="h-4 w-4 text-indigo-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 12 7-7 7 7" />
            <path d="M12 19V5" />
          </svg>
        </div>
        <hr className="my-4 border-[#162E6A]" />
        <p className="mt-4 text-sm text-gray-300">{rightDescription}</p>
      </div>
    </div>
  );
}
