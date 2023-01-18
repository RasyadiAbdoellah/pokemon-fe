import React from "react";
import Details from "./index";
import { capitalize, mockResponse as response } from "lib";

describe("<Details />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Details pokemon={response} />);
  });
  it("renders Pokemon passed in pokemon prop", () => {
    cy.mount(<Details pokemon={response} />);
    cy.get("h1").should("contain.text", capitalize(response.name));
  });
  it("Displays Pokemon abilities and stats", () => {
    cy.mount(<Details pokemon={response} />);
    cy.get("h2").should("contain.text", "Abilities");
    cy.get("li").should("contain.text", "chlorophyll");
    cy.get("h2").should("contain.text", "Stats");
    cy.get("li").should("contain.text", "HP");
  });
});
