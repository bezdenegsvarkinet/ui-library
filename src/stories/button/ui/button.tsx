'use client'

import { FC } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Typography } from '@/stories/typography'
import { buttonSizes, buttonVariants } from '../config'
import { icons, Loader2 } from 'lucide-react'
import { TTypographySizes } from '@/stories/typography/types'

const buttonConfig = cva(
	'transition-all cursor-pointer duration-300 py-2 px-4 rounded-[8px] flex items-center gap-2 disabled:cursor-not-allowed ',
	{
		variants: {
			variant: {
				...buttonVariants,
			},
			size: {
				...buttonSizes,
			},
		},
		defaultVariants: {
			variant: 'primary-fill',
			size: '56',
		},
	},
)

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonConfig> {
	/** Контент кнопки (текст или иконки) */
	children: React.ReactNode

	/**
	 * Иконка для отображения внутри кнопки.
	 */
	icon?: keyof typeof icons

	/**
	 * Расположение иконки внутри кнопки.
	 * По умолчанию 'left'.
	 */
	iconSide?: 'left' | 'right'

	/**
	 * Размер текста внутри кнопки.
	 * По умолчанию 'body/r/16'.
	 */
	textSize?: TTypographySizes

	/**
	 * Отображение индикатора загрузки внутри кнопки.
	 * Индикатор отображается только при disabled=true.
	 * По умолчанию false.
	 */
	showLoader?: boolean
}

/**
 * Компонент Button используется для интерактивных элементов действия.
 * Поддерживает различные варианты оформления (variant) и размеры (size).
 *
 * @example
 * <Button variant="primary-fill" size="40">Нажми меня</Button>
 */
export const Button: FC<IButtonProps> = ({
	children,
	variant,
	size,
	className,
	iconSide = 'left',
	textSize = 'body/r/16',
	showLoader = false,
	icon,
	...props
}) => {
	const Icon = icon && icons[icon]

	return (
		<button {...props} className={cn(buttonConfig({ variant, size, className }))}>
			{props.disabled && showLoader ? (
				<div className='flex items-center justify-center'>
					<Loader2 size={20} strokeWidth={1.5} className='animate-spin' />
				</div>
			) : (
				<>
					{Icon && iconSide === 'left' && <Icon size={20} strokeWidth={1.5} />}

					<Typography size={textSize}>{children}</Typography>

					{Icon && iconSide === 'right' && <Icon size={20} strokeWidth={1.5} />}
				</>
			)}
		</button>
	)
}