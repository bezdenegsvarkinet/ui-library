// src/index.ts
// Экспортируем только компоненты, не stories и не CSS
export { Button } from './stories/Button'
export type { ButtonProps } from './stories/Button'

export { Header } from './stories/Header'
export type { HeaderProps } from './stories/Header'

export { Page } from './stories/Page'

// Импортируем CSS с Tailwind (он попадёт в сборку)
import './index.css'