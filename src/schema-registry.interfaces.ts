import { SchemaRegistryAPIClientArgs } from '@kafkajs/confluent-schema-registry/dist/api';

export interface SchemaRegistryConfig extends SchemaRegistryAPIClientArgs {
  isGlobal?: boolean;
}
