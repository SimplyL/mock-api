const ADD = "danske/person/ADD";

const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case ADD: {
      return action.payload;
    }

    default:
      return state;
  }
};

const addPerson = payload => ({
  type: ADD,
  payload
});

export const personActions = {
  addPerson
};

export default reducer;
