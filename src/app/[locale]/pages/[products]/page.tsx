"use client";
import React from 'react';
import { useParams } from 'next/navigation';

const ProdutsPage = () => {
  const router = useParams();
  const { products } = router;
  return <div>Products {products} </div>;
};

export default ProdutsPage;