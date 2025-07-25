"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Award,
  Globe,
  Filter,
  RefreshCw,
  Download,
  Eye,
  EyeOff,
  Zap,
  Music2,
  Users2,
  Clock,
} from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  Area,
  AreaChart,
  ComposedChart,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mantener los mismos datos
const topSongsData = {
  week: [
    { song_title: "Flowers", artist_name: "Miley Cyrus", total_plays: 8420, growth: 15.2, revenue: 421 },
    { song_title: "Anti-Hero", artist_name: "Taylor Swift", total_plays: 7830, growth: 12.8, revenue: 391 },
    { song_title: "Unholy", artist_name: "Sam Smith", total_plays: 7290, growth: -2.1, revenue: 364 },
    { song_title: "As It Was", artist_name: "Harry Styles", total_plays: 6560, growth: -8.5, revenue: 328 },
    { song_title: "Bad Habit", artist_name: "Steve Lacy", total_plays: 6140, growth: 5.7, revenue: 307 },
  ],
  month: [
    { song_title: "As It Was", artist_name: "Harry Styles", total_plays: 154200, growth: 8.3, revenue: 7710 },
    { song_title: "Heat Waves", artist_name: "Glass Animals", total_plays: 142300, growth: -3.2, revenue: 7115 },
    { song_title: "Stay", artist_name: "The Kid LAROI", total_plays: 138900, growth: 12.1, revenue: 6945 },
    { song_title: "Bad Habits", artist_name: "Ed Sheeran", total_plays: 125600, growth: -1.8, revenue: 6280 },
    { song_title: "Good 4 U", artist_name: "Olivia Rodrigo", total_plays: 113400, growth: 6.9, revenue: 5670 },
  ],
  quarter: [
    { song_title: "Blinding Lights", artist_name: "The Weeknd", total_plays: 456200, growth: 5.7, revenue: 22810 },
    { song_title: "Shape of You", artist_name: "Ed Sheeran", total_plays: 421300, growth: -2.1, revenue: 21065 },
    { song_title: "Someone You Loved", artist_name: "Lewis Capaldi", total_plays: 389400, growth: 8.9, revenue: 19470 },
    { song_title: "Watermelon Sugar", artist_name: "Harry Styles", total_plays: 356700, growth: 3.4, revenue: 17835 },
    { song_title: "Levitating", artist_name: "Dua Lipa", total_plays: 332800, growth: 11.2, revenue: 16640 },
  ],
  year: [
    { song_title: "Blinding Lights", artist_name: "The Weeknd", total_plays: 1804200, growth: 15.3, revenue: 90210 },
    { song_title: "Shape of You", artist_name: "Ed Sheeran", total_plays: 1652300, growth: 8.7, revenue: 82615 },
    {
      song_title: "Someone You Loved",
      artist_name: "Lewis Capaldi",
      total_plays: 1528900,
      growth: 12.4,
      revenue: 76445,
    },
    { song_title: "Watermelon Sugar", artist_name: "Harry Styles", total_plays: 1485600, growth: 6.8, revenue: 74280 },
    { song_title: "Levitating", artist_name: "Dua Lipa", total_plays: 1423400, growth: 18.9, revenue: 71170 },
  ],
}

const genreTrendsData = [
  { date: "Ene", Pop: 4000, Rock: 2400, Hip_Hop: 2400, Electronic: 1800, Reggaeton: 1200, Country: 800 },
  { date: "Feb", Pop: 3000, Rock: 1398, Hip_Hop: 2210, Electronic: 2200, Reggaeton: 1400, Country: 900 },
  { date: "Mar", Pop: 2000, Rock: 9800, Hip_Hop: 2290, Electronic: 2500, Reggaeton: 1600, Country: 1100 },
  { date: "Abr", Pop: 2780, Rock: 3908, Hip_Hop: 2000, Electronic: 2100, Reggaeton: 1800, Country: 1200 },
  { date: "May", Pop: 1890, Rock: 4800, Hip_Hop: 2181, Electronic: 2300, Reggaeton: 2000, Country: 1300 },
  { date: "Jun", Pop: 2390, Rock: 3800, Hip_Hop: 2500, Electronic: 2400, Reggaeton: 2200, Country: 1400 },
  { date: "Jul", Pop: 3200, Rock: 2900, Hip_Hop: 2800, Electronic: 2600, Reggaeton: 2400, Country: 1500 },
  { date: "Ago", Pop: 3800, Rock: 2200, Hip_Hop: 3200, Electronic: 2800, Reggaeton: 2600, Country: 1600 },
]

