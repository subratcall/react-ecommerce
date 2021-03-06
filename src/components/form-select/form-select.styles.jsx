import styled, { css } from "styled-components";

const subColor = "grey";
const mainColor = "black";

const shrinkLabelStyles = css`
  top: -20px;
  font-size: 12px;
  color: ${mainColor};
`;

export const GroupContainer = styled.div`
  position: relative;
  margin: ${(props) => (props.zeroMargin ? `0` : `45px 0`)};

  input[type="password"] {
    letter-spacing: 0.3em;
  }
`;

export const FormSelectContainer = styled.select`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: ${(props) => (props.zeroMargin ? `0` : `25px 0`)};

  &:focus {
    outline: none;
  }

  &:focus ~ label {
    ${shrinkLabelStyles}
  }
`;

export const FormSelectLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: -6px;
  transition: 300ms ease all;

  &.shrink {
    ${shrinkLabelStyles}
  }
`;
