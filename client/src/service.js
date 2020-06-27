const API = "http://localhost:9000";

export const getPerson = id =>
  fetch(`${API}/person/${id}`).then(res => res.json());

export const getAffordability = id =>
  fetch(`${API}/affordability/${id}`).then(res => res.json());

export const getExposure = id =>
  fetch(`${API}/exposure/${id}`).then(res => res.json());
