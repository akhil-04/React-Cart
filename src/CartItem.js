import React from 'react';


class CartItem extends React.Component{
   
    increaseQuantity = ()=>{
        // console.log('this', this.state);
        // setState form 1
        // this.setState({
        //     qty:this.state.qty + 1
        // },callback()=>{})
           // setState form 2
           this.setState((prevState)=>{
               return{
                qty:prevState.qty + 1
               }
           },()=>{
               console.log(this.state)
           });
    }
    decreaseQuantity = ()=>{
        const {qty} = this.state;

        if(qty === 0){
           return; 
        }
        // setState form 1
        // this.setState({
        //     qty:this.state.qty + 1
        // })
           // setState form 2
           this.setState((prevState)=>{
            return{
             qty:prevState.qty - 1
            }
        });
    }
    render(){
        console.log('this.props', this.props)
        const {price, qty, title} = this.props.product;
        return(
            <div className="cart-item">
                {/* {this.props.jsx} */}
                <div className="left-block">
                    <img style={styles.image} />
                </div>
                <div className="right-block">
                    <div style={{fontSize:25}}>{title}</div>
                    <div style={{color:'#777'}}>Rs {price}</div>
                    <div style={{color:'#777'}}>Qty: {qty}</div>

                    <div className="cart-item-actions">
                        {/* Buttons */ }
                        <img 
                            alt="increase" 
                            className="action-icons" 
                            src="https://www.flaticon.com/svg/static/icons/svg/992/992651.svg" 
                            onClick={this.increaseQuantity}
                        />
                        <img 
                            alt="decrease" 
                            className="action-icons" 
                            src="https://www.flaticon.com/svg/static/icons/svg/992/992683.svg" 
                            onClick={this.decreaseQuantity}
                        />
                        <img 
                            alt="delete" 
                            className="action-icons" 
                            src="https://www.flaticon.com/svg/static/icons/svg/3096/3096673.svg" 
                        />
                    </div>
                </div>
            </div>
        ) ;
    }
}

const styles = {
    image:{
        height:110,
        width:110,
        borderRadius:5,
        background:'#ccc'
    }
}


export default CartItem;