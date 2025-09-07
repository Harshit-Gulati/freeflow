"use client";

import { Navbar } from "./_components/navbar";
import { OrgSidebar } from "./_components/org-sidebar";
import { Sidebar } from "./_components/sidebar";
import Loading from "@/components/loading";
import { useOrganization } from "@clerk/nextjs";
import DashboardPage from "./page";

const DashboardLayout = () => {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) return <Loading />;

  return (
    <main className="h-screen w-screen flex animate-fadeIn">
      <Sidebar />
      <div className="h-full w-full flex">
        <OrgSidebar />
        <div className="h-full w-full bg-gray-bg p-2">
          <Navbar />
          <DashboardPage organization={organization} />
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
