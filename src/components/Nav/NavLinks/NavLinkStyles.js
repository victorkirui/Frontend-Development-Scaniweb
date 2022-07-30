import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { mobile } from "../../../responsive";

export const LinkItems = styled.div`
  display: flex;
  align-items: center;
  ${mobile({ flex: "2" })}
`;
export const LinkItem = styled(NavLink)`
  margin-right: 15px;
  text-decoration: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;
  color: #1d1f22;
  ${mobile({ fontSize: "15px" })}
`;
