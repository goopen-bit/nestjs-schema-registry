import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { Provider } from '@nestjs/common';
import {
  SCHEMA_REGISTRY_CLIENT,
  SCHEMA_REGISTRY_MODULE_OPTIONS,
} from './schema-registry.constants';
import { SchemaRegistryConfig } from './schema-registry.interfaces';

export function createSchemaRegistryProvider(): Provider {
  return {
    provide: SCHEMA_REGISTRY_CLIENT,
    useFactory: (options: SchemaRegistryConfig): SchemaRegistry => {
      return new SchemaRegistry(options);
    },
    inject: [SCHEMA_REGISTRY_MODULE_OPTIONS],
  };
}
