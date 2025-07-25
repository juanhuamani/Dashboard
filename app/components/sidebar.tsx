"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Activity, BarChart3, Users, FileText, Zap } from "lucide-react"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const navigation = [
  { id: "realtime", label: "Tiempo Real", icon: Activity, gradient: "from-green-500 to-emerald-500" },
  { id: "historical", label: "Histórico", icon: BarChart3, gradient: "from-blue-500 to-cyan-500" },
  {
    id: "profiles",
    label: "Perfiles de Usuario",
    icon: Users,
    disabled: false,
    gradient: "from-purple-500 to-pink-500",
  },
  { id: "reports", label: "Reportes", icon: FileText, disabled: false, gradient: "from-orange-500 to-red-500" },
]

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-72 border-r border-white/20 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/90 backdrop-blur-xl">
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl blur-md opacity-40"></div>
              <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-xl">
                <Zap className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Dashboard</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Panel de Control</p>
            </div>
          </div>
        </div>

        <nav className="space-y-3">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start h-12 px-4 transition-all duration-300 group relative overflow-hidden",
                  isActive
                    ? "bg-white/90 dark:bg-slate-800/90 shadow-lg shadow-black/5 dark:shadow-black/20 text-slate-900 dark:text-slate-100"
                    : "hover:bg-white/50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100",
                  item.disabled && "opacity-50 cursor-not-allowed",
                )}
                onClick={() => !item.disabled && onSectionChange(item.id)}
                disabled={item.disabled}
              >
                {isActive && <div className={cn("absolute inset-0 bg-gradient-to-r opacity-10", item.gradient)} />}

                <div
                  className={cn(
                    "relative p-2 rounded-lg mr-3 transition-all duration-300",
                    isActive
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                      : "bg-slate-100 dark:bg-slate-700 group-hover:bg-slate-200 dark:group-hover:bg-slate-600 text-slate-600 dark:text-slate-300",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <span className="font-medium transition-colors duration-300">{item.label}</span>

                {isActive && (
                  <div
                    className={cn(
                      "absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b rounded-l-full",
                      item.gradient,
                    )}
                  />
                )}
              </Button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
