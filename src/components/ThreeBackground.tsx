import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Check WebGL support
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!gl) {
      console.warn('WebGL not supported, skipping 3D background')
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    camera.position.z = 30

    const clock = new THREE.Clock()
    const mouse = { x: 0, y: 0 }
    const targetMouse = { x: 0, y: 0 }

    document.addEventListener('mousemove', (e) => {
      targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      targetMouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    })

    // Icosahedron wireframe
    const icoGeo = new THREE.IcosahedronGeometry(12, 2)
    const icoEdges = new THREE.EdgesGeometry(icoGeo)
    const icoMat = new THREE.LineBasicMaterial({ color: 0x7B2CBF, transparent: true, opacity: 0.15 })
    const wireframeLine = new THREE.LineSegments(icoEdges, icoMat)
    scene.add(wireframeLine)

    // Torus knot wireframe
    const tkGeo = new THREE.TorusKnotGeometry(8, 2.5, 128, 16)
    const tkMat = new THREE.MeshBasicMaterial({ color: 0x00F5D4, wireframe: true, transparent: true, opacity: 0.04 })
    const torusKnot = new THREE.Mesh(tkGeo, tkMat)
    scene.add(torusKnot)

    // Particle starfield
    const pCount = 2000
    const pPositions = new Float32Array(pCount * 3)
    const pColors = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 100
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 100
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 100
      const c = Math.random()
      if (c < 0.33) { pColors[i * 3] = 0; pColors[i * 3 + 1] = 0.96; pColors[i * 3 + 2] = 0.83 }
      else if (c < 0.66) { pColors[i * 3] = 0.48; pColors[i * 3 + 1] = 0.17; pColors[i * 3 + 2] = 0.75 }
      else { pColors[i * 3] = 1; pColors[i * 3 + 1] = 0.15; pColors[i * 3 + 2] = 0.52 }
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3))
    const pMat = new THREE.PointsMaterial({ size: 0.15, vertexColors: true, transparent: true, opacity: 0.8, sizeAttenuation: true })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    const animate = () => {
      const elapsed = clock.getElapsedTime()
      mouse.x += (targetMouse.x - mouse.x) * 0.05
      mouse.y += (targetMouse.y - mouse.y) * 0.05
      camera.position.x = mouse.x * 2
      camera.position.y = mouse.y * 2
      camera.lookAt(scene.position)
      wireframeLine.rotation.x = elapsed * 0.05
      wireframeLine.rotation.y = elapsed * 0.08
      torusKnot.rotation.x = elapsed * 0.1
      torusKnot.rotation.z = elapsed * 0.05
      particles.rotation.y = elapsed * 0.02
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      icoGeo.dispose(); icoEdges.dispose(); icoMat.dispose()
      tkGeo.dispose(); tkMat.dispose()
      pGeo.dispose(); pMat.dispose()
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />
}
