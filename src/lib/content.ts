export const site = {
  name: "Сосновский Алексей",
  givenName: "Алексей",
  title: "сертифицированный массажист",
  tagline: "Возвращаю телу лёгкость и покой",
  description:
    "Индивидуальный подход к каждому клиенту. Работаю с телом бережно, помогая снять напряжение и восстановить естественный баланс.",
  experience: "8 лет практики",
  address: "Минск, ул. Немига, 12, каб. 4",
  phone: "+375 (29) 123-45-67",
  phoneHref: "tel:+375291234567",
  email: "alexey.sosnovsky@example.by",
  hours: "Пн–Сб 10:00–20:00",
  social: {
    instagram: "https://instagram.com",
    telegram: "https://t.me",
  },
} as const;

export const navLinks = [
  { label: "Обо мне", href: "#philosophy" },
  { label: "Услуги", href: "#services" },
  { label: "Процесс", href: "#process" },
  { label: "Галерея", href: "#gallery" },
  { label: "Отзывы", href: "#testimonials" },
  { label: "Запись", href: "#booking" },
] as const;

export const services = [
  {
    id: "classic",
    title: "Классический массаж",
    description:
      "Глубокая проработка мышц для снятия хронического напряжения и улучшения кровообращения.",
    duration: "60 мин",
    price: "80 BYN",
  },
  {
    id: "relax",
    title: "Релакс-массаж",
    description:
      "Мягкие техники для глубокого расслабления нервной системы и восстановления сна.",
    duration: "90 мин",
    price: "110 BYN",
  },
  {
    id: "sport",
    title: "Спортивный массаж",
    description:
      "Подготовка мышц к нагрузкам и ускоренное восстановление после тренировок.",
    duration: "60 мин",
    price: "95 BYN",
  },
  {
    id: "lymph",
    title: "Лимфодренажный",
    description:
      "Деликатная техника для выведения лишней жидкости и уменьшения отёчности.",
    duration: "75 мин",
    price: "100 BYN",
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Консультация",
    description:
      "Обсуждаем ваши ощущения, зоны дискомфорта и цели сеанса. Подбираю оптимальную технику.",
  },
  {
    step: "02",
    title: "Сеанс",
    description:
      "Работаю в спокойном темпе, адаптируя давление и интенсивность под ваше состояние.",
  },
  {
    step: "03",
    title: "Рекомендации",
    description:
      "Даю советы по уходу, растяжке и режиму — чтобы эффект сеанса сохранялся дольше.",
  },
] as const;

export const testimonials = [
  {
    id: "1",
    text: "После нескольких сеансов ушла боль в шее, которую мучила годами. Алексей работает очень внимательно и профессионально.",
    author: "Мария К.",
    role: "Дизайнер",
  },
  {
    id: "2",
    text: "Нашла своего массажиста. Кабинет уютный, атмосфера спокойная — выходишь как новый человек.",
    author: "Елена С.",
    role: "Предприниматель",
  },
  {
    id: "3",
    text: "Спортивный массаж помог восстановиться после марафона. Рекомендую всем, кто активно тренируется.",
    author: "Дмитрий В.",
    role: "Бегун-любитель",
  },
] as const;

export const galleryImages = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    alt: "Уютный массажный кабинет",
    span: "tall" as const,
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80",
    alt: "Расслабляющий массаж",
    span: "normal" as const,
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80",
    alt: "Массажные масла и свечи",
    span: "normal" as const,
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1709755491926-f7aa83748967?w=800&q=80",
    alt: "Профессиональный массаж спины",
    span: "wide" as const,
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80",
    alt: "Спа-атмосфера",
    span: "normal" as const,
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    alt: "Детали кабинета",
    span: "tall" as const,
  },
] as const;

export const heroImage =
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=85";

export const philosophy = {
  quote:
    "Тело помнит всё. Моя задача — мягко напомнить ему, каково это — быть в покое.",
  text: "Я верю, что массаж — это не просто механическая проработка мышц. Это диалог с телом, в котором важны доверие, внимание и уважение к вашим границам. Каждый сеанс я начинаю с того, чтобы услышать, что говорит ваше тело сегодня.",
} as const;
