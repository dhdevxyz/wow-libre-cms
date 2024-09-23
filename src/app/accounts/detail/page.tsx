import AccountDetail from "@/components/account/details";
import SuspenseBoundary from "@/components/utilities/suspense-boundary";
import React from "react";

const CongratsPage: React.FC = () => (
  <SuspenseBoundary>
    <AccountDetail />
  </SuspenseBoundary>
);

export default CongratsPage;
