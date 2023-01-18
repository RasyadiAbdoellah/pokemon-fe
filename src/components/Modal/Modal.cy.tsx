import React from "react";
import Modal from "./index";
import { mockResponse as response } from "lib";

describe("<Modal />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Modal pokemon={response} />);
  });
  it("Accepts input", () => {
    cy.mount(<Modal pokemon={response} />);
    cy.get("input.input-number").type("123").should("have.value", "123");
  });
  it("Shows an error message if user enters non-digit character", () => {
    cy.mount(<Modal pokemon={response} />);
    cy.get("input.input-number").type("test");
    cy.get("p.error").should("exist");
  });
  it("Shows an error message when submitting", () => {
    cy.mount(<Modal pokemon={response} />);
    cy.get("input.input-number").type("123");
    cy.get("input.input-submit").click();
    cy.get("p.error").should("exist");
  });
});
