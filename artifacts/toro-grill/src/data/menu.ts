import menuStarterImage from "@/assets/images/menu-2.png";
import menuSteakImage from "@/assets/images/menu-1.png";
import menuGrillImage from "@/assets/images/menu-3.png";
import bukharianPlovImage from "@/assets/images/bukharian-plov.png";

export type MenuItem = {
  name: string;
  price: number | null;
  description?: string;
  image?: string;
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
      {
        name: "לאפה",
        price: 4,
        description: "",
        image: menuStarterImage,
      },
      { name: "חומוס", price: 32, image: menuStarterImage },
      { name: "חומוס שווארמה", price: 55, image: menuGrillImage },
      { name: "כרובית מטוגנת", price: 42, image: menuStarterImage },
      { name: "חציל בלאדי", price: 30, image: menuStarterImage },
      { name: "סלט ערבי קצוץ", price: 32, image: menuStarterImage },
      { name: "סלט בוכרי", price: 35, image: menuStarterImage },
      { name: "סלט גרוזיני", price: 35, image: menuStarterImage },
      
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
      { name: "קבב הבית", price: 34, image: menuGrillImage },
      { name: "פרגית", price: 36, image: menuGrillImage },
      { name: "שישליק הודו", price: 38, image: menuGrillImage },
      { name: "לבבות עוף", price: 32, image: menuGrillImage },
      { name: "כבד עוף", price: 32, image: menuGrillImage },
      { name: "לבבות אווז", price: 40, image: menuGrillImage },
      { name: "כנפיים", price: 30, image: menuGrillImage },
      { name: "שיפוד אנטריקוט", price: 57, image: menuSteakImage },
      { name: "פילה בקר", price: 65, image: menuSteakImage },
      { name: "רולדה", price: 65, image: menuSteakImage },
      { name: "כבד אווז", price: 120, image: menuGrillImage },
      { name: "חלוויאת / שקדי עגל", price: 100, image: menuGrillImage },
      { name: "חזה אווז / מולארד", price: 57, image: menuGrillImage },
      { name: "עראיס", price: 45, image: menuGrillImage },
    ],
  },
  {
    title: "מן המטבח הבוכרי",
    items: [
      { name: "אושפלאו / פלוב", price: 55, image: bukharianPlovImage },
      { name: "בחש", price: 55, image: bukharianPlovImage },
      {
        name: "מנטו",
        price: 18,
        description: "2 יחידות — בצק מאודה עם בשר בקר ובצל",
        image: bukharianPlovImage,
      },
      { name: "גושגושה / סמסה", price: 15, image: bukharianPlovImage },
      { name: "צ׳יבורק בשר", price: 15, image: bukharianPlovImage },
      { name: "צ׳יבורק פטריות", price: 15, image: bukharianPlovImage },
      { name: "צ׳יבורק תפוח אדמה", price: 15, image: bukharianPlovImage },
    ],
  },
  {
    title: "סטייקים",
    items: [
      {
        name: "סטייק אנטריקוט",
        price: 170,
        description: "350 גרם",
        image: menuSteakImage,
      },
      {
        name: "סטייק פילה",
        price: 170,
        description: "350 גרם",
        image: menuSteakImage,
      },
      { name: "סטייק פרגית", price: 75, image: menuGrillImage },
      { name: "חזה עוף", price: 70, image: menuGrillImage },
      { name: "סטייק שאטו", price: 260, image: menuSteakImage },
    ],
  },
  {
    title: "שתייה קרה",
    items: [
      { name: "קולה", price: 14 },
      { name: "קולה זירו", price: 14 },
      { name: "פאנטה", price: 14 },
      { name: "ספרייט", price: 14 },
      { name: "נסטי", price: 14 },
      { name: "ענבים", price: 12 },
      { name: "תפוזים", price: 12 },
    ],
  },
  {
    title: "בירה",
    items: [
      { name: "קרלסברג חבית", price: 30, description: "כוס קטנה" },
      { name: "קרלסברג חבית", price: 35, description: "כוס גדולה" },
      { name: "בקבוקים", price: null, description: "מחיר לפי סוג הבקבוק" },
    ],
  },
  {
    title: "קינוחים",
    items: [
      { name: "קרם ברולה", price: 50, image: menuStarterImage },
      { name: "בוואריה", price: 32, image: menuStarterImage },
      { name: "מלבי", price: 32, image: menuStarterImage },
      { name: "סופלה", price: 38, image: menuStarterImage },
      { name: "עוגה חמה / פאדג׳", price: 42, image: menuStarterImage },
    ],
  },
];
