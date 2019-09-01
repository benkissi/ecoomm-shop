import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from './components/header/header.component'
import Spinner from './components/spinner/spinner.component'
import ErrorBoundary from './components/error-boundary/error-boundary.component'

import { GlobalStyle } from './global.styles'

import { selectCurrentUser } from './redux/user/user.selectors'
import { createStructuredSelector } from 'reselect'
import { checkUserSession } from './redux/user/user.actions'

const ShopPage = lazy(() => import('./pages/shop/shop.component'))
const HomePage = lazy(() => import('./pages/homepage/homepage.component'))
const SignInAndSignUp = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'))
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'))

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
        <GlobalStyle/>
        <Header />
        <Switch>
          <ErrorBoundary>
          <Suspense fallback={<Spinner/>}>
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
          </Suspense>
          </ErrorBoundary>
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
