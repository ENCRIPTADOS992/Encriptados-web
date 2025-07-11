export default function CardTestLayout({
  children,
}: {
  children: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
}) {
  const ManCoffe = "/images/encrypted-test/man-coffe.png";
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-5xl  border   border-[#232323] rounded-3xl overflow-hidden">

        {/* ——— Imagen SOLO en móvil (<md) ——— */}
        <div
          className="
            block
            lg:hidden
            mb-4
            relative
            overflow-hidden
            h-[163px]
            rounded-tl-[8px] rounded-tr-[8px]
          "
        >
          <div
            className="
              absolute inset-0
              bg-gradient-to-br
              rounded-tl-[8px] rounded-tr-[8px]
            "
          />
          <img
            src={ManCoffe}
            alt="Security illustration"
            className="
              absolute inset-0
              w-full h-full
              object-cover
              object-[center_20%]
            "
          />
        </div>
        {/* ———————————————————————————— */}

        <div className="grid lg:grid-cols-2 gap-6 p-6">
          <div className="space-y-8">
            <div className="min-h-[300px]">{children}</div>
          </div>

          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-gradient-to-br rounded-2xl" />
            <img
              src={ManCoffe}
              alt="Security illustration"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
