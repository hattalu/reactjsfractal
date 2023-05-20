import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

import Home from './pages/MyOrders'
import Order from './pages/AddOrder'
import List from './pages/ProductList'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <h1>Technical Test</h1>
          <Link to="/">My Orders</Link>
          <Link to="/add-edit">Add/Edit Order</Link>
          <Link to="/lista">Product List</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/add-edit" component={Order}>
            <Order />
          </Route>
          <Route exact path="/add-edit/:id" component={Order} />
          <Route exact path="/lista" component={List}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App