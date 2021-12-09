import React, {useContext} from 'react'
import ChatHeader from './ChatHeader'
import ChatContent from './ChatContent'
import {Row, Col} from 'antd'
import {RoomContext} from '../../contexts/RoomProvider'

export default function ChatWindow() {
    const { selectedRoom, members } = useContext(RoomContext);

    
    if (selectedRoom){
        return (
            <Row>
                <Col span={24}>
                    <ChatHeader selectedRoom={selectedRoom} members={members} />
                </Col>
                <Col span={24}>
                    <ChatContent />
                </Col>
            </Row>
        );
    }else{
        return null
    }

}
