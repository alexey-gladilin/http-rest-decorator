/**
 * http service configuration settings data model
 */
export interface HttpConfig {
  Url: string;
  Headers: string | { [name: string]: string | string[] };
}
