// Экспортируем только компоненты, не stories и не CSS
export { Button } from './stories/button/button'
export { Typography } from './stories/typography/typography'

export type { IButtonProps } from './stories/button/button'
export type { ITypographyProps } from './stories/typography/typography'

// Импортируем CSS с Tailwind (он попадёт в сборку)
import './index.css'