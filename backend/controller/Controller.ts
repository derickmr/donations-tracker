import express from 'express';

export interface Controller {
    router: express.Router;
    CONTEXT_PATH: string;
}