export interface HanaModuleOptions {
  /**
   * HANA Server IP
   * Defaults to hanab1
   */
  host?: string;

  /**
   * Service layer port
   *  Defaults to 50000
   */
  port?: number;

  /**
   *  Max concurrent calls
   *  Defaults to 8
   */
  maxConcurrentCalls?: number;

  /**
   *  Max queue slots available for concurrent calls
   *  Defaults to Infinity
   */
  maxConcurrentQueue?: number;

  /**
   *  Timeout in milliseconds
   *  Defaults to 60000
   */
  timeout?: number;

  /**
   *   Username to login
   */
  username: string;

  /**
   *   Password to login
   */
  password: string;
}
