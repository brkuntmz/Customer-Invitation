import chai from "chai";
import { getGreatCircleDistance, deg2Rad, rad2Deg } from "../calc_distance.js";

const { expect } = chai;
let MILAN = null;
let LONDON = null;

describe("Great Circle Distance", () => {
  beforeEach("Set up initial points to test the distance", () => {
    MILAN = { lat: 45.4642, lon: 9.19 };
    LONDON = { lat: 51.5074, lon: 0.1278 };
  });

  it("should make sure points are there", () => {
    MILAN.lat = null;
    expect(() => getGreatCircleDistance(MILAN, LONDON)).to.throw(
      Error,
      "Points are missing"
    );
  });

  it("should validate points", () => {
    MILAN.lat = -91.01;
    expect(() => getGreatCircleDistance(MILAN, LONDON)).to.throw(
      Error,
      "Points are not valid!"
    );

    MILAN.lat = 45.4642;
    LONDON.lon = -181.02;
    expect(() => getGreatCircleDistance(MILAN, LONDON)).to.throw(
      Error,
      "Points are not valid!"
    );
  });

  it("should make the correct conversion from deg2Rad", () => {
    expect(deg2Rad(LONDON.lat).toFixed(5)).to.equal("0.89897");
  });

  it("should make the correct conversion from rad2Deg", () => {
    expect(rad2Deg(0.8989737191).toFixed(5)).to.equal("51.50740");
  });

  it("should calculate the distance correctly", () => {
    expect(getGreatCircleDistance(MILAN, LONDON).toFixed(5)).to.equal(
      "946.10008"
    );
  });
});
