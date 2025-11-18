"use client";

import dynamic from "next/dynamic";

const DeliveriesMapClient = dynamic(
  () => import("./DeliveriesMapClient"),
  { ssr: false }
);

const DeliveriesMap = (props: any) => {
  return <DeliveriesMapClient {...props} />;
};

export default DeliveriesMap;
