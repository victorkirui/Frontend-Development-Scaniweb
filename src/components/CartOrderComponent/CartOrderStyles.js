import styled from "styled-components";
import { mobile } from "../../responsive";

export const Container = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding: 25px 0px;
  margin: 10px 0px;
`;
export const Tax = styled.div``;
export const Title = styled.div`
  display: inline-block;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  color: #1d1f22;
  margin: 0px;
  ${mobile({ fontSize: "20px" })}
`;
export const TotalTax = styled.p`
  display: inline-block;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  color: #1d1f22;
  margin: 10px;
  ${mobile({ fontSize: "20px" })}
`;
export const Quantity = styled(Title)``;
export const Value = styled(TotalTax)``;
export const Total = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #1d1f22;
`;
export const Amount = styled(TotalTax)``;
export const OrderBtn = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  align-items: center;
  padding: 16px 32px;
  width: 279px;
  height: 43px;
  background: #5ece7b;
  color: #fff;
  margin: 15px 0px;
`;
