"use client";
import AdministratorServer from "@/components/administrator-server/page";
import SuspenseBoundary from "@/components/utilities/suspense-boundary";

const AdministratorSuspense = () => {
  return (
    <SuspenseBoundary>
      <AdministratorServer />
    </SuspenseBoundary>
  );
};

export default AdministratorSuspense;
