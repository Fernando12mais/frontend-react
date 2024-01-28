import { VehicleCardProps } from "@/components/molecules/vehicle-card/types";
import { formatCurrency } from "@/utils/money";

describe("Should test CRUD features of admin page", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.intercept(/login/).as("login");
    cy.getByDataCy("submit").click();
    cy.wait("@login");

    cy.intercept(/search/).as("search");
  });
  it("Should create a vehicle", () => {
    cy.intercept("POST", /vehicle/).as("create-vehicle");
    cy.getByDataCy("add-vehicle").click();
    cy.getByDataCy("name").type("voyage");
    cy.getByDataCy("brand").type("fiat");
    cy.getByDataCy("model").type("siena");
    cy.getByDataCy("price").type("450000");
    cy.getByDataCy("add-image").selectFile("public/next.svg", { force: true });
    cy.wait(2000);
    cy.getByDataCy("submit").click();

    cy.wait("@create-vehicle").then(({ response }) => {
      expect(response?.statusCode).to.eq(201);

      const newVehicle = response?.body as VehicleCardProps;

      cy.getByDataCy(`vehicle-${newVehicle.id}`).should("exist");
    });
  });

  it("Should update a vehicle", () => {
    cy.intercept("PUT", /vehicle/).as("edit-vehicle");

    cy.wait("@search").then(({ response }) => {
      const vehicle = response?.body[0] as VehicleCardProps;
      cy.getByDataCy(`edit-vehicle-${vehicle.id}`).click();
      cy.getByDataCy("name").clear().type("edited-voyage");
      cy.getByDataCy("brand").clear().type("edited-fiat");
      cy.getByDataCy("model").clear().type("edited-siena");
      cy.getByDataCy("price").clear().type("650000");
      cy.getByDataCy("add-image").selectFile("public/vercel.svg", {
        force: true,
      });
      cy.wait(2000);
      cy.getByDataCy("submit").click();

      cy.wait("@edit-vehicle").then(({ response }) => {
        expect(response?.statusCode).to.eq(200);

        const newVehicle = response?.body as VehicleCardProps;

        cy.getByDataCy(`vehicle-${newVehicle.id}`).should("exist");
        cy.getByDataCy(`vehicle-name-${newVehicle.id}`).should(
          "contain.text",
          newVehicle.name,
        );
        cy.getByDataCy(`vehicle-brand-${newVehicle.id}`).should(
          "contain.text",
          newVehicle.brand,
        );
        cy.getByDataCy(`vehicle-model-${newVehicle.id}`).should(
          "contain.text",
          newVehicle.model,
        );
        cy.getByDataCy(`vehicle-price-${newVehicle.id}`).should(
          "contain.text",
          formatCurrency(Number(newVehicle.price)),
        );
      });
    });
  });

  it("Should delete a vehicle", () => {
    cy.intercept("DELETE", /vehicle/).as("delete-vehicle");

    cy.wait("@search").then(({ response }) => {
      expect(response?.statusCode).to.eq(200);

      const vehicles = response?.body as VehicleCardProps[];

      expect(vehicles.length).to.gt(0);

      const { id } = vehicles[0];

      cy.getByDataCy(`delete-vehicle-${id}`).click();
      cy.getByDataCy("submit").click();
      cy.wait("@delete-vehicle").then(({ response }) => {
        expect(response?.statusCode).to.eq(200);

        cy.getByDataCy(`vehicle-${id}`).should("not.exist");
      });
    });
  });

  it("Should log the user out", () => {
    cy.getByDataCy("logout").click();
    cy.getCookie("token").should("not.exist");
    cy.url().should("eq", "http://localhost:3000/login");
  });
});
