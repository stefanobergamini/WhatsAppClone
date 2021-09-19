import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, SearchOutlined } from '@material-ui/icons'
import { useParams } from 'react-router-dom'
import MoreVert from '@material-ui/icons/MoreVert'
import React, { useState, useEffect } from 'react'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import firebase from 'firebase'

import "./Chat.css"
import db from './firebase'
import { useStateValue } from './StateProvider'

function Chat() {

    const [ input, setInput ] = useState('')
    const { roomId } = useParams();
    const [ roomName, setRoomName ] = useState('')
    const [ messages, setMessages ] = useState([])
    const [ { user }, dispatch ] = useStateValue()

    useEffect(() => {
        if(roomId) {
            db.collection('rooms')
            .doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            )) 
        }
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('');
    }
    
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`}/>
                <div className="chat_headerInfo">
                    <h3>{ roomName }</h3>
                    <p>
                        last seen{' '}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {messages.map((message) => (
                    <p className={`chat_message ${message.name==user.displayName && 'chat_reciever'}`}> 
                        <spam className="chat_name">{message.name}</spam>
                        {message.message}
                        <spam className="chat_timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </spam>
                    </p>

                ))}
            </div>
            <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
