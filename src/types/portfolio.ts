export interface Project {
  id: string
  title: string
  displayTitle: string
  category: 'Full-Stack' | 'AI & ML' | 'Mobile & GIS' | 'Productivity'
  description: string
  detailedDescription: string
  repoUrl: string
  liveUrl?: string
  featured: boolean
  tags: string[]
  architecturePoints: string[]
  techStack: {
    frontend?: string
    backend?: string
    database?: string
    ai?: string
    deployment?: string
  }
  previewType: 'screenshot' | 'blueprint'
  screenshotUrl?: string
  accentColor: string
}

export interface CharacterConfig {
  mode: '3d-canvas' | 'angles-matrix'
  assetBasePath: string
  anglesPath: string
  totalAngles: number
  gridRows: number
  gridCols: number
  idleAsset: string
  photoAsset: string
  laughAsset: string
  waveAsset: string
  waveVideo?: string
  modelGlbPath?: string
  hasRealAngles: boolean
}

export interface TechItem {
  name: string
  category: 'Frontend' | 'Backend' | 'AI & Data' | 'Database & Mobile' | 'Dev Tools & Cloud'
  proficiency?: string
  repoEvidence: string[]
}
