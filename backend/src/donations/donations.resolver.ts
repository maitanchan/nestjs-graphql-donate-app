import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { DonationsService } from './donations.service';
import { Donation } from './entities/donation.entity';
import { CreateDonationInput } from './dto/create-donation.input';
import { OrderByParams } from './dto/orderBy-params';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionTotal } from './entities/subscription.entity';

const pubSub = new PubSub()

@Resolver(() => Donation)
export class DonationsResolver {

  constructor(private readonly donationsService: DonationsService) { }

  @Mutation(() => Donation, { name: 'createDonation' })
  async createDonation(@Args('createDonationInput') createDonationInput: CreateDonationInput) {

    const created = await this.donationsService.create(createDonationInput);

    const total = await this.donationsService.getTotalDonation()

    pubSub.publish('totalUpdated', { totalUpdated: { total } })

    return created

  }

  @Subscription(() => SubscriptionTotal)
  totalUpdated() {

    return pubSub.asyncIterator('totalUpdated')

  }

  @Query(() => [Donation], { name: 'donations' })
  findAll(@Args('orderByParams') orderByParams: OrderByParams) {

    return this.donationsService.findAll(orderByParams);

  }

  @Query(() => Donation, { name: 'donation' })
  findOne(@Args('id', { type: () => Int }) id: number) {

    return this.donationsService.findOne({ id });

  }

  @Query(() => Int, { name: 'getTotalDonation' })
  getTotalDonation() {

    return this.donationsService.getTotalDonation()

  }

}
