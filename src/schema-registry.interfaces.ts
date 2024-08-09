import { SchemaRegistryAPIClientArgs } from '@kafkajs/confluent-schema-registry/dist/api';
import { ModuleMetadata, Type } from '@nestjs/common';

export interface SchemaRegistryConfig extends SchemaRegistryAPIClientArgs {
  isGlobal?: boolean;
}

export interface SchemaRegistryConfigOptionsFactory {
  createSchemaRegistryConfig():
    | Promise<SchemaRegistryConfig>
    | SchemaRegistryConfig;
}

export interface SchemaRegistryConfigAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<SchemaRegistryConfigOptionsFactory>;
  useClass?: Type<SchemaRegistryConfigOptionsFactory>;
  global?: boolean;
  useFactory?: (
    ...args: any[]
  ) => Promise<SchemaRegistryConfig> | SchemaRegistryConfig;
}
