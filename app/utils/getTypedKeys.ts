export const getTypedKeys = Object.keys as <T extends object>(
    value: T
  ) => Array<keyof T>;
  