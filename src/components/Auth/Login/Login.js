import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Header,
  Icon,
  Form,
  Segment,
  Button,
  Message,
} from "semantic-ui-react";
import firebase from "../../../firebase";
import "./Login.scss";

const Login = () => {
  const [formInputs, setFormInputs] = useState({ password: "", email: "" });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const displayErrors = (errors) => {
    return errors.map((error, index) => <p key={index}>{error.message}</p>);
  };

  const handleChange = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid(formInputs)) {
      setErrors([]);
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formInputs.email, formInputs.password)
        .then((signedInUser) => {
          console.log(signedInUser);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setErrors([err]);
          setLoading(false);
        });
    }
  };

  const isFormValid = ({ email, password }) => email && password;

  const handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  const { email, password } = formInputs;
  return (
    <Grid textAlign="center" className="Login">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="violet" textAlign="center">
          <Icon name="code branch" color="violet" />
          Login for DevChat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              onChange={handleChange}
              type="email"
              value={email}
              className={handleInputError(errors, "email")}
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={handleChange}
              type="password"
              value={password}
              className={handleInputError(errors, "password")}
            />
            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              color="violet"
              fluid
              size="large"
            >
              Submit
            </Button>
          </Segment>
        </Form>
        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {displayErrors(errors)}
          </Message>
        )}
        <Message>
          Don't have an account? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
