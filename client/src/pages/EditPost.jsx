import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { publicRequest, userRequest } from "../requestMethods";
import { Publish } from "@material-ui/icons";

const Container = styled.div`
  margin-left: 100px;
`;

const EditPostTitle = styled.h1``;

const EditPostForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const EditPostItem = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 20px;
`;
const EditPostLabel = styled.label`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  color: rgb(150, 150, 150);
`;
const PostUploadContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
const PostUploadImg = styled.img`
  height: 250px;
  border-radius: 10px;
  object-fit: contain;
  margin-right: 20px;
`;

const EditPostInput = styled.input`
  height: 20px;
  padding: 10px;
  border: 1px solid grey;
  border-radius: 5px;
`;

const EditPostSelect = styled.select`
  height: 200px;
  width: 60vh;
  border-radius: 5px;
`;

const EditPostButton = styled.button`
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

const EditPost = () => {
  const location = useLocation();
  const post = location.state;
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(post.products);
  const [file, setFile] = useState(null);
  const [img, setImg] = useState("");
  const [selectedState, setSelectedState] = useState();
  const navigate = useNavigate();

  const updatePost = async (updatedPost) => {
    try {
      await userRequest
        .put(`/posts/${post.id}`, updatedPost)
        .then(() => navigate("/posts"));
    } catch (err) {}
  };

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

  useEffect(() => {
    setSelectedState(new Array(products.length).fill(false));
    setSelectedState((prev) =>
      prev.map(
        (item, index) =>
          (item = post.products
            .map((product) => product.productId)
            .includes(products[index]._id))
      )
    );
  }, [products]);

  const handleClick = (e) => {
    e.preventDefault();
    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

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
            const updatedPost = {
              img: downloadURL,
              products: selectedProducts,
            };
            if (!Object.values(updatedPost).some((el) => el === ""))
              updatePost(updatedPost);
          });
        }
      );
    } else {
      const updatedPost = { products: selectedProducts };
      if (!Object.values(updatedPost).some((el) => el === ""))
        updatePost(updatedPost);
    }
  };
  return (
    <Container>
      <EditPostTitle>Edit Post</EditPostTitle>
      <EditPostForm>
        <EditPostItem>
          <EditPostLabel>Image</EditPostLabel>
          <PostUploadContainer>
            <PostUploadImg src={img || post?.img} alt="" />
            <EditPostLabel htmlFor="file" style={{ cursor: "pointer" }}>
              <Publish />
            </EditPostLabel>
            <EditPostInput
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => {
                setFile(e.target.files[0]);
                e.target.files[0] &&
                  setImg(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </PostUploadContainer>
        </EditPostItem>
        <EditPostItem>
          <EditPostLabel>Products</EditPostLabel>
          <EditPostSelect
            name="selectedProducts"
            multiple
            onChange={handleSelect}
          >
            {products.map((product, index) => (
              <option
                id={product._id}
                value={[product._id, product.title]}
                selected={selectedState[index]}
              >
                {product.title}
              </option>
            ))}
          </EditPostSelect>
        </EditPostItem>

        <EditPostButton onClick={handleClick}>Update</EditPostButton>
      </EditPostForm>
    </Container>
  );
};

export default EditPost;
