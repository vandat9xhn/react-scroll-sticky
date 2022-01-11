import React from 'react'
//
import { useScrollSticky, ScrollSticky } from 'react-scroll-sticky'
//
import styles from './styles.module.css'
import '../node_modules/react-scroll-sticky/dist/index.css'

//
const App = () => {
  //
  const { calculateAgain, ref_main_elm, ref_sticky_elm, ref_fake_elm } =
    useScrollSticky({
      sticky_location: /./,
      header_head: 10,
      detectInnerWidthIsOk: detectInnerWidthIsOk
    })

  //
  React.useEffect(() => {
    calculateAgain()
  }, [])

  // ----

  //
  function detectInnerWidthIsOk() {
    return true
  }

  //
  return (
    <div className={styles.main}>
      <div className={styles.row}>
        <div className={`${styles.left}`}>
          <ScrollSticky
            ref_main_elm={ref_main_elm}
            ref_fake_elm={ref_fake_elm}
            ref_sticky_elm={ref_sticky_elm}
          >
            <div className={styles.preview}>
              <div>1</div>

              <div>2</div>

              <div>3</div>

              <div>4</div>
            </div>
          </ScrollSticky>
        </div>

        <div className={`${styles.right}`}>
          <div className={styles.preview}>
            <div>1</div>

            <div>2</div>

            <div>3</div>

            <div>4</div>

            <div>5</div>

            <div>6</div>

            <div>7</div>

            <div>8</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
