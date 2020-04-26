import { Router, Request, Response } from 'express';
import fs from 'fs';
import { getContent } from '../core/readdir.core';

const fsp = fs.promises;

// create router
const router = Router();

// add next and previous ids
function getNextAndPrevious(content = []) {
    return content.reduce((a, b) => {
        if (a.length > 0) {
            a[a.length - 1].next = b.upath;
            b.prev = a[a.length - 1].upath;
        }
        return [...a, b];
    }, []);
}

// define routes
router.get('/content', async (req: Request, res: Response) => {
    // get content of dir
    const data = (await getContent())[0].data;
    data.content = data.content.map(content => {
        content.content = getNextAndPrevious(content.content);
        return content;
    })
    return res.json(data);
});

router.get("/resource/:resource", async (req: Request, res: Response) => {
    const { resource: resourceId } = req.params;
    const { resources } = (await getContent())[0];
    if (req.params.resource && resources[resourceId]) {
        // serving the video
        const resource = resources[resourceId];
        const stream = fs.createReadStream(resource.path);
        res.setHeader('Content-Type', 'video/mpeg');
        res.setHeader('Content-Lendth', resource.size);
        return stream.pipe(res);
    } else {
        return res.status(404);
    }
});

// export the router
export const ApiRoute = router;
