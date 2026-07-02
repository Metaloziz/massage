export const site = {
  name: "Сосновский Алексей",
  givenName: "Алексей",
  title: "сертифицированный массажист",
  tagline: "Возвращаю телу лёгкость и покой",
  description:
    "Индивидуальный подход к каждому клиенту. Работаю с телом бережно, помогая снять напряжение и восстановить естественный баланс.",
  experience: "8 лет практики",
  regionLabel: "Массажист · Минск · Молодечно",
  phone: "+375 (29) 570-56-37",
  phoneHref: "tel:+375295705637",
  hours: "По предварительной записи",
  payment: "Оплата наличными",
  social: {
    instagram: "https://www.instagram.com/sasnouski_aliaksei/",
    instagramHandle: "@sasnouski_aliaksei",
    telegram: "https://t.me/aliaksei_sasnouski",
    telegramHandle: "@aliaksei_sasnouski",
  },
} as const;

export const bookingInfo = {
  reminder:
    "Накануне сеанса (за 6–24 часа) я пришлю напоминание.",
  confirmation:
    "Если сообщение не пришло, пожалуйста, напишите или позвоните мне сами, чтобы подтвердить запись.",
} as const;

export const locations = [
  {
    id: "tyurli",
    label: "Кабинет в Минской области",
    name: "Кинезиомассаж",
    city: "Минская область",
    district: "д. Тюрли",
    address: "ул. Южная, 6",
    fullAddress: "д. Тюрли, ул. Южная, 6",
    directions:
      "Въезд через открытые зелёные ворота. Вход с правой стороны дома, дверь с надписью «Массаж».",
    mapUrl:
      "https://yandex.by/maps/org/kineziomassazh/114657222860/?ll=26.830421%2C54.288270&z=15",
    mapLabel: "Яндекс Карты",
    hours: "По предварительной записи",
    available: true,
  },
  {
    id: "minsk",
    label: "Кабинет в Минске",
    name: "Кинезиомассаж",
    city: "Минск",
    district: "ул. Тепличная",
    address: "1",
    fullAddress: "Минск, ул. Тепличная, 1",
    mapUrl:
      "https://www.google.com/maps/place/%D0%9A%D0%B8%D0%BD%D0%B5%D0%B7%D0%B8%D0%BE%D0%BC%D0%B0%D1%81%D1%81%D0%B0%D0%B6/@53.920126,27.6420763,17z/data=!3m1!4b1!4m6!3m5!1s0x46dbcfc95d05015b:0xba1b19984bea59b0!8m2!3d53.920126!4d27.6420763!16s%2Fg%2F11p9dht2lz!18m1!1e1?entry=ttu",
    mapLabel: "Google Карты",
    hours: "По предварительной записи",
    available: true,
    images: {
      cabinet: [
        {
          src: "/locations/minsk/cabinet-1.jpg",
          alt: "Массажный кабинет в Минске — рабочее пространство",
        },
        {
          src: "/locations/minsk/cabinet-2.jpg",
          alt: "Массажный стол и оборудование в кабинете на ул. Тепличная",
        },
      ],
      directions: [
        {
          src: "/locations/minsk/directions-1.jpg",
          alt: "Здание на ул. Тепличная, 1 — вид с улицы",
        },
        {
          src: "/locations/minsk/directions-2.jpg",
          alt: "Вход в кабинет Кинезиомассаж на ул. Тепличная",
        },
      ],
    },
  },
] as const;

export const yandexReviews = {
  rating: 4.6,
  count: 9,
  url: "https://yandex.by/maps/org/kineziomassazh/114657222860/",
  label: "Яндекс Карты",
} as const;

export const googleReviews = {
  rating: 5.0,
  count: 2,
  url: "https://www.google.com/maps/place/%D0%9A%D0%B8%D0%BD%D0%B5%D0%B7%D0%B8%D0%BE%D0%BC%D0%B0%D1%81%D1%81%D0%B0%D0%B6/@53.920126,27.6420763,17z/data=!3m1!4b1!4m6!3m5!1s0x46dbcfc95d05015b:0xba1b19984bea59b0!8m2!3d53.920126!4d27.6420763!16s%2Fg%2F11p9dht2lz!18m1!1e1?entry=ttu",
  label: "Google Карты",
} as const;

