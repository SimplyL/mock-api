import React, { useEffect, useState } from "react";
import { Input, Button, Toast, ToastBody } from "reactstrap";
import { getPerson, getAffordability, getExposure } from "./service";

const App = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => console.log(res));
  }, []);

  const isValid = value => {
    if (value.length > 0 && value.length <= 10 && !/[^a-z]/i.test(value)) {
      return true;
    }
    return false;
  };

  const onClick = async value => {
    try {
      const person = await getPerson(value);
      const affordability = await getAffordability(person.affordability_id);
      const exposure = await getExposure(
        affordability.affordability_min.exposure_id
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
        onClick={() => onClick(query)}
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
