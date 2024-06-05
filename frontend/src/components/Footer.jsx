/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from '@emotion/react';

function Footer() {
  const styles = () => ({
    padding: '20px',
    backgroundColor: '#1DA1F2',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    fontSize: '16px',
    width: '100%',
    marginTop: 'auto',
    height: '60px', 
    position: 'fixed',
    bottom: 0,
    left: 0,
  });



  return (
    <footer css={styles()}>
     
      <div>
        © 2024 BookWorm. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
