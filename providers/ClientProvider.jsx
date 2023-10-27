"use client"

import { Footer, Header } from "@/components"
import store from "@/store/store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"

const ClientProvider = ({ children }) => {

	const [client] = useState(new QueryClient())

	return (
		<Provider store={store}>
			<QueryClientProvider client={client}>
				<Header />
				{children}
				<Footer />
				<Toaster />
			</QueryClientProvider>
		</Provider>
	)
}

export default ClientProvider