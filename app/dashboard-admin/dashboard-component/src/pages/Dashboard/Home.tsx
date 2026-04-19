import { lazy, Suspense } from "react";
import PageMeta from "../../components/common/PageMeta";
import { ChartColorButton } from "@/app/dashboard-admin/components/chart-color-button";

// Lazy load heavy components
const EcommerceMetrics = lazy(() => import("../../components/ecommerce/EcommerceMetrics"));
const MonthlySalesChart = lazy(() => import("../../components/ecommerce/MonthlySalesChart"));
const StatisticsChart = lazy(() => import("../../components/ecommerce/StatisticsChart"));
const MonthlyTarget = lazy(() => import("../../components/ecommerce/MonthlyTarget"));
const RecentOrders = lazy(() => import("../../components/ecommerce/RecentOrders"));
const DemographicCard = lazy(() => import("../../components/ecommerce/DemographicCard"));

// Loading skeleton
const ChartSkeleton = () => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
    <div className="h-[180px] bg-gray-100 dark:bg-gray-800 rounded"></div>
  </div>
);

const CardSkeleton = () => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] animate-pulse">
    <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
  </div>
);

export default function Home() {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="mb-4 flex justify-end">
        <ChartColorButton />
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <Suspense fallback={<CardSkeleton />}>
            <EcommerceMetrics />
          </Suspense>

          <Suspense fallback={<ChartSkeleton />}>
            <MonthlySalesChart />
          </Suspense>
        </div>

        <div className="col-span-12 xl:col-span-5">
          <Suspense fallback={<ChartSkeleton />}>
            <MonthlyTarget />
          </Suspense>
        </div>

        <div className="col-span-12">
          <Suspense fallback={<ChartSkeleton />}>
            <StatisticsChart />
          </Suspense>
        </div>

        <div className="col-span-12 xl:col-span-5">
          <Suspense fallback={<CardSkeleton />}>
            <DemographicCard />
          </Suspense>
        </div>

        <div className="col-span-12 xl:col-span-7">
          <Suspense fallback={<CardSkeleton />}>
            <RecentOrders />
          </Suspense>
        </div>
      </div>
    </>
  );
}
