import styled from "styled-components";

export const GrandparentContainer = styled.div`
  display: flex;
`

export const ParentContainer = styled.div`
  // border: 2px solid green;
  width: ${props => props.results ? '25%': '45%'};
  margin: ${props => props.results ? '0 0 0 3rem': '3rem auto'};
  margin-top: 3rem;
  z-index: 0;

  #header {
    font-weight: bold;
    font-size: 1.3rem;
  }

  #headerWithMessage {
    // border: 2px solid blue;
    display: flex;
    align-items: center;
  }

  #successMessage {
    color: limegreen;
    font-size: 0.8rem;
    margin-left: 0.5rem;
    margin-top: 0.2rem;
  }
`

export const FormPage = styled.div`
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 1rem;
  margin-top: 1%;

  #goToRegister .register {
    color: blue;
  }

  #goToLogin .login {
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

  .error {
    color: red;
    font-size: 0.7rem;
    margin-left: 0.5rem;
    margin-top: 0.2rem;
  }
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

export const Select = styled.select`
  // border: 2px solid red;
  margin-top: 1rem;
  border-radius: 0.2rem;
  border: 1px solid black;
  padding: 0.5rem;
`

export const Button = styled.button`
  // border: 2px solid red;
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

export const DeleteButton = styled.button`
  margin: 0 auto;
  margin-bottom: 2rem;
  padding: 0.5rem;
  border-radius: 0.2rem;
  transition: 0.5s;
  border: 1px solid ${props => props.disabled ? 'grey': 'red'};
  background: ${props => props.disabled ? 'white': 'red'};
  color: ${props => props.disabled ? 'grey': 'white'};
  cursor: ${props => props.disabled ? 'not-allowed': 'pointer'};
  &:hover{
    background: ${props => props.disabled ? 'none': 'white'};
    color: ${props => props.disabled ? 'none': 'red'};
  }
`