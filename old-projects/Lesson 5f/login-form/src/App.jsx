import { useState } from 'react'
import LoginForm from "./components/LoginForm.jsx";
import './App.css'

function App() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <LoginForm
                showPassword={showPassword}
                setShowPassword={setShowPassword}
            />
        </>
    )
}

export default App
