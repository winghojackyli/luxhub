import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { publicRequest, userRequest } from '../requestMethods';

const Container = styled.div`
  margin: 20px;
  min-width: 300px;
  height: 550px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  flex-basis: 10%;
`;

const Image = styled.img`
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 10px;
`;

const Details = styled.ul`
  margin: 0px 5px;
  padding: 0;
`;

const ProdTitle = styled.li`
  list-style-type: circle;
  font-size: 16px;
  font-weight: 300;
  display: inline-block;
  margin-top: 5px;
  &:hover {
    color: #707070;
  }
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;
const PostEditButton = styled.button`
  width: 70px;
  border: none;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #00224f;
  color: white;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;
const PostDeleteButton = styled.button`
  width: 70px;
  border: none;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #860000;
  color: white;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const Post = ({ id, img, products, update }) => {
  const admin = useSelector((state) => state.currentUser?.isAdmin);
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/editPost/${id}`, { state: { id, img, products } });
  };
  const handleDelete = (e) => {
    e.preventDefault();
    const deletePost = async () => {
      try {
        await userRequest.delete(`/posts/${id}`);
        const res = await publicRequest.get('posts');
        update(res.data);
      } catch (err) {}
    };
    deletePost();
  };
  return (
    <Container>
      <ButtonContainer>
        <PostEditButton show={admin} onClick={handleEdit}>
          Edit
        </PostEditButton>
        <PostDeleteButton show={admin} onClick={handleDelete}>
          Delete
        </PostDeleteButton>
      </ButtonContainer>
      <Image src={img} />
      <Details>
        {products.map((product) => (
          <Link
            to={`/product/${product.productId}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <ProdTitle>{product.title}</ProdTitle>
          </Link>
        ))}
      </Details>
    </Container>
  );
};

export default Post;
