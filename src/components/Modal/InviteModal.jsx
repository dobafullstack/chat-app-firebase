import React, { useContext, useState } from "react";
import { Modal, Form, Select, Spin, Avatar } from "antd";
import { AppContext } from "../../contexts/AppProvider";
import { AuthContext } from "../../contexts/AuthProvider";
import { RoomContext } from "../../contexts/RoomProvider";
import debounce from "lodash.debounce";
import { db } from "../../firebase/config";

function DebounceSelect({ fetchOption, debounceTimeout = 300, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [option, setOption] = useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadOption = (value) => {
            setOption([]);
            setFetching(true);

            fetchOption(value, props.currentMember).then((newOpt) => {
                setOption(newOpt);
                setFetching(false);
            });
        };

        return debounce(loadOption, debounceTimeout);
    }, [debounceTimeout, fetchOption]);

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size='small' /> : null}
            {...props}>
            {option.map((opt) => (
                <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                    <Avatar src={opt.photoURL}></Avatar>
                    {`${opt.label}`}
                </Select.Option>
            ))}
        </Select>
    );
}

async function fetchUserList(search, currentMember) {
    return db
        .collection("users")
        .where("keywords", "array-contains", search)
        .limit(20)
        .get()
        .then((snapshot) => {
            return snapshot.docs
                .map((doc) => ({
                    label: doc.data().displayName,
                    value: doc.data().uid,
                    photoURL: doc.data().photoURL,
                }))
                .filter((opt) => !currentMember.includes(opt.value));
        });
}

export default function InviteModal() {
    const { user } = useContext(AuthContext);
    const { isVisibleInvite, setVisibleInvite, selectedRoomId } = useContext(AppContext);
    const { selectedRoom } = useContext(RoomContext);
    const [form] = Form.useForm();
    const [value, setValue] = useState("");

    const handleOk = () => {
        const roomRef = db.collection('rooms').doc(selectedRoomId);

        roomRef.update({
            members: [...selectedRoom.members, ...value.map((val) => val.value)],
        });
        //reset form
        form.resetFields();

        setVisibleInvite(false);
    };

    const handleCancel = () => {
        setVisibleInvite(false);
    };

    return (
        <Modal
            title='Tạo phòng'
            visible={isVisibleInvite}
            onOk={handleOk}
            onCancel={handleCancel}>
            <Form form={form} layout='vertical'>
                <DebounceSelect
                    mode='multiple'
                    label='Tên các thành viên'
                    value={value}
                    placeholder='Tên thành viên'
                    fetchOption={fetchUserList}
                    onChange={(newValue) => setValue(newValue)}
                    style={{ width: "100%" }}
                    currentMember={selectedRoom ? selectedRoom.members : []}
                />
            </Form>
        </Modal>
    );
}
