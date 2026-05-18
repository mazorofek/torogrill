import { motion } from "framer-motion";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";

export function ContactSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="contact" className="py-24 bg-background border-t border-white/5 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">צרו קשר</h2>
          <div className="w-24 h-1 bg-primary mx-auto opacity-50"></div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="flex flex-col space-y-8">
            <h3 className="text-2xl font-serif text-foreground border-b border-primary/30 pb-4 inline-block">פרטים</h3>
            
            <div className="space-y-6">
              <a href="tel:04-1234567" className="flex items-start gap-4 group">
                <div className="mt-1 bg-white/5 p-3 rounded-full text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">טלפון להזמנות</p>
                  <p className="text-lg font-light text-foreground" dir="ltr">04-1234567</p>
                </div>
              </a>

              <a href="https://wa.me/9724123456789" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                <div className="mt-1 bg-white/5 p-3 rounded-full text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">וואטסאפ</p>
                  <p className="text-lg font-light text-foreground">שלחו הודעה</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-white/5 p-3 rounded-full text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">כתובת</p>
                  <p className="text-lg font-light text-foreground">רחוב דיזנגוף 100, תל אביב</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Opening Hours */}
          <motion.div variants={itemVariants} className="flex flex-col space-y-8">
            <h3 className="text-2xl font-serif text-foreground border-b border-primary/30 pb-4 inline-block">שעות פתיחה</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-white/5 p-3 rounded-full text-primary">
                  <Clock size={20} />
                </div>
                <div className="w-full space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-foreground font-light">ראשון–חמישי</span>
                    <span className="text-muted-foreground" dir="ltr">12:00–23:00</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-foreground font-light">שישי</span>
                    <span className="text-muted-foreground" dir="ltr">12:00–15:00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-foreground font-light">שבת</span>
                    <span className="text-muted-foreground" dir="ltr">19:00–23:00</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div variants={itemVariants} className="flex flex-col space-y-8">
            <h3 className="text-2xl font-serif text-foreground border-b border-primary/30 pb-4 inline-block">הגעה</h3>
            <a 
              href="https://maps.google.com/?q=Dizengoff+100+Tel+Aviv" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative w-full h-48 md:h-full min-h-[200px] border border-primary/30 bg-card flex flex-col items-center justify-center group overflow-hidden transition-colors hover:border-primary"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDEwaDQwdjFIMHptMCAyMGg0MHYxSDB6TTEwIDB2NDBoLTFWMHptMjAgMHY0MGgtMVYweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-50 group-hover:scale-110 transition-transform duration-700" />
              <MapPin size={32} className="text-primary mb-3 relative z-10 group-hover:-translate-y-1 transition-transform" />
              <span className="text-xl font-serif text-foreground relative z-10">מפה</span>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}