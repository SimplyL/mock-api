import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Button, Toast, ToastBody } from "reactstrap";
import { getPerson, getAffordability, getExposure } from "./service";
import { personActions } from "./modules/person.duck";

const isValid = value => {
  if (value.length > 0 && value.length <= 10 && !/[^a-z]/i.test(value)) {
    return true;
  }
  return false;
};

const calculateRatio = (minAffordability, exposure) => {
  return exposure.reduce((a, b) => a + b, 0) * minAffordability;
};

const App = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

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
    } catch (error) {
      setError("Incorrect query");
    }
  };

  return (
    <div>
      <Input
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
      <Toast isOpen={!!error} className="bg-danger">
        <ToastBody>{error}</ToastBody>
      </Toast>
    </div>
  );
};

export default App;
