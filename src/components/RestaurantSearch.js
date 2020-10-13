import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchResults from "./SearchResults";
import * as Yup from "yup";
import queryString from "query-string";

// ACTIONS
import { placeLocator } from "../actions";

// STYLING
import {
  GrandparentContainer,
  ParentContainer,
  FormPage,
  Form,
  InputContainer,
  Label,
  Input,
  Select,
  Button,
} from "../styles/formStyling";

const RestaurantSearch = (props) => {
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.appStatusReducer.isFetching);

  const usStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  const parse = queryString.parse(props.location.search);
  const [pageNumber, setPageNumber] = useState(Number(parse.page));
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userLocation, setUserLocation] = useState({});
  const [parameters, setParameters] = useState({
    query: "",
    type: "restaurant",
    radius: 2000,
    userLocation: userLocation,
  });
  const [formErrors, setFormErrors] = useState({
    query: "",
    radius: "",
    userCity: "",
    userState: "",
  });
  const [query, setQuery] = useState(`?page=${pageNumber}`);
  const [results, setResults] = useState(false);

  let searchFormSchema = Yup.object().shape({
    query: Yup.string(),
    radius: Yup.string(),
    userLocation: Yup.object().shape({
      userCity: Yup.string().required("Please provide a city"),
      userState: Yup.string().required("Please provide a state"),
      userAddress: Yup.string(),
    }),
  });

  useEffect(() => {
    if (props.location.state === undefined) {
      window.addEventListener(
        "beforeunload",
        props.history.replace("/findrestaurant")
      );
      window.removeEventListener(
        "beforeunload",
        props.history.replace("/findrestaurant")
      );
    }

    if (parse.page === undefined) {
      setPageNumber(0);
    }

    if (
      props.location.state !== null &&
      props.location.state !== undefined &&
      props.location.state.page &&
      props.location.state.parameters
    ) {
      setPageNumber(props.location.state.page);
      setParameters(props.location.state.parameters);
      setUserLocation(props.location.state.userLocation);
    }
  }, []);

  useEffect(() => {
    setQuery(`?page=${pageNumber}`);
  }, [pageNumber]);

  useEffect(() => {
    parameters["userLocation"] = userLocation;
    searchFormSchema.isValid(parameters).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [parameters, userLocation, searchFormSchema]);

  const handleChange = (e) => {
    e.persist();

    if (
      e.target.name === "userAddress" ||
      e.target.name === "userCity" ||
      e.target.name === "userState"
    ) {
      Yup.reach(searchFormSchema, `userLocation.${e.target.name}`)
        .validate(e.target.value)
        .then((valid) => {
          setFormErrors({ ...formErrors, [e.target.name]: "" });
        })
        .catch((err) => {
          setFormErrors({ ...formErrors, [e.target.name]: err.errors[0] });
        });
      setUserLocation({ ...userLocation, [e.target.name]: e.target.value });
    } else {
      Yup.reach(searchFormSchema, e.target.name)
        .validate(e.target.value)
        .then((valid) => {
          setFormErrors({ ...formErrors.user, [e.target.name]: "" });
        })
        .catch((err) => {
          setFormErrors({ ...formErrors, [e.target.name]: err.errors[0] });
        });
      setParameters({ ...parameters, [e.target.name]: e.target.value });
    }
  };

  /******************************** HANDLE SUBMIT & FORM ********************************/
  const handleSubmit = (e) => {
    e.preventDefault();
    setResults(true);
    setPageNumber(1);
    setQuery(`?page=${1}`);
    delete props.location.state;
    dispatch(placeLocator(parameters, props.history, `?page=${1}`));
  };

  return (
    <GrandparentContainer>
      <ParentContainer results={results}>
        <p id="header">Find a Restaurant</p>
        <FormPage>
          {/* <p>Search based on a location:</p> */}
          <Form onSubmit={handleSubmit}>
            <InputContainer>
              <Label>Address</Label>
              <Input
                type="text"
                name="userAddress"
                placeholder="Address"
                onChange={handleChange}
                defaultValue={
                  props.location.state
                    ? props.location.state.parameters.userLocation.userAddress
                    : parameters.userLocation.userAddress
                }
              />
            </InputContainer>
            <InputContainer>
              <Label>
                City<span> *</span>
              </Label>
              <Input
                type="text"
                name="userCity"
                placeholder="City*"
                onChange={handleChange}
                defaultValue={
                  props.location.state
                    ? props.location.state.parameters.userLocation.userCity
                    : parameters.userLocation.userCity
                }
              />
            </InputContainer>
            <InputContainer>
              <Label>
                State<span> *</span>
              </Label>
              <Select
                name="userState"
                onChange={handleChange}
                defaultValue={
                  props.location.state
                    ? props.location.state.parameters.userLocation.userState
                    : parameters.userLocation.userState
                }
              >
                <option selected disabled hidden value=""></option>
                {usStates.map((state, index) => {
                  return (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  );
                })}
              </Select>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="radius">Choose radius: </Label>
              <Select
                name="radius"
                onChange={handleChange}
                defaultValue={
                  props.location.state
                    ? props.location.state.parameters.radius
                    : parameters.radius
                }
              >
                <option value="2000">1 mile</option>
                <option value="5000">3 miles</option>
                <option value="10000">5 miles</option>
                <option value="20000">10 miles</option>
                <option value="25000">15 miles</option>
                <option value="35000">20 miles</option>
                <option value="40000">25 miles</option>
                <option value="50000">30 miles</option>
              </Select>
            </InputContainer>
            <InputContainer>
              <Label>Keywords (for example: pizza, chicken, etc.)</Label>
              <Input
                type="text"
                placeholder="Keyword"
                name="query"
                onChange={handleChange}
                defaultValue={
                  props.location.state
                    ? props.location.state.parameters.query
                    : parameters.query
                }
              />
            </InputContainer>
            <Button disabled={buttonDisabled}>Find restaurants</Button>
          </Form>
        </FormPage>
      </ParentContainer>
      <SearchResults
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        parameters={parameters}
        setParameters={setParameters}
        setUserLocation={setUserLocation}
        query={query}
        history={props.history}
        location={props.location}
        results={results}
        setResults={setResults}
      />
    </GrandparentContainer>
  );
};

export default RestaurantSearch;
