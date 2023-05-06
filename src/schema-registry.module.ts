import { DynamicModule, Module } from '@nestjs/common';
import {
  SCHEMA_REGISTRY_CLIENT,
  SCHEMA_REGISTRY_MODULE_OPTIONS,
} from './schema-registry.constants';
import { SchemaRegistryConfig } from './schema-registry.interfaces';
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
}
