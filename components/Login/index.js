import { Button, Checkbox, Form } from "semantic-ui-react";
import { login } from "services/firebase";

import { GlobalContext } from "components/Context";

export default function Login() {
  const [userForm, setUserForm] = React.useState({
    email: "",
    password: "",
  });
  const [serviceState, setServiceState] = React.useState("IDLE");
  const { user, storeUser } = React.useContext(GlobalContext);

  function handleChangeEmail(event) {
    setUserForm({ email: event.target.value, password: userForm.password });
  }

  function handleChangePassword(event) {
    setUserForm({ password: event.target.value, email: userForm.email });
  }

  async function handleNewPostSubmit(e) {
    e.preventDefault();
    setServiceState("PENDING");
    try {
      const res = await login(userForm);
      console.log({ res });
      if (typeof res.error !== "undefined" && res.error !== false) {
        console.log("Whut?");
        setServiceState("ERROR");
        setUserForm({
          ...userForm,
          error: false,
        });
        return;
      }
      setServiceState("FULFILLED");
      storeUser(res);
    } catch (e) {
      console.log("Error here, why?", e);
      setServiceState("ERROR");
      setUserForm({
        ...userForm,
        error: res.error,
      });
    }
  }

  return (
    <>
      <Form onSubmit={handleNewPostSubmit}>
        <h2>Login</h2>
        {user.email ? <h3>You are {user.email}</h3> : <h3>Not yet logged</h3>}
        {serviceState === "ERROR" && <h1>Error</h1>}
        {serviceState === "PENDING" && <h1>Loading</h1>}
        <Form.Field>
          <label>Email</label>
          <input
            placeholder="Email"
            onChange={handleChangeEmail}
            value={userForm.email}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            placeholder="Password"
            onChange={handleChangePassword}
            value={userForm.password}
          />
        </Form.Field>
        {serviceState !== "PENDING" && <Button type="submit">Submit</Button>}
      </Form>
    </>
  );
}
