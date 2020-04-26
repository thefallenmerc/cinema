import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import uuid from 'uuid/v4';

const fsp = fs.promises;

// create router
const router = Router();

const resources = {};

// read dir
async function readdir(dir = "") {
    let dircontent = await fsp.readdir(dir);
    // get name of file
    const name = path.basename(dir);
    return {
        name,
        type: 'dir',
        content: await Promise.all(dircontent.map(async name => { // get content of the dir
            const filepath = path.join(dir, name);
            const stat = await fsp.stat(filepath);
            if (stat.isDirectory()) {
                return readdir(filepath); // get content of the subdir
            } else {
                const uid = uuid();
                const fileData = {
                    name: path.basename(filepath),
                    type: 'file',
                    ext: path.extname(filepath),
                    path: filepath,
                    size: stat.size,
                    url: '/api/resource/' + uid,
                    uid
                };
                resources[uid] = fileData; // add resource to resources for easy access
                return fileData;
            }
        }))
    };
}

// define routes
router.get('/content', async (req: Request, res: Response) => {
    const dir = "D:\\PluralSight Courses\\Advanced JavaScript";
    // get content of dir
    const content = await readdir(dir);
    return res.json(content);
});

router.get("/resource/:resource", (req: Request, res: Response) => {
    const { resource: resourceId } = req.params;
    if (req.params.resource && resources[resourceId]) {
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
