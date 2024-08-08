<div align="center">
    <a align="center" href="https://nestjs.com/" target="_blank">
      <img src="https://raw.githubusercontent.com/goopen-bit/nestjs-schema-registry/main/assets/logo-small.svg" alt="NestJS" height=200/>
    </a>
    <a align="center" href="https://kafkajs.github.io/confluent-schema-registry/" target="_blank">
      <img src="https://raw.githubusercontent.com/goopen-bit/nestjs-schema-registry/main/assets/kafkajs-logoV2.svg" alt="Confluent Schema Registry" height=200/>
    </a>
    <h1 align="center">NestJS module for Confluent Schema Registry</h1>
  <br/>
</div>

# Tiny NestJS module to use with Confluent Schema Registry

## 1. Install

```shell
npm install @goopen/nestjs-schema-registry @kafkajs/confluent-schema-registry
```

## 2. Register the Confluent schema module in your app

```typescript
@Module({
  imports: [
    SchemaRegistryModule.register({
      isGlobal: true,
      host: SCHEMA_REGISTRY_URL,
      auth: {
        username: SCHEMA_REGISTRY_USERNAME,
        password: SCHEMA_REGISTRY_PASSWORD,
      },
    }),
  ],
})
export class KafkaModule {}
```

Or if you wish to inject the ConfigModule to pull the configuration from environment variables

```typescript
@Module({
  imports: [
    ConfigModule.forRoot(),
    SchemaRegistryModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get<string>('SCHEMA_REGISTRY_URL'),
        auth: {
          username: configService.get<string>('SCHEMA_REGISTRY_USERNAME'),
          password: configService.get<string>('SCHEMA_REGISTRY_PASSWORD'),
        },
      }),
    }),
  ]
})
export class KafkaModule {}
````

## 3. You're then able to use the injector to use the schema registry

```typescript
@Injectable()
export class KafkaService{
  constructor(
    @InjectSchemaRegistry() private readonly schemaRegistry: SchemaRegistry,
  ) {}
}
```
