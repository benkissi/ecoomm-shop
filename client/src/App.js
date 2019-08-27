import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css';

import HomePage from './pages/homepage/homepage.component' 
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component'

import { selectCurrentUser } from './redux/user/user.selectors'
import { createStructuredSelector } from 'reselect'
import { checkUserSession } from './redux/user/user.actions'


const App =  ({checkUserSession, currentUser}) => {
    useEffect(() => {
      checkUserSession()
    }, [checkUserSession])
    
    checkUserSession()
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if(userAuth){
    //     const userRef = await createUserProfileDocument(userAuth)

    //     userRef.onSnapshot(snapshot => {
    //       setCurrentUser({
    //         id: snapshot.id,
    //         ...snapshot.data()
    //       })
    //     })
        
    //   }
    //   setCurrentUser(userAuth)
    // })
  

 
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage}/>
          <Route path='/signin' render={() => (
              currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUp />
              )
          )}/>
        </Switch>
        
      </div>
    );
  }


const matchStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(matchStateToProps, mapDispatchToProps)(App);
