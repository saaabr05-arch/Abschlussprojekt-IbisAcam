export interface BMWModel {
  name: string;
  typ: string;
  bes: string;
  bild: string;
}

export interface BMWCar {
  name: string;
  category: string;
  why: string;
  tags: string[];
  image: string;
}

export const bmwModels: Record<string, BMWModel[]> = {
  "Kompakt & Einstieg": [
    {
      name: "1er",
      typ: "Kompakt-Limousine",
      bes: "Günstigster Einstieg",
      bild: "/img/1er.jpg"
    },
    {
      name: "2er GC",
      typ: "Gran Coupé (4-Türer)",
      bes: "Sportlich, kompakt, stylisch",
      bild: "/img/2er_Gc.jpg"
    },
    {
      name: "2er AT",
      typ: "Active Tourer (Kompaktvan)",
      bes: "Praktisch für Familien",
      bild: "/img/2er_AT.jpg"
    },
    {
      name: "X1 / iX1",
      typ: "Kompakter SUV / elektrisch",
      bes: "Stadtfreundlich, modern",
      bild: "/img/x1.jpg"
    },
    {
      name: "X2 / iX2",
      typ: "SUV-Coupé / elektrisch",
      bes: "Jugendlich, stylisch",
      bild: "/img/x2.jpg"
    }
  ],
  "Mittelklasse": [
    {
      name: "3er",
      typ: "Limousine / Touring",
      bes: "Klassiker, sehr vielseitig",
      bild: "/img/3er.jpg"
    },
    {
      name: "4er",
      typ: "Coupé / Cabrio / GC",
      bes: "Sportlich & elegant",
      bild: "/img/4er.jpg"
    },
    {
      name: "X3 / iX3",
      typ: "SUV / elektrisch",
      bes: "Alltag, Reisen, Familie",
      bild: "/img/x3.jpg"
    },
    {
      name: "X4",
      typ: "SUV-Coupé",
      bes: "Design-orientierter X3",
      bild: "/img/x4.jpg"
    },
    {
      name: "i4",
      typ: "Elektro-Gran Coupé",
      bes: "Dynamisch & nachhaltig",
      bild: "/img/i4.jpg"
    }
  ],
  "Oberklasse": [
    {
      name: "5er / i5",
      typ: "Limousine / Touring",
      bes: "Business-Klasse, jetzt auch elektrisch",
      bild: "/img/5er.jpg"
    },
    {
      name: "X5",
      typ: "SUV",
      bes: "Komfort + Power, Klassiker",
      bild: "/img/x5.jpg"
    },
    {
      name: "X6",
      typ: "SUV-Coupé",
      bes: "Prestige & Design",
      bild: "/img/x6.jpg"
    },
    {
      name: "7er / i7",
      typ: "Luxuslimousine / elektrisch",
      bes: "Hightech & Komfort pur",
      bild: "/img/7er.jpg"
    },
    {
      name: "X7",
      typ: "Luxus-SUV mit 7 Sitzen",
      bes: "Maximale Größe & Status",
      bild: "/img/x7.jpg"
    }
  ],
  "Sportmodelle": [
    {
      name: "M2",
      typ: "Kompakt, puristisch",
      bes: "Track & Fun",
      bild: "/img/m2.jpg"
    },
    {
      name: "M3 / M4",
      typ: "Limousine / Coupé",
      bes: "Mittelklasse-Performance",
      bild: "/img/m4.jpg"
    },
    {
      name: "M5",
      typ: "Business mit brutalem Antrieb",
      bes: "Schnell & komfortabel",
      bild: "/img/m5.jpg"
    },
    {
      name: "M8",
      typ: "Luxus-Coupé/Cabrio/GC",
      bes: "Stark, edel, teuer",
      bild: "/img/m8.jpg"
    },
    {
      name: "XM",
      typ: "M-SUV Hybrid",
      bes: "Power & Exklusivität",
      bild: "/img/xm.jpg"
    }
  ],
  "Lifestyle & Spaß": [
    {
      name: "Z4",
      typ: "Roadster",
      bes: "Fahrspaß offen & leicht",
      bild: "/img/z4.jpg"
    },
    {
      name: "8er",
      typ: "Coupé/GC/Cabrio",
      bes: "Luxus + Sport",
      bild: "/img/8er.jpg"
    }
  ]
};

