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
import { userRequest } from "../requestMethods";

const Container = styled.div`
  margin-left: 100px;
`;

const NewProductTitle = styled.h1``;

const NewProductForm = styled.form`
  display: flex;
  height: 500px;
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

const NewProductSizeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 140px;
`;
const NewProductCheckboxContainer = styled.div`
  display: flex;
  padding: 5px;
`;

const NewProductSizeSelectAllButton = styled.button`
  width: 80px;
  border: none;
  padding: 10px;
  background-color: #00004f;
  color: white;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
`;
const NewProductCheckboxLabel = styled.label`
  font-size: 16px;
`;
const NewProductCheckbox = styled.input`
  margin-right: 10px;
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
  const [inputs, setInputs] = useState({ categories: "top" });
  const [file, setFile] = useState(null);
  const [arrays, setArrays] = useState({});
  const navigate = useNavigate();

  const SHOE_SIZES = [
    "4",
    "4.5",
    "5",
    "5.5",
    "6",
    "6.5",
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
    "10.5",
    "11",
    "11.5",
    "12",
    "12.5",
    "13",
    "14",
  ];
  const APPAREL_SIZES = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const [checkedState, setCheckedState] = useState([]);

  useEffect(() => {
    if (inputs.categories === "shoes") {
      setCheckedState(new Array(SHOE_SIZES.length).fill(false));
    } else if (inputs.categories === "top" || inputs.categories === "bottom") {
      setCheckedState(new Array(APPAREL_SIZES.length).fill(false));
    } else setCheckedState([]);
  }, [inputs.categories]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    setArrays((prev) => {
      return { ...prev, size: [] };
    });
  };
  const handleArray = (e) => {
    setArrays((prev) => {
      return { ...prev, [e.target.name]: e.target.value.split(",") };
    });
  };

  const handleCheck = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    if (inputs.categories === "shoes") {
      setArrays((prev) => {
        return {
          ...prev,
          size: SHOE_SIZES.filter(
            (size, index) => updatedCheckedState[index] && size
          ),
        };
      });
    } else if (inputs.categories === "top" || inputs.categories === "bottom") {
      setArrays((prev) => {
        return {
          ...prev,
          size: APPAREL_SIZES.filter(
            (size, index) => updatedCheckedState[index] && size
          ),
        };
      });
    }
  };

  const handleSelectAll = (e) => {
    e.preventDefault();
    const updatedCheckedState = checkedState.map((item) => (item = true));
    setCheckedState(updatedCheckedState);
    if (inputs.categories === "shoes") {
      setArrays((prev) => {
        return {
          ...prev,
          size: SHOE_SIZES.filter(
            (size, index) => updatedCheckedState[index] && size
          ),
        };
      });
    } else if (inputs.categories === "top" || inputs.categories === "bottom") {
      setArrays((prev) => {
        return {
          ...prev,
          size: APPAREL_SIZES.filter(
            (size, index) => updatedCheckedState[index] && size
          ),
        };
      });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const addProduct = async (product) => {
      try {
        await userRequest
          .post("/products", product)
          .then(() => navigate("/products"));
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
          <NewProductSelect name="categories" onChange={handleCat}>
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="shoes">Shoes</option>
            <option value="accessories">Accessories</option>
          </NewProductSelect>
        </NewProductItem>
        <NewProductItem>
          {inputs.categories !== "accessories" && (
            <>
              <NewProductLabel>Size</NewProductLabel>
              <NewProductSizeSelectAllButton onClick={handleSelectAll}>
                Select All
              </NewProductSizeSelectAllButton>
              <NewProductSizeContainer>
                {inputs.categories === "shoes" &&
                  SHOE_SIZES.map((eachSize, index) => (
                    <NewProductCheckboxContainer>
                      <NewProductCheckbox
                        name="size"
                        id={eachSize}
                        value={eachSize}
                        type="checkbox"
                        checked={checkedState[index]}
                        onClick={() => handleCheck(index)}
                      />
                      <NewProductCheckboxLabel>
                        {eachSize}
                      </NewProductCheckboxLabel>
                    </NewProductCheckboxContainer>
                  ))}
                {(inputs.categories === "top" ||
                  inputs.categories === "bottom") &&
                  APPAREL_SIZES.map((eachSize, index) => (
                    <NewProductCheckboxContainer>
                      <NewProductCheckbox
                        name="size"
                        id={eachSize}
                        value={eachSize}
                        type="checkbox"
                        checked={checkedState[index]}
                        onClick={() => handleCheck(index)}
                      />
                      <NewProductCheckboxLabel>
                        {eachSize}
                      </NewProductCheckboxLabel>
                    </NewProductCheckboxContainer>
                  ))}
              </NewProductSizeContainer>
            </>
          )}
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
