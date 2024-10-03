/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

interface DomPayloadInfo {
	dataName: string;
	className: string;
	force: boolean;
}

function getDom({ dataName, className, force }: DomPayloadInfo) {
	const elName = dataName ? `[data-name='${dataName}']` : className;
	!force && cy.get(elName).should('be.visible');
	return cy.get(elName);
}

// -- This is a parent command --
Cypress.Commands.addAll({ getDom });
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
