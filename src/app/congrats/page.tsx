import Congrats from "@/components/congrats/page";
import SuspenseBoundary from "@/components/utilities/suspense-boundary";
import React from "react";

const CongratsPage: React.FC = () => (
  <SuspenseBoundary>
    <Congrats />
  </SuspenseBoundary>
);

export default CongratsPage;
