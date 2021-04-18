describe('Forms App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/pizza');
  });

  it('sanity checks', () => {
    expect(10).to.equal(10);
    expect(1 + 2).to.equal(5 - 2);
    expect(2 * 10).to.equal(100 / 5);
  });

  const specialInstructionInput = () => cy.get('#special');
  const pepperoniCheckbox = () => cy.get('input[name="pepperoni"]');
  const sausageCheckbox = () => cy.get('input[name="sausage"]');
  const extraCheeseCheckbox = () => cy.get('input[name="extraCheese"]');
  const baconCheckbox = () => cy.get('input[name="bacon"]');
  const mushroomCheckbox = () => cy.get('input[name="mushrooms"]');
  const submitButton = () => cy.get('#submit');
  const sizeInput = () => cy.get('select');
  const firstNameInput = () => cy.get('input[name="first_name"]');
  const lastNameInput = () => cy.get('input[name="last_name"]');
  const emailInput = () => cy.get('input[name="email"]');

  it('Proper elements exist on the page', () => {
    specialInstructionInput().should('exist');
    pepperoniCheckbox().should('exist');
    sausageCheckbox().should('exist');
    extraCheeseCheckbox().should('exist');
    baconCheckbox().should('exist');
    mushroomCheckbox().should('exist');
    submitButton().should('exist');
    sizeInput().should('exist');
    firstNameInput().should('exist');
    lastNameInput().should('exist');
    emailInput().should('exist');
  });

  it('Can select multiple toppings', () => {
    pepperoniCheckbox().check();
    sausageCheckbox().check();
    extraCheeseCheckbox().check();
    mushroomCheckbox().check();
  });

  it('Can submit an order', () => {
    firstNameInput().type('Tristan');
    lastNameInput().type('Miller');
    emailInput().type('tristan@miller.com');
    sizeInput().select('Large');
    pepperoniCheckbox().check();
    sausageCheckbox().check();
    extraCheeseCheckbox().check();
    mushroomCheckbox().check();
    submitButton().click();
  });
});
