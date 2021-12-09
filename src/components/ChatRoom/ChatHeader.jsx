import React, {useContext} from "react";
import { Row, Col, Typography, Button, Avatar, Tooltip } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { AppContext } from "../../contexts/AppProvider";

const Wrapper = styled.div`
    padding: 12px;
    border-bottom: 1px solid #ddd;

    .room-info {
        display: flex;
        flex-direction: column;
        flex-grow: 2;
    }

    .room-info .room-name{
        font-size: 20px;
        font-weight: bold;
    }
    
    .btn-invite-group{
        margin-right: 16px;
    }

    .btn-invite-group button{
        outline: none;
        border: none;
    }
`;

export default function ChatHeader(props) {
    const {selectedRoom, members} = props
    const {setVisibleInvite} = useContext(AppContext)
    return (
        <Wrapper>
            <Row style={{ alignItems: "center" }}>
                <Col className='room-info'>
                    <Typography.Text className='room-name'>
                        {selectedRoom ? selectedRoom.name : ""}
                    </Typography.Text>
                    <Typography.Text>
                        {selectedRoom ? selectedRoom.description : ""}
                    </Typography.Text>
                </Col>
                <Col className='btn-invite-group'>
                    <Button
                        icon={<UserAddOutlined />}
                        onClick={() => setVisibleInvite(true)}>
                        Mời
                    </Button>
                </Col>
                <Col>
                    <Avatar.Group size={"medium"} maxCount={2}>
                        {members.map((member) => (
                            <Tooltip title={member.displayName} key={member.id}>
                                <Avatar
                                    src={
                                        member.photoURL ? member.photoURL : ""
                                    }>
                                    {member.photoURL
                                        ? ""
                                        : member.displayName.charAt(0)}
                                </Avatar>
                            </Tooltip>
                        ))}
                    </Avatar.Group>
                </Col>
            </Row>
        </Wrapper>
    );
}
