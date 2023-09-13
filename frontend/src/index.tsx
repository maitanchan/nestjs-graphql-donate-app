import { ColorModeScript } from "@chakra-ui/react"
import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { App } from "./App"
import * as serviceWorker from "./serviceWorker"
import { createClient, Provider, subscriptionExchange, dedupExchange, fetchExchange, cacheExchange } from 'urql';
import { createClient as createWSClient } from 'graphql-ws';

const wsClient = createWSClient({

  url: 'ws://localhost:3001/graphql',

})

const client = createClient({

  url: 'http://localhost:3001/graphql',

  exchanges: [

    dedupExchange,

    cacheExchange,

    fetchExchange,

    subscriptionExchange({

      forwardSubscription: (operation) => ({

        subscribe: (sink: any) => ({

          unsubscribe: wsClient.subscribe(

            {
              query: operation.query || '',
              variables: operation.variables,
            },

            sink

          ),

        }),

      }),

    }),

  ],

})

const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>,
)

serviceWorker.unregister()


