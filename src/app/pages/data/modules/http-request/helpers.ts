/**
 * формирование строки запроса с квери параметрами
 * @param uri исходный uri
 * @param params параметры которые надо добавить в квери
 * @returns {string}
 */
export function appendQueryParams(uri: string, params: string | URLSearchParams | { [key: string]: any | any[]; } | null): string {
  if (params && Object.keys(params).length) {
    const keyValuePairs: string[] = [];
    for(const key of Object.keys(params)) {
      const value: any = params[key as keyof object];
      const normalizedValue: any[] = Array.isArray(value) ? value : [value];
      for (const item of normalizedValue) {
        if (item === null || item === undefined) {
          continue;
        }
        keyValuePairs.push(`${key}=${encodeURIComponent(item)}`);
      }
    }
    const query: string = keyValuePairs.join('&');
    uri += (uri.indexOf('?') > -1 ? '&' : '?') + query;
  }

  return uri;
}
