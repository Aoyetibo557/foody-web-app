/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { About, AdminDash, AdminHome, AdminInbox, AdminLogin, AdminTrans, Cart, Contact, Header, Home, Login, Register, Setting, Sidebar } from './utils';
import {db} from './backend/firebase';
import useToken from './admin/useToken'; //admintoken
import Token from './admin/Token'; //usertoken 
import AdminOrders from './admin/AdminOrders';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import NotFound from './client/NotFound';
import Shop from './client/Shop';
import ProductDetails from './client/ProductDetails';


function App() {
  const [{userEmail}, dispatch] = useStateValue();

  // Admin token setter
  const {token, setToken} = useToken();

  // User Token
  const {userToke, setUToken} = Token();


  // firestore ref
  const adminRef = db.collection("Admin").doc("admin-acct");

  useEffect(()=>{
    // this should be Empty on Mount

    console.clear();
    console.log("Admin Token", token);
    console.log("User Token:", userToke);
    retrieveUserEmail();

  }, [])


  /**
   * Retrieves the user email from session storage on mount,allows dev to use said email
   * to get all user info,sets the email using context api
   */
  const retrieveUserEmail = () => { 
    var t = sessionStorage.getItem("userEmail");
    dispatch({
      type: actionTypes.SET_USER,
      userEmail: t
    })
  }


  return (
    <div className="app">
      <Router>
          {/* Admin Routes */}

        <Switch>
      
          <div>
            <Route exact path="/admin/login" component="AdminLogin">
              {!token ? <AdminLogin setToken={setToken} /> : <AdminLogin setToken={setToken} /> }
            </Route>

            <Route exact path="/admin/dash" component="">
              {!token ? <AdminLogin setToken={setToken} /> : 
                <div className="dash">
                  <AdminHome />
                  <AdminDash />
                </div>
              }
            </Route>

            <Route exact path="/admin/inbox" component = "">
               {!token ? <AdminLogin setToken={setToken} /> :
                <div className="dash">
                  <AdminHome />
                  <AdminInbox /> 
                </div>

                }
            </Route>
            
            <Route exact path ="/admin/orders" component = "">
               {!token ? <AdminLogin setToken={setToken} /> : 
                <div className="dash">
                  <AdminHome />
                  <AdminOrders />
                </div>
               }
            </Route>

            <Route exact path ="/admin/transc" component = "">
               {!token ? <AdminLogin setToken={setToken} /> :
                <div className="dash">
                  <AdminHome />
                  <AdminTrans />
                </div>
               }
            </Route>

            <Route exact path ="/admin/tasks" component = "">
               {!token ? <AdminLogin setToken={setToken} /> :<AdminHome /> }
            </Route>

            <Route exact path ="/admin/ana" component = "">
               {!token ? <AdminLogin setToken={setToken} /> : <AdminHome /> }
            </Route>
            
            <Route exact path="/admin/sett" component ="">
              {!token ? <AdminLogin setToken={setToken} /> : 
              <div className="dash">
                <Sidebar />
                <Setting />
              </div>  
              }
            </Route>

            {/* <Route exact path= '*' component={NotFound}>
              {!token ? <AdminLogin setToken = {setToken} /> : 
                <div>
                  <Header userToke={userToke} />
                  <NotFound />
                </div>
              }
            </Route> */}
            
          </div>
        
        </Switch>

        <Switch>
          <div>
            <Route exact path="/" component>
              <Header userToke={userToke} />
              <Home />
            </Route>

            <Route exact path="/about" component>
              <Header userToke={userToke} />
              <About />
            </Route>

            <Route exact path="/contact" component>
              <Header userToke={userToke} />
              <Contact />
            </Route>

            <Route exact path="/shop" component>
              <Header userToke={userToke} />
              <Shop />
            </Route>
            
            <Route exact path="/detail/:id" component>
              <Header userToke={userToke} />
              <ProductDetails />
            </Route>

            <Route exact path="/cart/:id" component="">
              <Header userToke={userToke} />
              <Cart />
            </Route>

            <Route exact path="/cart" component="">
              <Header userToke={userToke} />
              <Cart />
            </Route>

            <Route exact path="/login" componen="Login">
              <Login setUToken={setUToken} /> 
            </Route>

            <Route exact path="/register" component ="">
              {/* <Register setUToken={setUToken} /> */}
            </Route>
          </div>

          <Route exact path= '*' component={NotFound}>
            <Header userToke={userToke} />
            <NotFound />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
