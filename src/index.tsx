import * as React from 'react'
import { useStickyAuto } from './useScrollSticky'
//
import styles from './styles.module.css'

//
interface Props {}

//
export const ExampleComponent = ({}: Props) => {
  //
  const { calculateAgain, ref_main_elm, ref_sticky_elm, ref_fake_elm } =
    useStickyAuto({ sticky_location: /./, header_head: 10 })

  //
  React.useEffect(() => {
    calculateAgain()
  }, [])

  //
  return (
    <div className={styles.main}>
      <div className={styles.row}>
        <div className={`${styles.w_50per} ${styles.h_100per}`}>
          <div ref={ref_main_elm}>
            <div ref={ref_fake_elm}></div>

            <div ref={ref_sticky_elm} className={styles.preview}></div>
          </div>
        </div>

        <div className={`${styles.right}`}></div>
      </div>
    </div>
  )
}
