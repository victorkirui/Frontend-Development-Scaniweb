import styled from "styled-components";
import { mobile } from "../../../responsive";

export const Container = styled.div`
  width: 400px;
  padding: 10px;
  margin-top: 20px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #fff;
  position: absolute;
  right: 0;
  z-index: 9999;
  ${mobile({ padding: "0px 20px" })}
  max-height: 60vh;
  overflow-y: scroll;
`;
export const Title = styled.h1`
  font-weight: 700;
  font-size: 16px;
  line-height: 26px;
  color: #1d1f22;
`;
