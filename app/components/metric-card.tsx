"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"
import { AnimatedCounter } from "./animated-counter"

interface MetricCardProps {
  title: string
  value: number
  change?: number
  icon: LucideIcon
  gradient: string
  suffix?: string
  prefix?: string
  isLive?: boolean
}

export function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  gradient,
  suffix = "",
  prefix = "",
  isLive = false,
}: MetricCardProps) {
  return (
    <Card
      className={`relative overflow-hidden border-0 shadow-xl group hover:shadow-2xl transition-all duration-500 hover:scale-105 ${gradient}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-700"></div>

      {isLive && (
        <div className="absolute top-3 right-3">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse shadow-lg"></div>
        </div>
      )}

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-white/95">{title}</CardTitle>
        <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-3xl font-bold text-white">
          {prefix}
          <AnimatedCounter value={value} />
          {suffix}
        </div>
        {change !== undefined && (
          <div className="flex items-center gap-2 mt-2">
            <Badge
              variant={change > 0 ? "default" : "destructive"}
              className="text-xs bg-white/25 text-white border-white/40 hover:bg-white/35"
            >
              {change > 0 ? "+" : ""}
              {change.toFixed(1)}%
            </Badge>
            <span className="text-xs text-white/80">vs período anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
