import type { Locale } from "@/i18n/locales";

type Translation = {
  seo: {
    title: string;
    description: string;
    siteName: string;
    restaurantName: string;
    restaurantDescription: string;
    geoPlaceName: string;
    streetAddress: string;
    addressLocality: string;
    cuisines: string[];
  };
  languageSwitcher: {
    ariaLabel: string;
  };
  hero: {
    tagline: string;
    kosherNote: string;
    delivery: string;
    table: string;
    events: string;
    scrollToMenu: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    highlights: Array<{ title: string; text: string }>;
  };
  quickNav: {
    menu: { title: string; text: string };
    lunch: { title: string; text: string };
    events: { title: string; text: string };
    orders: {
      title: string;
      text: string;
      delivery: string;
      table: string;
    };
  };
  menu: {
    title: string;
    lunchButton: string;
    offerLabel: string;
    offerTitle: string;
    offerDescription: string;
    priceUnavailable: string;
  };
  lunchDeals: {
    closeOverlay: string;
    close: string;
    kicker: string;
    title: string;
    description: string;
    includesTitle: string;
    deals: Array<{
      title: string;
      price: string;
      badge: string;
      description: string;
      includes: string[];
    }>;
  };
  events: {
    title: string;
    description: string;
    previewTitle: string;
    previewDescription: string;
    imageAlt: string;
    features: string[];
    fields: {
      fullName: string;
      phone: string;
      date: string;
      guests: string;
      notes: string;
    };
    placeholders: {
      fullName: string;
      phone: string;
      notes: string;
    };
    validation: {
      fullName: string;
      phone: string;
      date: string;
      guests: string;
    };
    toasts: {
      rateLimitTitle: string;
      rateLimitDescription: string;
      successTitle: string;
      successDescription: string;
      errorTitle: string;
      errorDescription: string;
    };
    submit: string;
    submitting: string;
  };
  contact: {
    title: string;
    detailsTitle: string;
    phoneLabel: string;
    addressLabel: string;
    address: string;
    hoursTitle: string;
    days: Array<{ label: string; hours: string }>;
    formTitle: string;
    fields: {
      name: string;
      phone: string;
      message: string;
    };
    submit: string;
    submitting: string;
    success: string;
    error: string;
  };
  delivery: {
    closeOverlay: string;
    close: string;
    title: string;
    subtitle: string;
  };
  sticky: {
    delivery: string;
    table: string;
    events: string;
  };
  footer: {
    menu: string;
    events: string;
    contact: string;
    copyright: string;
  };
  notFound: {
    title: string;
    message: string;
  };
};

