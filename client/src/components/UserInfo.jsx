import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updateState, updateUser } from "../redux/apiCalls";
import { userRequest } from "../requestMethods";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 25px;
`;

const UserInfoContainer = styled.div`
  padding: 20px;
  border-radius: 5px;
  border: 1px solid lightgray;
`;
const UserForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const UserInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const UserFormLeft = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 200px;
  margin-bottom: 20px;
`;
const UserFormRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserFormLabel = styled.label`
  margin-bottom: 10px;
  font-size: 18px;
  color: grey;
`;
const UserFormInput = styled.input`
  width: 250px;
  font-size: 16px;
  margin-bottom: 10px;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 10px;
`;
const UserButton = styled.button`
  width: 100px;
  border: none;
  padding: 10px;
  background-color: #00004f;
  color: white;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;

const Message = styled.p`
  color: ${(props) => (props.msg === "success" ? "#004f11" : "#860000")};
  margin: 10px 5px;
  font-size: 15px;
  font-weight: 300;
`;

const UserInfo = () => {
  const user = useSelector((state) => state.currentUser);
  const location = useLocation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(user);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname.split("/")[1] !== user._id) navigate(`/${user._id}`);
  }, [location.pathname]);

  const handleChange = (e) => {
    setUserInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const updateUser = async (user) => {
    try {
      await userRequest.put(`/users/${user._id}`, user);
    } catch (err) {}
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (password) {
      if (password === confirmPassword) {
        updateUser({ ...userInfo, password });
        setSuccess("Profile Updated");
        setError("");
      } else {
        setError("Passwords do not match");
        setSuccess("");
      }
    } else {
      updateUser(userInfo);
      setSuccess("Profile Updated");
      setError("");
    }
    updateState(dispatch, user._id);
  };

  return (
    <Container>
      <TitleContainer>
        <Title>Profile</Title>
      </TitleContainer>
      <UserInfoContainer>
        <UserForm>
          <UserInputContainer>
            <UserFormLeft>
              <UserFormLabel>First Name</UserFormLabel>
              <UserFormInput
                name="fname"
                type="text"
                value={userInfo.fname}
                onChange={handleChange}
              />
              <UserFormLabel>Last Name</UserFormLabel>
              <UserFormInput
                name="lname"
                type="text"
                value={userInfo.lname}
                onChange={handleChange}
              />
              <UserFormLabel>Email</UserFormLabel>
              <UserFormInput
                name="email"
                type="text"
                value={userInfo.email}
                onChange={handleChange}
              />
              <UserFormLabel>Username</UserFormLabel>
              <UserFormInput
                name="username"
                type="text"
                value={userInfo.username}
                onChange={handleChange}
              />
            </UserFormLeft>
            <UserFormRight>
              <UserFormLabel>Update Password</UserFormLabel>
              <UserFormInput
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <UserFormLabel>Confirm Update Password</UserFormLabel>
              <UserFormInput
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && <Message msg={"error"}>{error}</Message>}
              {success && <Message msg={"success"}>{success}</Message>}
            </UserFormRight>
          </UserInputContainer>
          <UserButton onClick={handleClick}>Update</UserButton>
        </UserForm>
      </UserInfoContainer>
    </Container>
  );
};

export default UserInfo;
