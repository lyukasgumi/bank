import { Router } from "express";
import { AccountController } from "./src/controller/account.controller";
import { ClientController } from "./src/controller/client.controller";
import { TransactionController } from "./src/controller/transaction.controller";

export function getRouter() {
	const router = Router();

	const transactionController = new TransactionController();
	const accountController = new AccountController();
	const clientController = new ClientController();

	router.get("/getallT", transactionController.getAll);
	router.get("/getT/:id", transactionController.getOne);
	router.post("/addT", transactionController.create);
	router.put("/updateT", transactionController.update);
	router.delete("/deleteT/:id", transactionController.delete);

	router.get("/getallA", accountController.getAll);
	router.get("/getA/:id", accountController.getOne);
	router.post("/addA", accountController.create);
	router.put("/updateA", accountController.update);
	router.delete("/deleteA/:id", accountController.delete);

	router.get("/getallC", clientController.getAll);
	router.get("/getC/:id", clientController.getOne);
	router.post("/addC", clientController.create);
	router.put("/updateC", clientController.update);
	router.delete("/deleteC/:id", clientController.delete);

	return router;
}
