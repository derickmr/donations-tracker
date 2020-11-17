import { Request, Response } from "express";

const jwt = require('jsonwebtoken');

export abstract class AbstractController {
    public verifyJWT(request: Request, response: Response, next: any): any {
        const token = request.headers['x-access-token'];
        if (!token) return response.status(401).json({ auth: false, message: 'No token provided.' });

        jwt.verify(token, "AUTH_SECRET_DONATIONS_TRACKER", function (error: any, decoded: any) {
            if (error) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
            request.body.userEmail = decoded.id;
            next();
        });
    }
}