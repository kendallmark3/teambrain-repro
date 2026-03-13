"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeController = void 0;
const employeeService_1 = require("../services/employeeService");
/** Handles HTTP concerns only — delegates all logic to the service layer. */
exports.employeeController = {
    getAll(req, res, next) {
        try {
            const employees = employeeService_1.employeeService.getAllEmployees();
            res.json(employees);
        }
        catch (err) {
            next(err);
        }
    },
    getById(req, res, next) {
        try {
            const { id } = req.params;
            const employee = employeeService_1.employeeService.getEmployeeById(id);
            if (!employee) {
                res.status(404).json({ error: `Employee with id '${id}' not found` });
                return;
            }
            res.json(employee);
        }
        catch (err) {
            next(err);
        }
    },
};
