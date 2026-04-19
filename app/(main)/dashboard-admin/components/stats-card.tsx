"use client"

import { memo } from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  icon: LucideIcon
  description?: string
  trend?: "up" | "down" | "neutral"
  color?: string
  link?: string
}

export const StatsCard = memo(function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  description,
  trend = "up",
  color = "blue",
}: StatsCardProps) {
  const colorClasses = {
    blue: "bg-blue-500/10 text-blue-500",
    green: "bg-green-500/10 text-green-500",
    yellow: "bg-yellow-500/10 text-yellow-500",
    red: "bg-red-500/10 text-red-500",
    purple: "bg-purple-500/10 text-purple-500",
  }

  return (
    <div
      className="rounded-xl border bg-card p-6 shadow-sm transition-all duration-150 hover:shadow-md hover:scale-[1.02] dark:bg-gray-800 dark:border-gray-700 min-h-[160px] flex flex-col"
    >
      <div className="flex items-start justify-between h-full">
        <div className="flex-1 flex flex-col justify-between min-h-[112px]">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="mt-2 text-3xl font-bold text-foreground">{value}</h3>
            {description && (
              <p className="mt-1 text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          {change !== undefined && change !== 0 && trend !== "neutral" && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={cn(
                  "text-sm font-medium",
                  trend === "up" ? "text-green-500" : "text-red-500"
                )}
              >
                {trend === "up" ? "+" : "-"}
                {Math.abs(change)}%
              </span>
              <span className="text-xs text-muted-foreground">
                dari bulan lalu
              </span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg flex-shrink-0",
            colorClasses[color as keyof typeof colorClasses] || colorClasses.blue
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
})
