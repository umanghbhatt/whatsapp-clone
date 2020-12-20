import './App.css'

import React, { useState,useEffect } from 'react';
import { Paper } from '@material-ui/core';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import {BrowserRouter as Router, Switch,Route } from 'react-router-dom';
import Login from './Components/Login';
import { useStateValue } from './StateProvider';
import Pusher from 'pusher-js';
import axios from './axios.js';
function App() {
 const [{user},dispatch] = useStateValue();

//  useEffect(()=>{
//    axios.get('messages')
//  })
 useEffect(()=>{
    const pusher = new Pusher('b4e175ebaf451352cb47',{
      cluster: 'ap2'
    });
    const channel=pusher.subscribe('messages');
    channel.bind('inserted',(data)=>{
      alert(JSON.stringify(data));
    })
 },[])
  return (
    <div className="app">
      {!user ?
        (<Router>
          <Route path="/login">
          <Login/>
          </Route>
          </Router>) : (
        <div className="app__body">
          <Router>
            <Switch>

              <Route path="/rooms/:roomId" component={Chat}>
                <Sidebar />
                <Chat />
              </Route>
              <Route path="/" >
                <Sidebar />
                <Chat />
              </Route>
            </Switch>
          </Router>

        </div>
        )
      }

    </div>
  );
}

export default App;
