import React, {useContext} from 'react'
import { AuthContext } from './AuthProvider';
import useFirestore, { useMemberstore } from "../hooks/useFirestore";
import { AppContext } from './AppProvider';

export const RoomContext = React.createContext();

export default function RoomProvider({children}) {
    const {user: {uid}} = useContext(AuthContext);
    const { selectedRoomId } = useContext(AppContext);

    const roomsCondition = React.useMemo(() => {
        return {
            fieldName: "members",
            operator: "array-contains",
            compareValue: uid,
        };
    }, [uid])
    
    
    const rooms = useFirestore("rooms", roomsCondition);
    const selectedRoom = React.useMemo(() => {
        return rooms.find((room) => room.id === selectedRoomId);
    }, [rooms, selectedRoomId]);

    const membersCondition = React.useMemo(() => {
        return {
            fieldName: "uid",
            operator: "in",
            compareValue: selectedRoom ? selectedRoom.members : [],
        };
    }, [selectedRoom]);

    const members = useMemberstore('users', membersCondition)

    return (
        <RoomContext.Provider value={{ rooms, selectedRoom, members }}>
            {children}
        </RoomContext.Provider>
    );
}
