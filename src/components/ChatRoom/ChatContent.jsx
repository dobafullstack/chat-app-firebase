import React, { useContext, useState } from 'react'
import ChatItem from './ChatItem'
import {Button, Form, Input} from 'antd'
import styled from 'styled-components';
import { RightOutlined } from '@ant-design/icons';
import { addDocument } from '../../firebase/service';
import { AppContext } from '../../contexts/AppProvider';
import { AuthContext } from '../../contexts/AuthProvider';
import { useMessagestore } from '../../hooks/useFirestore';
import { formatRelative } from 'date-fns';
import ChatItemRight from './ChatItemRight';

const ContentStyled = styled.div`
    height: 93vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const FormStyled = styled.div`
    form{
        display: flex;
        align-items: center;
    }

    .input-message {
        width: 100%;
        padding: 0 8px;
        margin: 0;
    }

    .input-message input {
        border-radius: 20px;
        padding: 8px 16px;
    }

    .btn-send {
        width: 50px;
        margin-right: 16px;
        border-radius: 20px;
        outline: none;
    }
`;

export default function ChatContent() {
    const [inputValue, setInputValue] = useState('');
    const {selectedRoomId} = useContext(AppContext)
    const {
        user: { uid, photoURL, displayName },
    } = useContext(AuthContext);

    const handleChangeInput = (e) => {
        setInputValue(e.target.value);
    }

    const handleKeyUp = (e) => {
        console.log(e.keyCode);
        if (e.keyCode === 13) {
            handleOnSubmit();
        }
    }

    const handleOnSubmit = () => {
        addDocument("messages", {
            text: inputValue,
            uid,
            photoURL,
            roomId: selectedRoomId,
            displayName,
        });

        setInputValue('')
    };

    const messagesCondition = React.useMemo(() => {
        return {
            fieldName: "roomId",
            operator: "==",
            compareValue: selectedRoomId,
        };
    }, [selectedRoomId, inputValue]);

    var messages = useMessagestore("messages", messagesCondition);

    const formatDate = (second) => {
        let formatDate = ''

        if (second){
            formatDate = formatRelative(new Date(second * 1000), new Date());

            formatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1)
        }

        return formatDate;
    }

    messages = messages.sort((a, b) => {
        return a.createdAt - b.createdAt;
    });

    return (
        <ContentStyled>
            <div style={{ overflowY: "auto" }}>
                {messages.length !== 0
                    ? messages.map((mes) =>
                          mes.uid === uid ? (
                              <ChatItemRight
                                  key={mes.id}
                                  userName={mes.displayName}
                                  message={mes.text}
                                  createAt={
                                      mes.createdAt
                                          ? formatDate(mes.createdAt.seconds)
                                          : ""
                                  }
                                  photoURL={mes.photoURL}
                              />
                          ) : (
                              <ChatItem
                                  key={mes.id}
                                  userName={mes.displayName}
                                  message={mes.text}
                                  createAt={
                                      mes.createdAt
                                          ? formatDate(mes.createdAt.seconds)
                                          : ""
                                  }
                                  photoURL={mes.photoURL}
                              />
                          )
                      )
                    : ""}
            </div>
            <FormStyled>
                <Form>
                    <Form.Item className='input-message'>
                        <Input
                            placeholder='Your message'
                            onChange={handleChangeInput}
                            onKeyUp={handleKeyUp}
                            name='message'
                            value={inputValue}
                            autoComplete='off'
                        />
                    </Form.Item>
                    <Button
                        icon={<RightOutlined />}
                        className='btn-send'
                        onClick={handleOnSubmit}></Button>
                </Form>
            </FormStyled>
        </ContentStyled>
    );
}
