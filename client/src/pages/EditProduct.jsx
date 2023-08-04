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
import { userRequest } from "../requestMethods";
import { Publish } from "@material-ui/icons";

const Container = styled.div`
  padding: 20px;
`;

const ProductTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProductTitle = styled.h1``;

const ProductInfo = styled.div`
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgb(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgb(0, 0, 0, 0.75);
`;
const ProductForm = styled.form`
  display: flex;
  justify-content: space-between;
`;
const ProductFormLeft = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 50px;
`;
const ProductFormCenter = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 50px;
`;
const ProductFormLabel = styled.label`
  margin-bottom: 10px;
  font-size: 18px;
  color: grey;
`;
const ProductFormInput = styled.input`
  width: 250px;
  font-size: 16px;
  margin-bottom: 10px;
  border: none;
  padding: 10px;
  border-bottom: 1px solid grey;
`;
const ProductFormSizeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 200px;
`;
const ProductFormCheckboxContainer = styled.div`
  display: flex;
  padding: 5px;
`;

const ProductSizeSelectAllButton = styled.button`
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
const ProductFormCheckboxLabel = styled.label`
  font-size: 16px;
`;
const ProductFormCheckbox = styled.input`
  margin-right: 10px;
`;
const ProductFormTextArea = styled.textarea`
  height: 150px;
  font-size: 16px;
  margin-bottom: 10px;
  border: none;
  padding: 10px;
  border-bottom: 1px solid grey;
`;

const ProductFormSelect = styled.select`
  height: 30px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const ProductUploadImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: contain;
  margin-right: 20px;
`;
const ProductFormRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 20px 50px;
`;
const ProductUpload = styled.div`
  display: flex;
  align-items: center;
`;
const ProductButton = styled.button`
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

const EditProduct = () => {
  const location = useLocation();
  const product = location.state;
  const productId = location.pathname.split("/")[2];
  const [inputs, setInputs] = useState({
    title: product.title,
    desc: product.desc,
    categories: product.categories,
    releaseDate: product.releaseDate,
  });
  const [file, setFile] = useState(null);
  const [arrays, setArrays] = useState({
    brand: product.brand,
    size: product.size,
  });
  const [img, setImg] = useState("");
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
      setCheckedState((prev) =>
        prev.map(
          (item, index) => (item = product.size.includes(SHOE_SIZES[index]))
        )
      );
    } else if (inputs.categories === "top" || inputs.categories === "bottom") {
      setCheckedState(new Array(APPAREL_SIZES.length).fill(false));
      setCheckedState((prev) =>
        prev.map(
          (item, index) => (item = product.size.includes(APPAREL_SIZES[index]))
        )
      );
    } else setCheckedState([]);
  }, [inputs.categories, product.size]);

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

  const updateProduct = async (product) => {
    try {
      await userRequest
        .put(`/products/${productId}`, product)
        .then(() => navigate(`/product/${productId}`));
    } catch (err) {}
  };

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
            const updatedProduct = { ...inputs, img: downloadURL, ...arrays };
            if (!Object.values(updatedProduct).some((el) => el === ""))
              updateProduct(updatedProduct);
          });
        }
      );
    } else {
      const updatedProduct = { ...inputs, ...arrays };
      if (!Object.values(updatedProduct).some((el) => el === ""))
        updateProduct(updatedProduct);
    }
  };

  return (
    <Container>
      <ProductTitleContainer>
        <ProductTitle>Product</ProductTitle>
      </ProductTitleContainer>
      <ProductInfo>
        <ProductForm>
          <ProductFormLeft>
            <ProductFormLabel>Product Name</ProductFormLabel>
            <ProductFormInput
              name="title"
              type="text"
              value={inputs.title}
              onChange={handleChange}
            />
            <ProductFormLabel>Description</ProductFormLabel>
            <ProductFormTextArea
              name="desc"
              type="text"
              value={inputs.desc}
              onChange={handleChange}
            />
            <ProductFormLabel>Brand</ProductFormLabel>
            <ProductFormInput
              name="brand"
              type="text"
              value={arrays.brand}
              onChange={handleArray}
            />
            <ProductFormLabel>Categories</ProductFormLabel>
            <ProductFormSelect name="categories" onChange={handleCat}>
              <option value="top" selected={inputs.categories === "top"}>
                Top
              </option>
              <option value="bottom" selected={inputs.categories === "bottom"}>
                Bottom
              </option>
              <option value="shoes" selected={inputs.categories === "shoes"}>
                Shoes
              </option>
              <option
                value="accessories"
                selected={inputs.categories === "accessories"}
              >
                Accessories
              </option>
            </ProductFormSelect>
          </ProductFormLeft>
          <ProductFormCenter>
            {inputs.categories !== "accessories" && (
              <>
                <ProductFormLabel>Size</ProductFormLabel>
                <ProductSizeSelectAllButton onClick={handleSelectAll}>
                  Select All
                </ProductSizeSelectAllButton>
                <ProductFormSizeContainer>
                  {inputs.categories === "shoes" &&
                    SHOE_SIZES.map((eachSize, index) => (
                      <ProductFormCheckboxContainer>
                        <ProductFormCheckbox
                          name="size"
                          id={eachSize}
                          value={eachSize}
                          type="checkbox"
                          checked={checkedState[index]}
                          onClick={() => handleCheck(index)}
                        />
                        <ProductFormCheckboxLabel>
                          {eachSize}
                        </ProductFormCheckboxLabel>
                      </ProductFormCheckboxContainer>
                    ))}
                  {(inputs.categories === "top" ||
                    inputs.categories === "bottom") &&
                    APPAREL_SIZES.map((eachSize, index) => (
                      <ProductFormCheckboxContainer>
                        <ProductFormCheckbox
                          name="size"
                          id={eachSize}
                          value={eachSize}
                          type="checkbox"
                          checked={checkedState[index]}
                          onClick={() => handleCheck(index)}
                        />
                        <ProductFormCheckboxLabel>
                          {eachSize}
                        </ProductFormCheckboxLabel>
                      </ProductFormCheckboxContainer>
                    ))}
                </ProductFormSizeContainer>
              </>
            )}

            <ProductFormLabel>Release Date</ProductFormLabel>
            <ProductFormInput
              name="releaseDate"
              type="date"
              value={new Date(inputs.releaseDate).toISOString().slice(0, 10)}
              onChange={handleChange}
            />
          </ProductFormCenter>
          <ProductFormRight>
            <ProductUpload>
              <ProductUploadImg src={img || product.img} alt="" />
              <ProductFormLabel htmlFor="file" style={{ cursor: "pointer" }}>
                <Publish />
              </ProductFormLabel>
              <ProductFormInput
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  e.target.files[0] &&
                    setImg(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </ProductUpload>
            <ProductButton onClick={handleClick}>Update</ProductButton>
          </ProductFormRight>
        </ProductForm>
      </ProductInfo>
    </Container>
  );
};

export default EditProduct;
