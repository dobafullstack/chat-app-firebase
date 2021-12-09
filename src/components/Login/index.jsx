import React from 'react'
import {Row, Col, Button, Typography} from 'antd'
import firebase, {auth} from '../../firebase/config'
import {addDocument} from '../../firebase/service'
import { useHistory } from 'react-router-dom'
import { generateKeywords } from '../../firebase/service'

const {Title} = Typography 

const fbProvider = new firebase.auth.FacebookAuthProvider();
const ggProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
    const history = useHistory();

    const handleFacebookLogin = async () => {
        const {user, additionalUserInfo} = await auth.signInWithPopup(fbProvider);
        console.log(user)

        if (additionalUserInfo?.isNewUser) {
            console.log(additionalUserInfo)
            addDocument("users", {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName),
            });
        }
    }

    const handleGoogleLogin = async () => {
        const {user, additionalUserInfo} = await auth.signInWithPopup(ggProvider);

        if (additionalUserInfo?.isNewUser) {
            console.log(additionalUserInfo)
            addDocument("users", {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName),
            });
        }
    }

    auth.onAuthStateChanged(user => {
        if (user){
            history.push('/')
        }
    })

    return (
        <div>
            <Row justify='center'>
                <Col span={8}>
                    <Title style={{textAlign: 'center'}}>Doba App</Title>
                </Col>
            </Row>
            <Row justify='center'>
                <Col span={8}>
                    <Button style={{width: '100%', marginBottom: '10px'}} onClick={handleGoogleLogin}>Đăng nhập bằng Google</Button>
                </Col>
            </Row>
            <Row justify='center'>
                <Col span={8}>
                    <Button style={{width: '100%', marginBottom: '10px'}} onClick={handleFacebookLogin}>Đăng nhập bằng Facebook</Button>
                </Col>
            </Row>
        </div>
    )
}
