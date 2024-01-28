describe("Should login or show an error if the user do not hit the email and password", () => {
  it("should show an error when email/password is wrong", () => {
    cy.visit("/login");
    cy.getByDataCy("email").clear().type("test@gmail.com");
    cy.getByDataCy("password").clear().type("somewrongpassword");
    cy.getByDataCy("submit").click();
    cy.get("[data-slot=error-message]").should("exist");
  });
  it.only("should redirect the user when login is successfull", () => {
    cy.visit("/login");
    cy.intercept("/auth/login").as("login");

    cy.getByDataCy("submit").click();
    cy.wait("@login").then(({ response }) => {
      expect(response?.statusCode).to.eq(200);
    });

    cy.url().should("eq", "http://localhost:3000/admin");
  });
});
