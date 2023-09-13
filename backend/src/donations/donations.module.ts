import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsResolver } from './donations.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({

  imports: [],

  providers: [
    DonationsResolver,
    DonationsService,
    PrismaService
  ]

})
export class DonationsModule { }
