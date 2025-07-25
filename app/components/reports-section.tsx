"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Download, TrendingUp, DollarSign, Users, Music, BarChart3, Activity, Target } from "lucide-react"
import { Line, LineChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Area, AreaChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mantener los mismos datos
const revenueData = [
  { month: "Ene", revenue: 45000, subscriptions: 1200, churn: 5.2 },
  { month: "Feb", revenue: 52000, subscriptions: 1350, churn: 4.8 },
  { month: "Mar", revenue: 48000, subscriptions: 1280, churn: 5.5 },
  { month: "Abr", revenue: 61000, subscriptions: 1520, churn: 4.2 },
  { month: "May", revenue: 58000, subscriptions: 1480, churn: 4.6 },
  { month: "Jun", revenue: 67000, subscriptions: 1680, churn: 3.9 },
]

const performanceData = [
  { metric: "Tiempo de carga promedio", value: "1.2s", change: "-15%", status: "good" },
  { metric: "Uptime del servicio", value: "99.9%", change: "+0.1%", status: "excellent" },
  { metric: "Errores por minuto", value: "0.03", change: "-45%", status: "good" },
  { metric: "Usuarios concurrentes máx.", value: "12,847", change: "+23%", status: "excellent" },
]

const topContent = [
  { rank: 1, title: "Blinding Lights", artist: "The Weeknd", plays: 2840000, revenue: 14200 },
  { rank: 2, title: "Shape of You", artist: "Ed Sheeran", plays: 2650000, revenue: 13250 },
  { rank: 3, title: "Someone You Loved", artist: "Lewis Capaldi", plays: 2420000, revenue: 12100 },
  { rank: 4, title: "Watermelon Sugar", artist: "Harry Styles", plays: 2180000, revenue: 10900 },
  { rank: 5, title: "Levitating", artist: "Dua Lipa", plays: 2050000, revenue: 10250 },
]

const reports = [
  {
    id: 1,
    title: "Reporte Mensual de Ingresos",
    description: "Análisis detallado de ingresos y suscripciones del mes actual",
    type: "Financiero",
    date: "2024-01-15",
    status: "Completado",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "Análisis de Comportamiento de Usuario",
    description: "Patrones de uso y preferencias musicales de los usuarios",
    type: "Analítico",
    date: "2024-01-14",
    status: "Completado",
    size: "1.8 MB",
  },
  {
    id: 3,
    title: "Reporte de Rendimiento Técnico",
    description: "Métricas de rendimiento del sistema y infraestructura",
    type: "Técnico",
    date: "2024-01-13",
    status: "En proceso",
    size: "3.1 MB",
  },
  {
    id: 4,
    title: "Top Contenido y Artistas",
    description: "Ranking de canciones y artistas más populares",
    type: "Contenido",
    date: "2024-01-12",
    status: "Completado",
    size: "1.2 MB",
  },
]

export function ReportsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedReportType, setSelectedReportType] = useState("all")

  const filteredReports = reports.filter(
    (report) => selectedReportType === "all" || report.type.toLowerCase() === selectedReportType.toLowerCase(),
  )

  const chartConfig = {
    revenue: {
      label: "Ingresos",
      color: "#10b981",
    },
    subscriptions: {
      label: "Suscripciones",
      color: "#3b82f6",
    },
    churn: {
      label: "Churn Rate",
      color: "#ef4444",
    },
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-lg opacity-30"></div>
            <div className="relative bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-2xl">
              <FileText className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Reportes
            </h2>
            <p className="text-slate-600 dark:text-slate-300">Análisis completo y reportes del sistema</p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
          <Download className="h-4 w-4 mr-2" />
          Generar Reporte
        </Button>
      </div>

      {/* KPIs principales */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50 border border-green-200/50 dark:border-green-700/50 shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full -translate-y-16 translate-x-16"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Ingresos Mensuales</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">€67,000</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">+15.3% vs mes anterior</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-950/50 dark:to-cyan-950/50 border border-blue-200/50 dark:border-blue-700/50 shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full -translate-y-16 translate-x-16"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Nuevas Suscripciones</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">1,680</div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">+13.5% vs mes anterior</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/50 dark:to-pink-950/50 border border-purple-200/50 dark:border-purple-700/50 shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -translate-y-16 translate-x-16"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Reproducciones</CardTitle>
            <Music className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">24.8M</div>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">+8.2% vs mes anterior</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950/50 dark:to-red-950/50 border border-orange-200/50 dark:border-orange-700/50 shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full -translate-y-16 translate-x-16"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Churn Rate</CardTitle>
            <Target className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">3.9%</div>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">-1.3% vs mes anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200 dark:border-slate-600">
          <TabsTrigger
            value="analytics"
            className="text-slate-700 dark:text-slate-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
          >
            Análisis
          </TabsTrigger>
          <TabsTrigger
            value="financial"
            className="text-slate-700 dark:text-slate-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
          >
            Financiero
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className="text-slate-700 dark:text-slate-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
          >
            Rendimiento
          </TabsTrigger>
          <TabsTrigger
            value="content"
            className="text-slate-700 dark:text-slate-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
          >
            Contenido
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
              <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Tendencia de Ingresos</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Evolución mensual de ingresos y suscripciones
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={revenueData}>
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
                      <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#10b981"
                        fill="url(#revenueGradient)"
                        strokeWidth={2}
                      />
                      <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
              <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Churn Rate</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Tasa de cancelación mensual
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
                      <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="churn"
                        stroke="#ef4444"
                        strokeWidth={3}
                        dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
            <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Métricas de Rendimiento</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Indicadores clave de rendimiento del sistema
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-2">
                {performanceData.map((metric, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50/80 to-gray-50/80 dark:from-slate-800/50 dark:to-slate-700/50 border border-slate-200/50 dark:border-slate-600/50"
                  >
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">{metric.metric}</p>
                      <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{metric.value}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={metric.status === "excellent" ? "default" : "secondary"}>{metric.change}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
            <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                  <Music className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Top Contenido</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Canciones y artistas con mejor rendimiento
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {topContent.map((item) => (
                  <div
                    key={item.rank}
                    className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50/80 to-gray-50/80 dark:from-slate-800/50 dark:to-slate-700/50 border border-slate-200/50 dark:border-slate-600/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        {item.rank}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{item.artist}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900 dark:text-slate-100">
                        {item.plays.toLocaleString()} plays
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">€{item.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
            <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Análisis Financiero</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Desglose detallado de ingresos y gastos
                    </CardDescription>
                  </div>
                </div>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-[180px] bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600">
                    <SelectItem value="month" className="text-slate-900 dark:text-slate-100">
                      Este mes
                    </SelectItem>
                    <SelectItem value="quarter" className="text-slate-900 dark:text-slate-100">
                      Este trimestre
                    </SelectItem>
                    <SelectItem value="year" className="text-slate-900 dark:text-slate-100">
                      Este año
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={revenueData}>
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="url(#financialGradient)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="subscriptions" fill="url(#subscriptionGradient)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="financialGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                      <linearGradient id="subscriptionGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Lista de reportes generados */}
      <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
        <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Reportes Generados</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Historial de reportes disponibles para descarga
              </CardDescription>
            </div>
            <Select value={selectedReportType} onValueChange={setSelectedReportType}>
              <SelectTrigger className="w-[180px] bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                <SelectValue placeholder="Tipo de reporte" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600">
                <SelectItem value="all" className="text-slate-900 dark:text-slate-100">
                  Todos
                </SelectItem>
                <SelectItem value="financiero" className="text-slate-900 dark:text-slate-100">
                  Financiero
                </SelectItem>
                <SelectItem value="analítico" className="text-slate-900 dark:text-slate-100">
                  Analítico
                </SelectItem>
                <SelectItem value="técnico" className="text-slate-900 dark:text-slate-100">
                  Técnico
                </SelectItem>
                <SelectItem value="contenido" className="text-slate-900 dark:text-slate-100">
                  Contenido
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50/80 to-gray-50/80 dark:from-slate-800/50 dark:to-slate-700/50 hover:shadow-md transition-all duration-300 border border-slate-200/50 dark:border-slate-600/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{report.title}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{report.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                        >
                          {report.type}
                        </Badge>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <Badge variant={report.status === "Completado" ? "default" : "secondary"}>{report.status}</Badge>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{report.date}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 bg-transparent"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
