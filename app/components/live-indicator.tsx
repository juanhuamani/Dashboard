"use client"

export function LiveIndicator({ isLive = true }: { isLive?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className={`w-3 h-3 rounded-full ${isLive ? "bg-red-500" : "bg-slate-400 dark:bg-slate-500"}`}>
          {isLive && (
            <>
              <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
              <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </>
          )}
        </div>
      </div>
      <span
        className={`text-sm font-medium ${isLive ? "text-red-600 dark:text-red-400" : "text-slate-500 dark:text-slate-400"}`}
      >
        {isLive ? "EN VIVO" : "DESCONECTADO"}
      </span>
    </div>
  )
}
