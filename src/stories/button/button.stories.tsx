import { Button } from './button'
import { buttonBgs } from './button-bgs'
import { buttonSizes } from './button-sizes'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
	title: 'UI/Button',
	component: Button,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
Компонент **Button** предназначен для выполнения действий пользователем.
Поддерживает несколько визуальных стилей и размеров.

### Особенности:
- Варианты оформления: \`primary\`, \`secondary\`, \`outline\`
- Размеры: \`32\`, \`40\`, \`48\`, \`56\` (высота в пикселях)
- Поддержка состояния \`disabled\` через стандартный HTML атрибут
- Опциональная обертка текста через \`asChild\`
				`,
			},
		},
	},
	argTypes: {
		children: {
			control: 'text',
			description: 'Содержимое кнопки',
			table: { category: 'Content' },
		},
		bg: {
			options: Object.keys(buttonBgs),
			control: { type: 'select' },
			description: 'Вариант фона/стиля кнопки',
			table: { category: 'Variants' },
		},
		size: {
			options: Object.keys(buttonSizes),
			control: { type: 'select' },
			description: 'Размер кнопки (высота в px)',
			table: { category: 'Variants' },
		},
		asChild: {
			control: 'boolean',
			description: 'Обернуть контент в Typography',
			table: { category: 'Behavior' },
		},
		disabled: {
			control: 'boolean',
			description: 'Отключенное состояние',
			table: { category: 'State' },
		},
		className: {
			control: 'text',
			description: 'Дополнительные CSS классы',
			table: { disable: true },
		},
	},
	args: {
		children: 'Button',
		bg: 'primary',
		size: '40',
		asChild: false,
		disabled: false,
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Базовый вариант кнопки с настройками по умолчанию.
 */
export const Default: Story = {}

/**
 * Все доступные варианты оформления (bg).
 */
export const Variants: Story = {
	render: args => (
		<div className='flex flex-wrap gap-4'>
			{Object.keys(buttonBgs).map(bg => (
				<Button key={bg} {...args} bg={bg as keyof typeof buttonBgs}>
					{bg}
				</Button>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Демонстрация всех стилей кнопки: primary, secondary, outline.',
			},
		},
	},
}

/**
 * Все доступные размеры кнопки.
 */
export const Sizes: Story = {
	render: args => (
		<div className='flex flex-col gap-4 items-start'>
			{Object.keys(buttonSizes).map(size => (
				<Button key={size} {...args} size={size as keyof typeof buttonSizes}>
					Size {size}
				</Button>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Демонстрация всех размеров: 32, 40, 48, 56 пикселей.',
			},
		},
	},
}

/**
 * Отключенное состояние кнопки.
 */
export const Disabled: Story = {
	args: {
		disabled: true,
		children: 'Disabled',
	},
	parameters: {
		docs: {
			description: {
				story: 'Кнопка в неактивном состоянии (disabled).',
			},
		},
	},
}

/**
 * Кнопка с иконкой (пример композиции).
 */
export const WithIcon: Story = {
	args: {
		children: (
			<div className='flex items-center gap-2'>
				<svg width='20' height='20' viewBox='0 0 20 20' fill='currentColor'>
					<path d='M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z' />
				</svg>
				<span>С иконкой</span>
			</div>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'Пример использования кнопки с иконкой внутри.',
			},
		},
	},
}

/**
 * Кнопка с опцией asChild.
 */
export const AsChild: Story = {
	args: {
		asChild: true,
		children: 'Typography Wrapped',
	},
	parameters: {
		docs: {
			description: {
				story: 'Контент обернут в компонент Typography для единообразия.',
			},
		},
	},
}