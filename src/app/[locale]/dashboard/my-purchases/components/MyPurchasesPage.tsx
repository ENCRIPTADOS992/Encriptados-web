import React from "react";
import CardPurchase from "./CardPurchase";

const MyPurchasesPage = () => {
  const Product = "/images/encrypted-sim/Encrypted_sim_card.png";

  return (
    <div>
      <h1 className="text-black  font-semibold mb-4">Mis compras</h1>
      <p className="text-[#5D5D5D] mb-4">Recientes</p>
      <CardPurchase
        discount={"60706 COP"}
        productName={"eSIM Física Encriptada"}
        buyDate={"22 SEP 2024"}
        id={"#2984192"}
        productImageUrl={Product}
        price={"$40470 COP"}
      />
    </div>
  );
};

export default MyPurchasesPage;
