import React from 'react'
import {Typography, Avatar} from 'antd'
import styled from 'styled-components'
import { RoomContext } from '../../contexts/RoomProvider';
import {AppContext} from '../../contexts/AppProvider'

const Wrapper = styled.div`
    padding: 8px;
    margin-top: 16px;

    ul {
        list-style: none;
        padding: 0;
    }

    .roomItem {
        padding: 8px 0;
        margin-bottom: 10px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        background-color: white;
        transition: 0.5s;
    }

    .roomItem:hover {
        background-color: rgba(221, 221, 221, 0.5);
        cursor: pointer;
    }

    .roomItem .avatar {
        margin: 0 10px;
    }

    .roomItem .message-wrapper {
        flex-grow: 2;
    }

    .roomItem .message-name {
        font-size: 18px;
        font-weight: bold;
    }

    .roomItem .message {
        margin-right: 10px;
    }

    .roomItem .option{
        margin-right: 10px;
    }
`;


export default function RoomList() {
    const {rooms} = React.useContext(RoomContext);
    const {selectedRoomId, setSelectedRoomId} = React.useContext(AppContext)

    return (
        <Wrapper>
            <ul>
                {rooms.map((room) => (
                    <li className='roomItem' onClick={() => {setSelectedRoomId(room.id);}} key={room.id}>
                        <Avatar className='avatar' size={64}>
                            1
                        </Avatar>
                        <div class='message-wrapper'>
                            <Typography.Text className='message-name'>
                                {room.name}
                            </Typography.Text>
                            <div>
                                <Typography.Text className='message'>
                                    {room.description}
                                </Typography.Text>
                                <Typography.Text className='message-time'>
                                    4 phút trước
                                </Typography.Text>
                            </div>
                        </div>
                        <div class='option'>ABC</div>
                    </li>
                ))}
            </ul>
        </Wrapper>
    );
}
