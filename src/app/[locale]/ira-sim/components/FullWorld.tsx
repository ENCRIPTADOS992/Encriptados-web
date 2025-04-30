import React from "react";
import Image from "next/image"; // Importa el componente Image de Next.js

const FullWorld = () => {
  const stepper = [
    {
      id: 1,
      title: "Elige la región donde quieres usar tu eSIM",
      description:
        "Elige uno de nuestros destinos o regiones donde puedes usar nuestra sim electrónica",
      imageUrl: "/path-to-image-1.jpg", // Agrega la ruta de la imagen que usarás
      width: 500, // Especifica el ancho deseado
      height: 300, // Especifica la altura deseada
    },
    {
      id: 2,
      title: "Selecciona tu plan de datos y realiza la compra",
      description:
        "Elige el plan que más se ajuste a tus necesidades, tenemos planes de un mes, 3 meses o 6 meses",
      imageUrl: "/path-to-image-2.jpg",
      width: 500,
      height: 300,
    },
    {
      id: 3,
      title: "Activa tu eSIM y disfruta de tus datos móviles",
      description:
        "Activa tu eSIM de forma fácil y rápida y comienza a disfrutar de comunicaciones globales y con anonimato",
      imageUrl: "/path-to-image-3.jpg",
      width: 500,
      height: 300,
    },
  ];

  return (
    <div>
      {stepper.map((step, index) => (
        <div
          key={step.id}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          {/* Condición para intercalar la posición de la imagen */}
          {index % 2 === 0 ? (
            <>
              <div>
                <h1>{step.title}</h1>
                <p>{step.description}</p>
              </div>
              <div>
                <Image
                  src={step.imageUrl}
                  alt={step.title}
                  width={step.width} // Usa el ancho especificado
                  height={step.height} // Usa la altura especificada
                  style={{ width: "100%", height: "auto" }} // Mantener el estilo para asegurar el ajuste
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <Image
                  src={step.imageUrl}
                  alt={step.title}
                  width={step.width}
                  height={step.height}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div>
                <h1>{step.title}</h1>
                <p>{step.description}</p>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default FullWorld;
