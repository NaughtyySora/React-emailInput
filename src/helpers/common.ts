export const isValidArray = (ds: any) => Array.isArray(ds) && !!ds.length;
export const reg = (...params: Parameters<typeof RegExp>) => new RegExp(...params);
export const numberFormatter = (v: number = 0) => (Math.abs(v) > 0.1 ? v.toFixed(2) : v.toFixed(8));

export function toPercentage(total: number, part: number, fixed?: number) {
  const percents = 100 / (total / part);
  if (isNaN(percents) || !isFinite(percents)) return 0;
  return fixed ? Number(percents.toFixed(fixed)) : percents;
}

export const flatDate = (timeStamp: number) => {
  const d = new Date(timeStamp);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

export const getTotal = <T, F extends keyof T>(dataset: T[], field: F) =>
  dataset.reduce((acc, current) => (acc += current[field] as number), 0);

export const getPercentage = (base: number, part: number) => part === 0 ? 0 : 100 / (base / part);

export const id = (x: any) => x;

export const slice = <T extends object>(array: T[], range?: number) => range ? array.slice(0, range) : array;