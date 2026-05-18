import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import menuImg1 from "@/assets/images/menu-1.png";
import menuImg2 from "@/assets/images/menu-2.png";
import menuImg3 from "@/assets/images/menu-3.png";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  image?: string;
};

const menuData: Record<string, MenuItem[]> = {
  ראשונות: [
    { name: "סלט ירוק", description: "עלי בייבי, ויניגרט הדרים, אגוזי מלך קלויים", price: "52 ₪" },
    { name: "ברוסקטה בקר", description: "פילה בקר קצוץ, צלפים, איולי חרדל על לחם קלוי", price: "78 ₪", image: menuImg2 },
    { name: "כבד קצוץ", description: "כבד עוף מובחר, ריבת בצל, לחם קלוי", price: "64 ₪" },
    { name: "נקניקיות מרגז", description: "תוצרת בית, כרוב כבוש, חרדל דיז'ון", price: "72 ₪" },
    { name: "מרק בשר", description: "ציר בקר עשיר, ירקות שורש, בשר מפורק", price: "68 ₪" },
  ],
  עיקריות: [
    { name: "אנטרקוט פרימיום", description: "300 גרם אנטרקוט מיושן 30 יום, צ'ימיצ'ורי", price: "185 ₪" },
    { name: "פילה מיניון", description: "250 גרם נתח רך במיוחד, רוטב יין אדום", price: "210 ₪" },
    { name: "ריב-איי על העצם", description: "500 גרם, צלוי בגריל פחמים", price: "280 ₪" },
    { name: "קבב טלה", description: "קבב תוצרת בית מתובל, טחינה, עגבניות צלויות", price: "95 ₪" },
    { name: "חזה עוף על האש", description: "מרינדת עשבי תיבול, שמן זית ולימון", price: "85 ₪" },
  ],
  בשרים: [
    { name: "סינטה 300g", description: "נתח רזה ומלא טעם, צלוי במידת עשייה מדויקת", price: "165 ₪" },
    { name: "ואגיו יפני", description: "150 גרם פרימיום ריב-איי ואגיו, מלח ים אטלנטי", price: "350 ₪", image: menuImg1 },
    { name: "צלעות טלה", description: "300 גרם צלעות טלה מקומי, קרם שום", price: "220 ₪", image: menuImg3 },
    { name: "אנטרקוט 350g", description: "נתח משויש ועסיסי מגידול מקומי", price: "195 ₪" },
  ],
  סלטים: [
    { name: "סלט ירוק עם דרסינג לימון", description: "חסות פריכות, מלפפון, שמן זית ולימון סחוט", price: "55 ₪" },
    { name: "טבולה כרובית", description: "בורגול, עשבי תיבול טריים, כרובית צלויה", price: "62 ₪" },
    { name: "סלט יווני", description: "עגבניות, מלפפונים, בצל סגול, זיתי קלמטה, גבינת פטה שקדים", price: "65 ₪" },
    { name: "חצילים בטחינה", description: "חציל בלאדי שרוף באש גלויה, טחינה הר ברכה", price: "58 ₪" },
    { name: "חומוס אסלי", description: "מוגש חם עם גרגירי חומוס ושמן זית", price: "45 ₪" },
  ],
  שתייה: [
    { name: "מים מינרליים", description: "סן פלגרינו / אקווה פאנה 750 מ\"ל", price: "28 ₪" },
    { name: "קולה / זירו", description: "בקבוק זכוכית", price: "16 ₪" },
    { name: "בירה מהחבית", description: "סטלה ארטואה / גולדסטאר 500 מ\"ל", price: "35 ₪" },
    { name: "יין אדום כוס", description: "קברנה סוביניון, יקבי רמת הגולן", price: "48 ₪" },
    { name: "לימונדה טרייה", description: "נסחט במקום עם נענע", price: "22 ₪" },
  ],
};

const categories = Object.keys(menuData);

export function MenuSection() {
  return (
    <section id="menu" className="py-24 bg-background border-b border-white/5">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">התפריט שלנו</h2>
          <div className="w-24 h-1 bg-primary mx-auto opacity-50"></div>
        </motion.div>

        <Tabs defaultValue={categories[0]} dir="rtl" className="w-full">
          <TabsList className="w-full flex flex-wrap justify-center h-auto bg-transparent mb-12 gap-2">
            {categories.map((cat) => (
              <TabsTrigger 
                key={cat} 
                value={cat}
                className="text-lg px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-transparent data-[state=active]:border-primary transition-all rounded-none"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((cat) => (
            <TabsContent key={cat} value={cat} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-16 gap-y-12">
                {menuData[cat].map((item, idx) => (
                  <motion.div 
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="flex flex-col group"
                  >
                    {item.image && (
                      <div className="w-full h-48 md:h-64 overflow-hidden mb-6 rounded-sm">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="text-2xl font-serif text-foreground">{item.name}</h3>
                      <div className="flex-grow border-b border-white/10 border-dashed mx-4"></div>
                      <span className="text-xl text-primary font-serif whitespace-nowrap">{item.price}</span>
                    </div>
                    <p className="text-muted-foreground text-sm font-light leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}