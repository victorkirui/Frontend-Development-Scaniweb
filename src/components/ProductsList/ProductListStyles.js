import styled from "styled-components";
import { mobile } from "../../responsive";

export const Container = styled.div`
  padding: 60px 20px 30px 20px;
  margin: auto;
  ${mobile({ paddingTop: "30px" })}
`;
