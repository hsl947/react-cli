
import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'

import pages from './pages'

const router = () => {
	return (
		<Router>
			{/* 默认首页 */}
			<Route
				component={pages[0].component}
				exact
				path="/"
			/>
			{pages.map((item)=>{
				return (
					<Route
						component={item.component}
						key={item.name}
						path={item.path}
					/>
				)
			})}
		</Router>
	)
}

export default router
