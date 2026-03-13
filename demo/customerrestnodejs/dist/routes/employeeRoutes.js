"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeeController_1 = require("../controllers/employeeController");
/** Routes file is HTTP-only — no business logic, just wiring paths to controllers. */
const router = (0, express_1.Router)();
router.get('/', employeeController_1.employeeController.getAll);
router.get('/:id', employeeController_1.employeeController.getById);
exports.default = router;
