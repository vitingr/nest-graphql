import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {TypeOrmModule} from '@nestjs/typeorm'
import { OwnersModule } from './owners/owners.module';
 
@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }), 
  TypeOrmModule.forRoot({
    type: "sqlite",
    database: ":memory:",
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
  }),
  PetsModule,
  OwnersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
