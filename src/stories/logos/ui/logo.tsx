'use client'

import { FC } from 'react'
import { Long48 } from '@/stories/logos/icons/long/long-48'
import { Long40 } from '@/stories/logos/icons/long/long-40'
import { Long56 } from '@/stories/logos/icons/long/long-56'
import { Long64 } from '@/stories/logos/icons/long/long-64'
import { Long80 } from '@/stories/logos/icons/long/long-80'
import { TLogoSize, TLogoType } from '@/stories/logos/types'

export interface IProps {
	/** Размер логотипа в пикселях (40, 48, 56, 64, 80) */
	size?: TLogoSize
	/** Тип логотипа: 'long' (горизонтальный) или 'short' (иконка) */
	type?: TLogoType
}

/**
 * Компонент **Logo** используется для отображения логотипа бренда.
 *
 * Поддерживает различные размеры и типы отображения в зависимости от контекста.
 *
 * @example
 * ```tsx
 * <Logo size="64" type="long" />
 * ```
 */
export const Logo: FC<IProps> = ({ size = '40', type = 'long' }) => {
	// Если выбран тип 'short', компонент ничего не рендерит
	// (заглушка для будущей реализации короткой версии)
	if (type === 'short') return null

	switch (size) {
		case '40':
			return <Long40 />
		case '48':
			return <Long48 />
		case '56':
			return <Long56 />
		case '64':
			return <Long64 />
		case '80':
			return <Long80 />
		default:
			return <Long40 />
	}
}