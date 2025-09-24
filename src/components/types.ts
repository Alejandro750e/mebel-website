export interface WorkItem {
  id: number
  title: string
  category: string
  description: string
  images: string[]
}

export interface BeforeAfterProject {
  name: string
  type: string
  before: string
  after: string
  additional?: string
}

export type ImageIndex = number;