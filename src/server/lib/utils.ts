import { prototype } from "events";

export const capitalize = (word: string) => {
  const capitalLetter = word.charAt(0).toUpperCase() + word.slice(1);

  return capitalLetter;
};

export const capitalizeWords = (sentence: string) => {
  const capitalizeWords = sentence.split(" ");
  const capitalSentence = capitalizeWords.map(capitalize).join(" ");

  return capitalSentence;
};

export const slugify = (text: string): string => {
  const lowercaseWord = text.toLowerCase();

  const replaceSpace = lowercaseWord.replaceAll(" ", "-");

  const cleanText = replaceSpace.replace(/[^a-z0-9 -]/g, "");

  const normalizedText = cleanText.replace(/-+/g, "-");

  const removedHyphen = normalizedText.replace(/^-+|-+$/g, "");

  const trimmedText = removedHyphen.trim();

  return trimmedText;
};

export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === "string") {
    const clearString = value.trim().length;
    if (clearString === 0) return true;
  }
  if (Array.isArray(value)) {
    const arrayLength = value.length;
    if (arrayLength === 0) return true;
  }

  if (typeof value === "object" && value !== null) {
    const specialObject = Object.getPrototypeOf(value);
    if (specialObject === Object.prototype || specialObject === null) {
      const objectArray = Object.keys(value);
      const objectLength = objectArray.length;
      if (objectLength === 0) {
        return true;
      }
    }
  }

  return false;
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const truncate = (text: string, maxLength: number): string => {
  if (maxLength < 3) {
    return text.slice(0, maxLength);
  }

  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength - 3) + "...";
};

export const normalizeString = (text: string): string => {
  const trimmedText = text.trim().toLowerCase();

  const cleanAll = trimmedText.replace(/\s+/g, " ");

  return cleanAll;
};

export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result: Pick<T, K> = {} as Pick<T, K>;

  for (const key of keys) {
    result[key] = obj[key];
  }

  return result;
};

export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> => {
  const result: Omit<T, K> = {} as Omit<T, K>;

  for (const key of Object.keys(obj) as (keyof T)[]) {
    if (!keys.includes(key as K)) {
      (result as Record<string, unknown>)[key as string] = obj[key];
    }
  }

  return result;
};
