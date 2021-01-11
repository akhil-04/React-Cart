import React from 'react';


const Navbar = (props)=>{
  
    return (
        <div style={styles.nav}>
            <div style={styles.cartIconContainer}>
                <img style={styles.cartIcon} 
                src="https://www.flaticon.com/svg/vstatic/svg/34/34627.svg?token=exp=1610369721~hmac=076d535c37a6f98c7ea220e1dbd7cdc8" 
                alt="cart-icon"
                />
                <span style={styles.cartCount}> {props.count} </span>
            </div>
        </div>
    )
}
    



const styles = {
    cartIcon: {
        height: 32,
        marginRight: 20
      },
      nav: {
        height: 70,
        background: '#4267b2',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      },
      cartIconContainer: {
        position: 'relative'
      },
      cartCount: {
        background: 'yellow',
        borderRadius: '50%',
        padding: '4px 8px',
        position: 'absolute',
        right: 0,
        top: -9
      }
    
}



export default Navbar;