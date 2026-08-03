# Privacy Policy

**Acosta AI** (a Transnology company)  
**Last updated:** July 2026

> Your thoughts and data are personal. This policy outlines exactly what we collect, how it's processed, who helps us process it, and your absolute right to privacy.

> **Note:** This file is a repository reference copy. The public version lives at `/privacy` (see `components/legal/policy-content.tsx`). Keep them in sync when policies change.

---

At Acosta AI (a Transnology company), we believe your thoughts and data are personal. This policy outlines exactly what we collect, how it's processed, which providers help us run the platform, and your absolute right to privacy.

## 1. Information We Collect

### Identity Data

Email, display name, and Year Level/Role. We use this strictly for authentication and to tailor the AI's complexity (e.g., Year 7 vs University).

### Third-Party Logins

If you sign in via Google, GitHub, or Microsoft, we store your email and public profile info provided by them for authentication. We do not access your repositories, mailbox, or other private data on those platforms.

### Guest Sessions

For Guest users, we assign a temporary anonymous ID. No personal contact information is collected unless you choose to upgrade to a full account.

### Location (Optional)

Location is completely optional and is never stored. If you choose to share it, we use it only in the moment for weather context, localised responses, and during onboarding to help set your curriculum location. You can skip it entirely.

### Generated Content

Chat logs, study plans, generated images, exam papers, flashcards, class assignments, and mind dumps. These are stored in your private Firebase/Firestore workspace until you delete them. Images uploaded for analysis are processed to answer your request and are not retained for training.

### Classes Metadata

If you use Acosta Classes, we store class membership, assigned tasks, and completion status so teachers and students can collaborate. Assignment content and student work are treated as private educational content — processed to deliver the feature, not to train models.

### Guardian Metadata

We monitor interaction frequency and session duration to detect burnout/fatigue. We do **not** read your message content for this purpose — only in-platform activity signals.

### Billing Information

Processed securely by Stripe. Acosta AI never sees or stores your full credit card number or bank details.

### Technical Logs & Preferences

Basic request metadata (timestamps, approximate region, error codes) may be collected by our hosting and security providers to keep the service reliable. If you are signed in, we may set a limited preference cookie (display name and plan) on our shared domain so the marketing site can personalise links. These are not used for advertising profiles or AI training.

## 2. Hosting, AI Processing & Third Parties

### No Training on Your Data — Full Stop

Acosta AI is powered by paid, enterprise-grade APIs from **OpenAI**, **Google** (Gemini), and **Anthropic** (Claude). Under these commercial API terms, providers process your prompts and files **only to generate the immediate response**. They do **not** use Acosta traffic to train, fine-tune, or improve their foundation models.

- We do not sell your chats, notes, or class content.
- We do not license your data for model training — ours or anyone else's.
- Your physics notes stay yours, not fuel for the next public model release.

### Firebase & Google Cloud (Auth & Database)

We use Firebase Authentication and Cloud Firestore for secure sign-in and to store your account data, chats, classes, and study content. Data is encrypted in transit (TLS) and at rest on Google's infrastructure.

### Vercel (Application Hosting)

The Acosta AI web application is hosted on Vercel. Vercel runs our frontend and serverless backend so the product can scale securely. Traffic to our app is encrypted in transit (TLS). Vercel does not use your application content to train AI models.

### Cloudflare (Edge, CDN & Security)

We use Cloudflare for DNS, content delivery, and edge security (including DDoS mitigation and bot protection). Cloudflare may process connection metadata and cached assets to deliver and protect the site. Your chat content is not used by Cloudflare for AI training.

### OpenAI

OpenAI models may power text generation, reasoning, multimodal analysis, music generation, and related features depending on availability and routing. Requests are sent solely to produce your response. OpenAI's API terms for our usage exclude training on customer content.

### Google (Gemini)

Google Gemini models may be used for text, multimodal understanding, and image-related features. Data is sent to Google's API solely to generate the immediate response under enterprise/API terms that do not permit training on that traffic.

### Anthropic (Claude)

Anthropic Claude models may be used as a primary or fallback provider for reliability and quality. If another provider is unavailable or unsuitable for a task, your request may be routed to Claude. Anthropic does not train on API customer data.

### Model Routing

To keep the platform reliable, Acosta may automatically select or switch between OpenAI, Google, and Anthropic models for a given request. Regardless of which provider answers, the no-training commitment above applies.

### Stripe

We use Stripe to process all payments and subscriptions. Your credit card details are never stored on our servers. All sensitive financial data is processed directly by Stripe's PCI-DSS compliant infrastructure. For more information, see [Stripe's Privacy Policy](https://stripe.com/au/privacy).

## 3. Data Retention & Deletion

You have complete control. You can delete individual chat sessions, study plans, exam papers, or class-related items at any time via the interface. Deleting an item removes it permanently from our Firebase/Firestore systems. If you delete your account, associated personal data is wiped.

**Note for Guest Users:** Data generated during a Guest session is linked to a temporary identifier. If you clear your browser cache, switch devices, or do not convert to a permanent account, this data will be lost and cannot be recovered.

**Provider retention:** Model providers may briefly retain API request logs for abuse monitoring and reliability under their own policies. That retention is separate from Acosta's product storage and is not used to train foundation models on your Acosta content.

---

For privacy inquiries, contact [support@acosta-ai.com](mailto:support@acosta-ai.com).

Acosta AI is a [Transnology](https://transnology.co) company.  
Trading as Lachlan Thurlow (ABN 59 312 943 638).
