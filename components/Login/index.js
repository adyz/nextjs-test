import { Button, Checkbox, Form } from "semantic-ui-react";
import { register } from "services/firebase";
export default function Login() {
  const [userForm, setUserForm] = React.useState({
    email: "",
    password: "",
  });
  const [serviceState, setServiceState] = React.useState("IDLE");

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
      const res = await register(userForm);
      console.log(res);
      if (typeof res.error !== undefined) {
        setServiceState("ERROR");
        setUserForm({
          ...userForm,
          error: res.error,
        });
        return;
      }
      setServiceState("FULFILLED");
      console.log("Here", res);
    } catch (e) {
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
        <h2>Register</h2>
        {serviceState === "ERROR" && `<h1>Error</h1>`}
        {serviceState === "PENDING" && `<h1>Loading</h1>`}
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
