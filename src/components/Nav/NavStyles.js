import styled from "styled-components";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { mobile } from "../../responsive";

export const Container = styled.div`
  max-width: 1400px;
  margin: auto;
  padding: 20px 20px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
export const LinkItems = styled.div`
  display: flex;
  align-items: center;
  ${mobile({ flex: "2"})}
`;
export const LinkItem = styled(Link)`
  margin-right: 15px;
  text-decoration: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;
  color: #1d1f22;
  ${mobile({ fontSize: "15px" })}
`;
export const LogoContainer = styled(Link)``;
export const CartWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const CurrencySymbol = styled.div`
  margin-right: 15px;
`;
export const Select = styled.select`
  border: none;
  outline: none;
  background: #fff;
  width: 114px;
  left: 1248px;
  top: 65px;

  background: #ffffff;
`;
export const CartIcon = styled.div`
  position: relative;
  cursor: pointer;
  span {
    display: inline-block;
    background: #000;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    color: #fff;
    padding: 3px;
    text-align: center;
    position: absolute;
    top: -10px;
    right: -10px;
  }
`;
export const BasketWrapper = styled.div``;
export const BasketIcon = styled(BsCart2)`
  font-size: 20px;
  color: #000;
`;
