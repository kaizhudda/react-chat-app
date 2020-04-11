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
import "./Register.scss";

const Register = () => {
  const [formInputs, setFormInputs] = useState({
    username: "",
    password: "",
    email: "",
    emailConfirmation: "",
  });

  const handleChange = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(formInputs.email, formInputs.password)
      .then((createdUser) => {
        console.log(createdUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { username, email, password, passwordConfirmation } = formInputs;
  return (
    <Grid textAlign="center" className="Register">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
          Register for DevChat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={handleChange}
              value={username}
              type="text"
            />
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              onChange={handleChange}
              type="email"
              value={email}
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
            />
            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              onChange={handleChange}
              type="password"
              value={passwordConfirmation}
            />

            <Button color="orange" fluid size="large">
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          <Link to="/login">Already a user?</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
