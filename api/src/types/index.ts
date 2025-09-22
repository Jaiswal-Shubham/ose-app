// backend/src/types/index.ts
export interface Contact {
  id: number;
  full_name: string;
  email: string;
  linkedin_url?: string;
  message: string;
  submitted_at: Date;
}

export interface ContactPayload {
  fullName: string;
  email: string;
  linkedin?: string;
  message: string;
}

export interface Subscription {
  id: number;
  email: string;
  subscribed_at: Date;
}