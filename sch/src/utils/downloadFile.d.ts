export default function downloadFile(
  url: string,
  callback?: () => void,
  retryTimes?: number,
): void;

export function download(params: {
  url: string;
  conditions: any[];
  orderConditions: any[];
  paramsName?: string;
  before?: (url: string, data: string) => string;
}): void;
