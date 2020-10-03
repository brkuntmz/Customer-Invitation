import chai from "chai";
import { readFromFile, writeToFile } from "../read_write_file.js";

const { expect } = chai;

let input = "";
let output = "";
let customers = [];
let invitedCustomers = [];

describe("Read - Write File", () => {
  describe("Read from File", () => {
    beforeEach("Initial setup", () => {
      input = "customers.txt";
    });

    it("should check whether input fileName exists", async () => {
      input = "";
      try {
        await readFromFile(input);
      } catch (error) {
        expect(error).to.equal("File does not exist");
      }
    });

    it("should return customers", async () => {
      customers = await readFromFile(input);
      expect(customers).to.be.an("array");
      expect(customers).to.have.lengthOf(32);
    });

    it("should check customer props", async () => {
      customers = await readFromFile(input);
      expect(customers[0]).to.be.an("Object");
      expect(customers[0]).to.have.property("user_id");
      expect(customers[0]).to.have.property("name");
      expect(customers[0]).to.have.property("latitude");
      expect(customers[0]).to.have.property("longitude");
    });
  });

  describe("Write to File", () => {
    beforeEach("Initial setup", () => {
      output = "output.txt";
      invitedCustomers = [{ id: 1, name: "John Doe", dist: 10.56694 }];
    });

    it("should check whether output fileName exists", async () => {
      output = "";
      try {
        await writeToFile(customers, output);
      } catch (error) {
        expect(error).to.equal("File does not exist");
      }
    });

    it("should check whether there are customers to invite", async () => {
      invitedCustomers = [];
      try {
        await writeToFile(invitedCustomers, output);
      } catch (error) {
        expect(error).to.equal("There are no customers to write");
      }
    });

    it("should check invited customer props", () => {
      expect(invitedCustomers[0]).to.be.an("Object");
      expect(invitedCustomers[0]).to.have.property("id");
      expect(invitedCustomers[0]).to.have.property("name");
      expect(invitedCustomers[0]).to.have.property("dist");
    });
  });
});
