import styled from "styled-components";
import { mobile } from "../../responsive";
import { tablet } from "../../responsive";

export const CartWrapper = styled.div`
  padding-top: 30px;
  ${tablet({ paddingTop: "5px" })}
  ${mobile({ paddingTop: "0px" })}
`;
export const Title = styled.h1`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #1d1f22;
  margin: 30px 0px;
  ${mobile({ fontSize: "26px" })}
`;
export const Count = styled(Title)``;
