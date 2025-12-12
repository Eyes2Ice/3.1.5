import Swiper from 'swiper'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

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
    const tabletBreakpoint = window.matchMedia(
      '(min-width: 768px) and (max-width: 1439px)'
    )
    const desktopBreakpoint = window.matchMedia('(min-width: 1440px)')
    const brands = document.querySelector('.brands__list')
    const brandsItems = brands.querySelectorAll('.brands__item')
    const brandsButton = document.querySelector('.brands__btn')
    const brandsButtonText = brandsButton.querySelector('span')

    function checkTabletBreakpoint(e) {
      if (e.matches) {
        for (let i = 0; i < brandsItems.length; i++) {
          if (i >= 6) {
            brandsItems[i].classList.add('brands__item--hidden')
          }
        }
      }
    }
    checkTabletBreakpoint(tabletBreakpoint)
    tabletBreakpoint.addEventListener('change', checkTabletBreakpoint)

    function checkDesktopBreakpoint(e) {
      if (e.matches) {
        for (let i = 0; i < brandsItems.length; i++) {
          if (i >= 8) {
            brandsItems[i].classList.add('brands__item--hidden')
          }
        }
      }
    }
    checkDesktopBreakpoint(desktopBreakpoint)
    desktopBreakpoint.addEventListener('change', checkDesktopBreakpoint)

    brandsButton.addEventListener('click', function () {
      brandsButton.classList.toggle('brands__btn--active')
      if (brandsButton.classList.contains('brands__btn--active')) {
        brandsButtonText.textContent = 'Скрыть'
        for (let i = 0; i < brandsItems.length; i++) {
          brandsItems[i].classList.remove('brands__item--hidden')
        }
      } else {
        brandsButtonText.textContent = 'Показать все'
        if (tabletBreakpoint.matches) {
          for (let i = 0; i < brandsItems.length; i++) {
            if (i >= 6) {
              brandsItems[i].classList.add('brands__item--hidden')
            }
          }
        } else if (desktopBreakpoint.matches) {
          for (let i = 0; i < brandsItems.length; i++) {
            if (i >= 8) {
              brandsItems[i].classList.add('brands__item--hidden')
            }
          }
        }
      }
    })
  }
})
