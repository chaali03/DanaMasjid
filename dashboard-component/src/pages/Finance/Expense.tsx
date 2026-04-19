import PageMeta from "../../components/common/PageMeta";
import { ExpensePage } from "@/app/dashboard-admin/components/expense-page";

export default function Expense() {
  return (
    <>
      <PageMeta
        title="Pengeluaran Keuangan | Dashboard Admin Masjid"
        description="Detail pengeluaran dan biaya operasional masjid"
      />
      <ExpensePage />
    </>
  );
}
