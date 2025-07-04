import Image from "next/image";

export default function SecureFeatures() {
  return (
    <section className="w-full flex justify-center py-10 px-2 bg-[#F7FAFC]">
      <div className="max-w-[1272px] w-full">
        <Image
          src="/images/apps/secure-mdm-iphone/contenido Ventajas.png"
          alt="Ventajas Secure MDM iPhone"
          width={1272}
          height={654}
          className="w-full h-auto rounded-2xl shadow-sm"
          priority
        />
      </div>
    </section>
  );
}
