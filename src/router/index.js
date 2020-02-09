
import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'

import Home from '@/pages/test'

const router = () => {
	return (
		<Router>
			<Route
				component={Home}
				exact
				path="/"
			/>
			<Route
				component={Home}
				path="/home"
			/>
		</Router>
	)
}

export default router
