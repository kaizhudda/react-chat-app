import React, { useState } from "react";
import { Link } from "react-router-dom";
import md5 from "md5";
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
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usersRef] = useState(firebase.database().ref("users"));

  const isFormValid = () => {
    let error;

    if (isFormEmpty(formInputs)) {
      error = { message: "fill in all fields" };
      setErrors([error]);
      return false;
    } else if (!isPasswordValid(formInputs)) {
      error = { message: "Password invalid" };
      setErrors([error]);
      return false;
    } else {
      return true;
    }
  };

  const isFormEmpty = (form) => {
    const { username, email, passwordConfirmation, password } = form;
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  const isPasswordValid = ({ passwordConfirmation, password }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

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
    if (isFormValid()) {
      setErrors([]);
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formInputs.email, formInputs.password)
        .then((createdUser) => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: formInputs.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`,
            })
            .then(() => {
              saveUser(createdUser).then(() => {
                console.log("User saved.");
              });
              setLoading(false);
            })
            .catch((err) => {
              console.error(err);
              setErrors([err]);
              setLoading(false);
            });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setErrors([err]);
        });
    }
  };

  const saveUser = (createdUser) => {
    return usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };

  const handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
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
            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              onChange={handleChange}
              type="password"
              value={passwordConfirmation}
              className={handleInputError(errors, "password")}
            />

            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              color="orange"
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
          <Link to="/login">Already a user?</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
