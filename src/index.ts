// Экспортируем только компоненты, не stories и не CSS
export * from './stories/typography'
export * from './stories/button'

// export type { IButtonProps } from 'src/stories/button/ui/button'
// export type { ITypographyProps } from 'src/stories/typography/ui/typography'

// Импортируем CSS с Tailwind (он попадёт в сборку)
import './index.css'