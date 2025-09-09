import { HttpHeaders } from '@angular/common/http';

export class HttpRequestModel {
  url: string = '';
  action: string = '';
  params: object = {};
  body: any = {};
  isText: boolean = false;
  headers: HttpHeaders = {} as HttpHeaders;
  pathParams: Record<string, string | number | boolean> = {};

  constructor(copy?: Partial<HttpRequestModel>) {
    Object.assign(this, copy);

    this.params = Object.entries(this.params)
      .filter(([, val]) => val !== null)
      .filter(([, val]) => val !== undefined)
      .reduce((state, [key, val]) => ({ ...state, [key]: val }), {});

    if (Array.isArray(this.body)) { return; }

    this.body = Object.entries(this.body)
      .filter(([, val]) => val !== null)
      .filter(([, val]) => val !== undefined)
      .reduce((state, [key, val]) => ({
        ...state, [key]: val
      }), {});

    this.body = Object.keys(this.body).length ? this.body : null;
  }

  get queryParams() {

    const result = this._queryParams(this.params);

    return /&/.test(result) ? `?${result}` : '';
  }

  private _queryParams(params: object, prefix: string = ''): string {
    const result = Object.entries(params)
      .filter(([, value]) => typeof (value) !== 'object')
      .map(([key, value]) => `${prefix}${key}=${decodeURIComponent(value)}`)
      .join('&');

    return Object.entries(params)
      .filter(([, value]) => typeof (value) === 'object')
      .map(([key, value]) => this._queryParams(value, `${key}.`))
      .concat(result)
      .join('&');
  }

  private _applyPathParams(url: string): string {
    if (!this.pathParams || Object.keys(this.pathParams).length === 0) return url;

    const base = url.replace(/\/+$/, '');

    const segments = Object.values(this.pathParams)
      .map(v => encodeURIComponent(String(v)));

    return `${base}/${segments.join('/')}`;
  }


get fullUrl() {
  const base = `${this.url}${this.action}`;
  const normalized = base.replace(/([^:]\/)\/+/g, '$1');
  return this._applyPathParams(normalized);
}


  get fullParams() {
    return this.params;
  }
}
