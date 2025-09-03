'use client'

import { useState, useEffect } from 'react'
import { Clock, User } from 'lucide-react'

// נתוני כתבות לדוגמה
const heroArticles = [
  {
    id: 1,
    title: "מחירי הדיירות בתל אביב: עליה של 8% ברבעון השלישי",
    summary: "דוח חדש מראה עליה משמעותית במחירי הדיירות במרכז העיר, עם השפעה על כל שוק הנדל״ן הישראלי",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop",
    category: "ניתוח שוק",
    author: "עמית כהן",
    publishedAt: "לפני 2 שעות",
    readTime: "5 דקות קריאה"
  },
  {
    id: 2,
    title: "השקעה במשרדים: האם זה הזמן הנכון לקנות?",
    summary: "מומחי השקעות בוחנים את המגמות בשוק המשרדים ונותנים המלצות למשקיעים פרטיים",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop",
    category: "השקעות",
    author: "דנה לוי",
    publishedAt: "לפני 4 שעות",
    readTime: "7 דקות קריאה"
  },
  {
    id: 3,
    title: "פרויקטי התחדשות עירונית: מה צפוי ב-2024",
    summary: "סקירה מקיפה של פרויקטי התחדשות עירונית החדשים ברחבי הארץ וההשפעה על שוק הדיור",
    image: "https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?w=1200&h=600&fit=crop",
    category: "התחדשות עירונית",
    author: "מיכל רוזן",
    publishedAt: "לפני 6 שעות",
    readTime: "4 דקות קריאה"
  }
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroArticles.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])



  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const currentArticle = heroArticles[currentSlide]

  return (
    <section className="relative h-[80vh] md:h-[90vh] overflow-hidden particle-bg">
      
      {/* Epic Background with Parallax Effect */}
      <div className="absolute inset-0">
        {/* Dynamic Background Images */}
        {heroArticles.map((article, index) => (
          <div
            key={article.id}
            className={`absolute inset-0 transition-all duration-1000 transform ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* Multi-Layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-framework-accent-cta/20 via-transparent to-framework-accent-cta/10"></div>
        
        {/* Animated Geometric Shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-framework-accent-cta/20 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute bottom-32 left-16 w-48 h-48 bg-purple-500/10 morphing-border blur-2xl"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-pink-500/15 rounded-lg rotate-45 floating-animation" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Epic Content with Glass Effect */}
      <div className="relative h-full flex items-center">
        <div className="container max-w-screen-xl mx-auto px-m">
          <div className="max-w-3xl">
            
            {/* Floating Category Badge */}
            <div className="reveal-up mb-l">
                                    <div className="inline-block glass-dark px-l py-m rounded-button shimmer">
                        <span className="gradient-text text-body font-bold">
                          ◆ {currentArticle.category}
                        </span>
                      </div>
            </div>

            {/* Epic Title with Gradient */}
            <div className="reveal-up mb-l" style={{transitionDelay: '0.2s'}}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-m">
                <span className="text-framework-white">
                  {currentArticle.title.split(' ').slice(0, -2).join(' ')}
                </span>
                <br />
                <span className="gradient-text">
                  {currentArticle.title.split(' ').slice(-2).join(' ')}
                </span>
              </h1>
            </div>

            {/* Enhanced Summary with Glass Effect */}
            <div className="reveal-up mb-l" style={{transitionDelay: '0.4s'}}>
              <div className="glass-effect rounded-card p-l backdrop-blur-xl">
                <p className="text-xl md:text-2xl leading-relaxed text-white/90 font-light">
                  {currentArticle.summary}
                </p>
              </div>
            </div>

            {/* Meta Info with Icons */}
            <div className="reveal-up flex items-center gap-xl text-white/80 mb-xxl" style={{transitionDelay: '0.6s'}}>
              <div className="flex items-center gap-s glass-effect px-m py-s rounded-button">
                <User className="h-5 w-5 text-framework-accent-cta" />
                <span className="font-medium">{currentArticle.author}</span>
              </div>
              <div className="flex items-center gap-s glass-effect px-m py-s rounded-button">
                <Clock className="h-5 w-5 text-framework-accent-cta" />
                <span className="font-medium">{currentArticle.publishedAt}</span>
              </div>
                                        <div className="hidden sm:flex items-center gap-s glass-effect px-m py-s rounded-button">
                            <span className="text-framework-accent-cta font-bold">◉</span>
                            <span className="font-medium">{currentArticle.readTime}</span>
                          </div>
            </div>

            {/* Epic CTA Button */}
            <div className="reveal-up" style={{transitionDelay: '0.8s'}}>
              <button className="group relative overflow-hidden bg-gradient-to-r from-framework-accent-cta to-pink-600 hover:from-pink-600 hover:to-framework-accent-cta text-white px-xxl py-l rounded-button text-xl font-bold transition-all duration-500 hover-lift pulse-glow">
                <span className="relative z-10 flex items-center gap-m">
                  קרא את הכתבה המלאה
                  <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">←</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>



      {/* Advanced Dots Indicator */}
      <div className="absolute bottom-xxl left-1/2 transform -translate-x-1/2 flex gap-m">
        {heroArticles.map((article, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`group relative transition-all duration-500 ${
              index === currentSlide ? 'scale-110' : 'hover:scale-105'
            }`}
          >
            {/* Dot Background */}
            <div className={`w-4 h-4 rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? 'bg-framework-accent-cta pulse-glow' 
                : 'bg-framework-white/30 hover:bg-framework-white/60'
            }`}>
              {/* Inner Glow */}
              {index === currentSlide && (
                <div className="absolute inset-0 bg-framework-accent-cta rounded-full animate-ping opacity-75"></div>
              )}
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="glass-dark px-m py-s rounded-input text-caption text-framework-white whitespace-nowrap">
                {article.category}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Dynamic Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-framework-white/10 to-transparent">
        <div 
          className="h-full bg-gradient-to-r from-framework-accent-cta via-pink-500 to-purple-600 transition-all duration-1000 ease-out relative overflow-hidden"
          style={{ width: `${((currentSlide + 1) / heroArticles.length) * 100}%` }}
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer"></div>
        </div>
      </div>

      {/* Floating Mini Preview Cards */}
      <div className="absolute bottom-l right-l hidden lg:block">
        <div className="flex flex-col gap-s">
          {heroArticles.map((article, index) => {
            if (index === currentSlide) return null
            const nextIndex = (currentSlide + 1) % heroArticles.length
            const prevIndex = (currentSlide - 1 + heroArticles.length) % heroArticles.length
            
            if (index !== nextIndex && index !== prevIndex) return null
            
            return (
              <button
                key={article.id}
                onClick={() => goToSlide(index)}
                className="group glass-dark rounded-card p-s hover:glass-effect transition-all duration-300 hover-lift w-48"
              >
                <div className="flex items-center gap-s">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-12 h-12 object-cover rounded-input"
                  />
                  <div className="text-right flex-1">
                    <div className="text-caption text-framework-accent-cta font-semibold">
                      {article.category}
                    </div>
                    <div className="text-caption text-framework-white line-clamp-2 group-hover:text-framework-accent-cta transition-colors">
                      {article.title}
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
