import axios from "axios";

import React from "react";

export default class CRUDCommands {
  getCapstone = (userId, token) => {
    let temp = {};
    axios({
      method: "get",
      url: `https://localhost:44343/api/User/${userId}/Capstones`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.data.capstones[0])
      .then(res => (temp = res))
      .catch(error => console.log(error));

    return temp;
  };
}

// export default CRUDCommands;
