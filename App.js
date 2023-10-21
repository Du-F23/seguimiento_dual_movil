import {Router} from "./src/navigation/Router";
import {AuthProvider} from "./src/context/AuthProvider";
import {ToastProvider} from 'react-native-toast-notifications'

export default function App() {
    return (
        <ToastProvider
            duration={5000}
            animationType='slide-in'
            animationDuration={250}
        >
            <AuthProvider>
                <Router/>
            </AuthProvider>
        </ToastProvider>
    );
}
