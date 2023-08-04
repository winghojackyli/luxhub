import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { publicRequest, userRequest } from "../requestMethods";

const Container = styled.div`
  margin-left: 100px;
`;

const NewPostTitle = styled.h1``;

const NewPostForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const NewPostItem = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 20px;
`;
const NewPostLabel = styled.label`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  color: rgb(150, 150, 150);
`;

const NewPostInput = styled.input`
  height: 20px;
  padding: 10px;
  border: 1px solid grey;
  border-radius: 5px;
`;

const NewPostSelect = styled.select`
  height: 200px;
  width: 60vh;
  border-radius: 5px;
`;

const NewPostButton = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  background-color: #00004f;
  color: white;
  padding: 7px 10px;
  font-weight: 600;
  border-radius: 10px;
  margin-top: 30px;
  margin-bottom: 50px;
  cursor: pointer;
`;

const NewPost = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (e) => {
    const selectedOptions = e.target.selectedOptions;
    const productArray = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      const product = {
        productId: selectedOptions[i].value.split(",")[0],
        title: selectedOptions[i].value.split(",")[1],
      };
      productArray.push(product);
    }
    setSelectedProducts(productArray);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/products");
        setProducts(res.data.sort((a, b) => a.title.localeCompare(b.title)));
      } catch (err) {}
    };
    getProducts();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const addPost = async (post) => {
      try {
        await userRequest.post("/posts", post).then(() => navigate("/posts"));
      } catch (err) {}
    };

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const post = { img: downloadURL, products: selectedProducts };
          addPost(post);
        });
      }
    );
  };

  return (
    <Container>
      <NewPostTitle>New Post</NewPostTitle>
      <NewPostForm>
        <NewPostItem>
          <NewPostLabel>Image</NewPostLabel>
          <NewPostInput
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </NewPostItem>
        <NewPostItem>
          <NewPostLabel>Products</NewPostLabel>
          <NewPostSelect
            name="selectedProducts"
            multiple
            onChange={handleSelect}
          >
            {products.map((product) => (
              <option value={[product._id, product.title]}>
                {product.title}
              </option>
            ))}
          </NewPostSelect>
        </NewPostItem>

        <NewPostButton onClick={handleClick}>Create</NewPostButton>
      </NewPostForm>
    </Container>
  );
};

export default NewPost;
