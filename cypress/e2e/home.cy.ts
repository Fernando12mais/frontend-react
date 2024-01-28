import type { VehicleCardProps } from "@/components/molecules/vehicle-card/types";
import {
  filterValues,
  getFilteredVehicles,
} from "@/components/organisms/vehicle-cards/utils";

describe("Should test all features of home page and its components", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept(/search/).as("search");
  });
  it("Should show vehicles if there is one", () => {
    cy.wait("@search").then(({ response }) => {
      expect(response?.statusCode).to.eq(200);
      const data = response?.body as VehicleCardProps[];

      if (!data.length) return;

      data.forEach(({ id }) => {
        cy.getByDataCy(`vehicle-${id}`).should("exist");
      });
    });
  });

  it("Should go to vehicle page when clicked on the photo link", () => {
    cy.wait("@search").then(({ response }) => {
      expect(response?.statusCode).to.eq(200);
      const data = response?.body as VehicleCardProps[];

      if (!data.length) return;

      const { id } = data.at(0) as VehicleCardProps;

      cy.getByDataCy(`vehicle-${id}`).click();
      cy.url().should("eq", `http://localhost:3000/vehicle/${id}`);
    });
  });

  it("Should go to login page", () => {
    cy.getByDataCy("go-to-login").click();
    cy.url().should("eq", "http://localhost:3000/login");
  });

  it("Should search vehicles", () => {
    cy.wait("@search").then(({ response }) => {
      expect(response?.statusCode).to.equal(200);

      const data = response?.body as VehicleCardProps[];

      if (!data.length) {
        cy.getByDataCy("no-results").should("exist");
        return;
      }

      const vehicle = data.at(-1) as VehicleCardProps;

      cy.getByDataCy("search").type(`${vehicle.brand} {enter}`);
      cy.wait("@search").then(({ response }) => {
        expect(response?.statusCode).to.equal(200);

        const data = response?.body as VehicleCardProps[];

        data.forEach(({ id }) => {
          cy.getByDataCy(`vehicle-${id}`).should("exist");
        });
      });
    });
  });

  it("Should filter cars by price", () => {
    cy.wait("@search").then(({ response }) => {
      expect(response?.statusCode).to.equal(200);
      const data = response?.body as VehicleCardProps[];

      const startOption = 7;
      const endOption = 9;

      const maxValues = filterValues.filter(
        (item) => item.value > filterValues[startOption].value,
      );

      cy.getByDataCy("filter-trigger").click();
      cy.getByDataCy("filter-from").click();
      cy.getByDataCy(`filter-from-option-${startOption}`).click();
      cy.getByDataCy("filter-to").click();
      cy.getByDataCy(`filter-to-option-${endOption}`).click();
      cy.getByDataCy("filter-apply").click();

      const min = filterValues.at(startOption)?.value as number;
      const max = maxValues.at(endOption)?.value as number;

      const filteredVehicles = getFilteredVehicles(data, { min, max });

      if (!filteredVehicles.length) {
        cy.getByDataCy("no-results").should("exist");
        return;
      }

      filteredVehicles.forEach(({ id }) => {
        cy.getByDataCy(`vehicle-${id}`).should("exist");
      });
    });
  });
});
