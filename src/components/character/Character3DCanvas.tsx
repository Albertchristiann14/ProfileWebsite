import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Character3DCanvasProps {
  normX: number // -1 (left) to 1 (right)
  normY: number // -1 (top) to 1 (bottom)
  isLaughing?: boolean
  isWaving?: boolean
  reducedMotion?: boolean
  className?: string
}

export const Character3DCanvas: React.FC<Character3DCanvasProps> = ({
  normX,
  normY,
  isLaughing = false,
  isWaving = false,
  reducedMotion = false,
  className = ''
}) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const headGroupRef = useRef<THREE.Group | null>(null)
  const leftEyeRef = useRef<THREE.Mesh | null>(null)
  const rightEyeRef = useRef<THREE.Mesh | null>(null)
  const mouthRef = useRef<THREE.Mesh | null>(null)
  const armRef = useRef<THREE.Group | null>(null)
  const requestRef = useRef<number | null>(null)

  // Target rotations for smooth lerping
  const targetRotY = useRef(0)
  const targetRotX = useRef(0)
  const currentRotY = useRef(0)
  const currentRotX = useRef(0)

  // Sync latest reaction states to refs
  const isLaughingRef = useRef(isLaughing)
  const isWavingRef = useRef(isWaving)
  useEffect(() => {
    isLaughingRef.current = isLaughing
  }, [isLaughing])
  useEffect(() => {
    isWavingRef.current = isWaving
  }, [isWaving])

  // Update target based on normX and normY
  useEffect(() => {
    if (reducedMotion) {
      targetRotY.current = 0
      targetRotX.current = 0
      return
    }
    // Subtle, natural head clamping: max ~28 degrees horizontal, ~18 degrees vertical
    targetRotY.current = normX * 0.45
    targetRotX.current = normY * 0.28
  }, [normX, normY, reducedMotion])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth || 480
    const height = mount.clientHeight || 520

    // 1. Scene & Camera
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100)
    camera.position.set(0, 0.3, 4.4)

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    mount.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // 3. Studio Lighting
    // Ambient soft fill
    const ambientLight = new THREE.AmbientLight(0x272730, 1.2)
    scene.add(ambientLight)

    // Key Light (Warm soft white from top-front-right)
    const keyLight = new THREE.DirectionalLight(0xfff6ea, 2.4)
    keyLight.position.set(2.5, 3.5, 3.0)
    scene.add(keyLight)

    // Fill Light (Soft neutral from left)
    const fillLight = new THREE.DirectionalLight(0x94a3b8, 1.0)
    fillLight.position.set(-3.0, 1.0, 2.0)
    scene.add(fillLight)

    // Rim Light (Candy Rose accent from rear-left)
    const rimLight = new THREE.DirectionalLight(0xf43f5e, 3.2)
    rimLight.position.set(-2.5, 2.5, -2.5)
    scene.add(rimLight)

    // Secondary Warm Rim Light (from rear-right)
    const rimLight2 = new THREE.DirectionalLight(0x818cf8, 1.8)
    rimLight2.position.set(2.5, -1.0, -2.0)
    scene.add(rimLight2)

    // 4. Character Materials
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4a373,
      roughness: 0.55,
      metalness: 0.05
    })

    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.7,
      metalness: 0.1
    })

    const glassesFrameMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      roughness: 0.2,
      metalness: 0.8
    })

    const glassesLensMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 1.5,
      reflectivity: 0.8
    })

    const sweaterMaterial = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      roughness: 0.85,
      metalness: 0.0
    })

    const eyeWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.2
    })

    const pupilMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.1
    })

    const mouthMat = new THREE.MeshStandardMaterial({
      color: 0x991b1b,
      roughness: 0.5
    })

    // 5. Construct Character Hierarchy
    const characterGroup = new THREE.Group()
    scene.add(characterGroup)

    // Base Pedestal / Studio Stand
    const pedestalGeo = new THREE.CylinderGeometry(0.95, 1.05, 0.15, 48)
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x121216,
      roughness: 0.4,
      metalness: 0.6
    })
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat)
    pedestal.position.set(0, -1.35, 0)
    characterGroup.add(pedestal)

    // Pedestal Glow Ring
    const ringGeo = new THREE.TorusGeometry(0.96, 0.015, 16, 48)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2
    ring.position.set(0, -1.28, 0)
    characterGroup.add(ring)

    // Torso / Sweater Bust
    const torsoGeo = new THREE.CylinderGeometry(0.68, 0.88, 1.1, 32)
    const torso = new THREE.Mesh(torsoGeo, sweaterMaterial)
    torso.position.set(0, -0.8, 0)
    characterGroup.add(torso)

    // Sweater Collar (Crewneck ribbing)
    const collarGeo = new THREE.TorusGeometry(0.36, 0.06, 16, 32)
    const collarMat = new THREE.MeshStandardMaterial({ color: 0x1f1f23, roughness: 0.9 })
    const collar = new THREE.Mesh(collarGeo, collarMat)
    collar.rotation.x = Math.PI / 2
    collar.position.set(0, -0.22, 0)
    characterGroup.add(collar)

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.45, 24)
    const neck = new THREE.Mesh(neckGeo, skinMaterial)
    neck.position.set(0, -0.1, 0)
    characterGroup.add(neck)

    // --- HEAD GROUP (Rotates toward cursor) ---
    const headGroup = new THREE.Group()
    headGroup.position.set(0, 0.28, 0)
    characterGroup.add(headGroup)
    headGroupRef.current = headGroup

    // Head Base (Rounded cranium & jaw)
    const craniumGeo = new THREE.SphereGeometry(0.55, 32, 28)
    craniumGeo.scale(1.0, 1.12, 1.05)
    const head = new THREE.Mesh(craniumGeo, skinMaterial)
    head.position.set(0, 0.1, 0)
    headGroup.add(head)

    // Jaw / Chin contour
    const chinGeo = new THREE.ConeGeometry(0.42, 0.45, 24)
    chinGeo.scale(1.0, 1.0, 0.9)
    const chin = new THREE.Mesh(chinGeo, skinMaterial)
    chin.rotation.x = Math.PI
    chin.position.set(0, -0.25, 0.12)
    headGroup.add(chin)

    // Nose
    const noseGeo = new THREE.ConeGeometry(0.08, 0.22, 16)
    noseGeo.scale(0.8, 1.0, 1.4)
    const nose = new THREE.Mesh(noseGeo, skinMaterial)
    nose.rotation.x = -0.3
    nose.position.set(0, 0.06, 0.58)
    headGroup.add(nose)

    // Hair Top (Stylized modern volumetric haircut)
    const hairGeo = new THREE.SphereGeometry(0.59, 28, 24)
    hairGeo.scale(1.04, 1.08, 1.08)
    const hair = new THREE.Mesh(hairGeo, hairMaterial)
    hair.position.set(0, 0.22, -0.05)
    headGroup.add(hair)

    // Hair Quiff / Modern Volume
    const quiffGeo = new THREE.SphereGeometry(0.38, 20, 18)
    quiffGeo.scale(1.2, 0.7, 0.9)
    const quiff = new THREE.Mesh(quiffGeo, hairMaterial)
    quiff.position.set(0, 0.62, 0.18)
    quiff.rotation.x = 0.2
    headGroup.add(quiff)

    // Ears
    const earGeo = new THREE.SphereGeometry(0.12, 16, 16)
    earGeo.scale(0.5, 1.2, 0.8)
    const leftEar = new THREE.Mesh(earGeo, skinMaterial)
    leftEar.position.set(0.56, 0.08, 0.0)
    leftEar.rotation.y = 0.2
    headGroup.add(leftEar)

    const rightEar = leftEar.clone()
    rightEar.position.set(-0.56, 0.08, 0.0)
    rightEar.rotation.y = -0.2
    headGroup.add(rightEar)

    // Eyebrows
    const browGeo = new THREE.BoxGeometry(0.18, 0.035, 0.04)
    const leftBrow = new THREE.Mesh(browGeo, hairMaterial)
    leftBrow.position.set(0.2, 0.26, 0.54)
    leftBrow.rotation.z = 0.05
    headGroup.add(leftBrow)

    const rightBrow = new THREE.Mesh(browGeo, hairMaterial)
    rightBrow.position.set(-0.2, 0.26, 0.54)
    rightBrow.rotation.z = -0.05
    headGroup.add(rightBrow)

    // Left Eye Group
    const eyeRadius = 0.08
    const leftEyeGroup = new THREE.Group()
    leftEyeGroup.position.set(0.2, 0.14, 0.5)
    headGroup.add(leftEyeGroup)

    const leftEyeWhite = new THREE.Mesh(new THREE.SphereGeometry(eyeRadius, 20, 20), eyeWhiteMat)
    leftEyeGroup.add(leftEyeWhite)

    const leftPupil = new THREE.Mesh(new THREE.SphereGeometry(eyeRadius * 0.48, 16, 16), pupilMat)
    leftPupil.position.set(0, 0, eyeRadius * 0.76)
    leftEyeGroup.add(leftPupil)
    leftEyeRef.current = leftPupil

    // Right Eye Group
    const rightEyeGroup = new THREE.Group()
    rightEyeGroup.position.set(-0.2, 0.14, 0.5)
    headGroup.add(rightEyeGroup)

    const rightEyeWhite = new THREE.Mesh(new THREE.SphereGeometry(eyeRadius, 20, 20), eyeWhiteMat)
    rightEyeGroup.add(rightEyeWhite)

    const rightPupil = new THREE.Mesh(new THREE.SphereGeometry(eyeRadius * 0.48, 16, 16), pupilMat)
    rightPupil.position.set(0, 0, eyeRadius * 0.76)
    rightEyeGroup.add(rightPupil)
    rightEyeRef.current = rightPupil

    // Modern Stylish Eyeglasses
    const glassesGroup = new THREE.Group()
    glassesGroup.position.set(0, 0.14, 0.53)
    headGroup.add(glassesGroup)

    // Glasses Rim (Left & Right)
    const rimRadius = 0.125
    const glassRimGeo = new THREE.TorusGeometry(rimRadius, 0.018, 16, 32)

    const leftRim = new THREE.Mesh(glassRimGeo, glassesFrameMat)
    leftRim.position.set(0.2, 0, 0.02)
    glassesGroup.add(leftRim)

    const rightRim = new THREE.Mesh(glassRimGeo, glassesFrameMat)
    rightRim.position.set(-0.2, 0, 0.02)
    glassesGroup.add(rightRim)

    // Glasses Lenses
    const lensGeo = new THREE.CircleGeometry(rimRadius - 0.005, 32)
    const leftLens = new THREE.Mesh(lensGeo, glassesLensMat)
    leftLens.position.set(0.2, 0, 0.02)
    glassesGroup.add(leftLens)

    const rightLens = new THREE.Mesh(lensGeo, glassesLensMat)
    rightLens.position.set(-0.2, 0, 0.02)
    glassesGroup.add(rightLens)

    // Glasses Bridge
    const bridgeGeo = new THREE.BoxGeometry(0.14, 0.016, 0.016)
    const bridge = new THREE.Mesh(bridgeGeo, glassesFrameMat)
    bridge.position.set(0, 0.03, 0.02)
    glassesGroup.add(bridge)

    // Glasses Temples
    const templeGeo = new THREE.BoxGeometry(0.015, 0.015, 0.5)
    const leftTemple = new THREE.Mesh(templeGeo, glassesFrameMat)
    leftTemple.position.set(0.33, 0.01, -0.22)
    glassesGroup.add(leftTemple)

    const rightTemple = new THREE.Mesh(templeGeo, glassesFrameMat)
    rightTemple.position.set(-0.33, 0.01, -0.22)
    glassesGroup.add(rightTemple)

    // Mouth / Smile Mesh
    const mouthGeo = new THREE.TorusGeometry(0.11, 0.022, 16, 24, Math.PI * 0.8)
    const mouth = new THREE.Mesh(mouthGeo, mouthMat)
    mouth.rotation.z = Math.PI * 0.1
    mouth.rotation.x = -Math.PI * 0.45
    mouth.position.set(0, -0.16, 0.52)
    headGroup.add(mouth)
    mouthRef.current = mouth

    // --- WAVING ARM GROUP (Optional greeting animation) ---
    const armGroup = new THREE.Group()
    armGroup.position.set(0.72, -0.5, 0)
    characterGroup.add(armGroup)
    armRef.current = armGroup

    const forearmGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.55, 16)
    const forearm = new THREE.Mesh(forearmGeo, sweaterMaterial)
    forearm.position.set(0, 0.28, 0)
    armGroup.add(forearm)

    const handGeo = new THREE.BoxGeometry(0.14, 0.18, 0.06)
    const hand = new THREE.Mesh(handGeo, skinMaterial)
    hand.position.set(0, 0.6, 0)
    armGroup.add(hand)

    // Initial position for waving arm (tucked down unless waving)
    armGroup.rotation.z = -Math.PI * 0.6
    armGroup.position.set(0.65, -0.85, -0.1)

    // 6. Animation Loop with Physics Damping (Lerp)
    let clock = new THREE.Clock()

    const animate = () => {
      requestRef.current = requestAnimationFrame(animate)

      clock.getDelta()
      const elapsedTime = clock.getElapsedTime()

      if (!reducedMotion) {
        // Smooth interpolation for head movement (lerp)
        const lerpFactor = 0.08
        currentRotY.current += (targetRotY.current - currentRotY.current) * lerpFactor
        currentRotX.current += (targetRotX.current - currentRotX.current) * lerpFactor

        if (headGroupRef.current) {
          // Idle subtle micro-breathing & sway
          const idleSway = Math.sin(elapsedTime * 1.5) * 0.02
          const idlePitch = Math.cos(elapsedTime * 1.2) * 0.015

          headGroupRef.current.rotation.y = currentRotY.current + idleSway
          headGroupRef.current.rotation.x = currentRotX.current + idlePitch
          headGroupRef.current.rotation.z = -currentRotY.current * 0.15 // slight roll for realism
        }

        // Idle breathing on character body
        characterGroup.position.y = Math.sin(elapsedTime * 2.0) * 0.015

        // Gaze tracking: pupils shift slightly towards cursor
        if (leftEyeRef.current && rightEyeRef.current) {
          const pupilShiftX = targetRotY.current * 0.022
          const pupilShiftY = -targetRotX.current * 0.018

          leftEyeRef.current.position.x = pupilShiftX
          leftEyeRef.current.position.y = pupilShiftY
          rightEyeRef.current.position.x = pupilShiftX
          rightEyeRef.current.position.y = pupilShiftY
        }

        // Contact Laugh / Smile Reaction
        if (mouthRef.current && headGroupRef.current) {
          if (isLaughingRef.current) {
            // Laugh morph: widen mouth, tilt head back slightly
            mouthRef.current.scale.set(1.4, 2.2, 1.2)
            headGroupRef.current.position.y = 0.28 + Math.abs(Math.sin(elapsedTime * 12)) * 0.03
          } else {
            mouthRef.current.scale.set(1.0, 1.0, 1.0)
            headGroupRef.current.position.y = 0.28
          }
        }

        // Greeting Wave Animation
        if (armRef.current) {
          if (isWavingRef.current) {
            armRef.current.visible = true
            armRef.current.rotation.z = Math.PI * 0.1 + Math.sin(elapsedTime * 6) * 0.25
            armRef.current.position.set(0.68, -0.2, 0.2)
          } else {
            // Gently lower arm and hide
            armRef.current.visible = false
          }
        }
      }

      renderer.render(scene, camera)
    }

    animate()

    // 7. Handle Resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return
      const newWidth = mountRef.current.clientWidth
      const newHeight = mountRef.current.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      rendererRef.current.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [reducedMotion])

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full min-h-[460px] md:min-h-[540px] flex items-center justify-center pointer-events-none select-none ${className}`}
      aria-label="Interactive 3D character bust reacting to cursor"
    />
  )
}
