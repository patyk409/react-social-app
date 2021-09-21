import { useEffect } from "react";
import { withRouter } from "react-router";

const ScrollToTop = ({ history }) => {
  /*
   * useEffect
   */
  useEffect(() => {
    // scroll to top
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, [history, window.location.href]);

  return (null);
};

export default withRouter(ScrollToTop);