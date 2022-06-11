import styled from "styled-components";
import { mobile } from "../../responsive";

export const CartContainer = styled.div`
  max-width: 400px;
  margin-left: auto;
`;
export const Container = styled.div`
  padding: 10px 0px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
export const LeftContainer = styled.div``;
export const Brand = styled.p`
  margin: 7px 0px;
  font-weight: 300;
  font-size: 16px;
  line-height: 26px;
  color: #1d1f22;
  ${mobile({ fontSize: "14px" })}
`;
export const Name = styled(Brand)``;
export const Price = styled(Brand)`
  font-family: "Raleway";
  margin: 5px 0px;
  font-weight: 500;
`;

export const AttributeName = styled.div`
  margin: 7px 0px;
  font-weight: 300;
  font-size: 14px;
  color: #1d1f22;
`;
export const AttributeWrap = styled.div`
  display: flex;
`;
export const AttributeValue = styled.div`
  margin-right: 5px;
  font-size: 14px;
  padding: 5px;
  border: 1px solid #1d1f22;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.bg};
  user-select: none;

  &:active {
    transform: translateY(1.3px);
  }
`;

export const RightContainer = styled.div`
  display: flex;
`;
export const CountContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
export const Increment = styled.div`
  padding: 5px 8px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  user-select: none;

  &:active {
    transform: translateY(0.5px);
  }
`;
export const Count = styled.div``;
export const Decrement = styled(Increment)`
  padding: 5px 10px;
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  height: 200px;
  width: 150px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