export const translations: Record<Locale, Translation> = {
  he: {
    seo: {
      title: "טורו גריל ראשון לציון | מסעדת בשרים ומטבח בוכרי",
      description:
        "טורו גריל - מסעדת בשר פרימיום בראשון לציון. הזמן משלוח, שולחן או אירוע.",
      siteName: "טורו גריל",
      restaurantName: "טורו גריל",
      restaurantDescription: "מסעדת בשרים, גריל ומטבח בוכרי בראשון לציון.",
      geoPlaceName: "ראשון לציון",
      streetAddress: "סחרוב 20",
      addressLocality: "ראשון לציון",
      cuisines: ["בשרים", "גריל", "מטבח בוכרי"],
    },
    languageSwitcher: {
      ariaLabel: "בחירת שפה",
    },
    hero: {
      tagline: "מסעדת בשרים, מטבח בוכרי כשר.",
      kosherNote: "כל הבשר בקר חלק רבנות",
      delivery: "להזמנת משלוח",
      table: "להזמנת שולחן",
      events: "לאירועים",
      scrollToMenu: "גלילה לתפריט",
    },
    about: {
      eyebrow: "אודות המסעדה",
      title: "מורשת בוכרית, הכנסת אורחים וחום של בית",
      paragraphs: [
        "המטבח הבוכרי ידוע בהכנסת אורחים. דורות של מורשת קולינרית שעברה מאב לבן מגיעים גם היום עד הצלחת, עם טעמים שנשמרו לאורך השנים וקיבלו ביטוי עדכני שמתאים למטבח ולחיך הישראלי.",
        "המפגש בין התרבות הישראלית למטבח הבוכרי יוצר געגוע וחום של בית אמא, דרך הטעמים, הריחות והחושים. אצלנו משחזרים את תחושת הנוסטלגיה שהמשפחה הביאה איתה, וממשיכים אותה לדורות הבאים.",
      ],
      highlights: [
        {
          title: "בשרים על האש",
          text: "שיפודים, סטייקים ומנות גריל שמוכנות במקום ומוגשות חמות לשולחן.",
        },
        {
          title: "מטבח בוכרי",
          text: "מנות ביתיות כמו אושפלאו, בחש, מנטו וסמסה לצד סלטי הבית.",
        },
        {
          title: "משפחות ואירועים",
          text: "מקום לארוחה משפחתית, שולחן חברים או אירוע קטן באווירה חמה.",
        },
      ],
    },
    quickNav: {
      menu: {
        title: "תפריט",
        text: "כל המנות, השיפודים, הסטייקים והמטבח הבוכרי.",
      },
      lunch: {
        title: "עסקיות צהריים",
        text: "בשירות עצמי, 11:00-17:00",
      },
      events: {
        title: "אירועים",
        text: "אולם לאירועים, חגיגות משפחתיות ומפגשים עסקיים.",
      },
      orders: {
        title: "הזמנות",
        text: "משלוחים או השארת פרטים להזמנת שולחן.",
        delivery: "משלוח",
        table: "שולחן",
      },
    },
    menu: {
      title: "התפריט שלנו",
      lunchButton: "עסקיות צהריים",
      offerLabel: "הטבת שיפודים",
      offerTitle: "סלטי הבית עלינו",
      offerDescription:
        "בהזמנת 2 שיפודים לסועד מקבלים את סלטי הבית ללא תוספת תשלום.",
      priceUnavailable: "—",
    },
    lunchDeals: {
      closeOverlay: "סגירת עסקיות צהריים",
      close: "סגירה",
      kicker: "בשירות עצמי | 11:00-17:00",
      title: "עסקיות צהריים",
      description:
        "ארוחת צהריים מלאה ומשביעה: שיפודים על הגריל, תוספת חמה, צ׳יפס, לאפה, שתייה ובר סלטים חופשי.",
      includesTitle: "כולל",
      deals: [
        {
          title: "עסקית 65",
          price: "65 ₪",
          badge: "2 שיפודים רגילים",
          description:
            "שני שיפודים רגילים בצלחת, עם כל מה שצריך לארוחת צהריים מלאה.",
          includes: [
            "ניתן לבחור 2 תוספות מתוך אושפלאו / באחש / פירה",
            "צ׳יפס",
            "לאפה",
            "שתייה",
            "בר סלטים חופשי",
          ],
        },
        {
          title: "עסקית 85",
          price: "85 ₪",
          badge: "רגיל + מיוחד",
          description:
            "שיפוד רגיל לצד שיפוד מיוחד לבחירה: רולדה / אנטריקוט / כבש / פילה.",
          includes: [
            "ניתן לבחור 2 תוספות מתוך אושפלאו / באחש / פירה",
            "צ׳יפס",
            "לאפה",
            "שתייה",
            "בר סלטים חופשי",
          ],
        },
      ],
    },
    events: {
      title: "אירועים ומסיבות",
      description:
        "אנחנו מארגנים אירועים עסקיים, חגיגות משפחתיות ומסיבות פרטיות. מלאו את הטופס ונחזור אליכם תוך 24 שעות.",
      previewTitle: "אולם לאירועים באווירה חמה",
      previewDescription:
        "בקרוב נעלה גלריה מלאה של האולם. בינתיים אפשר להשאיר פרטים ונחזור עם התאמה אישית לאירוע שלכם.",
      imageAlt: "אולם אירועים בטורו גריל",
      features: ["אירועים משפחתיים", "אירועים עסקיים", "תפריט בשרי ובוכרי"],
      fields: {
        fullName: "שם מלא",
        phone: "טלפון",
        date: "תאריך האירוע",
        guests: "מספר מוזמנים",
        notes: "הערות",
      },
      placeholders: {
        fullName: "ישראל ישראלי",
        phone: "050-0000000",
        notes: "ספרו לנו קצת על האירוע שלכם...",
      },
      validation: {
        fullName: "נא להזין שם מלא",
        phone: "נא להזין מספר טלפון תקין",
        date: "נא לבחור תאריך",
        guests: "מינימום אורח אחד",
      },
      toasts: {
        rateLimitTitle: "יותר מדי פניות",
        rateLimitDescription: "נשלחו יותר מדי פניות, נסו שוב בעוד כמה דקות",
        successTitle: "תודה!",
        successDescription: "הפנייה נשלחה, נחזור אליכם בהקדם",
        errorTitle: "שגיאה",
        errorDescription: "שליחת הפנייה נכשלה, נסו שוב",
      },
      submit: "שלחו פנייה",
      submitting: "שולח...",
    },
    contact: {
      title: "צרו קשר",
      detailsTitle: "פרטים",
      phoneLabel: "טלפון להזמנות",
      addressLabel: "כתובת",
      address: "סחרוב 20 ראשון לציון",
      hoursTitle: "שעות פתיחה",
      days: [
        { label: "ראשון–חמישי", hours: "11:00–23:00" },
        { label: "שישי", hours: "11:00–15:00" },
        { label: "שבת", hours: "19:00–23:00" },
      ],
      formTitle: "השאירו פרטים",
      fields: {
        name: "שם",
        phone: "טלפון",
        message: "הודעה",
      },
      submit: "שליחה",
      submitting: "שולח...",
      success: "ההודעה נשלחה בהצלחה",
      error: "שליחת ההודעה נכשלה",
    },
    delivery: {
      closeOverlay: "סגירת אפשרויות משלוח",
      close: "סגירה",
      title: "הזמנת משלוח",
      subtitle: "בחרו מאיפה להזמין",
    },
    sticky: {
      delivery: "משלוח",
      table: "הזמנת שולחן",
      events: "אירועים",
    },
    footer: {
      menu: "תפריט",
      events: "אירועים",
      contact: "צרו קשר",
      copyright: "© {year} טורו גריל. כל הזכויות שמורות.",
    },
    notFound: {
      title: "404 העמוד לא נמצא",
      message: "העמוד המבוקש לא קיים באתר.",
    },
  },
  en: {
    seo: {
      title: "Toro Grill Rishon LeZion | Meat Restaurant & Bukharian Kitchen",
      description:
        "Toro Grill is a premium meat restaurant in Rishon LeZion. Order delivery, reserve a table, or plan a private event.",
      siteName: "Toro Grill",
      restaurantName: "Toro Grill",
      restaurantDescription:
        "A meat, grill, and Bukharian kitchen restaurant in Rishon LeZion.",
      geoPlaceName: "Rishon LeZion",
      streetAddress: "Saharov 20",
      addressLocality: "Rishon LeZion",
      cuisines: ["Meat", "Grill", "Bukharian cuisine"],
    },
    languageSwitcher: {
      ariaLabel: "Choose language",
    },
    hero: {
      tagline: "Meat restaurant, kosher Bukharian cuisine.",
      kosherNote: "All beef isKosher Glatt (approved by the Rabbinate)",
      delivery: "Order delivery",
      table: "Reserve a table",
      events: "Events",
      scrollToMenu: "Scroll to menu",
    },
    about: {
      eyebrow: "About the restaurant",
      title: "Bukharian heritage, hospitality, and the warmth of home",
      paragraphs: [
        "Bukharian cuisine is known for generous hospitality. Generations of culinary heritage passed from father to son still reach the plate today, with flavors preserved over the years and adapted for the Israeli kitchen and palate.",
        "The meeting of Israeli culture and Bukharian cooking creates nostalgia and the warmth of home. Through taste, aroma, and feeling, we recreate the family memories brought here and carry them forward.",
      ],
      highlights: [
        {
          title: "Grill and meats",
          text: "Skewers, steaks, and grill dishes prepared on site and served hot to the table.",
        },
        {
          title: "Bukharian kitchen",
          text: "Homestyle dishes such as osh palov, bakhsh, manti, and samsa alongside house salads.",
        },
        {
          title: "Families and events",
          text: "A place for a family meal, a table with friends, or a small event in a warm atmosphere.",
        },
      ],
    },
    quickNav: {
      menu: {
        title: "Menu",
        text: "Skewers, steaks, Bukharian dishes, drinks and desserts.",
      },
      lunch: {
        title: "Lunch Deals",
        text: "Self-service lunch, 11:00-17:00, with two clear options.",
      },
      events: {
        title: "Events",
        text: "A warm space for family celebrations and business gatherings.",
      },
      orders: {
        title: "Orders",
        text: "Order delivery or leave your details to reserve a table.",
        delivery: "Delivery",
        table: "Table",
      },
    },
    menu: {
      title: "Our Menu",
      lunchButton: "Lunch Deals",
      offerLabel: "Skewer offer",
      offerTitle: "House salads on us",
      offerDescription:
        "Order 2 skewers per guest and receive the house salads at no extra charge.",
      priceUnavailable: "—",
    },
    lunchDeals: {
      closeOverlay: "Close lunch deals",
      close: "Close",
      kicker: "Self-service | 11:00-17:00",
      title: "Lunch Deals",
      description:
        "A filling lunch plate with grilled skewers, a hot side, fries, laffa bread, a drink, and unlimited salad bar.",
      includesTitle: "Includes",
      deals: [
        {
          title: "Lunch 65",
          price: "₪65",
          badge: "2 regular skewers",
          description:
            "Two regular skewers served on a plate with everything you need for a full lunch.",
          includes: [
            "Choose 2 sides from osh palov / bakhsh / mashed potatoes",
            "Fries",
            "Laffa bread",
            "Drink",
            "Unlimited salad bar",
          ],
        },
        {
          title: "Lunch 85",
          price: "₪85",
          badge: "Regular + special",
          description:
            "1 regular skewer plus 1 special skewer: roulade / entrecote / lamb / fillet.",
          includes: [
            "Choose 2 sides from osh palov / bakhsh / mashed potatoes",
            "Fries",
            "Laffa bread",
            "Drink",
            "Unlimited salad bar",
          ],
        },
      ],
    },
    events: {
      title: "Events and Parties",
      description:
        "We host business events, family celebrations, and private parties. Fill out the form and we will get back to you within 24 hours.",
      previewTitle: "A warm space for private events",
      previewDescription:
        "A full event gallery will be added soon. For now, leave your details and we will match the right setup for your event.",
      imageAlt: "Toro Grill event hall",
      features: [
        "Family celebrations",
        "Business events",
        "Meat and Bukharian menu",
      ],
      fields: {
        fullName: "Full name",
        phone: "Phone",
        date: "Event date",
        guests: "Number of guests",
        notes: "Notes",
      },
      placeholders: {
        fullName: "John Smith",
        phone: "050-0000000",
        notes: "Tell us a little about your event...",
      },
      validation: {
        fullName: "Please enter your full name",
        phone: "Please enter a valid phone number",
        date: "Please choose a date",
        guests: "At least one guest is required",
      },
      toasts: {
        rateLimitTitle: "Too many requests",
        rateLimitDescription:
          "Too many requests were sent. Please try again in a few minutes.",
        successTitle: "Thank you!",
        successDescription:
          "Your request was sent. We will get back to you soon.",
        errorTitle: "Error",
        errorDescription: "Failed to send your request. Please try again.",
      },
      submit: "Send request",
      submitting: "Sending...",
    },
    contact: {
      title: "Contact Us",
      detailsTitle: "Details",
      phoneLabel: "Orders phone",
      addressLabel: "Address",
      address: "20 Saharov St., Rishon LeZion",
      hoursTitle: "Opening Hours",
      days: [
        { label: "Sunday–Thursday", hours: "11:00–23:00" },
        { label: "Friday", hours: "11:00–15:00" },
        { label: "Saturday", hours: "19:00–23:00" },
      ],
      formTitle: "Leave your details",
      fields: {
        name: "Name",
        phone: "Phone",
        message: "Message",
      },
      submit: "Send",
      submitting: "Sending...",
      success: "Your message was sent successfully",
      error: "Failed to send your message",
    },
    delivery: {
      closeOverlay: "Close delivery options",
      close: "Close",
      title: "Order Delivery",
      subtitle: "Choose where to order from",
    },
    sticky: {
      delivery: "Delivery",
      table: "Reserve a table",
      events: "Events",
    },
    footer: {
      menu: "Menu",
      events: "Events",
      contact: "Contact",
      copyright: "© {year} Toro Grill. All rights reserved.",
    },
    notFound: {
      title: "404 Page Not Found",
      message: "The page you requested does not exist.",
    },
  },
  ru: {
    seo: {
      title: "Toro Grill Ришон-ле-Цион | Мясной ресторан и бухарская кухня",
      description:
        "Toro Grill - премиальный мясной ресторан в Ришон-ле-Ционе. Закажите доставку, забронируйте стол или организуйте мероприятие.",
      siteName: "Toro Grill",
      restaurantName: "Toro Grill",
      restaurantDescription:
        "Ресторан мяса, гриля и бухарской кухни в Ришон-ле-Ционе.",
      geoPlaceName: "Ришон-ле-Цион",
      streetAddress: "Сахаров 20",
      addressLocality: "Ришон-ле-Цион",
      cuisines: ["Мясо", "Гриль", "Бухарская кухня"],
    },
    languageSwitcher: {
      ariaLabel: "Выбор языка",
    },
    hero: {
      tagline: "Мясной ресторан, кошерная бухарская кухня.",
      kosherNote: "Вся говядина — Глатт Кошер (Раввинат)",
      delivery: "Заказать доставку",
      table: "Забронировать стол",
      events: "Мероприятия",
      scrollToMenu: "Перейти к меню",
    },
    about: {
      eyebrow: "О ресторане",
      title: "Бухарское наследие, гостеприимство и тепло дома",
      paragraphs: [
        "Бухарская кухня известна своим гостеприимством. Кулинарное наследие, передававшееся из поколения в поколение, и сегодня доходит до тарелки с вкусами, сохраненными годами и адаптированными к израильской кухне.",
        "Встреча израильской культуры и бухарской кухни создает ностальгию и домашнее тепло. Через вкусы, ароматы и ощущения мы возвращаем семейные воспоминания и продолжаем их для следующих поколений.",
      ],
      highlights: [
        {
          title: "Мясо на гриле",
          text: "Шашлыки, стейки и блюда на гриле готовятся на месте и подаются горячими к столу.",
        },
        {
          title: "Бухарская кухня",
          text: "Домашние блюда, такие как ошпалов, бахш, манты и самса, вместе с фирменными салатами.",
        },
        {
          title: "Семьи и мероприятия",
          text: "Место для семейного обеда, встречи с друзьями или небольшого события в теплой атмосфере.",
        },
      ],
    },
    quickNav: {
      menu: {
        title: "Меню",
        text: "Шашлыки, стейки, бухарские блюда, напитки и десерты.",
      },
      lunch: {
        title: "Бизнес-ланч",
        text: "Самообслуживание, 11:00-17:00, две понятные опции.",
      },
      events: {
        title: "Мероприятия",
        text: "Теплое пространство для семейных и деловых событий.",
      },
      orders: {
        title: "Заказы",
        text: "Доставка или заявка на бронирование стола.",
        delivery: "Доставка",
        table: "Стол",
      },
    },
    menu: {
      title: "Наше меню",
      lunchButton: "Бизнес-ланч",
      offerLabel: "Акция на шашлыки",
      offerTitle: "Фирменные салаты за наш счет",
      offerDescription:
        "При заказе 2 шашлыков на гостя фирменные салаты подаются без дополнительной оплаты.",
      priceUnavailable: "—",
    },
    lunchDeals: {
      closeOverlay: "Закрыть бизнес-ланч",
      close: "Закрыть",
      kicker: "Самообслуживание | 11:00-17:00",
      title: "Бизнес-ланч",
      description:
        "Сытный обед на тарелке: шашлыки на гриле, горячий гарнир, картофель фри, лаффа, напиток и салат-бар без ограничений.",
      includesTitle: "Включено",
      deals: [
        {
          title: "Ланч 65",
          price: "65 ₪",
          badge: "2 обычных шашлыка",
          description:
            "Два обычных шашлыка на тарелке со всем, что нужно для полноценного обеда.",
          includes: [
            "Можно выбрать 2 гарнира: ошпалов / бахш / пюре",
            "Картофель фри",
            "Лаффа",
            "Напиток",
            "Салат-бар без ограничений",
          ],
        },
        {
          title: "Ланч 85",
          price: "85 ₪",
          badge: "Обычный + особый",
          description:
            "1 обычный шашлык и 1 особый шашлык: рулет / антрекот / баранина / филе.",
          includes: [
            "Можно выбрать 2 гарнира: ошпалов / бахш / пюре",
            "Картофель фри",
            "Лаффа",
            "Напиток",
            "Салат-бар без ограничений",
          ],
        },
      ],
    },
    events: {
      title: "Мероприятия и вечеринки",
      description:
        "Мы организуем деловые мероприятия, семейные праздники и частные вечеринки. Заполните форму, и мы свяжемся с вами в течение 24 часов.",
      previewTitle: "Теплый зал для мероприятий",
      previewDescription:
        "Полная галерея зала будет добавлена позже. Пока оставьте данные, и мы подберем формат под ваше событие.",
      imageAlt: "Зал мероприятий Toro Grill",
      features: [
        "Семейные праздники",
        "Деловые мероприятия",
        "Мясное и бухарское меню",
      ],
      fields: {
        fullName: "Полное имя",
        phone: "Телефон",
        date: "Дата мероприятия",
        guests: "Количество гостей",
        notes: "Примечания",
      },
      placeholders: {
        fullName: "Иван Иванов",
        phone: "050-0000000",
        notes: "Расскажите немного о вашем мероприятии...",
      },
      validation: {
        fullName: "Введите полное имя",
        phone: "Введите корректный номер телефона",
        date: "Выберите дату",
        guests: "Минимум один гость",
      },
      toasts: {
        rateLimitTitle: "Слишком много запросов",
        rateLimitDescription:
          "Отправлено слишком много запросов. Попробуйте снова через несколько минут.",
        successTitle: "Спасибо!",
        successDescription: "Заявка отправлена, мы скоро свяжемся с вами.",
        errorTitle: "Ошибка",
        errorDescription: "Не удалось отправить заявку. Попробуйте снова.",
      },
      submit: "Отправить заявку",
      submitting: "Отправка...",
    },
    contact: {
      title: "Свяжитесь с нами",
      detailsTitle: "Детали",
      phoneLabel: "Телефон для заказов",
      addressLabel: "Адрес",
      address: "ул. Сахаров 20, Ришон-ле-Цион",
      hoursTitle: "Часы работы",
      days: [
        { label: "Воскресенье–четверг", hours: "11:00–23:00" },
        { label: "Пятница", hours: "11:00–15:00" },
        { label: "Суббота", hours: "19:00–23:00" },
      ],
      formTitle: "Оставьте данные",
      fields: {
        name: "Имя",
        phone: "Телефон",
        message: "Сообщение",
      },
      submit: "Отправить",
      submitting: "Отправка...",
      success: "Сообщение успешно отправлено",
      error: "Не удалось отправить сообщение",
    },
    delivery: {
      closeOverlay: "Закрыть варианты доставки",
      close: "Закрыть",
      title: "Заказать доставку",
      subtitle: "Выберите, где оформить заказ",
    },
    sticky: {
      delivery: "Доставка",
      table: "Забронировать стол",
      events: "Мероприятия",
    },
    footer: {
      menu: "Меню",
      events: "Мероприятия",
      contact: "Контакты",
      copyright: "© {year} Toro Grill. Все права защищены.",
    },
    notFound: {
      title: "404 Страница не найдена",
      message: "Запрошенная страница не существует.",
    },
  },
};
