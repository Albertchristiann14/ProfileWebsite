import { CharacterConfig } from '@/types/portfolio'

export const characterManifest: CharacterConfig = {
  mode: '3d-canvas',
  assetBasePath: '/character',
  anglesPath: '/character/angles',
  totalAngles: 45,
  gridRows: 5,
  gridCols: 9,
  idleAsset: '/character/idle.jpg',
  photoAsset: '/character/albert_photo.jpg',
  laughAsset: '/character/laugh.jpg',
  waveAsset: '/character/wave.jpg',
  waveVideo: '/character/wave.webm',
  modelGlbPath: '/character/character.glb',
  hasRealAngles: true
}

/**
 * Calculates the angle index (1 to 45) based on normalized mouse coordinates.
 * @param normX -1 (left) to +1 (right)
 * @param normY -1 (top) to +1 (bottom)
 * @returns 1 to 45
 */
export function getAngleIndexFromCoords(normX: number, normY: number): number {
  // Clamp coordinates within [-1, 1]
  const clampedX = Math.max(-1, Math.min(1, normX))
  const clampedY = Math.max(-1, Math.min(1, normY))

  // Map to column (0 to 8) and row (0 to 4)
  const col = Math.round(((clampedX + 1) / 2) * (characterManifest.gridCols - 1))
  const row = Math.round(((clampedY + 1) / 2) * (characterManifest.gridRows - 1))

  const index = row * characterManifest.gridCols + col + 1
  return Math.max(1, Math.min(characterManifest.totalAngles, index))
}

/**
 * Generates the filename for an angle index.
 * Format: angle-001.webp ... angle-045.webp
 */
export function getAngleFilename(index: number): string {
  const padded = String(index).padStart(3, '0')
  return `${characterManifest.anglesPath}/angle-${padded}.webp`
}
