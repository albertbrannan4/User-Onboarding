describe("User-onboarding Form",()=>{

    beforeEach(() => cy.visit("http://localhost:3000"))

    it("sanity check to make sure tests work", () => {
        expect(3*3).to.equal(9);
        expect(3-1).to.equal(2);

    })
})