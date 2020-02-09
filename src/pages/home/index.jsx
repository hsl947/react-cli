import React from 'react'
import Style from './Style.module.less'
import { Input  } from 'antd'

const Demo = () => {

	return (
		<>
			<Input placeholder="Basic usage" />
			<div className={Style.div}>
				123
				<span className={Style.span}>456</span>
			</div>
		</>
	)
}

export default Demo
