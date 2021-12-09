import React from 'react'
import {Row, Col} from 'antd'
import UserInfo from './UserInfo'
import RoomList from './RoomList'
import styled from 'styled-components'

const Wrapper = styled.div`
    border-right: 1px solid #ddd;
    height: 100vh;
`;

export default function Sidebar() {
    return (
        <Wrapper>
            <Row>
                <Col span={24}>
                    <UserInfo />
                </Col>
                <Col span={24}>
                    <RoomList />
                </Col>
            </Row>
        </Wrapper>
    );
}