const deviceUsageData = [
  { device_type: "Móvil", percentage: 65, color: "#3b82f6", icon: "📱", growth: 8.2 },
  { device_type: "Escritorio", percentage: 25, color: "#10b981", icon: "💻", growth: -2.1 },
  { device_type: "Tablet", percentage: 7, color: "#f59e0b", icon: "📱", growth: 12.5 },
  { device_type: "Smart TV", percentage: 3, color: "#ef4444", icon: "📺", growth: 45.8 },
]

const timeAnalysisData = [
  { hour: "00:00", users: 1200, plays: 3400 },
  { hour: "02:00", users: 800, plays: 2100 },
  { hour: "04:00", users: 600, plays: 1800 },
  { hour: "06:00", users: 1800, plays: 4200 },
  { hour: "08:00", users: 3200, plays: 8900 },
  { hour: "10:00", users: 4100, plays: 11200 },
  { hour: "12:00", users: 4500, plays: 12800 },
  { hour: "14:00", users: 4200, plays: 11900 },
  { hour: "16:00", users: 5200, plays: 14600 },
  { hour: "18:00", users: 6200, plays: 17800 },
  { hour: "20:00", users: 6800, plays: 19200 },
  { hour: "22:00", users: 5400, plays: 15600 },
]

const regionData = [
  { region: "España", users: 45000, plays: 2800000, revenue: 140000 },
  { region: "México", users: 38000, plays: 2400000, revenue: 96000 },
  { region: "Argentina", users: 28000, plays: 1800000, revenue: 72000 },
  { region: "Colombia", users: 22000, plays: 1400000, revenue: 56000 },
  { region: "Chile", users: 18000, plays: 1200000, revenue: 48000 },
]

