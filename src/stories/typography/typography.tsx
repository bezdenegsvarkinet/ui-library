'use client'

import { FC } from 'react'
import { cn } from '../../lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { typographySizes } from '../typography/typography-sizes'

const typographyVariants = cva('transition-all duration-300 leading-[100%]', {
	variants: {
		size: {
			...typographySizes,
		},
	},
	defaultVariants: {
		size: 'button/m/16',
	},
})

type TTag = 'p' | 'span'

interface IProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof typographyVariants> {
	children: React.ReactNode
	tag?: TTag
}

export const Typography: FC<IProps> = ({ children, tag = 'p', size, className, ...props }) => {
	const Tag = tag

	return (
		<Tag {...props} className={cn(typographyVariants({ size, className }))}>
			{children}
		</Tag>
	)
}