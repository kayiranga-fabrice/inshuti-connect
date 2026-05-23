# SMS automated tips

The website saves phone numbers in Supabase. Sending texts requires a **server-side** job (static hosting cannot hold SMS API secrets safely).

## 1. Create the table

In [Supabase SQL Editor](https://supabase.com/dashboard), run:

`supabase/sms_subscribers.sql`

## 2. Choose an SMS provider (Rwanda)

- [Africa's Talking](https://africastalking.com/) — common in East Africa
- Or your university / telco SMS gateway

## 3. Send tips (outline)

1. Create a scheduled function (Supabase Edge Function, Azure Function, or cron) with `AFRICAS_TALKING_API_KEY`.
2. Read active rows from `sms_subscribers`.
3. Send messages from `src/lib/sms-messages.ts` (rotate tips, respect opt-out).

Tip templates and keywords live in `src/lib/sms-messages.ts`.

## 4. Until SMS is live

Students can still:

- **Install the PWA** — `/install`
- **Copy tip text** from `/messages` and share via any channel
- Use **urgent help** hotlines on `/urgent-help`
