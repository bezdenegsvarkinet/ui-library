import { Logo } from '@/stories/logos/ui'
import { logoSizes } from '@/stories/logos/config/logo-sizes'
import { logoTypes } from '@/stories/logos/config/logo-types'
import { Meta, StoryObj } from '@storybook/react-vite'
import { TLogoSize } from 'src/stories/logos/types'

const meta = {
	title: 'UI/Logo',
	component: Logo,
	args: {
		size: '40',
		type: 'long',
	},
	argTypes: {
		size: {
			options: Object.keys(logoSizes),
			control: { type: 'select' },
			description: 'Размер логотипа в пикселях',
			table: {
				category: 'Variants',
				defaultValue: { summary: '40' },
			},
		},
		type: {
			options: Object.keys(logoTypes),
			control: { type: 'select' },
			description: 'Тип отображения логотипа',
			table: {
				category: 'Variants',
				defaultValue: { summary: 'long' },
			},
		},
	},
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
Компонент **Logo** предназначен для отображения логотипа бренда в соответствии с дизайн-системой.

### Особенности:
- Автоматический выбор SVG иконки в зависимости от пропа \`size\`.
- Поддержка типов отображения через проп \`type\`.
- Оптимизированные SVG для качественного отображения на любых экранах.

### Доступные размеры:
- \`40\` — базовый размер для хедеров
- \`48\` — увеличенный размер
- \`56\` — для акцентных блоков
- \`64\` — для крупных заголовков
- \`80\` — максимальный размер для hero-секций
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Logo>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Базовое использование компонента с настройками по умолчанию.
 */
export const Default: Story = {}

/**
 * Демонстрация всех доступных размеров логотипа.
 * Полезно для сравнения визуальной иерархии.
 */
export const AllSizes: Story = {
	render: args => (
		<div className='flex flex-col gap-8 items-center'>
			{Object.keys(logoSizes).map(sizeKey => (
				<div key={sizeKey} className='flex flex-col items-center gap-2'>
					<Logo {...args} size={sizeKey as TLogoSize} />
					<span className='text-xs text-gray-400'>Size: {sizeKey}px</span>
				</div>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Галерея всех доступных вариантов размера логотипа.',
			},
		},
	},
}

/**
 * Пример использования длинной версии логотипа (горизонтальной).
 */
export const LongType: Story = {
	args: {
		type: 'long',
		size: '64',
	},
	parameters: {
		docs: {
			description: {
				story: 'Горизонтальная версия логотипа с текстом бренда.',
			},
		},
	},
}

/**
 * Пример использования короткой версии логотипа.
 *
 * ⚠️ **Примечание:** В текущей реализации тип 'short' возвращает null.
 * Это зарезервировано для будущей реализации иконки без текста.
 */
export const ShortType: Story = {
	args: {
		type: 'short',
		size: '64',
	},
	parameters: {
		docs: {
			description: {
				story: `
Пример использования короткой версии логотипа.

⚠️ **Примечание:** В текущей реализации тип 'short' возвращает null.
Это зарезервировано для будущей реализации иконки без текста.
				`,
			},
		},
	},
}

/**
 * Пример использования в темной теме.
 * Логотип должен корректно отображаться на темном фоне.
 */
// export const DarkBackground: Story = {
// 	args: {
// 		size: '64',
// 		type: 'long',
// 	},
// 	decorators: [
// 		Story => (
// 			<div className='bg-black p-8 rounded-lg'>
// 				<Story />
// 			</div>
// 		),
// 		Story => (
// 			<div className='flex flex-col items-center'>
// 				<Story />
// 				<span className='text-xs text-gray-400'>Size: 64px</span>
// 			</div>
// 		),
// 	],
// 	parameters: {
// 		docs: {
// 			description: {
// 				story: 'Отображение логотипа на темном фоне.',
// 			},
// 		},
// 	},
// }