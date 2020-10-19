export interface RouteParams {
  id: string
}

interface ONGThemes {
  id: string
  name: string
}

export interface ONG {
  name: string
  mission: string
  logoUrl: string
  id: number
  city: string
  state: string
  country: string
  totalProjects: number
  url: string
  themes: {
    theme: ONGThemes[]
  }
}
