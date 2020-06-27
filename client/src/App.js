import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Button, Toast, ToastBody, ToastHeader } from "reactstrap";
import Popover from "./components/Popover";
import { getPerson, getAffordability, getExposure } from "./service";
import { personActions } from "./modules/person.duck";

const isValid = value => {
  if (value.length > 0 && value.length <= 10 && !/[^a-z]/i.test(value)) {
    return true;
  }
  return false;
};

const calculateRatio = (minAffordability, exposure) =>
  exposure.reduce((a, b) => a + b, 0) * minAffordability;

const App = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);

  const togglePopover = () => setModal(!modal);

  const handleOnClick = async value => {
    try {
      const person = await getPerson(value);
      const affordability = await getAffordability(person.affordability_id);
      const exposure = await getExposure(
        affordability.affordability_min.exposure_id
      );
      dispatch(
        personActions.addPerson({
          name: person.name,
          lastName: person.last_name,
          affordabilityRange: {
            min: affordability.affordability_min.value,
            max: affordability.affordability_max.value
          },
          ratio: calculateRatio(
            affordability.affordability_min.value,
            exposure.values
          )
        })
      );
      setError("");
      togglePopover();
    } catch (error) {
      setError("Person with provided id was not found.");
    }
  };

  return (
    <>
      <div class="container min-vh-100">
        <div class="d-flex row min-vh-100 justify-content-center align-items-center">
          <div class="col-6 text-center border rounded p-4">
            <Input
              className="mb-3"
              placeholder="Ender person id"
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <Button
              color="primary"
              disabled={!isValid(query)}
              onClick={() => handleOnClick(query)}
            >
              Submit
            </Button>
            {console.log(modal)}
            <Popover isOpen={modal} toggle={togglePopover} />
          </div>
        </div>
      </div>
      <Toast
        isOpen={!!error}
        className="position-absolute"
        style={{ right: "10px", top: "10px" }}
      >
        <ToastHeader icon="danger" toggle={() => setError("")}>Error</ToastHeader>
        <ToastBody>{error}</ToastBody>
      </Toast>
    </>
  );
};

export default App;
