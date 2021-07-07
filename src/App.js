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
  // .where('price','==', 999)
  // .where('title','==','Watch')
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

    const docRef = firebase.firestore().collection('products').doc(products[index].id);

    docRef
    .update({
      qty:products[index].qty + 1
    })
    .then(()=>{
      console.log('Increased successfully')
    })
    .catch((error)=>{
      console.log('Error', error)
    })
    // products[index].qty += 1;

    // this.setState({
    //     products:products
    // })
}

handleDecreaseQuantity = (product)=>{
    console.log('hey decrease the qty of' , product);

    if(product.qty === 0){
        return;
    }
    const {products} = this.state;
    const index = products.indexOf(product);

    const docRef = firebase.firestore().collection('products').doc(products[index].id);

    docRef
    .update({
      qty:products[index].qty - 1
    })
    .then(()=>{
      console.log('Decreased successfully')
    })
    .catch((error)=>{
      console.log('Error', error)
    })
    // products[index].qty -= 1;

    // this.setState({
    //     products:products
    // })
}

handleDeleteProduct = (id)=>{
    // const {products} = this.state;

    const docRef = firebase.firestore().collection('products').doc(id);

    docRef
    .delete()
    .then(()=>{
      console.log('Deleted successfully')
    })
    .catch((error)=>{
      console.log('Error', error)
    })
    // const items = products.filter((item) => item.id !== id);

    // this.setState({
    //     products:items
    // })
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

// addProduct = ()=>{
//   firebase
//   .firestore()
//   .collection('products')
//   .add({
//     img:'https://images.unsplash.com/photo-1515054562254-30a1b0ebe227?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
//     price:5999,
//     qty:3,
//     title:'Earpods'
//   })
//   .then((docRef)=>{
//     console.log('product has been added to firebase', docRef);
//   })
//   .catch((error)=>{
//     console.log('error in adding product in firebase', error);
//   })
// }

// sortByPrice=()=>{
//   firebase
//   .firestore()
//   .collection('products')
//   .orderBy('price')
//   .onSnapshot((snapshot)=>{
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
// })
// }


  render(){
    const {products, loading} = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        {/* <button style={{padding:20,fontSize:20}} onClick={this.addProduct}>Add a Product</button> */}
        {/* <button style={{padding:10,fontSize:20}} onClick={this.sortByPrice}>Sort By Price</button> */}
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
