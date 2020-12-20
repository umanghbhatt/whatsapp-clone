import { Avatar, IconButton, MenuItem } from '@material-ui/core';
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import Select from "@material-ui/core/Select";
import db, { auth, usersColl } from '../firebase';
import './Sidebar.css';
import SidebarChats from './SidebarChats';
import firebase from 'firebase';
import { useStateValue } from '../StateProvider';
import { useHistory } from 'react-router-dom';
import { actionTypes } from '../reducer';
function Sidebar() {
    const [rooms,setRooms]=useState([]);
    const history = useHistory();
    const [{user},dispatch]=useStateValue();
    useEffect(()=>{
    
            const unsubscribe= usersColl.doc(user.uid).collection('Rooms').onSnapshot(snapshot => {
                setRooms(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
    
                })))
            });
        return()=>{
            unsubscribe();
        };
     
    },[user]);
    const logOut =()=>{
        auth.signOut().then(()=>{
            dispatch({
                type: actionTypes.SET_USER,
                user:null
            })
        })
        
    }
    rooms.map(r=>console.log(r))
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton><DonutLarge /></IconButton>
                    <IconButton><Chat /></IconButton>
                    {/* <IconButton><MoreVert /></IconButton> */}

                    <IconButton>
                        <Select IconComponent={MoreVert}>
                                <div onClick={logOut}>
                                <MenuItem value="Logout">Logout</MenuItem>  
                                </div>
                        </Select>
                    </IconButton>                   

                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" />

                </div>
   
            </div>
            <div className="sidebar__chats">
                <SidebarChats addNewChat={true}/>
                {/* <SidebarChats/> */}
                {/* <SidebarChats key={rooms[0].id} id={rooms[0].id} name={rooms[0].data}/> */}
                {rooms.map(room => {
                   console.log(rooms.length);
                    return <SidebarChats addNewChat={false} key={room.id} id={room.id} n={room.data.name} />
                })}
                {/* <SidebarChats id="1234" key="1234" name ="Dance room"/> */}
            </div>
        </div>
    )
}

export default Sidebar
