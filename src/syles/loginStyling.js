import styled from "styled-components";

export const ParentContainer = styled.div`
  // border: 2px solid green;
  width: 45%;
  margin: 0 auto;
  margin-top: 3rem;
  #login_header {
    font-weight: bold;
    font-size: 1.3rem;
  }
`

export const LoginPage = styled.div`
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 1rem;
  margin-top: 1%;

  #goToRegister .register {
    color: blue;
  }
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
  margin-left: 0.5rem;

  span {
    color: red;
  }
`

export const LabelHide = styled.label`
  // border: 2px solid red;
  text-align: right;
  padding-bottom: 1rem
`

export const Input = styled.input`
  // border: 2px solid red;
  margin-top: 1rem;
  border-radius: 0.2rem;
  border: 1px solid black;
  padding: 0.5rem;
`

export const Button = styled.button`
  // border: 2px solid red;
  width: 5rem;
  margin: 0 auto;
  margin-bottom: 2rem;
  padding: 0.5rem;
  border-radius: 0.2rem;
  transition: 0.5s;
  background: ${props => props.disabled ? 'white': 'black'};
  border: 1px solid ${props => props.disabled ? 'grey': 'black'};
  color: ${props => props.disabled ? 'grey': 'white'};
  cursor: ${props => props.disabled ? 'not-allowed': 'pointer'};
  &:hover{
    background: ${props => props.disabled ? 'none': 'white'};
    color: ${props => props.disabled ? 'none': 'black'};
  }
  `;