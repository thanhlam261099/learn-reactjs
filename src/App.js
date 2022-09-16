import Header from 'components/Header'
import ProductFeature from 'features/Product'
import { Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import AlbumFeature from './features/Album'
import CounterFeature from './features/Counter'
import TodoFeature from './features/Todo'
import CartFeature from './features/Cart'

function App() {
  return (
    <div className="app">
      <Header />

      <Switch>
        <Redirect from="/" to="/products" exact />
        <Redirect from="/post-list/:postId" to="/posts/:postId" exact />

        <Route path="/" component={CounterFeature} exact />
        <Route path="/todo" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />
        <Route path="/products" component={ProductFeature} />
        <Route path="/cart" component={CartFeature} />

        {/* <Route component={NotFound} /> */}
      </Switch>
    </div>
  )
}

export default App
