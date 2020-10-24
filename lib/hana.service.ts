import { Inject, Injectable, Optional, HttpStatus, HttpException } from '@nestjs/common';
import { ConnectionOptions, createConnection } from '@ibsolution/types-hana-client';
import axios from 'axios';
import { HanaModuleOptions } from './interfaces';

@Injectable()
export class HanaService {
  private connectionOptions: ConnectionOptions;

  constructor(@Inject('ALFAERP_HANA_OPTIONS') private readonly options: HanaModuleOptions) {
    this.connectionOptions = {
      host: this.options.host,
      port: this.options.port,
      uid: this.options.username,
      pwd: this.options.password,
    };
  }

  queryFirst<T>(query: string): Promise<T | null> {
    return new Promise((resolve, reject) => {
      this.query<T>(query)
        .then(result => {
          if (result && result.length > 0) {
            resolve(result[0]);
          } else {
            resolve(null);
          }
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }

  query<T>(query: string): Promise<Array<T>> {
    let host = this.connectionOptions.host || '';

    if (host.indexOf('http') >= 0) {
      return axios.post(host, { ...this.connectionOptions, query });
    } else {
      let connection = createConnection(this.connectionOptions);

      return new Promise((resolve, reject) => {
        let disconnect = () => connection.disconnect(() => {});
        try {
          connection.connect(this.connectionOptions, connectionError => {
            if (!connectionError) {
              try {
                connection.exec<T>(query, (execError, results: any) => {
                  if (!execError) {
                    resolve(results);
                  } else {
                    reject(execError);
                  }
                  disconnect();
                  return;
                });
              } catch (ex) {
                reject(ex);
              }
            } else {
              reject(connectionError);
            }
          });
        } catch (ex) {
          reject(ex);
        }
      });
    }
  }
}
