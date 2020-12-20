import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import db, { usersColl } from '../firebase';
import { useStateValue } from '../StateProvider';
import './SidebarChats.css'
function SidebarChats(props) {
    const [{user},dispatch] =  useStateValue();
    const [seed,setSeed]=useState('');
    const [messages,setMessages] = useState([]);
    useEffect(()=>{
        if(props.id){
            usersColl.doc(user.uid).collection('Rooms').doc(props.id).collection("messages")
            .orderBy("timestamp","desc")
            .onSnapshot((snapshot)=>
            setMessages(snapshot.docs.map(doc=>
                doc.data()))
            )
        };
        
    },[props.id,user])
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[]);
    const createChat=()=>{
        const roomName=prompt("Please enter name for chat");
        if (roomName){
            // db.collection('Rooms').add({
            //     name:roomName
            // });
            usersColl.doc(user.uid).collection('Rooms').add({
                name:roomName,
                members:[user.email]
            })
            // db.collection('Rooms').doc(props.id).collection("messages").add({
            //     added:"First doc"
            // })
        }
    };
   
    return !props.addNewChat? (
        <Link to={`/rooms/${props.id}`}><div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat__info">
                <h2>{props.n}</h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div></Link>
        
    ):(
        <div onClick ={createChat} className="sidebarChat">
            <h2>Add new Chat</h2>
        </div>

    )
}

export default SidebarChats
