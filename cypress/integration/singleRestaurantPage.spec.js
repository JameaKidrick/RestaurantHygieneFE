/* global cy */

let username = "";

describe("Creating a user to login with", () => {
  let num = Math.random();
  username = `JaneDoe${num}`;
  it("Creating a user to test login", () => {
    cy.visit("/register");
    cy.get("form").within(() => {
      cy.get("input[name=first_name]").type("Jane");
      cy.get("input[name=last_name]").type("Doe");
      cy.get("input[name=username]").type(`${username}`);
      cy.get("input[name=password]").type("password");
    });
    cy.get("button").click();
  });
});

describe("Single restaurant page renders with direct link", () => {
  it("Cypress can visit single restaurant page", () => {
    cy.wait(3000);
    cy.contains("Log out").click();
    cy.visit("/restaurant/ChIJVZ6MsNkDyokRs884W2r6gE8");
    cy.wait(3000);
    cy.get("#restaurant_name").contains("McDonald's");
  });

  it("Can log in from single restaurant page then redirected to same page", () => {
    cy.contains("sign in").click();
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type("password");
    cy.get("button").click();
    cy.wait(3000);
    cy.url().should(
      "match",
      /[http://localhost:3000/restaurant/ChIJVZ6MsNkDyokRs884W2r6gE8]/
    );
    cy.get(".user_reviews").should((reviews) => {
      expect(reviews, "3").to.have.length(3);
    });
  });
});

describe("Single restaurant page renders through redirect", () => {
  it("Cypress can visit single restaurant page", () => {
    cy.contains("Find a Restaurant").click();
    cy.get("form").within(() => {
      cy.get("input[name=userCity]").type("Martinsburg");
      cy.get("select[name=userState]").select("West Virginia");
      cy.get("input[name=query]").type("McDonald's");
      cy.get("button").click();
    });
    cy.get(".restaurant").then((places) => {
      cy.get(places[1]).click();
    });
    cy.url().should(
      "match",
      /[http://localhost:3000/restaurant/ChIJVZ6MsNkDyokRs884W2r6gE8]/
    );
  });
});
