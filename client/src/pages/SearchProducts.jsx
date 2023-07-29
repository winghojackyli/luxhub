import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSearchParams, Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import ProductItem from "../components/ProductItem";

const Wrapper = styled.div`
  padding: 20px;
`;

const NoProduct = styled.h2`
  margin-top: 20px;
`;
const Alternative = styled.p`
  margin-top: 5px;
  color: black;
  text-decoration: none;
`;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SearchProducts = () => {
  const qSearch = useSearchParams()[0].get("search");
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find?search=" + qSearch);
        setProducts(res.data);
        setIsFetching(false);
      } catch (err) {}
    };
    getProduct();
    return () => setIsFetching(true);
  }, [qSearch]);

  return (
    <>
      {(!isFetching && products?.length) === 0 ? (
        <Wrapper>
          <NoProduct>Sorry, no matching search...</NoProduct>
          <Alternative>
            Please try searching with another keyword or{" "}
            <Link to="/products">Browse</Link> our catalogue
          </Alternative>
        </Wrapper>
      ) : (
        <Container>
          {products.map((item) => (
            <ProductItem item={item} key={item.id} />
          ))}
        </Container>
      )}
      ;
    </>
  );
};

export default SearchProducts;
