// נתוני מוקאפ לכתבות נדל"ן
export const mockArticles = [
  // נדל"ן למגורים
  {
    id: 'residential-1',
    title: 'מחירי הדירות ממשיכים לעלות - מה מחכה לנו ב-2024?',
    seo_description: 'ניתוח מעמיק של מגמות המחירים בשוק הדיור הישראלי והתחזיות לשנה הקרובה. מה משפיע על המחירים ואיך זה משפיע על הקונים.',
    category: 'residential',
    cover_image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    created_at: '2024-01-15',
    status: 'published'
  },
  {
    id: 'residential-2', 
    title: 'המדריך המלא לקניית דירה ראשונה בישראל',
    seo_description: 'כל מה שצריך לדעת על תהליך רכישת דירה ראשונה: מימון, ביטוח, עורך דין, וטיפים חשובים לקונים צעירים.',
    category: 'residential',
    cover_image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    created_at: '2024-01-12',
    status: 'published'
  },
  {
    id: 'residential-3',
    title: 'שכונות חמות בתל אביב - איפה כדאי לקנות עכשיו?',
    seo_description: 'סקירה של השכונות הטובות ביותר להשקעה בתל אביב, מחירים, פוטנציאל עליה ותחזיות לעתיד.',
    category: 'residential',
    cover_image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    created_at: '2024-01-10',
    status: 'published'
  },

  // נדל"ן משרדי
  {
    id: 'offices-1',
    title: 'המשרדים הזולים ביותר במרכז הארץ - מחירים ומיקומים',
    seo_description: 'מחקר מקיף על שוק המשרדים במרכז הארץ: מחירי השכירות, זמינות ומגמות בתקופת הפוסט-קורונה.',
    category: 'offices',
    cover_image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    created_at: '2024-01-14',
    status: 'published'
  },
  {
    id: 'offices-2',
    title: 'עבודה מהבית מול חזרה למשרד - מה זה אומר על שוק הנדל״ן המסחרי?',
    seo_description: 'איך מגמת העבודה ההיברידית משפיעה על ביקוש למשרדים והזדמנויות השקעה חדשות בענף.',
    category: 'offices',
    cover_image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    created_at: '2024-01-11',
    status: 'published'
  },
  {
    id: 'offices-3',
    title: 'מגדלי משרדים חדשים ברמת גן - פרויקטים עתידיים',
    seo_description: 'סקירת הפרויקטים החדשים בבורסה ברמת גן ואיך הם ישפיעו על שוק המשרדים במטרופולין.',
    category: 'offices',
    cover_image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    created_at: '2024-01-09',
    status: 'published'
  },

  // נדל"ן להשקעה
  {
    id: 'investments-1',
    title: 'השקעה בנדל״ן בחו״ל - הזדמנויות בברלין ולונדון',
    seo_description: 'המדריך למשקיעים ישראלים בנדל״ן בחו״ל: חוקים, מיסוי, תשואות ומלכודות שצריך להימנע מהן.',
    category: 'investments',
    cover_image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    created_at: '2024-01-13',
    status: 'published'
  },
  {
    id: 'investments-2',
    title: 'קרנות נדל״ן (REITs) - האם זה השקעה חכמה לישראלים?',
    seo_description: 'כל מה שצריך לדעת על השקעה בקרנות נדל״ן: סוגים, יתרונות, חסרונות והמלצות למשקיעים פרטיים.',
    category: 'investments',
    cover_image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    created_at: '2024-01-08',
    status: 'published'
  },
  {
    id: 'investments-3',
    title: 'השכרה לטווח קצר - איך להכפיל את התשואה מהנכס שלכם',
    seo_description: 'מדריך מפורט להשכרה בAirbnb ובאפליקציות דומות: רגולציה, רווחיות, וטיפים להצלחה.',
    category: 'investments',
    cover_image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    created_at: '2024-01-07',
    status: 'published'
  },

  // כתבות נוספות לBento Grid
  {
    id: 'featured-1',
    title: 'דוח שוק נדל״ן 2024 - המדד החדש של מחירי הדיירות',
    seo_description: 'דוח מקיף על מצב שוק הנדל״ן בישראל, מגמות מחירים ותחזיות לרבעון הקרוב.',
    category: 'market-analysis',
    cover_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    created_at: '2024-01-16',
    status: 'published'
  },
  {
    id: 'featured-2',
    title: 'פרויקט TAMA 38 בחיפה - הזדמנות זהב לדיירים',
    seo_description: 'פרויקט התחדשות עירונית חדש בחיפה שיכול להכפיל את ערך הדירות בשכונה.',
    category: 'urban-renewal',
    cover_image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    created_at: '2024-01-15',
    status: 'published'
  }
]

// פונקציות עזר לקבלת מאמרים לפי קטגוריה
export const getArticlesByCategory = (category: string) => {
  return mockArticles.filter(article => article.category === category)
}

export const getFeaturedArticles = (limit: number = 6) => {
  return mockArticles.slice(0, limit)
}

export const getLatestArticles = (limit: number = 3) => {
  return mockArticles
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit)
}
