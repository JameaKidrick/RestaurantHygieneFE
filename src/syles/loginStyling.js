import styled from "styled-components";

export const ParentContainer = styled.div`
  // border: 2px solid green;
  width: 45%;
  margin: 0 auto;
  #login_header {
    font-weight: bold;
    font-size: 1.5rem
  }
`

export const LoginPage = styled.div`
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 1rem;
  margin-top: 1%
`

export const Form = styled.form`
  // border: 2px solid blue;
  display: flex;
  flex-direction: column
`

export const InputContainer = styled.label`
  // border: 2px solid red;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

export const Label = styled.span`
  // border: 2px solid orange;
  margin-left: 0.5rem
`

export const LabelHide = styled.label`
  // border: 2px solid red;
  text-align: right;
  padding-bottom: 1rem
`

export const Input = styled.input`
  // border: 2px solid red;
`

export const Button = styled.button`
  // border: 2px solid red;
  width: 25%;
  margin: 0 auto;
`;
