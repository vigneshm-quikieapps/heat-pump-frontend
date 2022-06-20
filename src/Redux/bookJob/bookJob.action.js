export const bookJobAction = (keyvalue) => ({
  type: "ADD_DETAILS",
  payload: keyvalue,
});
export const bookJobReset = () => ({
  type: "RESET_DETAILS",
});
