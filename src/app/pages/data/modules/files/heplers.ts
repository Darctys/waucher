import {from, Observable, of, Subscriber} from "rxjs";
import {switchMap} from "rxjs/operators";




/**Есть несколько разных форматов base 64 если не вырезать это то в .net core файл не пропарсится
 * const base64 = control.FileBase64[0].replace(/^.*base64,/, "");
 * @param file
 * @param isOriginal
 * @returns Observable<string>
 */
export function fileReadAsBase64$(file: File, isOriginal?: boolean): Observable<string> {
  if (!file) {
    return of('');
  }

  return new Observable<string>((sub: Subscriber<string>) => {
    const reader: FileReader = new FileReader();

    reader.onloadend = (): void => {
      if (reader.result) {
        sub.next(isOriginal ? reader.result.toString() : reader.result.toString().replace(/^.*base64,/, ''));
      } else {
        sub.error(reader.error ? reader.error.message : 'Reading file content error');
      }
      sub.complete();
    };
    reader.onerror = (): void => {
      sub.error(reader.error ? reader.error.message : 'Reading file content error');
    };

    reader.readAsDataURL(file);
  });
}

/**
 * B64 to Blob
 * @param {string} b64
 * @param {string} extension
 * @return {Observable<Blob>}
 */
export function base64ToBlob(b64: string, extension: string): Observable<Blob> {
  return from(fetch(`data:${getMimeTipes(extension)};base64,${b64}`))
    .pipe(
      switchMap((response: Response) => {
        return response.blob();
      })
    );
};




/**
 * Возващает Mime тип файла по расширению
 * @param expansion
 * @returns string
 */
export function getMimeTipes(expansion: string): string {
  const mimeTipes: { [key: string]: string } = {
    '.aac': 'audio/aac',
    '.abw': 'application/x-abiword',
    '.arc': 'application/x-freearc',
    '.avi': 'video/x-msvideo',
    '.azw': 'application/vnd.amazon.ebook',
    '.bin': 'application/octet-stream',
    '.bmp': 'image/bmp',
    '.bz': 'application/x-bzip',
    '.bz2': 'application/x-bzip2',
    '.csh': 'application/x-csh',
    '.css': 'text/css',
    '.csv': 'text/csv',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.eot': 'application/vnd.ms-fontobject',
    '.epub': 'application/epub+zip',
    '.gz': 'application/gzip',
    '.gif': 'image/gif',
    '.htm': 'text/html',
    '.html': 'text/html',
    '.ico': 'image/vnd.microsoft.icon',
    '.ics': 'text/calendar',
    '.jar': 'application/java-archive',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.jsonld': 'application/ld+json',
    '.mid': 'audio/midi',
    '.midi': 'audio/x-midi',
    '.mjs': 'text/javascript',
    '.mp3': 'audio/mpeg',
    '.mpeg': 'video/mpeg',
    '.mpkg': 'application/vnd.apple.installer+xml',
    '.odp': 'application/vnd.oasis.opendocument.presentation',
    '.ods': 'application/vnd.oasis.opendocument.spreadsheet',
    '.odt': 'application/vnd.oasis.opendocument.text',
    '.oga': 'audio/ogg',
    '.ogv': 'video/ogg',
    '.ogx': 'application/ogg',
    '.opus': 'audio/opus',
    '.otf': 'font/otf',
    '.png': 'image/png',
    '.pdf': 'application/pdf',
    '.php': 'application/php',
    '.ppt': 'application/vnd.ms-powerpoint',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    '.rar': 'application/vnd.rar',
    '.rtf': 'application/rtf',
    '.sh': 'application/x-sh',
    '.svg': 'image/svg+xml',
    '.swf': 'application/x-shockwave-flash',
    '.tar': 'application/x-tar',
    '.tif': 'image/tiff',
    '.tiff': 'image/tiff',
    '.ts': 'video/mp2t',
    '.ttf': 'font/ttf',
    '.txt': 'text/plain',
    '.vsd': 'application/vnd.visio',
    '.wav': 'audio/wav',
    '.weba': 'audio/webm',
    '.webm': 'video/webm',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.xhtml': 'application/xhtml+xml',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.xml': 'text/xml',
    '.xul': 'application/vnd.mozilla.xul+xml',
    '.zip': 'application/zip',
    '.3gp': 'video/3gpp',
    '.7z': 'application/x-7z-compressed'
  };

  return mimeTipes[expansion];
}
