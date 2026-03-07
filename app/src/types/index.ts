export enum AgeCategory {
  Prenatal = "prenatal",
  ZeroToOne = "0-1",
  OneToThree = "1-3",
}

export enum NotificationPermissionStatus {
  Idle = "idle",
  Granted = "granted",
  Denied = "denied",
}

export enum OnboardingStep {
  Welcome = "welcome",
  AgeSelection = "age-selection",
  NotificationSetup = "notification-setup",
  NotificationPrompt = "notification-prompt",
  Done = "done",
}
