describe('Kitchen Sink', function () {
  it('.should() - assert that <title> is correct', function () {
		cy.visit('http://localhost:3000');
		cy.contains("Log in").click();
	});
});

