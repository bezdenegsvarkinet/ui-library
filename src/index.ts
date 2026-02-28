// Экспортируем только компоненты, не stories и не CSS
export { Button, Typography } from './stories'

// Импортируем CSS с Tailwind (он попадёт в сборку)
import './index.css'