export function HistoricalSection() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedMetric, setSelectedMetric] = useState("plays")
  const [showComparison, setShowComparison] = useState(false)
  const [animateCharts, setAnimateCharts] = useState(true)
  const [selectedGenres, setSelectedGenres] = useState(["Pop", "Rock", "Hip_Hop", "Electronic"])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1500)
  }

  const chartConfig = {
    total_plays: { label: "Reproducciones", color: "#8b5cf6" },
    revenue: { label: "Ingresos", color: "#10b981" },
    growth: { label: "Crecimiento", color: "#f59e0b" },
    Pop: { label: "Pop", color: "#3b82f6" },
    Rock: { label: "Rock", color: "#ef4444" },
    Hip_Hop: { label: "Hip Hop", color: "#10b981" },
    Electronic: { label: "Electronic", color: "#f59e0b" },
    Reggaeton: { label: "Reggaeton", color: "#8b5cf6" },
    Country: { label: "Country", color: "#06b6d4" },
  }

  const currentData = topSongsData[selectedPeriod as keyof typeof topSongsData]

  return (
    <div className="space-y-8">
      {/* Header mejorado */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-2xl">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Análisis Histórico
            </h2>
            <p className="text-slate-600 dark:text-slate-300">Tendencias y patrones de consumo musical avanzados</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch checked={animateCharts} onCheckedChange={setAnimateCharts} id="animate-charts" />
            <label htmlFor="animate-charts" className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Animaciones
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Switch checked={showComparison} onCheckedChange={setShowComparison} id="show-comparison" />
            <label htmlFor="show-comparison" className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Comparar
            </label>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            disabled={isLoading}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-white/90 dark:hover:bg-slate-700/90"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Actualizar
          </Button>

          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Métricas principales mejoradas */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-950/50 dark:to-indigo-950/50 border border-purple-200/50 dark:border-purple-700/50 shadow-xl group hover:shadow-2xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Total Reproducciones
            </CardTitle>
            <div className="p-2 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Music2 className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
              {currentData.reduce((sum, item) => sum + item.total_plays, 0).toLocaleString()}
            </div>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
              +{(Math.random() * 10 + 5).toFixed(1)}% vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50 border border-green-200/50 dark:border-green-700/50 shadow-xl group hover:shadow-2xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Ingresos Generados</CardTitle>
            <div className="p-2 bg-green-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">
              €{currentData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              +{(Math.random() * 8 + 3).toFixed(1)}% vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-950/50 dark:to-cyan-950/50 border border-blue-200/50 dark:border-blue-700/50 shadow-xl group hover:shadow-2xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Usuarios Únicos</CardTitle>
            <div className="p-2 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Users2 className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
              {Math.floor(currentData.reduce((sum, item) => sum + item.total_plays, 0) * 0.15).toLocaleString()}
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              +{(Math.random() * 12 + 2).toFixed(1)}% vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950/50 dark:to-red-950/50 border border-orange-200/50 dark:border-orange-700/50 shadow-xl group hover:shadow-2xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Tiempo Promedio</CardTitle>
            <div className="p-2 bg-orange-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Clock className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">
              {(Math.random() * 2 + 2).toFixed(1)}h
            </div>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Por sesión de usuario</p>
          </CardContent>
        </Card>
      </div>

      {/* Pestañas mejoradas */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200 dark:border-slate-600">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-slate-700 dark:text-slate-200"
          >
            Vista General
          </TabsTrigger>
          <TabsTrigger
            value="trends"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white text-slate-700 dark:text-slate-200"
          >
            Tendencias
          </TabsTrigger>
          <TabsTrigger
            value="devices"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white text-slate-700 dark:text-slate-200"
          >
            Dispositivos
          </TabsTrigger>
          <TabsTrigger
            value="regions"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white text-slate-700 dark:text-slate-200"
          >
            Regiones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Top canciones mejorado */}
          <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl overflow-hidden">
            <CardHeader className="pb-6 bg-gradient-to-r from-amber-50/80 to-orange-50/80 dark:from-amber-950/30 dark:to-orange-950/30 border-b border-slate-200/50 dark:border-slate-700/50">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Top 5 Canciones</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Las canciones más reproducidas con métricas de crecimiento
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-[200px] bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-600 backdrop-blur-sm text-slate-900 dark:text-slate-100">
                      <Calendar className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Seleccionar período" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600">
                      <SelectItem value="week" className="text-slate-900 dark:text-slate-100">
                        📅 Última Semana
                      </SelectItem>
                      <SelectItem value="month" className="text-slate-900 dark:text-slate-100">
                        📅 Último Mes
                      </SelectItem>
                      <SelectItem value="quarter" className="text-slate-900 dark:text-slate-100">
                        📊 Último Trimestre
                      </SelectItem>
                      <SelectItem value="year" className="text-slate-900 dark:text-slate-100">
                        🗓️ Último Año
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger className="w-[160px] bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-600 backdrop-blur-sm text-slate-900 dark:text-slate-100">
                      <SelectValue placeholder="Métrica" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600">
                      <SelectItem value="plays" className="text-slate-900 dark:text-slate-100">
                        Reproducciones
                      </SelectItem>
                      <SelectItem value="revenue" className="text-slate-900 dark:text-slate-100">
                        Ingresos
                      </SelectItem>
                      <SelectItem value="growth" className="text-slate-900 dark:text-slate-100">
                        Crecimiento
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height={400}>
                      <ComposedChart
                        data={currentData}
                        layout="horizontal"
                        margin={{ left: 120, right: 30, top: 20, bottom: 20 }}
                      >
                        <XAxis type="number" tick={{ fontSize: 12, fill: "#6b7280" }} />
                        <YAxis
                          dataKey="song_title"
                          type="category"
                          tick={{ fontSize: 10, fill: "#374151" }}
                          width={110}
                          interval={0}
                        />
                        <ChartTooltip
                          content={<ChartTooltipContent />}
                          formatter={(value, name, props) => [
                            selectedMetric === "plays"
                              ? `${value.toLocaleString()} reproducciones`
                              : selectedMetric === "revenue"
                                ? `€${value.toLocaleString()}`
                                : `${value}% crecimiento`,
                            `${props.payload.artist_name} - ${props.payload.song_title}`,
                          ]}
                        />
                        <Bar
                          dataKey={
                            selectedMetric === "plays"
                              ? "total_plays"
                              : selectedMetric === "revenue"
                                ? "revenue"
                                : "growth"
                          }
                          fill="url(#topSongsGradient)"
                          radius={[0, 8, 8, 0]}
                        />
                        <defs>
                          <linearGradient id="topSongsGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#fbbf24" />
                            <stop offset="100%" stopColor="#f59e0b" />
                          </linearGradient>
                        </defs>
                      </ComposedChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg mb-4 text-slate-900 dark:text-slate-100">
                    Detalles por Canción
                  </h4>
                  {currentData.map((song, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50/80 to-gray-50/80 dark:from-slate-800/50 dark:to-slate-700/50 hover:shadow-md transition-all duration-300 group border border-slate-200/50 dark:border-slate-600/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">{song.song_title}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{song.artist_name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900 dark:text-slate-100">
                          {song.total_plays.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant={song.growth > 0 ? "default" : "destructive"} className="text-xs">
                            {song.growth > 0 ? "+" : ""}
                            {song.growth}%
                          </Badge>
                          <span className="text-xs text-green-600 dark:text-green-400">€{song.revenue}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Análisis temporal */}
          <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
            <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Análisis Temporal</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Patrones de uso durante el día
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={timeAnalysisData}>
                    <XAxis dataKey="hour" tick={{ fontSize: 12, fill: "#6b7280" }} />
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
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="playsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-8">
          <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
            <CardHeader className="pb-6 border-b border-slate-200/50 dark:border-slate-700/50">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                      Tendencias de Géneros Musicales
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Evolución de la popularidad por género con controles interactivos
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    Géneros visibles: {selectedGenres.length}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {Object.keys(chartConfig)
                  .filter((key) => !["total_plays", "revenue", "growth"].includes(key))
                  .map((genre) => (
                    <Button
                      key={genre}
                      variant={selectedGenres.includes(genre) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (selectedGenres.includes(genre)) {
                          setSelectedGenres(selectedGenres.filter((g) => g !== genre))
                        } else {
                          setSelectedGenres([...selectedGenres, genre])
                        }
                      }}
                      className="text-xs"
                    >
                      {selectedGenres.includes(genre) ? (
                        <Eye className="h-3 w-3 mr-1" />
                      ) : (
                        <EyeOff className="h-3 w-3 mr-1" />
                      )}
                      {chartConfig[genre as keyof typeof chartConfig].label}
                    </Button>
                  ))}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={450}>
                  <LineChart data={genreTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#6b7280" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    {selectedGenres.map((genre) => (
                      <Line
                        key={genre}
                        type="monotone"
                        dataKey={genre}
                        stroke={chartConfig[genre as keyof typeof chartConfig].color}
                        strokeWidth={3}
                        dot={{ fill: chartConfig[genre as keyof typeof chartConfig].color, strokeWidth: 2, r: 4 }}
                        activeDot={{
                          r: 6,
                          stroke: chartConfig[genre as keyof typeof chartConfig].color,
                          strokeWidth: 2,
                        }}
                        animationDuration={animateCharts ? 1000 : 0}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
              <CardHeader className="pb-6 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                      Distribución por Dispositivo
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Uso de la plataforma por tipo de dispositivo
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={deviceUsageData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        innerRadius={60}
                        dataKey="percentage"
                        label={false}
                        animationDuration={animateCharts ? 1000 : 0}
                      >
                        {deviceUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip formatter={(value, name, props) => [`${value}%`, props.payload.device_type]} />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="grid grid-cols-2 gap-4 mt-6 w-full">
                    {deviceUsageData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-slate-50/80 to-gray-50/80 dark:from-slate-800/50 dark:to-slate-700/50 hover:shadow-md transition-all duration-300 group border border-slate-200/50 dark:border-slate-600/50"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-2xl">{item.icon}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">{item.device_type}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-lg font-bold" style={{ color: item.color }}>
                              {item.percentage}%
                            </p>
                            <Badge variant={item.growth > 0 ? "default" : "destructive"} className="text-xs">
                              {item.growth > 0 ? "+" : ""}
                              {item.growth}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
              <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                      Rendimiento por Dispositivo
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Métricas de engagement por plataforma
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {deviceUsageData.map((device, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{device.icon}</span>
                          <span className="font-medium text-slate-900 dark:text-slate-100">{device.device_type}</span>
                        </div>
                        <span className="text-sm font-bold" style={{ color: device.color }}>
                          {device.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${device.percentage}%`,
                            backgroundColor: device.color,
                            background: `linear-gradient(90deg, ${device.color}, ${device.color}dd)`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>Tiempo promedio: {(Math.random() * 2 + 1).toFixed(1)}h</span>
                        <span>Satisfacción: {(Math.random() * 20 + 80).toFixed(0)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regions" className="space-y-8">
          <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
            <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Análisis por Regiones</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Distribución geográfica de usuarios y ingresos
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={regionData}>
                        <XAxis dataKey="region" tick={{ fontSize: 11, fill: "#6b7280" }} />
                        <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="users" fill="url(#regionGradient)" radius={[4, 4, 0, 0]} />
                        <defs>
                          <linearGradient id="regionGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#ea580c" />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg mb-4 text-slate-900 dark:text-slate-100">Detalles por Región</h4>
                  {regionData.map((region, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50/80 to-gray-50/80 dark:from-slate-800/50 dark:to-slate-700/50 hover:shadow-md transition-all duration-300 border border-slate-200/50 dark:border-slate-600/50"
                    >
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{region.region}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {region.users.toLocaleString()} usuarios
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 dark:text-green-400">
                          €{region.revenue.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {region.plays.toLocaleString()} plays
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
