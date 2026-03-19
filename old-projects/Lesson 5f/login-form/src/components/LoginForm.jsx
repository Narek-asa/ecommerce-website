import './LoginForm.css'

function LoginForm({ showPassword, setShowPassword }) {
    function switchPasswordButton() {
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true);
        }
    }

    return (
        <>
            <div className="welcome-text">
                <p>
                    Hello, welcome to my website
                </p>
            </div>
            <div>
                <input
                    className="email-input"
                    placeholder="Email"
                />
            </div>
            <div>
                <input
                    className="password-input"
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                />
                <button
                    className="password-visible-button"
                    onClick={switchPasswordButton}
                >
                    {showPassword ? 'Hide' : 'Show'}
                </button>
            </div>
            <div>
                <button className="login-button">
                    Login
                </button>
                <button className="sign-up-button">
                    Sign up
                </button>
            </div>
        </>
    )
}
export default LoginForm;