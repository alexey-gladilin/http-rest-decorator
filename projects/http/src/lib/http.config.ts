import { HttpHeaderType } from './http.service';

/**
 * http service configuration settings data model
 */
export interface HttpConfig {
  /** webApi host url */
  Url: string;
  /** http headers */
  Headers?: HttpHeaderType;
}
