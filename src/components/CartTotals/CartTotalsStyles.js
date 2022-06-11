import styled from "styled-components";
import { Link } from "react-router-dom";
import { mobile } from "../../responsive";

export const Container = styled.div``;
export const TotalsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Total = styled.h4`
  font-family: "Roboto";
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  color: #1d1f22;
`;
export const TotalAmount = styled(Total)``;
export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ViewBagBtn = styled(Link)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  width: 48%;
  padding: 13px 36px;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  border: 1px solid rgba(0, 0, 0, 0.5);
  color: #1d1f22;
  text-align: center;
  ${mobile({ padding: "10px 14px" })};
`;
export const CheckoutBtn = styled(ViewBagBtn)`
  background: #5ece7b;
  color: #fff;
  border: none;
`;
