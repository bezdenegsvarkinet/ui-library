import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './ui/button'
import { buttonSizes, buttonVariants } from './config/'
import { TButtonSizes } from './types'
import { icons } from 'lucide-react'
import { typographySizes } from '@/stories/typography/config'

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
- Варианты оформления: ${Object.keys(buttonVariants)
					.map(v => `\`${v}\``)
					.join(', ')}
- Размеры: ${Object.keys(buttonSizes)
					.map(v => `\`${v}\``)
					.join(', ')} (высота в пикселях)
- Поддержка состояния \`disabled\` через стандартный HTML атрибут
- Возможность отображения индикатора загрузки внутри кнопки
- Оборачивает содержимое кнопки в \`Typography\` компонент
- Опциональная иконка внутри кнопки
				`,
			},
		},
	},
	argTypes: {
		// CONTENT
		children: {
			control: 'text',
			description: 'Содержимое кнопки',
			table: { category: 'Content' },
		},
		icon: {
			options: Object.keys(icons),
			control: { type: 'select' },
			description: 'Иконка',
			table: { category: 'Content' },
		},

		// VARIANTS
		variant: {
			options: Object.keys(buttonVariants),
			control: { type: 'select' },
			description: 'Вариант оформления кнопки',
			table: { category: 'Variants', defaultValue: { summary: 'primary-fill' } },
		},
		size: {
			options: Object.keys(buttonSizes),
			control: { type: 'select' },
			description: 'Размер кнопки (высота в px)',
			table: { category: 'Variants', defaultValue: { summary: '40' } },
		},
		textSize: {
			options: Object.keys(typographySizes),
			control: { type: 'select' },
			description: 'Размер текста внутри кнопки',
			table: { category: 'Variants', defaultValue: { summary: 'body/r/16' } },
			defaultValue: { summary: 'body/r/16' },
		},
		iconSide: {
			options: ['left', 'right'],
			control: { type: 'select' },
			description: 'Расположение иконки внутри кнопки',
			table: { category: 'Variants' },
		},

		// STATE
		disabled: {
			control: {
				type: 'boolean',
			},
			description: 'Отключенное состояние',
			table: { category: 'State', defaultValue: { summary: 'false' } },
		},
		showLoader: {
			control: {
				type: 'boolean',
			},
			description: 'Отображение индикатора загрузки.',
			table: { category: 'State', defaultValue: { summary: 'false' } },
		},
		className: {
			control: 'text',
			description: 'Дополнительные CSS классы',
			type: { name: 'string', required: false },
			table: { disable: false, category: 'Layout' },
		},
	},
	args: {
		children: 'Button',
		variant: 'primary-fill',
		size: '40',
		disabled: false,
		showLoader: false,
		iconSide: 'left',
		textSize: 'body/r/16',
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
 * Все доступные варианты оформления (variant).
 */
export const Variants: Story = {
	render: args => (
		<div className='flex flex-wrap gap-4'>
			{Object.keys(buttonVariants).map(variant => (
				<Button key={variant} {...args} variant={variant as keyof typeof buttonVariants}>
					{variant}
				</Button>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Демонстрация всех стилей кнопки: primary-fill, primary-outline, secondary-fill, secondary-outline.',
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
				<Button key={size} {...args} size={size as TButtonSizes}>
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
		icon: 'LogIn',
	},
	parameters: {
		docs: {
			description: {
				story: 'Пример использования кнопки с иконкой внутри.',
			},
		},
	},
}