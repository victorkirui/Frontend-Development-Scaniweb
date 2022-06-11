import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { mobile } from "../../responsive";
import { tablet } from "../../responsive";

export const CartContainer = styled.div`
  margin: auto;
`;
export const Container = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
`;
export const LeftContainer = styled.div``;
export const Brand = styled.p`
  font-weight: 600;
  font-size: 30px;
  height: 27px;
  color: #1d1f22;
  ${tablet({ fontSize: "28px" })}
  ${mobile({ fontSize: "20px" })}
`;
export const Name = styled(Brand)`
  font-weight: 400;
`;
export const Sizes = styled.div`
  font-family: "Roboto Condensed";
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  color: #1d1f22;
`;
export const Color = styled(Sizes)``;
export const Price = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #1d1f22;
  line-height: 24px;
  margin-bottom: 10px;
  ${mobile({ fontSize: "20px", fontWeight: "600" })}
`;
export const AttributeName = styled(Sizes)`
  font-family: "Roboto Condensed";
  margin: 7px 0px;
  ${mobile({ fontWeight: "500" })}
`;

export const AttributeWrap = styled.div`
  height: 32px;
  display: flex;
`;
export const AttributeValue = styled.div`
  margin-right: 8px;
  padding: 15px;
  border: 1px solid #1d1f22;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Source Sans Pro";
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0.05em;
  color: #1d1f22;
  background: ${(props) => props.bg};
  user-select: none;

  &:active {
    transform: translateY(1.3px);
  }
  ${mobile({ padding: "7px" })}
`;

export const RightContainer = styled.div`
  display: flex;
  height: 288px;
  ${mobile({ height: "240px" })}
`;
export const CountContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
export const Increment = styled.div`
  padding: 10px 15px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 17px;
  cursor: pointer;
  user-select: none;

  &:active {
    transform: translateY(0.5px);
  }
  ${mobile({ padding: "5px 10px", marginRight: "2px", zIndex: "99" })}
`;
export const Count = styled.div`
  font-weight: 500;
  font-size: 24px;
  color: #1d1f22;
`;
export const Decrement = styled(Increment)``;
export const ImageContainer = styled.div`
  position: relative;
  display: flex;
`;

export const ImageContent = styled.img`
  width: 200px;
  height: 288px;
  margin-left: 20px;
  object-fit: contain;
  ${mobile({ height: "240px", marginLeft: "5px" })}
`;
export const LeftArrow = styled(AiOutlineLeft)`
  width: 24px;
  height: 24px;
  color: #fff;
  background: rgba(0, 0, 0, 0.73);
  position: absolute;
  bottom: 20px;
  right: 45px;
  cursor: pointer;

  &:active {
    transform: translateY(1.3px);
  }
`;
export const RightArrow = styled(AiOutlineRight)`
  width: 24px;
  height: 24px;
  color: #fff;
  background: rgba(0, 0, 0, 0.73);
  position: absolute;
  bottom: 20px;
  right: 15px;
  cursor: pointer;

  &:active {
    transform: translateY(1.3px);
  }
`;
