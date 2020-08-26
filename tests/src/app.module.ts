import { DynamicModule, Inject, Module, Optional } from '@nestjs/common';
import { HanaModule } from '../../lib/hana.module';
import { HanaService } from '../../lib/hana.service';

@Module({})
export class AppModule {
  constructor(private readonly hanaService: HanaService) {}

  static withForRoot(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        HanaModule.forRoot({
          password: '',
          username: ''
        }),
      ],
    };
  }

}
