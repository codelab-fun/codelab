import { InjectionToken } from '@angular/core';

export const FLAME_LINK = new InjectionToken('FLAME_LINK');

interface Guest {
  name: string;
  twitter: string;
  avatar: string;
}
export interface StreamSession {
  name: string;
  guests: Guest[];
}
