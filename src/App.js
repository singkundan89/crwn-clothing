import React from 'react';
import HomePage from './components/pages/homepage/homepage.component';
import './App.css';
import {Switch,Route} from 'react-router-dom';
import ShopPage from './components/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPAge from './components/sign-in-and-sign-out/sign-in-and-sign-out.component';
import {auth, CreateUserProfileDocument} from './firebase/firebase.utils';




class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unSubscribeFromAuth = null;

  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
                             if (userAuth)
                                  {
                                const userRef = CreateUserProfileDocument( userAuth );
                                                                              
                                                                             (
                                                                               await userRef
                                                                             ).onSnapshot(
                                                                               snapshot =>
                                                                                 this.setState(
                                                                                   {
                                                                                     currentUser: {
                                                                                       id:
                                                                                         snapshot.id,
                                                                                       ...snapshot.data()
                                                                                     }
                                                                                   },
                                                                                   () => {
                                                                                     console.log(
                                                                                       this
                                                                                         .state
                                                                                         .currentUser
                                                                                     );
                                                                                   }
                                                                                 )
                                                                             );
                                                                           }

                                                                           this.setState(
                                                                             {
                                                                               currentUser: userAuth
                                                                             }
                                                                           );
                                                                         });
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPAge} />
        </Switch>
      </div>
    );
  }
}



export default App;
