"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  TrendingUp,
  Users,
  Clock,
  Play,
  Headphones,
  Radio,
  Zap,
  Activity,
  Music2,
  RefreshCw,
  Settings,
  Volume2,
  Heart,
  Share2,
} from "lucide-react"
import { ResponsiveContainer, XAxis, YAxis, Area, AreaChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LiveIndicator } from "./live-indicator"
import { MetricCard } from "./metric-card"

// Mantener los mismos datos pero mejorar la presentación
const generateTopSongs = () => [
  {
    song_title: "Blinding Lights",
    artist_name: "The Weeknd",
    plays: Math.floor(Math.random() * 1000) + 500,
    listeners: Math.floor(Math.random() * 200) + 100,
    growth: (Math.random() * 20 - 10).toFixed(1),
    genre: "Pop",
  },
  {
    song_title: "Shape of You",
    artist_name: "Ed Sheeran",
    plays: Math.floor(Math.random() * 800) + 400,
    listeners: Math.floor(Math.random() * 180) + 90,
    growth: (Math.random() * 20 - 10).toFixed(1),
    genre: "Pop",
  },
  {
    song_title: "Bad Habits",
    artist_name: "Ed Sheeran",
    plays: Math.floor(Math.random() * 700) + 300,
    listeners: Math.floor(Math.random() * 160) + 80,
    growth: (Math.random() * 20 - 10).toFixed(1),
    genre: "Pop",
  },
  {
    song_title: "Stay",
    artist_name: "The Kid LAROI",
    plays: Math.floor(Math.random() * 600) + 250,
    listeners: Math.floor(Math.random() * 140) + 70,
    growth: (Math.random() * 20 - 10).toFixed(1),
    genre: "Hip Hop",
  },
  {
    song_title: "Good 4 U",
    artist_name: "Olivia Rodrigo",
    plays: Math.floor(Math.random() * 500) + 200,
    listeners: Math.floor(Math.random() * 120) + 60,
    growth: (Math.random() * 20 - 10).toFixed(1),
    genre: "Pop",
  },
]

const generateLatestPlays = () => [
  {
    user_id: "user_001",
    song_title: "Watermelon Sugar",
    artist_name: "Harry Styles",
    timestamp: new Date(Date.now() - Math.random() * 300000).toLocaleTimeString(),
    location: "Madrid, ES",
    device: "Mobile",
  },
  {
    user_id: "user_002",
    song_title: "Levitating",
    artist_name: "Dua Lipa",
    timestamp: new Date(Date.now() - Math.random() * 300000).toLocaleTimeString(),
    location: "Barcelona, ES",
    device: "Desktop",
  },
  {
    user_id: "user_003",
    song_title: "Peaches",
    artist_name: "Justin Bieber",
    timestamp: new Date(Date.now() - Math.random() * 300000).toLocaleTimeString(),
    location: "Valencia, ES",
    device: "Mobile",
  },
  {
    user_id: "user_004",
    song_title: "Drivers License",
    artist_name: "Olivia Rodrigo",
    timestamp: new Date(Date.now() - Math.random() * 300000).toLocaleTimeString(),
    location: "Sevilla, ES",
    device: "Tablet",
  },
  {
    user_id: "user_005",
    song_title: "Industry Baby",
    artist_name: "Lil Nas X",
    timestamp: new Date(Date.now() - Math.random() * 300000).toLocaleTimeString(),
    location: "Bilbao, ES",
    device: "Smart TV",
  },
]

const generateRealtimeMetrics = () => ({
  activeUsers: Math.floor(Math.random() * 2000) + 8000,
  playsPerMinute: Math.floor(Math.random() * 500) + 1200,
  activeSongs: Math.floor(Math.random() * 200) + 300,
  avgSessionTime: (Math.random() * 60 + 120).toFixed(1),
  peakConcurrent: Math.floor(Math.random() * 1000) + 5000,
  totalBandwidth: (Math.random() * 50 + 100).toFixed(1),
})

const generateActivityData = () => {
  const now = new Date()
  const data = []
  for (let i = 11; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 5 * 60 * 1000)
    data.push({
      time: time.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
      users: Math.floor(Math.random() * 2000) + 6000,
      plays: Math.floor(Math.random() * 3000) + 8000,
      bandwidth: Math.floor(Math.random() * 50) + 80,
    })
  }
  return data
}

