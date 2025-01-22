import type { Swiper, SwiperInterface } from './index'

export interface CSSSelector extends string {}

export type SwiperModule = (options: {
  params: Swiper['params']
  swiper: SwiperInterface
  extendParams: (obj: { [name: string]: any }) => void
  on: Swiper['on']
  once: Swiper['once']
  off: Swiper['off']
  emit: Swiper['emit']
}) => void
