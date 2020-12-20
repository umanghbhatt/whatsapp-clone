import { Avatar, IconButton } from '@material-ui/core'
import { SearchOutlined ,AttachFile, MoreVert, InsertEmoticon, Mic} from '@material-ui/icons';
import React, { useState, useEffect } from 'react'
import './Chat.css';
import {useParams} from 'react-router-dom';
import db, { usersColl } from '../firebase';
import firebase from 'firebase';
import { useStateValue } from '../StateProvider';
function Chat() {
    const [{user},dispatch]=useStateValue();
    const [seed, setSeed] = useState('');
    const [input,setInput]=useState('');
    const {roomId}=useParams();
    const [roomName,setRoomName] = useState('');
    const [messages,setMessages]=useState([]);
    console.log(user);
    const sendMessage = (e)=>{
        e.preventDefault();
        usersColl.doc(user.uid).collection('Rooms').doc(roomId).collection('messages').add({
            name:user.displayName,
            message:input,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");
    };
    
    useEffect(()=>{
        if(roomId)
        {
            usersColl.doc(user.uid).collection('Rooms').doc(roomId).onSnapshot(
                snapshot=>
                    setRoomName(snapshot.data().name)
                
            );
            usersColl.doc(user.uid).collection('Rooms').doc(roomId).collection('messages').
            orderBy('timestamp','asc').
            onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map(doc=>
                    // if(!doc.exists){
                    //     console.log("object")
                    // }
                    doc.data()
                ))
            ));
            
        }
       
    },[roomId,user])
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    {
                        messages.length>0?
                        <p> last seen{" "}
                        {
                            new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()
                        }
                        </p>:
                        <p>Newly created group by - {user.displayName}</p>
                    }
               
                </div>
                <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>

                </div>
            </div>
            <div className="chat__body">
                {messages.map(message=>(
                    <p className={`chat__message ${message.name===user.displayName &&"chat__receiver"}`}>
                    <span className="chat__name">{message.name}
                    </span>{message.message}
                    <span className="chat__timestamp">
                    {new Date(message.timestamp?.toDate()).toUTCString()}

                    </span>
                </p>
                ))}
                
            </div>
            <div className="chat__footer">
                <InsertEmoticon/>
                <form>
                    <input value={input} type="text" onChange={e=>setInput(e.target.value)} placeholder="Type message here"/>
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <Mic/>
            </div>
        </div>
    )
}

export default Chat