export const reviewSources = {
  yandex: yandexReviews,
  google: googleReviews,
} as const;

export const navLinks = [
  { label: "Обо мне", href: "#philosophy" },
  { label: "Услуги", href: "#services" },
  { label: "Процесс", href: "#process" },
  { label: "Галерея", href: "#gallery" },
  { label: "Кабинеты", href: "#locations" },
  { label: "Отзывы", href: "#testimonials" },
  { label: "Запись", href: "#booking" },
] as const;

export const services = [
  {
    id: "kinesio",
    title: "Кинезиология + массаж",
    description:
      "Входит диагностика на всех этапах работы и сам кинезиомассаж.",
    duration: "60 мин",
    priceTyurli: "120 руб.",
    priceMinsk: "150 руб.",
  },
  {
    id: "massage",
    title: "Массаж",
    description:
      "Классический, лимфодренажный, глубокотканный или спортивный.",
    duration: "60 / 30 мин",
    priceTyurli: "100 / 50 руб.",
    priceMinsk: "110 руб.",
    priceMinskNote: "за 60 мин",
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
    id: "yandex-1",
    text: "Уже не первый год обращаюсь к Алексею за помощью, он единственный человек, кто мне реально помогает, когда меня беспокоит что-то после травм. Очень грамотный подход, реально разбирается в анатомии и кинезиологии, чётко определяет реальную проблему и действительно помогает поставить на ноги.",
    author: "Ростислав Ч.",
    date: "9 марта",
    source: "yandex" as const,
  },
  {
    id: "yandex-2",
    text: "Хороший сервис, всё круто, пользуюсь услугами уже много лет.",
    author: "Андрей Г.",
    date: "1 июля",
    source: "yandex" as const,
  },
  {
    id: "yandex-3",
    text: "Прошла курс массажа у Алексея. Обратилась с серьёзной проблемой после операции. Результатом очень довольна. Алексей работает очень профессионально. Есть с чем сравнить — делала массаж у разных специалистов и в Минске, и в Молодечно. Для меня очень важно то, что у Алексея очень хорошая энергетика. Приятно приходить на приём. Рекомендую.",
    author: "Татьяна Ф.",
    date: "17 февраля",
    source: "yandex" as const,
  },
  {
    id: "google-1",
    text: "Ходила к Алексею на массаж в течение полугода, очень приятный подход, сняли спазм от туннельного синдрома, обошлись без блокады. В практиках использует ароматерапию — для тех, кто любит запахи, это истинное удовольствие.",
    author: "Юлия Щ.",
    date: "год назад",
    source: "google" as const,
  },
  {
    id: "google-2",
    text: "Просто космос. Алексей теперь мой доктор Айболит. Что-то заболело — пришёл, и больше не болит.",
    author: "Владимир С.",
    date: "год назад",
    source: "google" as const,
  },
] as const;

export const galleryImages = [
  {
    id: "minsk-cabinet-1",
    src: "/locations/minsk/cabinet-1.jpg",
    alt: "Уютный массажный кабинет в Минске",
    span: "tall" as const,
  },
  {
    id: "minsk-cabinet-2",
    src: "/locations/minsk/cabinet-2.jpg",
    alt: "Массажный стол и атмосфера кабинета",
    span: "tall" as const,
  },
] as const;

export const heroImage = "/locations/minsk/cabinet-1.jpg";

export const heroVideo = "/preview/video-preview.mp4";

export const philosophy = {
  quote:
    "Тело помнит всё. Моя задача — мягко напомнить ему, каково это — быть в покое.",
  text: "Я верю, что массаж — это не просто механическая проработка мышц. Это диалог с телом, в котором важны доверие, внимание и уважение к вашим границам. Каждый сеанс я начинаю с того, чтобы услышать, что говорит ваше тело сегодня.",
} as const;
