import React, { Component } from 'react';
import Appnavbar from './component/Appnavbar';
import ItemModal from './component/ItemModal';
import ShoppingList from './component/ShoppingList';

import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authAction';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      < Provider store={store} >
        <div className="App">
          <Appnavbar />
          <Container>
            <ItemModal />
            <ShoppingList />

          </Container>
        </div>
      </Provider>
    )
  }
}
export default App;
