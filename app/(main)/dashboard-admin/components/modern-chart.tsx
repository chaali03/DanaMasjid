"use client"

import { memo, useMemo } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { useChartColors } from "../contexts/chart-color-context"

interface ChartProps {
  data: any[]
  type?: "line" | "bar" | "area" | "pie"
  dataKey: string
  secondaryDataKey?: string
  xAxisKey?: string
  title?: string
  color?: string
  secondaryColor?: string
  height?: number
}

export const ModernChart = memo(function ModernChart({
  data,
  type = "line",
  dataKey,
  secondaryDataKey,
  xAxisKey = "name",
  title,
  color: propColor,
  secondaryColor,
  height = 300,
}: ChartProps) {
  const { colors } = useChartColors()
  
  // Use custom colors from context, fallback to prop color
  const color = type === "bar" 
    ? colors.barChart.primary 
    : colors.lineChart.primary
  const renderChart = useMemo(() => {
    switch (type) {
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey={xAxisKey} className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              position={{ y: 0 }}
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              wrapperStyle={{ zIndex: 9999 }}
            />
            <Bar dataKey={dataKey} fill={propColor || color} radius={[8, 8, 0, 0]} />
            {secondaryDataKey && (
              <Bar dataKey={secondaryDataKey} fill={secondaryColor || "#ef4444"} radius={[8, 8, 0, 0]} />
            )}
          </BarChart>
        )
      case "area":
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey={xAxisKey} className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              position={{ y: 0 }}
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              wrapperStyle={{ zIndex: 9999 }}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              fillOpacity={1}
              fill="url(#colorGradient)"
            />
          </AreaChart>
        )
      case "pie":
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={xAxisKey}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill={color}
              label
            />
            <Tooltip />
          </PieChart>
        )
      default:
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey={xAxisKey} className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              position={{ y: 0 }}
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              wrapperStyle={{ zIndex: 9999 }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        )
    }
  }, [data, type, dataKey, xAxisKey, color])

  return (
    <div
      className="rounded-lg border bg-card p-6 dark:bg-gray-800 dark:border-gray-700"
    >
      {title && (
        <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        {renderChart}
      </ResponsiveContainer>
    </div>
  )
})
