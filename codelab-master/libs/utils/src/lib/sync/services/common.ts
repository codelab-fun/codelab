export interface FirebaseInfo {
  connected: string;
  serverTimeOffset: string;
}

export interface FirebaseDb {
  '.info': FirebaseInfo;
}

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

export function mergeValues(value, defaultValue) {
  if (value === null) {
    return defaultValue;
  }

  if (typeof value === 'object' && typeof defaultValue === 'object') {
    return { ...defaultValue, ...value };
  }

  return typeof value === 'undefined' ? defaultValue : value;
}
