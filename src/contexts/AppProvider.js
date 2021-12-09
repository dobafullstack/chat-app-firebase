import React, {useState, useContext} from 'react'

export const AppContext = React.createContext();

export default function AppProvider({children}) {

    const [isVisibleModal, setVisibleModal] = useState(false)
    const [isVisibleInvite, setVisibleInvite] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');

    return (
        <AppContext.Provider
            value={{
                isVisibleModal,
                setVisibleModal,
                selectedRoomId,
                setSelectedRoomId,
                isVisibleInvite,
                setVisibleInvite,
            }}>
            {children}
        </AppContext.Provider>
    );
}
