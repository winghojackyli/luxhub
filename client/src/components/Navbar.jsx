import { Search } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import logo from "../assets/logo.png";

const Container = styled.div`
  height: 80px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Logo = styled.span`
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const Img = styled.img`
  width: 40px;
  height: auto;
  object-fit: cover;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 30px;
  padding: 5px;
`;

const Input = styled.input`
  width: 240px;
  font-size: 16px;
  border: none;
  ${mobile({ width: "50px" })}
  :focus {
    outline: none;
  }
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const LogoName = styled.h1`
  font-weight: bold;
  font-size: 40px;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 16px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    if (window.confirm("Are you sure to sign out?")) {
      logout(dispatch);
    } else {
      return false;
    }
  };

  const goToSearch = (e) => {
    if (e.key === "Enter") {
      const qSearch = e.target.value;
      navigate({
        pathname: "/find",
        search: `?search=${qSearch}`,
      });
      e.target.value = "";
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <Logo>
              <Img src={logo} alt="" />
            </Logo>
          </Link>
          <SearchContainer>
            <Search style={{ color: "grey", fontSize: 18, padding: 5 }} />
            <Input placeholder="Search Product" onKeyDown={goToSearch} />
          </SearchContainer>
        </Left>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <Center>
            <LogoName>LuxHub.</LogoName>
          </Center>
        </Link>
        <Right>
          <Link
            to="/products"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <MenuItem>BROWSE</MenuItem>
          </Link>
          <Link
            to="/posts"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <MenuItem>STYLES</MenuItem>
          </Link>
          {user ? (
            <>
              <Link
                to={`/${user._id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <MenuItem>PROFILE</MenuItem>
              </Link>
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/register"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link
                to="/login"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
