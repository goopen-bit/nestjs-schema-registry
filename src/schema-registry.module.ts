import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  SCHEMA_REGISTRY_CLIENT,
  SCHEMA_REGISTRY_MODULE_OPTIONS,
} from './schema-registry.constants';
import {
  SchemaRegistryConfig,
  SchemaRegistryConfigAsyncOptions,
  SchemaRegistryConfigOptionsFactory,
} from './schema-registry.interfaces';
import { createSchemaRegistryProvider } from './schema-registry.provider';

@Module({
  providers: [createSchemaRegistryProvider()],
  exports: [SCHEMA_REGISTRY_CLIENT],
})
export class SchemaRegistryModule {
  static register(options: SchemaRegistryConfig): DynamicModule {
    return {
      module: SchemaRegistryModule,
      global: options.isGlobal,
      providers: [
        { provide: SCHEMA_REGISTRY_MODULE_OPTIONS, useValue: options },
      ],
    };
  }

  static registerAsync(
    options: SchemaRegistryConfigAsyncOptions,
  ): DynamicModule {
    const providers = [
      ...this.createAsyncProviders(options),
      createSchemaRegistryProvider(),
    ];
    return {
      module: SchemaRegistryModule,
      imports: options.imports || [],
      providers,
      exports: providers,
      global: options.global,
    };
  }

  private static createAsyncProviders(
    options: SchemaRegistryConfigAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: SchemaRegistryConfigAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: SCHEMA_REGISTRY_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: SCHEMA_REGISTRY_MODULE_OPTIONS,
      useFactory: async (optionsFactory: SchemaRegistryConfigOptionsFactory) =>
        await optionsFactory.createSchemaRegistryConfig(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