export const bmwCars: BMWCar[] = [
  {
    name: "BMW 1er",
    category: "Kompakt & Einstieg",
    why: "Günstigster Einstieg in die BMW-Welt",
    tags: ["kompakt", "günstig", "einsteiger", "stadt"],
    image: "/img/1er.jpg"
  },
  {
    name: "BMW 2er GC",
    category: "Kompakt & Einstieg",
    why: "Sportlich, kompakt und stylisch",
    tags: ["kompakt", "sportlich", "stylisch", "jung"],
    image: "/img/2er_Gc.jpg"
  },
  {
    name: "BMW 2er AT",
    category: "Kompakt & Einstieg",
    why: "Praktisch für Familien",
    tags: ["kompakt", "familie", "praktisch", "platz"],
    image: "/img/2er_AT.jpg"
  },
  {
    name: "BMW X1",
    category: "Kompakt & Einstieg",
    why: "Stadtfreundlicher SUV",
    tags: ["suv", "kompakt", "modern", "stadt"],
    image: "/img/x1.jpg"
  },
  {
    name: "BMW X2",
    category: "Kompakt & Einstieg",
    why: "SUV-Coupé - jugendlich und stylisch",
    tags: ["suv", "stylisch", "jung"],
    image: "/img/x2.jpg"
  },
  {
    name: "BMW 3er",
    category: "Mittelklasse",
    why: "Der BMW-Klassiker - sehr vielseitig",
    tags: ["klassiker", "vielseitig", "limousine"],
    image: "/img/3er.jpg"
  },
  {
    name: "BMW 4er",
    category: "Mittelklasse",
    why: "Sportlich und elegant",
    tags: ["sportlich", "elegant", "coupe"],
    image: "/img/4er.jpg"
  },
  {
    name: "BMW X3",
    category: "Mittelklasse",
    why: "Perfekt für Alltag, Reisen und Familie",
    tags: ["suv", "familie", "alltag", "reisen"],
    image: "/img/x3.jpg"
  },
  {
    name: "BMW X4",
    category: "Mittelklasse",
    why: "Design-orientierter SUV",
    tags: ["suv", "design", "stylisch"],
    image: "/img/x4.jpg"
  },
  {
    name: "BMW i4",
    category: "Mittelklasse",
    why: "Dynamisch und nachhaltig - Elektro",
    tags: ["elektrisch", "dynamisch", "nachhaltig", "modern"],
    image: "/img/i4.jpg"
  },
  {
    name: "BMW 5er",
    category: "Oberklasse",
    why: "Business-Klasse mit Komfort",
    tags: ["business", "komfort", "luxus"],
    image: "/img/5er.jpg"
  },
  {
    name: "BMW X5",
    category: "Oberklasse",
    why: "SUV-Klassiker mit Komfort und Power",
    tags: ["suv", "komfort", "power", "klassiker", "luxus"],
    image: "/img/x5.jpg"
  },
  {
    name: "BMW X6",
    category: "Oberklasse",
    why: "Prestige und Design",
    tags: ["suv", "prestige", "design", "luxus"],
    image: "/img/x6.jpg"
  },
  {
    name: "BMW 7er",
    category: "Oberklasse",
    why: "Luxuslimousine mit Hightech",
    tags: ["luxus", "hightech", "komfort"],
    image: "/img/7er.jpg"
  },
  {
    name: "BMW X7",
    category: "Oberklasse",
    why: "Maximale Größe und Status",
    tags: ["luxus", "suv", "familie", "status", "groß"],
    image: "/img/x7.jpg"
  },
  {
    name: "BMW M2",
    category: "Sportmodelle",
    why: "Kompakter Spaß auf der Rennstrecke",
    tags: ["sport", "track", "fun", "kompakt", "puristisch"],
    image: "/img/m2.jpg"
  },
  {
    name: "BMW M3/M4",
    category: "Sportmodelle",
    why: "Mittelklasse-Performance",
    tags: ["sport", "performance", "track", "power"],
    image: "/img/m4.jpg"
  },
  {
    name: "BMW M5",
    category: "Sportmodelle",
    why: "Business mit brutalem Antrieb",
    tags: ["sport", "business", "power", "komfort"],
    image: "/img/m5.jpg"
  },
  {
    name: "BMW M8",
    category: "Sportmodelle",
    why: "Luxus-Power - stark, edel, teuer",
    tags: ["sport", "luxus", "power", "edel"],
    image: "/img/m8.jpg"
  },
  {
    name: "BMW XM",
    category: "Sportmodelle",
    why: "M-SUV mit Hybrid-Power",
    tags: ["sport", "suv", "hybrid", "exklusiv"],
    image: "/img/xm.jpg"
  },
  {
    name: "BMW Z4",
    category: "Lifestyle & Spaß",
    why: "Roadster für puren Fahrspaß",
    tags: ["roadster", "fun", "cabrio", "sport"],
    image: "/img/z4.jpg"
  },
  {
    name: "BMW 8er",
    category: "Lifestyle & Spaß",
    why: "Luxus trifft auf Sport",
    tags: ["luxus", "sport", "coupe"],
    image: "/img/8er.jpg"
  }
];

