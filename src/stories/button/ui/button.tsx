'use client'

import { FC } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Typography } from '@/stories/typography'
import { buttonBgs, buttonSizes } from '../config'

const buttonVariants = cva('transition-all duration-300 py-2 px-4 rounded-[8px] leading-[100%]', {
	variants: {
		bg: {
			...buttonBgs,
		},
		size: {
			...buttonSizes,
		},
	},
	defaultVariants: {
		bg: 'primary',
		size: '32',
	},
})

export interface IButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	/** Контент кнопки (текст или иконки) */
	children: React.ReactNode
	/**
	 * Если true, оборачивает children в компонент Typography для единообразия.
	 * По умолчанию false.
	 */
	asChild?: boolean
}

/**
 * Компонент Button используется для интерактивных элементов действия.
 * Поддерживает различные варианты оформления (bg) и размеры (size).
 *
 * @example
 * <Button bg="primary" size="40">Нажми меня</Button>
 */
export const Button: FC<IButtonProps> = ({ children, bg, size, className, asChild = false, ...props }) => {
	return (
		<button {...props} className={cn(buttonVariants({ bg, size, className }))}>
			{asChild ? <Typography>{children}</Typography> : children}
		</button>
	)
}