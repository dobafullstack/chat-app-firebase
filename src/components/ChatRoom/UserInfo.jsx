import React, { useContext } from "react";
import {Avatar, Typography, Button, Row, Col} from 'antd'
import styled from 'styled-components';
import { AuthContext } from '../../contexts/AuthProvider';
import { auth } from "../../firebase/config";
import {PlusOutlined} from "@ant-design/icons"
import { AppContext } from "../../contexts/AppProvider";

const Wrapper = styled.div`
    padding: 16px;
    border-bottom: 1px solid #ddd;

    .avatar {
        margin-right: 10px;
    }

    .user-name{
        font-size: 1rem;
        font-weight: 500;
    }

    .btn-logout{
        border-radius: 10px;
    }
`;

export default function UserInfo() {
    const {user} = useContext(AuthContext);
    const {setVisibleModal} = useContext(AppContext);

    const logOut = () => {
        auth.signOut();
    }

    return (
        <Wrapper>
            <Row>
                <Col>
                    <div style={{ flexGrow: "2" }}>
                        <Row>
                            <Col span={12}>
                                <Avatar
                                    className='avatar'
                                    size='large'
                                    src={user.photoURL}>
                                    {user.photoURL
                                        ? ""
                                        : user.displayName
                                              ?.charAt(0)
                                              .toUpperCase()}
                                </Avatar>
                            </Col>
                            <Col span={12}>
                                <Typography.Text className='user-name'>
                                    {user.displayName}
                                </Typography.Text>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Row>
                            <Col>
                                <Button
                                    className='btn-logout'
                                    onClick={() => setVisibleModal(true)}
                                    style={{ marginRight: "10px" }}
                                    icon={<PlusOutlined />}></Button>
                            </Col>
                            <Col>
                                <Button className='btn-logout' onClick={logOut}>
                                    Đăng xuất
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Wrapper>
    );
}
