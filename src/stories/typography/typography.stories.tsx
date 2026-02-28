import type { Meta, StoryObj } from '@storybook/react-vite'
import { Typography } from './typography'
import { typographySizes } from './typography-sizes'

const meta = {
	title: 'UI/Typography',
	component: Typography,
	// Базовые аргументы для всех историй
	args: {
		children: 'Пример текста типографики',
		size: 'button/m/16',
		tag: 'p',
	},
	// Настройка панели управления (Controls)
	argTypes: {
		children: {
			control: 'text',
			description: 'Текстовое содержимое компонента',
			table: { category: 'Content' },
		},
		tag: {
			options: ['p', 'span'],
			control: { type: 'select' },
			description: 'HTML тег обертки',
			table: { category: 'Layout' },
		},
		size: {
			// Динамически получаем доступные варианты из конфига
			options: Object.keys(typographySizes),
			control: { type: 'select' },
			description: 'Вариант размера текста',
			table: { category: 'Variants' },
		},
		className: {
			control: 'text',
			description: 'Дополнительные CSS классы',
			table: { disable: true }, // Скрываем из основной таблицы, если не критично
		},
	},
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
Компонент **Typography** предназначен для стилизации текста в соответствии с дизайн-системой.
Он использует \`class-variance-authority\` для управления вариантами и поддерживает кастомизацию через \`className\`.

### Особенности:
- Автоматическая адаптация стилей через проп \`size\`.
- Возможность смены HTML тега через проп \`tag\`.
- Поддержка всех стандартных HTML атрибутов.
				`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Typography>

export default meta

type Story = StoryObj<typeof meta>
/**
 * Базовое использование компонента с настройками по умолчанию.
 */
export const Default: Story = {}

/**
 * Демонстрация всех доступных размеров.
 * Эту историю удобно использовать для быстрой проверки визуальных стилей.
 */
export const AllSizes: Story = {
	render: args => (
		<div className='flex flex-col gap-4'>
			{Object.keys(typographySizes).map(sizeKey => (
				<Typography key={sizeKey} {...args} size={sizeKey as keyof typeof typographySizes}>
					Размер: {sizeKey}
				</Typography>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Галерея всех доступных вариантов размера.',
			},
		},
	},
}

/**
 * Пример использования тега span вместо p.
 * Полезно для инлайновых элементов.
 */
export const AsSpan: Story = {
	args: {
		tag: 'span',
		children: 'Инлайновый текст',
	},
	parameters: {
		docs: {
			description: {
				story: 'Использование в качестве строчного элемента.',
			},
		},
	},
}

/**
 * Пример кастомизации через className.
 */
export const Custom: Story = {
	args: {
		children: 'Текст с красным цветом',
		className: 'text-red-500',
	},
	parameters: {
		docs: {
			description: {
				story: 'Переопределение стилей через дополнительный класс.',
			},
		},
	},
}