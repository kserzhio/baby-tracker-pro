const en = {
  meta: {
    title: "Baby Tracker Pro",
    description: "Track feeding, sleep, diapers, and notes in seconds."
  },
  common: {
    appName: "Baby Tracker Pro",
    appDescription: "Fast newborn tracking for tired parents.",
    language: "Language",
    english: "EN",
    ukrainian: "UA",
    signOut: "Sign out",
    signedInAs: "Signed in as {email}"
  },
  navigation: {
    dashboard: "Dashboard",
    babies: "Babies",
    timeline: "Timeline"
  },
  auth: {
    badge: "One-hand friendly",
    title: "Track the essentials without slowing down.",
    description: "Sign in with your email and we’ll send a secure magic link.",
    emailLabel: "Email",
    emailPlaceholder: "parent@example.com",
    submit: "Send magic link",
    submitting: "Sending...",
    checkEmail: "Check your email for the sign-in link.",
    error: "Unable to send the sign-in link."
  },
  dashboard: {
    title: "Quick log for today",
    description: "Fast actions for feeds, sleep, diapers, and notes.",
    babiesTitle: "Your babies",
    recentTitle: "Recent activity",
    emptyTitle: "No events yet today",
    emptyDescription: "Use the quick form below to log the first event.",
    addBabyHint: "Create a baby profile first so events have a home.",
    totalBabies: "Babies",
    feedingCount: "Feedings",
    sleepCount: "Sleep sessions",
    diaperCount: "Diapers",
    noteCount: "Notes"
  },
  babies: {
    title: "Babies",
    description: "Keep profiles simple so logging stays fast.",
    formTitle: "Add a baby",
    formDescription: "Only the essentials.",
    emptyTitle: "No babies yet",
    emptyDescription: "Create the first profile to unlock tracking.",
    eventsCount: "{count} events",
    nameLabel: "Name",
    namePlaceholder: "Sofiia",
    birthDateLabel: "Birth date",
    submit: "Add baby",
    submitting: "Adding..."
  },
  timeline: {
    title: "Timeline",
    description: "Grouped by day so patterns are easy to scan.",
    emptyTitle: "No events yet",
    emptyDescription: "Once you log events, they’ll appear here."
  },
  eventForm: {
    title: "Quick event",
    description: "Designed for one thumb and low battery.",
    babyLabel: "Baby",
    typeLabel: "Event type",
    startedAtLabel: "Start",
    endedAtLabel: "End",
    amountMlLabel: "Amount (ml)",
    feedingMethodLabel: "Feeding method",
    diaperTypeLabel: "Diaper type",
    noteLabel: "Notes",
    notePlaceholder: "Short note if you need it",
    submit: "Save event",
    submitting: "Saving...",
    types: {
      FEEDING: "Feeding",
      SLEEP: "Sleep",
      DIAPER: "Diaper",
      NOTE: "Note"
    },
    feedingMethods: {
      BREAST: "Breast",
      BOTTLE: "Bottle",
      FORMULA: "Formula"
    },
    diaperTypes: {
      WET: "Wet",
      DIRTY: "Dirty",
      MIXED: "Mixed"
    }
  },
  events: {
    noNote: "No note",
    feedingSummary: "{method} • {amount} ml",
    diaperSummary: "{diaperType} diaper",
    sleepSummary: "Slept for {duration}",
    noteSummary: "Note added"
  },
  validation: {
    emailInvalid: "Enter a valid email address.",
    nameMin: "Name must be at least 2 characters.",
    birthDateRequired: "Birth date is required.",
    babyIdRequired: "Select a baby.",
    startedAtRequired: "Start time is required.",
    endedAtInvalid: "End time must be after start time.",
    amountPositive: "Amount must be greater than 0.",
    noteMax: "Note is too long."
  }
} as const;

export default en;
