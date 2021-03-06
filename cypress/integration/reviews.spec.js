/* global cy */

let username = "";
let new_review = "";
let review_length = 0;
let token = "";

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

describe("Review/ratings CRUD", () => {
  before(() => {
    cy.wait(1000);
    console.log(token);
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
    cy.wait(1000);
    cy.get(".user_reviews").should((reviews) => {
      review_length = reviews.length;
    });
  });

  it("User can add review through modal", () => {
    let num = Math.random();
    new_review = `test ${num}`;
    cy.get(".add_review").click();
    cy.wait(1000);
    // CHECKING THAT THE MODAL RENDERS
    cy.get("button").should((submits) => {
      expect(submits, "2").to.have.length(2);
    });
    cy.get("form").within(() => {
      cy.get("#rating").click();
      cy.get("input[name=review]").type(`${new_review}`);
    });
    cy.get("button").then((buttons) => {
      cy.get(buttons[0]).click();
    });
    cy.wait(1000);
    cy.get(".user_reviews").should((reviews) => {
      expect(reviews).to.have.length(review_length + 1);
    });
  });
});
