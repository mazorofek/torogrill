export type MenuItem = {
  name: string;
  price: number | string | null;
  description?: string;
};

export type MenuSection = {
  title: string;
  items: MenuItem[];
  note?: string[];
};

export const menuSections: MenuSection[] = [
  {
    title: "ראשונות",
    items: [
      { name: "לאפה", price: 4 },
      { name: "חומוס", price: 32 },
      { name: "חומוס פטריות", price: 42 },
      { name: "חומוס שווארמה", price: 55 },
      { name: "טחינה", price: 27 },
      { name: "סלט ערבי קצוץ", price: 29 },
      { name: "סלט בוכרי", price: 35 },
      { name: "סלט גרוזיני", price: 35 },
      { name: "פלטת חמוצי הבית", price: 35 },
      { name: "צ׳יפס", price: 32 },
      { name: "צ׳יפס שום", price: 34 },
      { name: "פירה", price: 25 },
      { name: "פטריות חמות", price: 45 },
      { name: "כרובית מטוגנת", price: 45 },
      { name: "חציל בלאדי", price: 30 },
      { name: "קרפצ׳יו", price: 48 },
    ],
  },
  {
    title: "שיפודים",
    note: [
      "בהזמנת 2 שיפודים לסועד — סלטי הבית חינם",
      "בהזמנת שיפוד אחד — סלטי הבית ב־25 ₪",
      "ללא שיפודים — סלטי הבית ב־35 ₪",
    ],
    items: [
      { name: "קבב הבית", price: 36 },
      { name: "שישליק הודו", price: 38 },
      { name: "לבבות עוף", price: 32 },
      { name: "כבד עוף", price: 32 },
      { name: "כנפיים", price: 30 },
      { name: "פרגיות", price: 38 },
      { name: "אנטריקוט", price: 57 },
      { name: "חזה אווז / מולארד", price: 57 },
      { name: "פילה בקר", price: 65 },
      { name: "חלוויאת", price: 100 },
      { name: "כבד אווז", price: 120 },
      { name: "צלחת שווארמה", price: 70 },
      { name: "מרגז משק לגזיאל", price: 48 },
      { name: "לבבות אווז", price: 40 },
      { name: "עראיס", price: 45 },
    ],
  },
  {
    title: "מן המטבח הבוכרי",
    items: [
      { name: "גושגושה / סמסה", price: 15 },
      { name: "מנטו", price: 18, description: "2 יחידות" },
      { name: "צ׳יבורק בשר", price: 17 },
      { name: "צ׳יבורק תפו״א", price: 17 },
      { name: "צ׳יבורק פטריות", price: 17 },
      { name: "אושפלאו / פלוב", price: 55 },
      { name: "בחש", price: 55 },
      { name: "סוכריות קבב אנטריקוט עטוף בבצק בוכרי", price: 45 },
    ],
  },
  {
    title: "סטייקים",
    items: [
      { name: "חזה עוף במרינדה", price: 70 },
      { name: "סטייק פרגית", price: 75 },
      {
        name: "צלעות כבש",
        price: 220,
        description: "350 גרם",
      },
      {
        name: "סטייק אנטריקוט",
        price: 170,
        description: "350 גרם",
      },
      {
        name: "סטייק פילה",
        price: 170,
        description: "350 גרם",
      },
      { name: "סטייק שאטו", price: 275 },
      { name: "שניצל בתוספת פירה", price: 70 },
      {
        name: "פלטה זוגית",
        price: 310,
        description: "סטייק פרגית, קבב, כבד אווז, פילה, עראיס ומרגז",
      },
    ],
  },
  {
    title: "דגים ומרקים",
    items: [
      { name: "דג דניס", price: 120 },
      { name: "שיפודי סלמון", price: 50 },
      { name: "מרק בשר", price: 40 },
      { name: "מרק דושפרה", price: 55 },
      { name: "מרק שעועית", price: 40 },
    ],
  },
  {
    title: "ארוחות ילדים",
    items: [
      {
        name: "שניצלונים",
        price: 50,
        description: "מוגש בליווי צ׳יפס וסלט",
      },
    ],
  },
  {
    title: "שתייה קרה",
    items: [
      { name: "קוקה-קולה", price: 14 },
      { name: "קוקה-קולה זירו", price: 14 },
      { name: "ספרייט", price: 14 },
      { name: "ספרייט זירו", price: 14 },
      { name: "פאנטה", price: 14 },
      { name: "סודה", price: 14 },
      { name: "פיוז-טי", price: 14 },
      { name: "מים מינרליים", price: 14 },
      {
        name: "פריגת",
        price: 12,
        description: "תפוזים, אשכוליות, ענבים, סיידר תפוח, מנגו",
      },
      { name: "בירה שחורה", price: 17 },
      { name: "כוס לימונדה טבעי", price: 17 },
      { name: "כוס תפוזים טבעי", price: 17 },
      { name: "משקה גרוזיני", price: 19, description: "טרחון / אגסים" },
      { name: "קנקן שתייה מוגז / טבעי", price: 28 },
    ],
  },
  {
    title: "בירה",
    items: [
      { name: "חבית קלסברג", price: "30/35" },
      { name: "קלסברג", price: 28 },
      { name: "הייניקן", price: 28 },
      { name: "גולדסטאר", price: 26 },
      { name: "קורונה", price: 29 },
      { name: "סטלה", price: 29 },
    ],
  },
  {
    title: "אלכוהול",
    items: [
      { name: "צ׳ייסר ערק", price: "15 / מנה 25" },
      { name: "צ׳ייסר וויסקי", price: "15 / מנה 25" },
      { name: "צ׳ייסר פינלנדיה", price: "15 / מנה 25" },
      { name: "צ׳ייסר וואן גוך אסאי", price: "25 / מנה 50" },
      { name: "צ׳ייסר בלוגה", price: "25 / מנה 50" },
      { name: "צ׳ייסר בלאק", price: "25 / מנה 50" },
      { name: "בקבוק ערק", price: 220, description: "700 מ״ל" },
      { name: "בקבוק בלוגה", price: 350, description: "700 מ״ל" },
      { name: "רוסקי סטנדרט", price: "65/170/220" },
      { name: "פינלנדיה", price: "65/170/220" },
      { name: "גרייגוס", price: 120, description: "200 מ״ל" },
      { name: "יין בלו נאן", price: "30/130" },
    ],
  },
  {
    title: "קינוחים",
    items: [
      { name: "סופלה", price: 38 },
      { name: "בוואריה", price: 32 },
      { name: "מלבי", price: 32 },
      { name: "פאדג׳", price: 42 },
      { name: "קרם ברולה", price: 50 },
      { name: "כדור גלידה", price: 12 },
    ],
  },
];
