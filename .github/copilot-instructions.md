# Daily Parenting – MVP Context

## Overview

Daily Parenting is a mobile app that delivers one short, age-relevant parenting insight per day via push notification.

The goal of the MVP is to validate a simple behavioral hypothesis:

> Parents will engage with a single daily insight delivered at a consistent time.

The product is intentionally minimal and focused on building a daily habit.

---

## Target Users

Parents (or expecting parents) with children in early developmental stages:

- Prenatal
- 0–1 years
- 1–3 years

The app is designed to support parents during these stages with short, supportive, standalone insights.

---

## Core MVP Experience

### 1. Onboarding

When a user installs the app:

- They select one age category:
  - Prenatal
  - 0–1
  - 1–3

This selection determines which content they will receive.

There is no topic selection or additional customization in the MVP.

---

### 2. Daily Push Notification

Each user receives:

- One push notification per day
- Sent at 8:00 PM local time
- Containing a short parenting insight relevant to their selected age group

Tapping the push notification opens the app.

---

### 3. Daily Message Screen

When the app is opened:

- The user sees the current day’s message
- Only one message is visible at a time
- The message remains available until the next day’s push
- When a new message is sent, it replaces the previous one

There is no feed or browsing functionality in the MVP.

---

## Content Model

Each content item:

- Is a single standalone sentence
- Is age-specific
- Is clear without additional context
- Is non-judgmental and supportive

Content is pre-written and stored in the backend.

---

## Message Rotation

The system must:

- Select content relevant to the user’s age group
- Avoid repeating recently sent messages
- Track which messages were sent to which users

Each user’s exposure history is recorded to prevent early repetition.

---

## Push Tracking

For each notification:

- The system records when a push is sent
- The system records when a push is opened

This enables calculation of:

- Push open rate
- Daily engagement
- Retention metrics

---

## MVP Metrics

The MVP is designed to measure:

- Number of installs
- Activation rate (users who view at least one message)
- Day 1 retention
- Day 7 retention
- Push open rate

No advanced analytics or segmentation is required in the MVP.

---

## Explicitly Out of Scope (MVP)

The following features are not included in the initial version:

- Topic selection
- Custom notification time selection
- Message history
- Favorites or bookmarks
- Streaks or gamification
- Subscriptions or payments
- Personalization algorithms
- Social features
- In-app browsing feed

These may be introduced later if retention validates the core concept.

---

## Future Expansion Direction (Post-MVP)

If engagement and retention are strong, potential future features include:

- Topic selection
- Custom notification timing
- History of past messages
- Save / favorite functionality
- Premium subscription model
- Personalization logic based on engagement
- Expanded age segmentation

These features are intentionally deferred until the core daily habit is validated.

---

## Guiding Principle

The MVP exists to test one thing:

> Is a single daily parenting insight valuable enough to create a repeat usage habit?

All functionality should support that objective and nothing more.
