import Swiper from 'swiper'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const tabletBreakpoint = window.matchMedia(
  '(min-width: 768px) and (max-width: 1439px)'
)
const desktopBreakpoint = window.matchMedia('(min-width: 1440px)')

document.addEventListener('DOMContentLoaded', () => {
  // Сайдбар
  {
    const burgers = document.querySelectorAll('.burger-icon')
    const aside = document.querySelector('aside.main__aside')
    const content = document.querySelector('.main__content')
    const header = document.querySelector('.header')
    const body = document.body

    function toggleSidebar() {
      aside.classList.toggle('aside--visible')
      content.classList.toggle('main__content--blured')
      header.classList.toggle('header--blured')
      body.classList.toggle('body--event')
    }

    function closeSidebar() {
      aside.classList.remove('aside--visible')
      content.classList.remove('main__content--blured')
      header.classList.remove('header--blured')
      body.classList.remove('body--event')
    }

    burgers.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation()
        toggleSidebar()
      })
    })

    aside.addEventListener('click', (e) => {
      e.stopPropagation()
    })

    document.addEventListener('click', () => {
      if (aside.classList.contains('aside--visible')) {
        closeSidebar()
      }
    })
  }

  // Слайдер бренды
  {
    let brandsSlider = null
    const breakpoint = window.matchMedia('(max-width: 767px)')
    function initSwiper() {
      brandsSlider = new Swiper('.brands__slider', {
        slidesPerView: 'auto',
        spaceBetween: 16,

        modules: [Pagination, Autoplay],

        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },

        breakpoints: {
          768: {
            init: 'false'
          }
        },

        autoplay: {
          delay: 2000
        },

        speed: 600,

        pauseOnInteraction: true
      })
    }

    function destroySwiper() {
      if (!brandsSlider) return

      brandsSlider.destroy(true, true)
      brandsSlider = null
    }

    function checkBreakpoint(e) {
      if (e.matches) {
        initSwiper()
      } else {
        destroySwiper()
      }
    }

    checkBreakpoint(breakpoint)

    if (typeof breakpoint.addEventListener === 'function') {
      breakpoint.addEventListener('change', checkBreakpoint)
    }
  }

  // Адаптив брендов
  {
    const brands = document.querySelector('.brands__list')
    const brandsItems = brands.querySelectorAll('.brands__item')
    const brandsButton = document.querySelector('.brands__btn')
    const brandsButtonText = brandsButton.querySelector('span')

    function hideByViewport() {
      brandsItems.forEach((item) =>
        item.classList.remove('brands__item--hidden')
      )

      if (tabletBreakpoint.matches) {
        brandsItems.forEach((item, index) => {
          if (index >= 6) item.classList.add('brands__item--hidden')
        })
      } else if (desktopBreakpoint.matches) {
        brandsItems.forEach((item, index) => {
          if (index >= 8) item.classList.add('brands__item--hidden')
        })
      }
    }

    hideByViewport()

    function handleBreakpointChange() {
      if (!brandsButton.classList.contains('brands__btn--active')) {
        hideByViewport()
        brandsButtonText.textContent = 'Показать все'
      }
    }

    tabletBreakpoint.addEventListener('change', handleBreakpointChange)
    desktopBreakpoint.addEventListener('change', handleBreakpointChange)

    brandsButton.addEventListener('click', function () {
      brandsButton.classList.toggle('brands__btn--active')
      if (brandsButton.classList.contains('brands__btn--active')) {
        brandsButtonText.textContent = 'Скрыть'
        for (let i = 0; i < brandsItems.length; i++) {
          brandsItems[i].classList.remove('brands__item--hidden')
        }
      } else {
        brandsButtonText.textContent = 'Показать все'
        hideByViewport()
      }
    })
  }

  // Слайдер виды
  {
    let typesSlider = null
    const breakpoint = window.matchMedia('(max-width: 767px)')
    function initSwiper() {
      typesSlider = new Swiper('.types__slider', {
        slidesPerView: 'auto',
        spaceBetween: 16,

        modules: [Pagination, Autoplay],

        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },

        breakpoints: {
          768: {
            init: 'false'
          }
        },

        autoplay: {
          delay: 2000
        },

        speed: 600,

        pauseOnInteraction: true
      })
    }

    function destroySwiper() {
      if (!typesSlider) return

      typesSlider.destroy(true, true)
      typesSlider = null
    }

    function checkBreakpoint(e) {
      if (e.matches) {
        initSwiper()
      } else {
        destroySwiper()
      }
    }

    checkBreakpoint(breakpoint)

    if (typeof breakpoint.addEventListener === 'function') {
      breakpoint.addEventListener('change', checkBreakpoint)
    }
  }

  // Адаптив видов
  {
    const types = document.querySelector('.types__list')
    const typesItems = types.querySelectorAll('.types__item')
    const typesButton = document.querySelector('.types__btn')
    const typesButtonText = typesButton.querySelector('span')

    function hideByViewport() {
      typesItems.forEach((item) => item.classList.remove('types__item--hidden'))

      if (tabletBreakpoint.matches) {
        typesItems.forEach((item, index) => {
          if (index >= 3) item.classList.add('types__item--hidden')
        })
      } else if (desktopBreakpoint.matches) {
        typesItems.forEach((item, index) => {
          if (index >= 4) item.classList.add('types__item--hidden')
        })
      }
    }

    hideByViewport()

    function handleBreakpointChange() {
      if (!typesButton.classList.contains('types__btn--active')) {
        hideByViewport()
        typesButtonText.textContent = 'Показать все'
      }
    }

    tabletBreakpoint.addEventListener('change', handleBreakpointChange)
    desktopBreakpoint.addEventListener('change', handleBreakpointChange)

    typesButton.addEventListener('click', function () {
      typesButton.classList.toggle('types__btn--active')
      if (typesButton.classList.contains('types__btn--active')) {
        typesButtonText.textContent = 'Скрыть'
        for (let i = 0; i < typesItems.length; i++) {
          typesItems[i].classList.remove('types__item--hidden')
        }
      } else {
        typesButtonText.textContent = 'Показать все'
        hideByViewport()
      }
    })
  }

  // Сдайдер цены
  new Swiper('.prices__slider', {
    slidesPerView: 'auto',
    spaceBetween: 16,

    modules: [Pagination, Autoplay],

    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },

    autoplay: {
      delay: 2000
    },

    speed: 600,

    pauseOnInteraction: true
  })
})
