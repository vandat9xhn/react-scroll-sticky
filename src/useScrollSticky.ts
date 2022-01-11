import { useEffect, useRef } from 'react'
//
import { useMounted } from './useMounted'

const isInnerWidthOk = () => innerWidth > 900
const isHrefOk = (sticky_location = /./) =>
  location.href.search(sticky_location) >= 0

function getScrollTop() {
  return document.getElementsByTagName('html')[0].scrollTop
}

function handleScrollTo(new_pos = 0) {
  document.getElementsByTagName('html')[0].scrollTop = new_pos
}

//
export function useStickyAuto({ sticky_location = /./, header_head = 70 }) {
  //
  const ref_main_elm = useRef<HTMLDivElement>(null)
  const ref_fake_elm = useRef<HTMLDivElement>(null)
  const ref_sticky_elm = useRef<HTMLDivElement>(null)

  const ref_is_innerWidth_ok = useRef(isInnerWidthOk())
  const ref_is_href_ok = useRef(isHrefOk(sticky_location))
  const has_event_scroll = useRef(false)

  const ref_more_height = useRef(0)
  const ref_has_more_height = useRef(false)
  const ref_scroll_y = useRef(0)
  const ref_is_last_scroll_down = useRef(true)

  //
  const mounted = useMounted()

  //
  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.onscroll = null
    }
  }, [])

  useEffect(() => {
    handleChangeHref()
  }, [location.href])

  /* --------- COMMON --------- */

  //
  function getNewMoreHeight() {
    const height = ref_sticky_elm.current?.getBoundingClientRect().height || 0

    ref_has_more_height.current = height + header_head > innerHeight

    return height - innerHeight
  }

  //
  function handleRefWhenMoreHeightNotOk() {
    if (ref_sticky_elm.current) {
      ref_sticky_elm.current.style.position = 'sticky'
      ref_sticky_elm.current.style.top = `${header_head}px`
    }

    if (ref_fake_elm.current) {
      ref_fake_elm.current.style.height = '0px'
    }
  }

  //
  function handleRefWhenInnerWidthNotOk() {
    if (ref_sticky_elm.current) {
      ref_sticky_elm.current.style.position = 'static'
    }

    if (ref_fake_elm.current) {
      ref_fake_elm.current.style.height = '0px'
    }

    ref_is_innerWidth_ok.current = false
  }

  //
  function handleRemoveScroll() {
    if (has_event_scroll.current) {
      window.onscroll = null
      has_event_scroll.current = false
    }
  }

  //
  function handleAddScroll() {
    if (!has_event_scroll.current) {
      window.onscroll = handleScroll
      has_event_scroll.current = true

      setTimeout(() => {
        handleScrollTo(getScrollTop() + 1)
      }, 0)
    }
  }

  /* ------------ */

  //
  function handleInnerWidthToOk() {
    ref_more_height.current = getNewMoreHeight()
    ref_is_innerWidth_ok.current = true

    if (ref_has_more_height.current) {
      if (ref_sticky_elm.current) {
        ref_sticky_elm.current.style.position = 'sticky'
      }
      handleAddScroll()
    } else {
      handleRefWhenMoreHeightNotOk()
    }

    ref_scroll_y.current =
      scrollY -
      296 -
      (ref_sticky_elm.current?.getBoundingClientRect().height || 0)
  }

  //
  function handleInnerWidthToNotOk() {
    handleRemoveScroll()
    handleRefWhenInnerWidthNotOk()
    ref_scroll_y.current =
      scrollY +
      16 +
      (ref_sticky_elm.current?.getBoundingClientRect().height || 0)
  }

  //
  function calculateAgain() {
    if (!ref_sticky_elm.current) {
      return
    }

    ref_is_href_ok.current = isHrefOk(sticky_location)
    ref_is_innerWidth_ok.current = isInnerWidthOk()
    ref_more_height.current = getNewMoreHeight()

    if (ref_is_innerWidth_ok.current) {
      if (!ref_has_more_height.current) {
        handleRefWhenMoreHeightNotOk()
      }
    } else {
      handleRefWhenInnerWidthNotOk()
    }

    if (
      ref_has_more_height.current &&
      ref_is_href_ok.current &&
      ref_is_innerWidth_ok.current
    ) {
      handleAddScroll()
    } else {
      handleRemoveScroll()
    }
  }

  /* ---------- */

  //
  function handleScroll() {
    if (!ref_sticky_elm.current) {
      return
    }

    const { top, bottom } = ref_sticky_elm.current.getBoundingClientRect()
    const hide_height_main = -(
      ref_main_elm.current?.getBoundingClientRect().top || 0
    )

    const is_scroll_down = scrollY - ref_scroll_y.current > 0
    const at_bottom = bottom <= innerHeight
    const at_last_top = hide_height_main <= header_head
    const at_temp_top = top >= 0

    // scroll down
    if (is_scroll_down) {
      if (!ref_is_last_scroll_down.current) {
        if (at_last_top) {
          if (ref_fake_elm.current) {
            ref_fake_elm.current.style.height = '0px'
          }
        } else if (at_temp_top) {
          if (ref_fake_elm.current) {
            ref_fake_elm.current.style.height =
              hide_height_main + header_head + 'px'
          }
        }
      }

      ref_sticky_elm.current.style.top = -ref_more_height.current + 'px'
      ref_sticky_elm.current.style.bottom = 'auto'

      ref_is_last_scroll_down.current = true
    }

    //  scroll up
    else {
      if (ref_is_last_scroll_down.current) {
        if (at_bottom) {
          if (ref_fake_elm.current) {
            ref_fake_elm.current.style.height =
              hide_height_main - ref_more_height.current + 'px'
          }
        }
      }

      ref_sticky_elm.current.style.top = 'auto'
      ref_sticky_elm.current.style.bottom =
        -ref_more_height.current - header_head + 'px'

      ref_is_last_scroll_down.current = false
    }

    ref_scroll_y.current = scrollY
  }

  //
  function handleResize() {
    if (!ref_is_href_ok.current) {
      return
    }

    const new_innerWidth_ok = isInnerWidthOk()

    if (new_innerWidth_ok) {
      if (!ref_is_innerWidth_ok.current) {
        handleInnerWidthToOk()
        handleScrollTo(ref_scroll_y.current)
      } else {
        ref_more_height.current = getNewMoreHeight()

        if (!ref_has_more_height.current) {
          handleRefWhenMoreHeightNotOk()
          handleRemoveScroll()
        } else {
          handleAddScroll()
        }
      }
    } else if (!new_innerWidth_ok && ref_is_innerWidth_ok.current) {
      handleInnerWidthToNotOk()
      handleScrollTo(ref_scroll_y.current)
    }
  }

  //
  function handleChangeHref() {
    setTimeout(() => {
      if (mounted) {
        calculateAgain()
      }
    }, 0)
  }

  //
  return {
    calculateAgain,
    ref_main_elm,
    ref_sticky_elm,
    ref_fake_elm
  }
}
