export function SignUpForm() {
    return (
        <form>
            <input type="text" placeholder="Enter username" />
            <br /><br />
            <input type="password" placeholder="Enter password" />
            <br /><br />
            <input type="email" placeholder="Enter email" />
            <br /><br />
            <input type="phone" placeholder="Enter phone" />
            <br /><br />
            <input type="submit" value="Sign Up" />
        </form>
    )
}