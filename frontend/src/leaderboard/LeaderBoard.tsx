import { Box, Heading, Radio, RadioGroup, Stack, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { LeaderBoardItem } from './LeaderBoardItem'
import { Donation } from '../types/types'
import { useQuery } from 'urql'

const donationsQuery = `
    query Query($orderBy: OrderByParams!) {
        donations(orderByParams: $orderBy)
         {
            count
            id
            displayName
            createdAt
            message
            team
        }
    }
`

type DonationQueryRes = {

    donations: Donation[]

}


export const LeaderBoard = () => {

    const [field, setOrderByField] = useState('createdAt')

    const [{ data, fetching, error }] = useQuery<DonationQueryRes>({

        query: donationsQuery,

        variables: {

            orderBy: {

                field,
                direction: 'desc',

            }

        }

    })


    if (error) {
        return <p>Something went wrong ...</p>
    }

    if (fetching || !data) {
        return <p>Loading ...</p>
    }
    console.log(field)
    return (

        <Box w='100%'>

            <VStack spacing={4}>

                <Heading textTransform='uppercase' as='h1' size='2xl'>LeaderBoard</Heading>

                <RadioGroup onChange={setOrderByField} value={field}>
                    <Stack direction='row'>
                        <Radio value='createdAt'>Most Recent</Radio>
                        <Radio value='count'>Most Pounds</Radio>
                    </Stack>
                </RadioGroup>

                {data.donations.map((donation) => (
                    <LeaderBoardItem key={donation.id} donation={donation} />
                ))}



            </VStack>
        </Box>



    )

}