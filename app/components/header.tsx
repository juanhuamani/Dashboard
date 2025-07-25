import { Music, User, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  return (
    <header className="border-b border-white/20 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/70">
      <div className="flex h-20 items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-30"></div>
            <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-2xl">
              <Music className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MusicPulse
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              Análisis del Comportamiento Musical en Streaming
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
            <Input
              placeholder="Buscar canciones, artistas..."
              className="pl-10 w-80 bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-600 backdrop-blur-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
            />
          </div>

          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-white/30 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-200"
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 border-0 text-white">
              3
            </Badge>
          </Button>

          <Button variant="ghost" size="icon" className="hover:bg-white/30 dark:hover:bg-slate-800/50">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </Button>
        </div>
      </div>
    </header>
  )
}
