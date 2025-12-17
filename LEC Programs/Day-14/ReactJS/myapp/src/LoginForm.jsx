import { Component } from "react";

export class LoginForm extends Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Username" />
        <br />
        <input type="password" placeholder="Password" />
        <br />
        <button type="submit">Login</button>
      </form>
    );
  }
}

export default LoginForm;
