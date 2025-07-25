"use client"

import { useState } from "react"
import { Sidebar } from "./components/sidebar"
import { RealtimeSection } from "./components/realtime-section"
import { HistoricalSection } from "./components/historical-section"
import { Header } from "./components/header"
import { ProfilesSection } from "./components/profiles-section"
import { ReportsSection } from "./components/reports-section"

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("realtime")

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6 space-y-6">
          <div className="animate-in fade-in-50 duration-500">
            {activeSection === "realtime" && <RealtimeSection />}
            {activeSection === "historical" && <HistoricalSection />}
            {activeSection === "profiles" && <ProfilesSection />}
            {activeSection === "reports" && <ReportsSection />}
          </div>
        </main>
      </div>
    </div>
  )
}
