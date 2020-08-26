import { DynamicModule, Module, Global } from '@nestjs/common';
import { HanaModuleOptions } from './interfaces';
import { HanaService } from './hana.service';

@Global()
@Module({})
export class HanaModule {
  /**
   * Loads hana options with default values
   * @param options
   */
  static forRoot(options: HanaModuleOptions): DynamicModule {

    let defaultOptions = {
      port: 30015,
      host: 'hanab1',
      maxConcurrentCalls: 8,
      maxConcurrentQueue: Infinity,
      timeout: 1000 * 60
    };

    let config = {
      ...defaultOptions,
      ...options,
    };

    return {
      module: HanaModule,
      providers: [
        {
          provide: "ALFAERP_HANA_OPTIONS",
          useValue: config,
        },
        HanaService,
      ],
      exports: [HanaService],
    };
  }
}
