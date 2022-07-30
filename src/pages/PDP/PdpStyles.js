import styled from "styled-components";
import { mobile } from "../../responsive";
import { tablet } from "../../responsive";

export const PDPContainer = styled.div`
  padding: 60px 20px;
  margin: auto;
`;
export const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr 5fr;
  ${tablet({ gridTemplateColumns: "1fr" })}
`;
export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${tablet({ flexDirection: "row", flexWrap: "wrap" })}
`;
export const ProductImage = styled.img`
  width: auto;
  height: 87.61px;
  object-fit: contain;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.5s ease;
  ${tablet({ marginRight: "5%" })}

  &:hover {
    transform: scale(1.1);
  }
`;
export const MiddleContainer = styled.div`
  position: relative;
  max-height: 600px;
`;
export const MainImage = styled.img`
  width: 100%;

  z-index: 1;
  ${tablet({ width: "90%", margin: "auto" })}
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
  z-index: 100;
`;
export const RightContainer = styled.div`
  padding: 0px 30px 20px 5vw;
  display: flex;
  flex-direction: column;
`;

export const Brand = styled.h2`
  font-weight: 600;
  font-size: 30px;
  line-height: 27px;
  color: #1d1f22;
  margin-top: 0px;
  ${mobile({ fontSize: "24px" })}
`;
export const Name = styled(Brand)`
  font-weight: 400;
`;
export const AttributeName = styled.div`
  font-family: "Roboto Condensed";
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  color: #1d1f22;
  margin: 18px 0px 10px;
  ${mobile({ fontSize: "16px" })}
`;
export const AttributeValue = styled.div`
  margin-top: 10px;
  margin-right: 12px;
  padding: 20px;
  border: 1px solid #1d1f22;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.bg};
  user-select: none;
  display: inline-block;

  &:active {
    transform: translateY(1.3px);
  }
  ${mobile({ padding: "17px", marginRight: "8px" })}
`;
export const Price = styled.div``;
export const PriceLabel = styled(AttributeName)``;
export const Amount = styled.h5`
  font-weight: 700;
  font-size: 24px;
  line-height: 18px;
  color: #1d1f22;
`;
export const Button = styled.button`
  text-transform: uppercase;
  border: none;
  outline: none;
  font-size: 22px;
  padding: 16px 32px;
  width: 292px;
  height: 52px;
  background: #5ece7b;
  color: #fff;

  &:active {
    transform: translateY(2px);
  }
`;
export const Desc = styled.span`
  font-family: "Roboto";
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  color: #1d1f22;
  text-align: justify;
  width: 292px;
`;
