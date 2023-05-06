import { Inject } from '@nestjs/common';
import { SCHEMA_REGISTRY_CLIENT } from './schema-registry.constants';

export const InjectSchemaRegistry = () => Inject(SCHEMA_REGISTRY_CLIENT);
