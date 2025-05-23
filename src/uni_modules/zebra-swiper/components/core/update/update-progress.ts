import type { UpdateProgress } from '../../../types/components/core/update/update-progress'
import type { SwiperInterface } from '../../../types/swiper-class'
import type { SwiperEvents } from '../../../types/swiper-events'

const updateProgress: UpdateProgress = function (
  this: SwiperInterface,
  translate
) {
  const swiper = this

  if (typeof translate === 'undefined') {
    const multiplier = swiper.rtlTranslate ? -1 : 1
    translate =
      (swiper && swiper.translate && swiper.translate * multiplier) || 0
  }

  const { params } = swiper
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate()
  let { progress, isBeginning, isEnd, progressLoop } = swiper
  const wasBeginning = isBeginning
  const wasEnd = isEnd

  if (translatesDiff === 0) {
    progress = 0
    isBeginning = true
    isEnd = true
  } else {
    progress = (translate - swiper.minTranslate()) / translatesDiff
    const isBeginningRounded = Math.abs(translate - swiper.minTranslate()) < 1
    const isEndRounded = Math.abs(translate - swiper.maxTranslate()) < 1
    isBeginning = isBeginningRounded || progress <= 0
    isEnd = isEndRounded || progress >= 1
    if (isBeginningRounded) progress = 0
    if (isEndRounded) progress = 1
  }

  if (params.loop) {
    const firstSlideIndex = swiper.getSlideIndexByData(0)
    const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1)
    const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex]
    const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex]
    const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1]
    const translateAbs = Math.abs(translate)
    if (translateAbs >= firstSlideTranslate) {
      progressLoop = (translateAbs - firstSlideTranslate) / translateMax
    } else {
      progressLoop =
        (translateAbs + translateMax - lastSlideTranslate) / translateMax
    }
    if (progressLoop > 1) progressLoop -= 1
  }

  Object.assign(swiper, {
    progress,
    progressLoop,
    isBeginning,
    isEnd
  })

  if (
    params.watchSlidesProgress ||
    (params.centeredSlides && params.autoHeight)
  ) {
    swiper.updateSlidesProgress(translate)
  }

  if (isBeginning && !wasBeginning) {
    swiper.emit('reachBeginning toEdge' as keyof SwiperEvents)
  }
  if (isEnd && !wasEnd) {
    swiper.emit('reachEnd toEdge' as keyof SwiperEvents)
  }
  if ((wasBeginning && !isBeginning) || (wasEnd && !isEnd)) {
    swiper.emit('fromEdge' as keyof SwiperEvents)
  }

  swiper.emit('progress' as keyof SwiperEvents, progress)
}

export default updateProgress
