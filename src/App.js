import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import firebase from 'firebase/app';


class App extends React.Component {

  constructor(){
    super();
    this.state= {
        products:[ ],
        loading:true
    }
    // this.increaseQuantity = this.increaseQuantity.bind(this);
}

// componentDidMount(){
//   firebase
//   .firestore()
//   .collection('products')
//   .get()
//   .then((snapshot)=>{
//     console.log(snapshot);

//   snapshot.docs.map((doc)=>{
//     console.log(doc.data());
//     return '';
//   });

//   const products = snapshot.docs.map((doc)=>{
//     const data = doc.data();
//     data['id'] = doc.id;
//     return data;
//   })

//   this.setState({
//     products:products,
//     loading:false
//   })
//   })
// }

componentDidMount(){
  firebase
  .firestore()
  .collection('products')
  .onSnapshot((snapshot)=>{
    console.log(snapshot);

  snapshot.docs.map((doc)=>{
    console.log(doc.data());
    return '';
  });

  const products = snapshot.docs.map((doc)=>{
    const data = doc.data();
    data['id'] = doc.id;
    return data;
  })

  this.setState({
    products:products,
    loading:false
  })
})
}

handleIncreaseQuantity = (product)=>{
    console.log('hey increase the qty of' , product);
    const {products} = this.state;
    const index = products.indexOf(product);
    products[index].qty += 1;

    this.setState({
        products:products
    })
}

handleDecreaseQuantity = (product)=>{
    console.log('hey decrease the qty of' , product);

    if(product.qty === 0){
        return;
    }
    const {products} = this.state;
    const index = products.indexOf(product);
    products[index].qty -= 1;

    this.setState({
        products:products
    })
}

handleDeleteProduct = (id)=>{
    const {products} = this.state;
    const items = products.filter((item) => item.id !== id);

    this.setState({
        products:items
    })
}

getCartCount= ()=>{
  const {products}  = this.state;

  let count = 0;

  products.forEach((product)=>{
    count += product.qty;

  })
  return count;
}

getCartTotal = ()=>{
  const {products} = this.state;
  let cartTotal = 0;

  products.map((product)=>{
    cartTotal = cartTotal + product.qty * product.price;
    return '';
  })
  return cartTotal;
}

  render(){
    const {products, loading} = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart 
          products={products}
          onIncreaseQuantity = {this.handleIncreaseQuantity}
          onDecreaseQuantity = {this.handleDecreaseQuantity}
          onDeleteProduct = {this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products ...</h1>}
        <div style={{padding:40, fontSize:30,color:'deeppink',marginLeft:43}}>Total: {this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;
