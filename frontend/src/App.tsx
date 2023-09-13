import '@fontsource/montserrat/700.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/300.css'
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Code,
  Grid,
  Heading,
  extendTheme,
} from "@chakra-ui/react"
import { Logo } from "./logos/Logo"
import { Counter } from "./donation/Counter"
import { useQuery, useSubscription } from "urql"
import { LeaderBoard } from './leaderboard/LeaderBoard'
import { DonationWizard } from './donation/DonationWizard'

const TotalDonationsQuery = `
  query  {
    getTotalDonation
  }
`

const TotalUpdatedQuery = `
  subscription{
    totalUpdated{
      total
    }
  }
`

const handleSubscription = (previus: any, newTotal: any) => {

  return newTotal?.totalUpdated?.total

}

const theme = extendTheme({

  fonts: {
    heading: 'Montserrat',
    body: 'Montserrat'
  }

})

export const App = () => {

  const [res] = useSubscription({ query: TotalUpdatedQuery }, handleSubscription)

  const [{ data, fetching, error }] = useQuery({

    query: TotalDonationsQuery

  })

  if (fetching) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Oh no... {error.message}</p>
  }

  return (

    <ChakraProvider theme={theme}>

      <Box textAlign="center" fontSize="xl">

        <Grid minH="100vh" p={3} bg='gray.50'>

          <VStack spacing={8}>

            <Logo h="40vmin" pointerEvents="none" />

            <Heading as='h1' size='xl'>JOIN THE MOVEMENTS</Heading>

            <Text fontWeight='light'>
              The team is growing every day and scoring wins for the planet<br /> Remove trash with us and track our progress!
            </Text>

            <Heading as='h2' size='4xl'><Counter from={0} to={res.data || data.getTotalDonation} /></Heading>

            <DonationWizard />

            <LeaderBoard />

          </VStack>

        </Grid>

      </Box>

    </ChakraProvider>

  )
}