export interface QuizQuestion {
  question: string;
  answers: {
    text: string;
    tags: string[];
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Was ist dein Hauptverwendungszweck für das Auto?",
    answers: [
      { text: "Täglich zur Arbeit & in der Stadt", tags: ["stadt", "alltag"] },
      { text: "Geschäftsreisen & repräsentieren", tags: ["business", "komfort"] },
      { text: "Familienautofahrten & Urlaub", tags: ["familie", "reisen"] },
      { text: "Spaß am Fahren & Wochenendausflüge", tags: ["fun", "sport"] }
    ]
  },
  {
    question: "Welche Karosserieform spricht dich am meisten an?",
    answers: [
      { text: "Limousine - klassisch & elegant", tags: ["limousine", "klassiker"] },
      { text: "SUV - hoch sitzen & Überblick", tags: ["suv"] },
      { text: "Coupé - sportlich & stylisch", tags: ["coupe", "sportlich"] },
      { text: "Cabrio/Roadster - offen fahren", tags: ["cabrio", "roadster", "fun"] }
    ]
  },
  {
    question: "Wie wichtig ist dir Sportlichkeit?",
    answers: [
      { text: "Extrem wichtig - ich will Performance!", tags: ["sport", "power", "track"] },
      { text: "Wichtig - sportlich aber alltagstauglich", tags: ["sportlich", "dynamisch"] },
      { text: "Etwas wichtig - elegant mit sportlicher Note", tags: ["elegant", "stylisch"] },
      { text: "Nicht so wichtig - Komfort geht vor", tags: ["komfort"] }
    ]
  },
  {
    question: "Welche Größe bevorzugst du?",
    answers: [
      { text: "Kompakt - wendig & parkfreundlich", tags: ["kompakt"] },
      { text: "Mittelgroß - guter Kompromiss", tags: ["vielseitig"] },
      { text: "Groß - viel Platz & Komfort", tags: ["groß", "platz", "komfort"] },
      { text: "Größe ist mir egal", tags: [] }
    ]
  },
  {
    question: "Wie viele Personen fährst du regelmäßig mit?",
    answers: [
      { text: "Meist alleine oder zu zweit", tags: ["kompakt"] },
      { text: "Oft zu viert (Familie/Freunde)", tags: ["familie"] },
      { text: "Manchmal mehr als 5 Personen", tags: ["familie", "groß"] },
      { text: "Wechselt stark", tags: ["vielseitig"] }
    ]
  },
  {
    question: "Welcher Antrieb interessiert dich?",
    answers: [
      { text: "Benziner - klassisch & kraftvoll", tags: ["power"] },
      { text: "Elektro - modern & nachhaltig", tags: ["elektrisch", "modern", "nachhaltig"] },
      { text: "Hybrid - das Beste aus beiden Welten", tags: ["hybrid"] },
      { text: "Ist mir egal - Hauptsache es fährt", tags: [] }
    ]
  },
  {
    question: "Welches Budget schwebt dir vor?",
    answers: [
      { text: "Einsteigerfreundlich - günstigster BMW", tags: ["günstig", "einsteiger"] },
      { text: "Mittelklasse - solides Preis-Leistungs-Verhältnis", tags: ["vielseitig"] },
      { text: "Gehobene Klasse - mehr Luxus & Komfort", tags: ["luxus", "komfort"] },
      { text: "Premium - nur das Beste", tags: ["luxus", "prestige", "edel"] }
    ]
  },
  {
    question: "Wie wichtig ist dir Luxus & Ausstattung?",
    answers: [
      { text: "Sehr wichtig - High-Tech & Premium-Materialien", tags: ["luxus", "hightech"] },
      { text: "Wichtig - gute Ausstattung & Komfort", tags: ["komfort"] },
      { text: "Normal - Standard reicht mir", tags: [] },
      { text: "Unwichtig - funktional ist genug", tags: ["puristisch"] }
    ]
  },
  {
    question: "Was für ein Fahrertyp bist du?",
    answers: [
      { text: "Racetrack-Enthusiast - will alles rausholen", tags: ["track", "sport", "performance"] },
      { text: "Dynamischer Fahrer - mag sportliches Fahren", tags: ["dynamisch", "sportlich"] },
      { text: "Entspannter Cruiser - comfort first", tags: ["komfort"] },
      { text: "Praktischer Fahrer - von A nach B", tags: ["praktisch", "alltag"] }
    ]
  },
  {
    question: "Welche Optik gefällt dir am besten?",
    answers: [
      { text: "Klassisch-elegant - zeitlos schön", tags: ["klassiker", "elegant"] },
      { text: "Modern-futuristisch - cutting edge", tags: ["modern", "hightech"] },
      { text: "Sportlich-aggressiv - auffallend", tags: ["sport", "power"] },
      { text: "Stylisch-jugendlich - trendy", tags: ["stylisch", "jung"] }
    ]
  },
  {
    question: "Wo fährst du hauptsächlich?",
    answers: [
      { text: "Stadt - viel Stop-and-Go", tags: ["stadt"] },
      { text: "Autobahn - lange Strecken", tags: ["reisen", "komfort"] },
      { text: "Landstraße - kurvenreich & abwechslungsreich", tags: ["fun", "sportlich"] },
      { text: "Gemischt - alles dabei", tags: ["vielseitig"] }
    ]
  },
  {
    question: "Was ist dir beim Design wichtig?",
    answers: [
      { text: "Auffallen & Eindruck machen", tags: ["prestige", "status"] },
      { text: "Schön & harmonisch aussehen", tags: ["design", "elegant"] },
      { text: "Praktisch & funktional sein", tags: ["praktisch"] },
      { text: "Individuell & besonders sein", tags: ["exklusiv", "stylisch"] }
    ]
  }
];