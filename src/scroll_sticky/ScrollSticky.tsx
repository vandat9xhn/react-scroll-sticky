import * as React from 'react'
//
import styles from './styles.module.css'

//
export interface ScrollStickyProps {
  ref_main_elm: React.RefObject<HTMLDivElement>
  ref_fake_elm: React.RefObject<HTMLDivElement>
  ref_sticky_elm: React.RefObject<HTMLDivElement>

  class_sticky?: string
  class_main?: string
  children?: string | React.ReactElement
}

//
function ScrollSticky({
  ref_main_elm,
  ref_fake_elm,
  ref_sticky_elm,

  class_sticky = '',
  class_main = '',
  children = ''
}: ScrollStickyProps) {
  //
  return (
    <div ref={ref_main_elm} className={`${styles.h_100per} ${class_main}`}>
      <div ref={ref_fake_elm}></div>

      <div ref={ref_sticky_elm} className={`${styles.sticky} ${class_sticky}`}>
        {children}
      </div>
    </div>
  )
}

export default ScrollSticky
