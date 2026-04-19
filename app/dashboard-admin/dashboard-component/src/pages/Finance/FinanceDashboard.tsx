import PageMeta from "../../components/common/PageMeta";
import { FinanceDashboard as FinanceDashboardComponent } from "@/app/dashboard-admin/components/finance-dashboard";

export default function FinanceDashboard() {
  return (
    <>
      <PageMeta
        title="Transparansi Keuangan | Dashboard Admin Masjid"
        description="Laporan keuangan dan transparansi dana masjid"
      />
      <FinanceDashboardComponent />
    </>
  );
}
