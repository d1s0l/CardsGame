export interface Session {
  id: string
  device: string
  browser: string
  os: string
  ip: string
  location?: {
    country: string
    city: string
  }
  lastActive: string
  createdAt: string
  isCurrent: boolean
  isMobile: boolean
}

export interface TerminateSessionRequest {
  sessionId: string
}

export interface TerminateAllSessionsRequest {
  exceptCurrent?: boolean
}