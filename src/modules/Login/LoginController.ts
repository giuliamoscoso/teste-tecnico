import { Request, Response } from "express";
import { LoginUseCase } from "./LoginUseCase";

class LoginController {
    async handle(req: Request, res: Response) {
        const { username, password } = req.body;
        const loginUseCase = new LoginUseCase();
        const result = await loginUseCase.execute(username, password);

        return res.status(result.status).json({ message: result.message });
    }
}

export { LoginController };
