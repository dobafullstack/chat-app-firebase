import React from 'react'
import {Col, Row, Avatar, Typography} from 'antd'
import styled from 'styled-components'

const Wrapper = styled.div`
    background-color: rgba(221, 221, 221, 0.5);
    display: block;
    margin: 16px;
    padding: 8px;
    max-width: 450px;
    border-radius: 20px;


    .wrapper {
        align-items: center;
    }

    .user-name {
        font-size: 16px;
        font-weight: bold;
    }
`;

export default function ChatItem(props) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-start",
            }}>
            <Wrapper style={{ flexGrow: "1" }}>
                <Row className='wrapper'>
                    <Col span={3}>
                        <Avatar size='large' src={props?.photoURL}></Avatar>
                    </Col>
                    <Col style={{ flexGrow: "2" }}>
                        <Row style={{ flexDirection: "column" }}>
                            <Typography.Text className='user-name'>
                                {props.userName}
                            </Typography.Text>
                            <Typography.Text className='message'>
                                {props.message}
                            </Typography.Text>
                        </Row>
                    </Col>
                    <Col>
                        <Typography.Text className='date-create'>
                            {props.createAt}
                        </Typography.Text>
                    </Col>
                </Row>
            </Wrapper>
        </div>
    );
}
