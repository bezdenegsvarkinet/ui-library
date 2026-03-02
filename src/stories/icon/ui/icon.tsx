'use client'

import { FC } from 'react'
import { icons } from 'lucide-react'

interface IProps {
	icon: keyof typeof icons
}

export const Icon: FC<IProps> = ({ icon }) => {
	const Icon = icons[icon]
	return <Icon />
}