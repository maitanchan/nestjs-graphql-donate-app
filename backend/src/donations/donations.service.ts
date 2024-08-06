import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDonationInput } from './dto/create-donation.input';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { OrderByParams } from './dto/orderBy-params';

@Injectable()
export class DonationsService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createDonationInput: CreateDonationInput) {

    const checkEmail = await this.prisma.donation.findFirst({ where: { email: createDonationInput.email } })

    if (checkEmail) {

      throw new HttpException("Email already exist", HttpStatus.CONFLICT)

    }

    const donation = await this.prisma.donation.create({ data: createDonationInput })

    return donation

  }

  async findAll(orderByParams?: OrderByParams) {

    const { field = 'createAt', direction = 'desc' } = orderByParams || {}

    return await this.prisma.donation.findMany({

      orderBy: { [field]: direction }

    })

  }

  async findOne(donationWhereUniqueInput: Prisma.DonationWhereUniqueInput) {

    return await this.prisma.donation.findUnique({ where: donationWhereUniqueInput })

  }

  async getTotalDonation() {

    const response = await this.prisma.donation.aggregate({ _sum: { count: true } })

    return response._sum.count

  }

}
