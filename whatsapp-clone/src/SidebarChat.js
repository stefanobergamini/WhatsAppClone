import { Avatar } from '@material-ui/core'
import db from './firebase'
import './SidebarChat.css'
import { Link } from 'react-router-dom'

function SidebarChat({ id, name, addNewChat }) {

    const createChat = () => {
        const roomName = prompt("Please enter name for chat")

        if (roomName){
            db.collection('rooms').add({
                name: roomName
            })
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`}/>
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>Last message...</p>
                </div>
            </div>
        </Link>
    ): (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
