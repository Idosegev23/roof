'use client'

import { useEffect, useRef, useState } from 'react'

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  animation?: 'up' | 'scale' | 'left' | 'right'
  delay?: number
  threshold?: number
}

export function RevealOnScroll({ 
  children, 
  className = '', 
  animation = 'up', 
  delay = 0,
  threshold = 0.1 
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay, threshold])

  const getAnimationClass = () => {
    const baseClass = 'transition-all duration-800 ease-out'
    
    if (!isVisible) {
      switch (animation) {
        case 'up':
          return `${baseClass} opacity-0 translate-y-8`
        case 'scale':
          return `${baseClass} opacity-0 scale-95`
        case 'left':
          return `${baseClass} opacity-0 -translate-x-8`
        case 'right':
          return `${baseClass} opacity-0 translate-x-8`
        default:
          return `${baseClass} opacity-0 translate-y-8`
      }
    }
    
    return `${baseClass} opacity-100 translate-y-0 translate-x-0 scale-100`
  }

  return (
    <div 
      ref={ref}
      className={`${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  )
}
