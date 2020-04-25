import { Request, Response } from 'express';

export const MainController = {
    index: (req: Request, res: Response) => {
        return res.json({
            message: "App is live"
        })
    }
}