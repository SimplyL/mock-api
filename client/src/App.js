import React, { useEffect, useState } from "react";
import { Input, Button } from "reactstrap";

const App = () => {
  const [query, setQuery] = useState("");

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

  const onClick = value => {
    fetch(`http://localhost:9000/person/${value}`).then(res =>
      console.log(res.json())
    );
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
    </div>
  );
};

export default App;
