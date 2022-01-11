# react-scroll-sticky

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-scroll-sticky.svg)](https://www.npmjs.com/package/react-scroll-sticky) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-scroll-sticky
```

## Usage

```tsx
//
const App = () => {
  //
  const { calculateAgain, ref_main_elm, ref_sticky_elm, ref_fake_elm } =
    useScrollSticky({
      sticky_location: /./,
      header_head: 0,
      detectInnerWidthIsOk: detectInnerWidthIsOk
    })

  //
  React.useEffect(() => {
    calculateAgain()
  }, [calculateAgain])

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

        <div className={`${styles.right}`}></div>
      </div>
    </div>
  )
}

```

## License

MIT © [](https://github.com/)
