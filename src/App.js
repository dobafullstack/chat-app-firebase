
import Login from "./components/Login/index";
import ChatRoom from "./components/ChatRoom/index";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import RoomProvider from "./contexts/RoomProvider";
import AppProvider from "./contexts/AppProvider";
import AddRoomModal from "./components/Modal/AddRoomModal";
import InviteModal from "./components/Modal/InviteModal";

function App() {
    return (
        <Router>
            <AppProvider>
                <AuthProvider>
                    <RoomProvider>
                        <Switch>
                            <Route component={Login} path='/login'></Route>
                            <Route component={ChatRoom} path='/'></Route>
                        </Switch>
                        <AddRoomModal />
                        <InviteModal />
                    </RoomProvider>
                </AuthProvider>
            </AppProvider>
        </Router>
    );
}

export default App;
