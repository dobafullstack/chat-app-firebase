import React, {useContext} from 'react'
import { Modal, Form, Input } from 'antd'
import { AppContext } from '../../contexts/AppProvider'
import { addDocument } from '../../firebase/service';
import { AuthContext } from '../../contexts/AuthProvider';

export default function AddRoomModal() {
    const {user} = useContext(AuthContext)
    const { isVisibleModal, setVisibleModal } = useContext(AppContext);
    const [form] = Form.useForm();

    const handleOk = () => {
        addDocument("rooms", { ...form.getFieldValue(), members: [user.uid] });

        //reset form
        form.resetFields();

        setVisibleModal(false)
    }

    const handleCancel = () => {
        setVisibleModal(false);
    }

    return (
        <Modal
            title='Tạo phòng'
            visible={isVisibleModal}
            onOk={handleOk}
            onCancel={handleCancel}>
            <Form form={form} layout="vertical">
                <Form.Item label='Tên phòng' name='name'>
                    <Input placeholder='Nhập tên phòng' />
                </Form.Item>
                <Form.Item label='Mô tả' name='description'>
                    <Input.TextArea placeholder='Nhập mô tả' />
                </Form.Item>
            </Form>
        </Modal>
    );
}
