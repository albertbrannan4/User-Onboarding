describe("User-onboarding Form", () => {

    beforeEach(() => cy.visit("http://localhost:3000"))

    const firstNameInput = () => cy.get("input[name=firstName]");
    const lastNameInput = () => cy.get("input[name=lastName]");
    const emailInput = () => cy.get("input[name=email]");
    const passwordInput = () => cy.get("input[name=password]");
    const submitButton = () => cy.get('button');
    const tos = () => cy.get('input[name=tos]')

    it("sanity check to make sure tests work", () => {
        expect(3 * 3).to.equal(9);
        expect(3 - 1).to.equal(2);
    })

    it("can type value into name inputs", () => {
        firstNameInput().should('have.value', '');
        firstNameInput().type('foo');
        firstNameInput().should('have.value', 'foo');

        lastNameInput().should('have.value', '')
        lastNameInput().type('bar')
        lastNameInput().should('have.value', 'bar')
    })

    it("can type value into email input", () => {
        emailInput().should('have.value', '');
        emailInput().type('gitrdun@aol.com');
        emailInput().should('have.value', 'gitrdun@aol.com')
    })

    it("can type value into password input", () => {
        passwordInput().should('have.value', '');
        passwordInput().type('okkeedokey');
        passwordInput().should('have.value', 'okkeedokey')

    })

    it("should be able to check the terms of service", () => {
        tos().should('have.value', 'false')
        tos().check()
        tos().should('have.value', 'true')
    })

    it('should be able to submit the form', () => {

        firstNameInput().type('foo');
        lastNameInput().type('foo')
        emailInput().type('gitrdun@aol.com');
        passwordInput().type('okkeedokey');
        tos().check()
        submitButton().should('not.be.disabled');
        submitButton().click();
    })

    describe('checking validation', () => {
        
        it('button should be disabled', () => {
            submitButton().should('be.disabled');
        });

        it("should have email validation", () => {
            emailInput().should('have.value', '');
            emailInput().type('abe')
            cy.contains('must be a valid email address');
        })

        it("should have name validation",()=>{
            firstNameInput().type('fo');
            cy.contains('First Name must be a minimum of three characters');
            firstNameInput().clear();
            cy.contains('First Name is required');
            lastNameInput().type('fo');
            cy.contains('Last Name must be a minimum of three characters');
            lastNameInput().clear()
            cy.contains('Last Name is required');
         
        })

        it('Should have password validation',()=>{
            passwordInput().type('a');
            passwordInput().clear();
            cy.contains('Password is required');
        })
    })
})

