import {useState} from 'react';
import { useQuery } from 'react-query';
import Item from './item/Item';
import Cart from './cart/Cart';
//components
import { Drawer, LinearProgress, Grid, Badge} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
//styles
import { StyledButton, Wrapper } from './App.styles';
//types
export type CartItemType = {
  id: number;
  image: string;
  category: string;
  description: string;
  price: number;
  title: string;
  amount: number;
}
const getProducts = async(): Promise<CartItemType[]> =>
await(await fetch('https://fakestoreapi.com/products')).json();

const App =() => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const {data, isLoading, error} = useQuery<CartItemType[]>(
    'products',
    getProducts
  );
  console.log(data)

  const getTotalItems = (items: CartItemType[]) => 
    items.reduce((acc: number, item) => acc + item.amount,0)

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      //1) is item already added in the cart
      const isItemInCart = prev.find(item => item.id === clickedItem.id)
      if(isItemInCart){
        return prev.map(item => (
          item.id === clickedItem.id
          ? {...item, amount: item.amount + 1}
          : item
        ))
      }
      //2) first time the item is added
      return [...prev, {...clickedItem, amount:1}]
    })
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => (
      prev.reduce((acc, item) => {
        if(item.id === id) {
          if(item.amount === 1) return acc;
          return [...acc, {...item, amount: item.amount - 1}]
        }
        else {
          return [...acc, item];
        }
      },
     [] as CartItemType[])))
    };

  if(isLoading) return <LinearProgress/>;
  if(error) return <div>Something went wrong...</div>
  return (
    <Wrapper>
      <Grid container spacing = {3}>
        <Drawer anchor='right' open = {cartOpen} onClose = {() => setCartOpen(false)}>
          <Cart
            cartItems={cartItems}
            addToCart= {handleAddToCart}
            removeFromCart = {handleRemoveFromCart}
          />
        </Drawer>
          <StyledButton onClick = {() => setCartOpen(true)}>
            <Badge badgeContent = {getTotalItems(cartItems)} color = "error">
              <AddShoppingCartIcon/>
            </Badge>
          </StyledButton>
        {
          data?.map(item => (
            <Grid item key = {item.id} xs = {12} sm = {4}>
              <Item item = {item} handleAddToCart = {handleAddToCart}/>
            </Grid>
          ))
        }
      </Grid>
    </Wrapper>
  );
}

export default App;
