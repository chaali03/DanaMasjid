import PageMeta from "../../components/common/PageMeta";
import { IncomePage } from "@/app/dashboard-admin/components/income-page";

export default function Income() {
  return (
    <>
      <PageMeta
        title="Pemasukan Keuangan | Dashboard Admin Masjid"
        description="Detail pemasukan dan donasi masjid"
      />
      <IncomePage />
    </>
  );
}
