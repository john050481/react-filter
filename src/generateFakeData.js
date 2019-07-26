import faker from "faker";
import moment from "moment";

export default function(itemCount = 100, daysInPast = 30) {
  let fakeArray = [];
  for (let i = 0; i < itemCount; i++) {
    const startDate =
      faker.date.recent(daysInPast).valueOf() + daysInPast * 0.3 * 86400 * 1000;
    const startValue =
      Math.floor(moment(startDate).valueOf() / 10000000) * 10000000;
    /*const endValue = moment(
      startDate + faker.random.number({ min: 2, max: 20 }) * 15 * 60 * 1000
    ).valueOf();*/

    let gate = ["GATE1", "GATE2"];
    let region = ["REGION1", "REGION2"];
    let provider = ["PROVIDER1", "PROVIDER2"];

    /* 
    to set 'id' options in 'defaultOptionsItems.js' 
    use name property in 'fakeArray'
    */
    fakeArray.push({
      id: i + "",
      name: faker.name.firstName(),
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumber(),
      description: faker.hacker.phrase(),
      start: startValue,
      gate: gate[randomInteger(0, 1)],
      region: region[randomInteger(0, 1)],
      provider: provider[randomInteger(0, 1)],
      bool: faker.random.boolean()
      /*end: endValue*/
    });
  }

  //fakeArray = fakeArray.sort((a, b) => b - a)

  return fakeArray;
}

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}
