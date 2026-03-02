// Экспортируем только компоненты, не stories и не CSS
export { Typography } from './stories/typography'
export { Button } from './stories/button'
export { Logo } from './stories/logos'

// Импортируем CSS с Tailwind (он попадёт в сборку)
import './index.css'