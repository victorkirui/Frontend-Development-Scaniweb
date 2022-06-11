import styled from "styled-components";
import { BsCart2 } from "react-icons/bs";
import { mobile } from "../../responsive";
import { tablet } from "../../responsive";

export const ContainerWrapper = styled.div`
  margin: auto;
`;
export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5%;
  ${tablet({ justifyContent: "space-evenly", alignItems: "center" })}
  ${mobile({ justifyContent: "flex-start", alignItems: "start" })}
`;
export const CartIcon = styled(BsCart2)`
  background: #56ad70;
  color: #fff;
  height: 52px;
  width: 52px;
  padding: 10px;
  display: block;
  border-radius: 50%;
  position: absolute;
  bottom: 40px;
  right: 40px;
  opacity: 0;
  transition: all 0.8s ease-in;
  z-index: 99;
  cursor: ${({ cursor }) => (cursor ? "pointer" : "not-allowed")};
`;
export const ItemWrapper = styled.div`
  position: relative;
  width: 30%;
  min-width: 386px;
  height: 444px;
  transition: all 0.8s ease;

  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }

  &:hover ${CartIcon} {
    opacity: 100%;
  }
  ${tablet({ minWidth: "300px" })}
  ${mobile({ minWidth: "200px" })}
`;
export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  padding: 16px;
`;
export const ProductImage = styled.img`
  object-fit: contain;
  width: 354px;
  height: 330px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  user-select: none;
  opacity: ${({ opacity }) => (opacity ? 1 : 0.4)};
`;
export const ProductName = styled.h3`
  line-height: 29px;
  letter-spacing: 0px;
  font-weight: 300;
  font-size: 18px;
  color: #8d8f9a;
  color: #1d1f22;
  text-decoration: none;
  user-select: none;
  opacity: ${({ opacity }) => (opacity ? 1 : 0.4)};
`;
export const Price = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 18px;
  line-height: 29px;
  color: #1d1f22;
  user-select: none;
  opacity: ${({ opacity }) => (opacity ? 1 : 0.4)};
`;
export const InStock = styled.div`
  position: absolute;
  left: 50%;
  top: 44.24%;
  transform: translate(-50%, -50%);
  font-weight: 400;
  font-size: 24px;
  line-height: 38px;
  color: #8d8f9a;
`;
