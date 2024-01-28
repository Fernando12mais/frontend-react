declare namespace Cypress {
  interface Chainable {
    getByDataCy: (
      id: string,
      nestedSelector?: string,
    ) => Chainable<JQuery<HTMLElement>>;
  }
}
