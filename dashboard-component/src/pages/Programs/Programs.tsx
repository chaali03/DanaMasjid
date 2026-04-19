import PageMeta from "../../components/common/PageMeta";
import { ProgramsPage } from "@/app/dashboard-admin/components/programs-page";

export default function Programs() {
  return (
    <>
      <PageMeta
        title="Program & Kegiatan | Dashboard Admin Masjid"
        description="Daftar program, kegiatan, dan anggaran masjid"
      />
      <ProgramsPage />
    </>
  );
}
