"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRepository = void 0;
const mockEmployees_1 = require("../data/mockEmployees");
/** Abstracts data access — swap mock data for a real DB here without touching service or controller layers. */
exports.employeeRepository = {
    findAll() {
        return mockEmployees_1.mockEmployees;
    },
    findById(id) {
        return mockEmployees_1.mockEmployees.find((e) => e.id === id);
    },
};
