import { motion } from "framer-motion";
import { Flame, Utensils, UsersRound } from "lucide-react";

const highlights = [
  {
    icon: Flame,
    title: "בשרים על האש",
    text: "שיפודים, סטייקים ומנות גריל שמוכנות במקום ומוגשות חמות לשולחן.",
  },
  {
    icon: Utensils,
    title: "מטבח בוכרי",
    text: "מנות ביתיות כמו אושפלאו, בחש, מנטו וסמסה לצד סלטי הבית.",
  },
  {
    icon: UsersRound,
    title: "משפחות ואירועים",
    text: "מקום לארוחה משפחתית, שולחן חברים או אירוע קטן באווירה חמה.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="bg-secondary/35 py-24 border-y border-white/5">
      <div className="container mx-auto max-w-6xl px-4" dir="rtl">
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-primary">
              אודות המסעדה
            </p>
            <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl">
              מורשת בוכרית, הכנסת אורחים וחום של בית
            </h2>
            <div className="space-y-4 text-lg leading-8 text-white/70">
              <p>
                המטבח הבוכרי ידוע בהכנסת אורחים. דורות של מורשת קולינרית
                שעברה מאב לבן מגיעים גם היום עד הצלחת, עם טעמים שנשמרו לאורך
                השנים וקיבלו ביטוי עדכני שמתאים למטבח ולחיך הישראלי.
              </p>
              <p>
                המפגש בין התרבות הישראלית למטבח הבוכרי יוצר געגוע וחום של בית
                אמא, דרך הטעמים, הריחות והחושים. אצלנו משחזרים את תחושת
                הנוסטלגיה שהמשפחה הביאה איתה, וממשיכים אותה לדורות הבאים.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid gap-5"
          >
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="border-t border-white/10 pt-5"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center bg-primary text-white">
                      <Icon size={20} />
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="max-w-xl text-base leading-7 text-white/60">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