export function RealtimeSection() {
  const [topSongs, setTopSongs] = useState(generateTopSongs())
  const [latestPlays, setLatestPlays] = useState(generateLatestPlays())
  const [metrics, setMetrics] = useState(generateRealtimeMetrics())
  const [activityData, setActivityData] = useState(generateActivityData())
  const [isLive, setIsLive] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(3)
  const [selectedView, setSelectedView] = useState("overview")

  useEffect(() => {
    if (!autoRefresh || !isLive) return

    const interval = setInterval(() => {
      setTopSongs(generateTopSongs())
      setLatestPlays(generateLatestPlays())
      setMetrics(generateRealtimeMetrics())
      setActivityData(generateActivityData())
    }, refreshInterval * 1000)

    return () => clearInterval(interval)
  }, [autoRefresh, isLive, refreshInterval])

  const chartConfig = {
    users: { label: "Usuarios", color: "#3b82f6" },
    plays: { label: "Reproducciones", color: "#10b981" },
    bandwidth: { label: "Ancho de Banda", color: "#f59e0b" },
  }

  return (
    <div className="space-y-8">
      {/* Header mejorado */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-2xl">
              <Radio className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Tiempo Real
              </h2>
              <LiveIndicator isLive={isLive} />
            </div>
            <p className="text-slate-600 dark:text-slate-300">Datos actualizándose cada {refreshInterval} segundos</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} id="auto-refresh" />
            <label htmlFor="auto-refresh" className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Auto-actualizar
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Switch checked={isLive} onCheckedChange={setIsLive} id="live-mode" />
            <label htmlFor="live-mode" className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Modo en vivo
            </label>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setTopSongs(generateTopSongs())
              setLatestPlays(generateLatestPlays())
              setMetrics(generateRealtimeMetrics())
              setActivityData(generateActivityData())
            }}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-white/90 dark:hover:bg-slate-700/90"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-white/90 dark:hover:bg-slate-700/90"
          >
            <Settings className="h-4 w-4 mr-2" />
            Configurar
          </Button>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <MetricCard
          title="Usuarios Activos"
          value={metrics.activeUsers}
          change={8.2}
          icon={Users}
          gradient="bg-gradient-to-br from-blue-500 to-cyan-500"
          isLive={isLive}
        />

        <MetricCard
          title="Plays/Minuto"
          value={metrics.playsPerMinute}
          change={12.5}
          icon={Play}
          gradient="bg-gradient-to-br from-purple-500 to-pink-500"
          isLive={isLive}
        />

        <MetricCard
          title="Canciones Activas"
          value={metrics.activeSongs}
          change={-2.1}
          icon={Music2}
          gradient="bg-gradient-to-br from-orange-500 to-red-500"
          isLive={isLive}
        />

        <MetricCard
          title="Sesión Promedio"
          value={Number.parseFloat(metrics.avgSessionTime)}
          change={5.7}
          icon={Clock}
          gradient="bg-gradient-to-br from-green-500 to-emerald-500"
          suffix="min"
          isLive={isLive}
        />

        <MetricCard
          title="Pico Concurrente"
          value={metrics.peakConcurrent}
          change={15.3}
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-indigo-500 to-purple-500"
          isLive={isLive}
        />

        <MetricCard
          title="Ancho de Banda"
          value={Number.parseFloat(metrics.totalBandwidth)}
          change={3.8}
          icon={Activity}
          gradient="bg-gradient-to-br from-teal-500 to-cyan-500"
          suffix=" GB/s"
          isLive={isLive}
        />
      </div>

      {/* Sistema de pestañas mejorado */}
      <Tabs value={selectedView} onValueChange={setSelectedView} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200 dark:border-slate-600">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white text-slate-700 dark:text-slate-200"
          >
            Vista General
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-slate-700 dark:text-slate-200"
          >
            Actividad
          </TabsTrigger>
          <TabsTrigger
            value="content"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white text-slate-700 dark:text-slate-200"
          >
            Contenido
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white text-slate-700 dark:text-slate-200"
          >
            Rendimiento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Top canciones mejorado */}
            <Card className="lg:col-span-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
              <CardHeader className="pb-4 bg-gradient-to-r from-violet-50/80 to-purple-50/80 dark:from-violet-950/30 dark:to-purple-950/30 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                        Top Canciones en Vivo
                      </CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-400">
                        Reproducciones más populares ahora mismo
                      </CardDescription>
                    </div>
                  </div>
                  <LiveIndicator isLive={isLive} />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {topSongs.map((song, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50/80 to-gray-50/80 dark:from-slate-800/50 dark:to-slate-700/50 hover:shadow-md transition-all duration-300 group border border-slate-200/50 dark:border-slate-600/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <span className="text-white font-bold text-lg">#{index + 1}</span>
                          </div>
                          {isLive && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate text-slate-900 dark:text-slate-100">
                            {song.song_title}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400 truncate">{song.artist_name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className="text-xs border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                            >
                              {song.genre}
                            </Badge>
                            <span className="text-xs text-slate-500 dark:text-slate-400">{song.listeners} oyentes</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <Play className="h-3 w-3 text-green-500" />
                          <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{song.plays}</span>
                        </div>
                        <Badge
                          variant={Number.parseFloat(song.growth) > 0 ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {Number.parseFloat(song.growth) > 0 ? "+" : ""}
                          {song.growth}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Últimas reproducciones mejorado */}
            <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
              <CardHeader className="pb-4 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/30 dark:to-teal-950/30 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Stream en Vivo</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Actividad en tiempo real
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {latestPlays.map((play, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-slate-50/80 to-gray-50/80 dark:from-slate-800/50 dark:to-slate-700/50 border border-slate-200/50 dark:border-slate-600/50 hover:shadow-md transition-all duration-300 group animate-in slide-in-from-top-2 duration-500"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Play className="h-3 w-3 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-xs truncate text-slate-900 dark:text-slate-100">
                            {play.song_title}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400 truncate">{play.artist_name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className="text-xs border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                            >
                              {play.device}
                            </Badge>
                            <span className="text-xs text-slate-500 dark:text-slate-400">{play.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium text-blue-600 dark:text-blue-400">{play.user_id}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{play.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-8">
          <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
            <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Actividad en Tiempo Real</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Métricas de los últimos 60 minutos
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={activityData}>
                    <XAxis dataKey="time" tick={{ fontSize: 12, fill: "#6b7280" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="url(#usersGradient)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="plays"
                      stackId="2"
                      stroke="#10b981"
                      fill="url(#playsGradient)"
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="playsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
              <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Géneros Populares</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Distribución actual por género
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { genre: "Pop", percentage: 35, color: "#3b82f6" },
                    { genre: "Hip Hop", percentage: 28, color: "#10b981" },
                    { genre: "Rock", percentage: 20, color: "#f59e0b" },
                    { genre: "Electronic", percentage: 17, color: "#8b5cf6" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-900 dark:text-slate-100">{item.genre}</span>
                        <span className="text-sm font-bold" style={{ color: item.color }}>
                          {item.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${item.percentage}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
              <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                    <Share2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Interacciones Sociales</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Actividad social en tiempo real
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { action: "Compartidas", count: 1247, icon: Share2, color: "#3b82f6" },
                    { action: "Me gusta", count: 3891, icon: Heart, color: "#ef4444" },
                    { action: "Comentarios", count: 892, icon: Volume2, color: "#10b981" },
                    { action: "Guardadas", count: 567, icon: Headphones, color: "#f59e0b" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-slate-50/80 to-gray-50/80 dark:from-slate-800/50 dark:to-slate-700/50 border border-slate-200/50 dark:border-slate-600/50"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${item.color}20`, border: `1px solid ${item.color}30` }}
                        >
                          <item.icon className="h-4 w-4" style={{ color: item.color }} />
                        </div>
                        <span className="font-medium text-slate-900 dark:text-slate-100">{item.action}</span>
                      </div>
                      <span className="font-bold" style={{ color: item.color }}>
                        {item.count.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-8">
          <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
            <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Métricas de Rendimiento</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Estado del sistema en tiempo real
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  { metric: "Latencia promedio", value: "45ms", status: "excellent", color: "#10b981" },
                  { metric: "Uptime del servicio", value: "99.98%", status: "excellent", color: "#10b981" },
                  { metric: "Errores por minuto", value: "0.02", status: "good", color: "#3b82f6" },
                  { metric: "Uso de CPU", value: "23%", status: "good", color: "#3b82f6" },
                  { metric: "Uso de memoria", value: "67%", status: "warning", color: "#f59e0b" },
                  { metric: "Conexiones activas", value: "8,247", status: "excellent", color: "#10b981" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50/80 to-gray-50/80 dark:from-slate-800/50 dark:to-slate-700/50 border border-slate-200/50 dark:border-slate-600/50"
                  >
                    <div>
                      <p className="font-medium text-sm text-slate-900 dark:text-slate-100">{item.metric}</p>
                      <p className="text-2xl font-bold mt-1" style={{ color: item.color }}>
                        {item.value}
                      </p>
                    </div>
                    <div
                      className="w-3 h-3 rounded-full shadow-lg"
                      style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}40` }}
                    ></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
