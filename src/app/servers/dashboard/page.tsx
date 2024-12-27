"use client";
import AdministratorServer from "@/components/server/page";
import SuspenseBoundary from "@/components/utilities/suspense-boundary";

const AdministratorSuspense = () => {
  <SuspenseBoundary>
    <AdministratorServer />
  </SuspenseBoundary>;
};

export default AdministratorSuspense;
