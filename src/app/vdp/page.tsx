import SuspenseBoundary from "@/components/utilities/suspense-boundary";
import Vdp from "@/components/vdp/home/inde";
import React from "react";

const VdpPage: React.FC = () => (
  <SuspenseBoundary>
    <Vdp />
  </SuspenseBoundary>
);

export default VdpPage;
