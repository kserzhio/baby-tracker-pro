const uk = {
  meta: {
    title: "Baby Tracker Pro",
    description: "Швидко фіксуйте годування, сон, підгузки та нотатки."
  },
  common: {
    appName: "Baby Tracker Pro",
    appDescription: "Швидкий трекер для новонароджених.",
    language: "Мова",
    english: "EN",
    ukrainian: "UA",
    signOut: "Вийти",
    signedInAs: "Увійшли як {email}"
  },
  navigation: {
    dashboard: "Головна",
    babies: "Діти",
    timeline: "Стрічка"
  },
  auth: {
    badge: "Зручно однією рукою",
    title: "Фіксуйте важливе без зайвих дій.",
    description: "Увійдіть через email, і ми надішлемо безпечне magic link посилання.",
    emailLabel: "Email",
    emailPlaceholder: "parent@example.com",
    submit: "Надіслати magic link",
    submitting: "Надсилаємо...",
    checkEmail: "Перевірте пошту, щоб увійти.",
    error: "Не вдалося надіслати посилання для входу."
  },
  dashboard: {
    title: "Швидкий запис на сьогодні",
    description: "Швидкі дії для годування, сну, підгузків і нотаток.",
    babiesTitle: "Ваші діти",
    recentTitle: "Остання активність",
    emptyTitle: "Сьогодні ще немає подій",
    emptyDescription: "Скористайтеся швидкою формою нижче, щоб додати першу подію.",
    addBabyHint: "Спочатку створіть профіль дитини, щоб зберігати події.",
    totalBabies: "Діти",
    feedingCount: "Годування",
    sleepCount: "Сон",
    diaperCount: "Підгузки",
    noteCount: "Нотатки"
  },
  babies: {
    title: "Діти",
    description: "Прості профілі, щоб логування було швидким.",
    formTitle: "Додати дитину",
    formDescription: "Лише найважливіше.",
    emptyTitle: "Ще немає дітей",
    emptyDescription: "Створіть перший профіль, щоб увімкнути трекінг.",
    eventsCount: "{count} подій",
    nameLabel: "Ім'я",
    namePlaceholder: "Софія",
    birthDateLabel: "Дата народження",
    submit: "Додати дитину",
    submitting: "Додаємо..."
  },
  timeline: {
    title: "Стрічка",
    description: "Події згруповані за днями, щоб було легше бачити ритм.",
    emptyTitle: "Ще немає подій",
    emptyDescription: "Після додавання подій вони з’являться тут."
  },
  eventForm: {
    title: "Швидка подія",
    description: "Створено для одного великого пальця і мінімуму дій.",
    babyLabel: "Дитина",
    typeLabel: "Тип події",
    startedAtLabel: "Початок",
    endedAtLabel: "Кінець",
    amountMlLabel: "Кількість (мл)",
    feedingMethodLabel: "Спосіб годування",
    diaperTypeLabel: "Тип підгузка",
    noteLabel: "Нотатка",
    notePlaceholder: "Коротка нотатка за потреби",
    submit: "Зберегти подію",
    submitting: "Зберігаємо...",
    types: {
      FEEDING: "Годування",
      SLEEP: "Сон",
      DIAPER: "Підгузок",
      NOTE: "Нотатка"
    },
    feedingMethods: {
      BREAST: "Груди",
      BOTTLE: "Пляшка",
      FORMULA: "Суміш"
    },
    diaperTypes: {
      WET: "Мокрий",
      DIRTY: "Брудний",
      MIXED: "Змішаний"
    }
  },
  events: {
    noNote: "Без нотатки",
    feedingSummary: "{method} • {amount} мл",
    diaperSummary: "{diaperType} підгузок",
    sleepSummary: "Сон {duration}",
    noteSummary: "Додано нотатку"
  },
  validation: {
    emailInvalid: "Введіть коректну email адресу.",
    nameMin: "Ім'я має містити щонайменше 2 символи.",
    birthDateRequired: "Дата народження обов'язкова.",
    babyIdRequired: "Оберіть дитину.",
    startedAtRequired: "Час початку обов'язковий.",
    endedAtInvalid: "Час завершення має бути пізніше за початок.",
    amountPositive: "Кількість має бути більшою за 0.",
    noteMax: "Нотатка занадто довга."
  }
} as const;

export default uk;
