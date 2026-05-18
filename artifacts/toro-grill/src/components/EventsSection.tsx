import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  fullName: z.string().min(2, "נא להזין שם מלא"),
  phone: z.string().min(9, "נא להזין מספר טלפון תקין"),
  date: z.string().min(1, "נא לבחור תאריך"),
  guests: z.coerce.number().min(1, "מינימום אורח אחד"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function EventsSection() {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      date: "",
      guests: 2,
      notes: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Event form submitted:", data);
    toast({
      title: "תודה!",
      description: "נחזור אליכם בהקדם",
      variant: "default",
    });
    form.reset();
  };

  return (
    <section id="events" className="py-24 relative overflow-hidden">
      {/* Background with texture/pattern effect */}
      <div className="absolute inset-0 bg-card z-0 opacity-50" />
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{ 
          backgroundImage: 'radial-gradient(circle at center, hsl(var(--primary)) 0%, transparent 15%)',
          backgroundSize: '40px 40px' 
        }} 
      />
      
      <div className="container mx-auto px-4 relative z-10 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">אירועים ומסיבות</h2>
          <p className="text-lg text-muted-foreground font-light max-w-xl mx-auto">
            אנחנו מארגנים אירועים עסקיים, חגיגות משפחתיות ומסיבות פרטיות. מלאו את הטופס ונחזור אליכם תוך 24 שעות.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-black/40 backdrop-blur-sm border border-white/5 p-8 md:p-12 shadow-2xl"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" dir="rtl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">שם מלא</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="ישראל ישראלי" 
                          {...field} 
                          className="bg-input/50 border-white/10 focus-visible:border-primary rounded-none h-12"
                        />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">טלפון</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="050-0000000" 
                          {...field} 
                          className="bg-input/50 border-white/10 focus-visible:border-primary rounded-none h-12 text-right"
                          dir="ltr"
                        />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">תאריך האירוע</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field} 
                          className="bg-input/50 border-white/10 focus-visible:border-primary rounded-none h-12 block appearance-none"
                        />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">מספר מוזמנים</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1"
                          {...field} 
                          className="bg-input/50 border-white/10 focus-visible:border-primary rounded-none h-12"
                        />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">הערות</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="ספרו לנו קצת על האירוע שלכם..." 
                        className="bg-input/50 border-white/10 focus-visible:border-primary rounded-none min-h-[120px] resize-y"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 text-lg font-serif tracking-wide transition-all mt-4"
              >
                שלחו פנייה
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}