import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userRequest } from "../requestMethods";

const Container = styled.div`
  margin-left: 100px;
`;

const NewProductTitle = styled.h1``;

const NewProductForm = styled.form`
  display: flex;
  height: 440px;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const NewProductItem = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 20px;
`;
const NewProductLabel = styled.label`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  color: rgb(150, 150, 150);
`;

const NewProductInput = styled.input`
  height: 20px;
  padding: 10px;
  border: 1px solid grey;
  border-radius: 5px;
`;

const NewProductTextArea = styled.textarea`
  height: 150px;
  padding: 10px;
  border: 1px solid grey;
  border-radius: 5px;
`;

const NewProductSelect = styled.select`
  height: 40px;
  border-radius: 5px;
`;

const NewProductButton = styled.button`
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

const NewProduct = () => {
  const [inputs, setInputs] = useState();
  const [file, setFile] = useState(null);
  const [arrays, setArrays] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleArray = (e) => {
    setArrays((prev) => {
      return { ...prev, [e.target.name]: e.target.value.split(",") };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const addProduct = async (product) => {
      try {
        await userRequest.post("/products", product);
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
          const product = { ...inputs, img: downloadURL, ...arrays };
          addProduct(product);
        });
      }
    );
    navigate("/products");
  };

  return (
    <Container>
      <NewProductTitle>New Product</NewProductTitle>
      <NewProductForm>
        <NewProductItem>
          <NewProductLabel>Image</NewProductLabel>
          <NewProductInput
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </NewProductItem>
        <NewProductItem>
          <NewProductLabel>Title</NewProductLabel>
          <NewProductInput
            name="title"
            type="text"
            placeholder="title"
            onChange={handleChange}
          />
        </NewProductItem>
        <NewProductItem>
          <NewProductLabel>Description</NewProductLabel>
          <NewProductTextArea
            name="desc"
            placeholder="description"
            onChange={handleChange}
          />
        </NewProductItem>
        <NewProductItem>
          <NewProductLabel>Brand</NewProductLabel>
          <NewProductInput
            name="brand"
            type="text"
            placeholder="nike,jordan"
            onChange={handleArray}
          />
        </NewProductItem>
        <NewProductItem>
          <NewProductLabel>Categories</NewProductLabel>
          <NewProductSelect name="categories" onChange={handleChange}>
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="shoes">Shoes</option>
            <option value="accessories">Accessories</option>
          </NewProductSelect>
        </NewProductItem>
        <NewProductItem>
          <NewProductLabel>Size</NewProductLabel>
          <NewProductInput
            name="size"
            type="text"
            placeholder="S,M,L"
            onChange={handleArray}
          />
        </NewProductItem>

        <NewProductItem>
          <NewProductLabel>Release Date</NewProductLabel>
          <NewProductInput
            name="releaseDate"
            type="date"
            onChange={handleChange}
          />
        </NewProductItem>

        <NewProductButton onClick={handleClick}>Create</NewProductButton>
      </NewProductForm>
    </Container>
  );
};

export default NewProduct;
