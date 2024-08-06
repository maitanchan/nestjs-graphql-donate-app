import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DonationsModule } from './donations/donations.module';
import { GraphQLDateTime } from 'graphql-iso-date';

@Module({

  imports: [

    GraphQLModule.forRoot<ApolloDriverConfig>({

      driver: ApolloDriver,

      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),

      resolvers: { DateTime: GraphQLDateTime },

      subscriptions: {

        'graphql-ws': true,

        'subscriptions-transport-ws': true

      }

    }),

    DonationsModule,

  ],

})
export class AppModule { }
