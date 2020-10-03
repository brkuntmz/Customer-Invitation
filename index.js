import { getGreatCircleDistance } from "./calc_distance.js";
import { readFromFile, writeToFile } from "./read_write_file.js";
const DUBLIN = { lat: 53.339428, lon: -6.257664 };
const OFFICE_DIST = 100; // km

const getInvitedCustomerList = async () => {
  let customers = [];
  let invitedCustomers = [];

  // read customers line by line
  try {
    customers = await readFromFile("customers.txt");
  } catch (error) {
    throw new Error(error);
  }

  // iterate over the customers
  for (let i = 0; i < customers.length; i++) {
    // calc dist
    let dist = getGreatCircleDistance(
      {
        lat: customers[i].latitude,
        lon: customers[i].longitude,
      },
      DUBLIN
    );

    // check whether they're within the 100km distance
    if (dist <= OFFICE_DIST) {
      // only put the interested attr. into new array
      invitedCustomers.push({
        id: customers[i].user_id,
        name: customers[i].name,
        dist: dist.toFixed(5),
      });
    }
  }

  // sort asc based on user id
  invitedCustomers.sort((c1, c2) => c1.id - c2.id);

  let res;
  try {
    res = await writeToFile(invitedCustomers, "output.txt");
  } catch (error) {
    throw new Error(error);
  }

  console.log(res);
};

getInvitedCustomerList();
