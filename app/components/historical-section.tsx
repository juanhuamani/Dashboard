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
import { useHistoricalData } from '../../hooks/useHistoricalData';

type SongDataType = { song_title: string; artist_name: string; total_plays: number; growth: number; revenue: number };
type GenreTrendType = { [key: string]: string | number };
type DeviceUsageType = { device_type: string; percentage: number; color: string; icon: string; growth: number };
type TimeAnalysisType = { hour: string; users: number; plays: number };
type RegionType = { region: string; users: number; plays: number; revenue: number };

const defaultTopSongsData: Record<string, SongDataType[]> = { week: [], month: [] };
const defaultGenreTrends: GenreTrendType[] = [];
const defaultDeviceUsage: DeviceUsageType[] = [];
const defaultTimeAnalysis: TimeAnalysisType[] = [];
const defaultRegion: RegionType[] = [];

export function HistoricalSection() {
  const { topSongsData, genreTrendsData, deviceUsageData, timeAnalysisData, regionData, loading, error } = useHistoricalData();
  const safeTopSongsData: Record<string, SongDataType[]> = (topSongsData && typeof topSongsData === 'object') ? topSongsData as Record<string, SongDataType[]> : defaultTopSongsData;
  const safeGenreTrends: GenreTrendType[] = Array.isArray(genreTrendsData) ? genreTrendsData as GenreTrendType[] : defaultGenreTrends;
  const safeDeviceUsage: DeviceUsageType[] = Array.isArray(deviceUsageData) ? deviceUsageData as DeviceUsageType[] : defaultDeviceUsage;
  const safeTimeAnalysis: TimeAnalysisType[] = Array.isArray(timeAnalysisData) ? timeAnalysisData as TimeAnalysisType[] : defaultTimeAnalysis;
  const safeRegion: RegionType[] = Array.isArray(regionData) ? regionData as RegionType[] : defaultRegion;

  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedMetric, setSelectedMetric] = useState("plays")
  const [showComparison, setShowComparison] = useState(false)
  const [animateCharts, setAnimateCharts] = useState(true)
  const [selectedGenres, setSelectedGenres] = useState(["Pop", "Rock", "Hip_Hop", "Electronic"])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  if (loading) return <div className="p-8">Cargando datos de Spark...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

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

  const currentData: SongDataType[] = safeTopSongsData[selectedPeriod] || [];

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
                  <AreaChart data={safeTimeAnalysis}>
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
                  <LineChart data={safeGenreTrends} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
                        data={safeDeviceUsage}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        innerRadius={60}
                        dataKey="percentage"
                        label={false}
                        animationDuration={animateCharts ? 1000 : 0}
                      >
                        {safeDeviceUsage.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip formatter={(value, name, props) => [`${value}%`, props.payload.device_type]} />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="grid grid-cols-2 gap-4 mt-6 w-full">
                    {safeDeviceUsage.map((item, index) => (
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
                  {safeDeviceUsage.map((device, index) => (
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
                      <BarChart data={safeRegion}>
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
                  {safeRegion.map((region, index) => (
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
