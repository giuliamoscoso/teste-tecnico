import fs from "fs";
import { parse } from "csv-parse";

class LoginUseCase {
    async execute(username: string, password: string): Promise<{ status: number; message: string }> {
        let status: number = 400;
        let message: string = "wrong username";
        try {
            await new Promise((resolve, reject) =>
                fs.readFile("./src/modules/database/users.csv", "utf8", async (err, data) => {
                    data.split("\n").forEach(async (row) => {
                        let usuario = row.replace("\r", "").split(",");

                        if (username === usuario[0]) {
                            if (password === usuario[1]) {
                                status = 200;
                                message = "logged in";
                                if (fs.existsSync("./src/modules/database/log.csv")) {
                                    fs.appendFileSync("./src/modules/database/log.csv", `${new Date()},${username},${password},${message}\n`);
                                }
                                return resolve({ status: status, message });
                            } else {
                                status = 400;
                                message = "wrong password";
                                if (fs.existsSync("./src/modules/database/log.csv")) {
                                    fs.appendFileSync("./src/modules/database/log.csv", `${new Date()},${username},${password},${message}\n`);
                                }
                                return resolve({ status: status, message });
                            }
                        }
                    });
                })
            );
            if (fs.existsSync("./src/modules/database/log.csv") && message === "wrong username") {
                fs.appendFileSync("./src/modules/database/log.csv", `${new Date()},${username},${password},${message}\n`);
            }
            return { status: status, message };
        } catch (error: any) {
            console.log(error);
            return { status: 500, message: "internal server error" };
        }
    }
}

export { LoginUseCase };
