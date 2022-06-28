const INITIAL_STATE = {
  amount_of_gas: "",
  cost_of_gas: "",
  drawings: { plans: [], elevations: [], sections: [] },
  existing: { data: [], other: "" },
  fabric_details: [
    {
      label: "Main Building",
      "External Walls": {
        fabric_type: "",
        description: "",
        detail: "",
      },
      "Internal Walls": {
        fabric_type: "",
        description: "",
        detail: "",
      },
      "Roof Type": {
        fabric_type: "",
        description: "",
        detail: "",
      },
      Windows: {
        fabric_type: "",
        description: "",
        detail: "",
      },
      "Suspended Floors": {
        fabric_type: "",
        description: "",
        detail: "",
      },
      "Inner Floors": {
        fabric_type: "",
        description: "",
        detail: "",
      },
      Age: "",
    },
  ],
  high_energy_equipments: {
    sauna: "0",
    swimmingPool: "0",
    hotTub: "0",
    kilns: "0",
    other: "0",
  },
  occupancy: {
    weekly: {
      "0000 - 0600": [0, 0],
      "0600 - 0800": [0, 0],
      "0800 - 1000": [0, 0],
      "1000 - 1400": [0, 0],
      "1400 - 1800": [0, 0],
      "1800 - 2359": [0, 0],
    },
    property_usage: {
      data: [],
      other: "",
    },
    number_of_adultOccupants: "1",
    number_of_childrenOccupants: "1",
    number_of_typicalOccupantsPerBedroom: "1",
  },
  photos: {
    walls: [],
    roof: [],
    windows: [],
    existing_boiler: [],
    existing_radiator: [],
    pipework: [],
  },
  pricing: {
    data: ["0", "0", "0", "0"],
    discount: false,
  },
  proposed: {
    data: [],
    other: "",
  },
  questions: {
    hotwater_importance: 1,
    heating_then_uk_average: 1,
  },
  radiator_and_window_sizes: [
    {
      room_desc: "",
      radiator_size: "",
      window_size: "",
    },
  ],
  site_details: {
    address_1: "",
    address_2: "",
    city: "",
    postcode: "",
  },
  ventilation_draught: {
    draught: "",
    ventilation: ["", "", "", "", "", ""],
    other: "",
  },
  number_of_guests: "0",
  other_details: "",
  other_design_factor: [],
  heating_system: "1",
};

const bookJobReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_DETAILS":
      return {
        ...state,
        ...action.payload,
      };

      break;
    case "RESET_DETAILS":
      return {
        ...state,
        ...INITIAL_STATE,
      };

      break;

    default:
      return state;
  }
};

export default bookJobReducer;
