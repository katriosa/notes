export interface Note {
  id: number
  text: string
  background: string
  position: { x: number; y: number }
  isPinned: boolean
  positionInGrid: { column: number; row: number }
}
