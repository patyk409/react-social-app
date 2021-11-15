import { useEffect } from 'react'
import { withRouter } from 'react-router'

const ScrollToTop = ({ history }) => {
  // SCROLL TO TOP EFFECT
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0)
    })
    return () => {
      unlisten()
    }
  }, [history])
  return null
}

export default withRouter(ScrollToTop)
