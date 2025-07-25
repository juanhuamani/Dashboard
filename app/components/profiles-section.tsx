"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Search, Music, Clock, Heart, TrendingUp, MapPin, Calendar, Headphones, Star } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mantener los mismos datos
const usersData = [
  {
    id: "user_001",
    name: "María González",
    email: "maria.gonzalez@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Madrid, España",
    joinDate: "2023-01-15",
    totalPlays: 15420,
    favoriteGenre: "Pop",
    listeningTime: 2340,
    topArtist: "Taylor Swift",
    subscription: "Premium",
    lastActive: "Hace 2 horas",
  },
  {
    id: "user_002",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Barcelona, España",
    joinDate: "2022-11-08",
    totalPlays: 23150,
    favoriteGenre: "Rock",
    listeningTime: 3890,
    topArtist: "Imagine Dragons",
    subscription: "Free",
    lastActive: "Hace 1 hora",
  },
  {
    id: "user_003",
    name: "Ana Martín",
    email: "ana.martin@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Valencia, España",
    joinDate: "2023-03-22",
    totalPlays: 8760,
    favoriteGenre: "Electronic",
    listeningTime: 1560,
    topArtist: "Calvin Harris",
    subscription: "Premium",
    lastActive: "Hace 30 min",
  },
  {
    id: "user_004",
    name: "David López",
    email: "david.lopez@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Sevilla, España",
    joinDate: "2022-07-14",
    totalPlays: 31200,
    favoriteGenre: "Hip Hop",
    listeningTime: 4720,
    topArtist: "Drake",
    subscription: "Premium",
    lastActive: "Hace 5 min",
  },
  {
    id: "user_005",
    name: "Laura Fernández",
    email: "laura.fernandez@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Bilbao, España",
    joinDate: "2023-05-10",
    totalPlays: 12890,
    favoriteGenre: "Indie",
    listeningTime: 2180,
    topArtist: "Arctic Monkeys",
    subscription: "Free",
    lastActive: "Hace 15 min",
  },
]

const userActivityData = [
  { hour: "00", users: 1200 },
  { hour: "04", users: 800 },
  { hour: "08", users: 3200 },
  { hour: "12", users: 4500 },
  { hour: "16", users: 5200 },
  { hour: "20", users: 6800 },
]

const subscriptionData = [
  { type: "Premium", count: 65, color: "#8b5cf6" },
  { type: "Free", count: 35, color: "#06b6d4" },
]

const genrePreferences = [
  { genre: "Pop", users: 2840 },
  { genre: "Rock", users: 2150 },
  { genre: "Hip Hop", users: 1890 },
  { genre: "Electronic", users: 1620 },
  { genre: "Indie", users: 1340 },
]

export function ProfilesSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState(usersData[0])

  const filteredUsers = usersData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const chartConfig = {
    users: {
      label: "Usuarios",
      color: "hsl(var(--chart-1))",
    },
    count: {
      label: "Cantidad",
      color: "hsl(var(--chart-2))",
    },
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-30"></div>
            <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Perfiles de Usuario
            </h2>
            <p className="text-slate-600 dark:text-slate-300">Análisis detallado del comportamiento de usuarios</p>
          </div>
        </div>
      </div>

      {/* Estadísticas generales */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/50 dark:to-pink-950/50 border border-purple-200/50 dark:border-purple-700/50 shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -translate-y-16 translate-x-16"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Total Usuarios</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">12,847</div>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">+12% vs mes anterior</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-950/50 dark:to-cyan-950/50 border border-blue-200/50 dark:border-blue-700/50 shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full -translate-y-16 translate-x-16"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Usuarios Premium</CardTitle>
            <Star className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">8,350</div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">65% del total</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50 border border-green-200/50 dark:border-green-700/50 shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full -translate-y-16 translate-x-16"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Tiempo Promedio</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">2.4h</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">Por sesión</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950/50 dark:to-red-950/50 border border-orange-200/50 dark:border-orange-700/50 shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full -translate-y-16 translate-x-16"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Nuevos Usuarios</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">1,247</div>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Este mes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Lista de usuarios */}
        <Card className="lg:col-span-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
          <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Lista de Usuarios</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Gestión y análisis de perfiles de usuario
                </CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                <Input
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80 bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 cursor-pointer hover:shadow-md ${
                      selectedUser.id === user.id
                        ? "bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-700"
                        : "bg-gradient-to-r from-slate-50/80 to-gray-50/80 dark:from-slate-800/50 dark:to-slate-700/50 border-slate-200/50 dark:border-slate-600/50 hover:from-slate-100/80 hover:to-gray-100/80 dark:hover:from-slate-700/60 dark:hover:to-slate-600/60"
                    }`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{user.name}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-3 w-3 text-slate-500 dark:text-slate-400" />
                          <span className="text-xs text-slate-500 dark:text-slate-400">{user.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={user.subscription === "Premium" ? "default" : "secondary"}>
                        {user.subscription}
                      </Badge>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{user.lastActive}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Perfil detallado */}
        <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
          <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
            <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Perfil Detallado</CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Información completa del usuario seleccionado
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
                  <AvatarFallback className="text-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                    {selectedUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{selectedUser.name}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{selectedUser.email}</p>
                  <Badge variant={selectedUser.subscription === "Premium" ? "default" : "secondary"} className="mt-1">
                    {selectedUser.subscription}
                  </Badge>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200/50 dark:border-blue-700/50">
                  <Music className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Reproducciones Totales</p>
                    <p className="text-lg font-bold text-blue-600">{selectedUser.totalPlays.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200/50 dark:border-green-700/50">
                  <Headphones className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Tiempo de Escucha</p>
                    <p className="text-lg font-bold text-green-600">
                      {Math.floor(selectedUser.listeningTime / 60)}h {selectedUser.listeningTime % 60}m
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200/50 dark:border-purple-700/50">
                  <Heart className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Género Favorito</p>
                    <p className="text-lg font-bold text-purple-600">{selectedUser.favoriteGenre}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-orange-50/80 to-red-50/80 dark:from-orange-950/30 dark:to-red-950/30 border border-orange-200/50 dark:border-orange-700/50">
                  <Star className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Artista Favorito</p>
                    <p className="text-lg font-bold text-orange-600">{selectedUser.topArtist}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-slate-50/80 to-gray-50/80 dark:from-slate-800/50 dark:to-slate-700/50 border border-slate-200/50 dark:border-slate-600/50">
                  <Calendar className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Miembro desde</p>
                    <p className="text-lg font-bold text-slate-600 dark:text-slate-400">
                      {new Date(selectedUser.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos de análisis */}
      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
          <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
            <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Actividad por Hora</CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Usuarios activos durante el día
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={userActivityData}>
                  <XAxis dataKey="hour" tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="users" fill="url(#activityGradient)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
          <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
            <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Tipos de Suscripción</CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Distribución Premium vs Free
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={subscriptionData} cx="50%" cy="50%" outerRadius={80} innerRadius={40} dataKey="count">
                    {subscriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip formatter={(value) => [`${value}%`, "Porcentaje"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-4">
                {subscriptionData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {item.type}: {item.count}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
          <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
            <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Preferencias de Género</CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Géneros más populares entre usuarios
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={genrePreferences} layout="horizontal">
                  <XAxis type="number" tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <YAxis dataKey="genre" type="category" width={80} tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="users" fill="url(#genreGradient)" radius={[0, 4, 4, 0]} />
                  <defs>
                    <linearGradient id="genreGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#0891b2" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
