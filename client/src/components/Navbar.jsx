import { LanguageOutlined, Search } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/apiCalls";

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

const Language = styled.span`
  cursor: pointer;
  ${mobile({ display: "none" })}
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

const Logo = styled.h1`
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
    logout(dispatch);
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
          <Language>
            <LanguageOutlined />
          </Language>
          <SearchContainer>
            <Search style={{ color: "grey", fontSize: 16, padding: 5 }} />
            <Input placeholder="Search" onKeyDown={goToSearch} />
          </SearchContainer>
        </Left>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <Center>
            <Logo>LuxHub.</Logo>
          </Center>
        </Link>
        <Right>
          <Link
            to="/products"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <MenuItem>BROWSE</MenuItem>
          </Link>
          {user ? (
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Link>
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
