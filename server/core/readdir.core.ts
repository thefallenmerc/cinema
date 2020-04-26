
import path from 'path';
import { v4 as uuid } from 'uuid';
import fs from 'fs';

const fsp = fs.promises;



// read content
const dirList = [
    "D:\\PluralSight Courses\\Advanced JavaScript"
];

async function init() {

    // read dir
    async function readdir(dir = "", parentupath = "", resources = {}) {
        let dircontent = await fsp.readdir(dir);
        // get name of file
        const name = path.basename(dir);
        const contentuid = uuid();
        const upath = parentupath ? parentupath + ':' + contentuid : contentuid;
        const jsondir = {
            name,
            type: 'dir',
            uid: contentuid,
            upath,
            content: (await Promise.all(dircontent.map(async name => { // get content of the dir
                const filepath = path.join(dir, name);
                const stat = await fsp.stat(filepath);
                if (stat.isDirectory()) {
                    return readdir(filepath, upath, resources); // get content of the subdir
                } else {
                    const uid = uuid();
                    const cupath = upath + ':' + uid;
                    const fileData = {
                        name: path.basename(filepath),
                        type: 'file',
                        upath: cupath,
                        ext: path.extname(filepath),
                        path: filepath,
                        size: stat.size,
                        url: '/api/resource/' + uid,
                        uid
                    };
                    if(fileData.ext === '.mp4') {
                        resources[uid] = fileData; // add resource to resources for easy access
                    }
                    return fileData;
                }
            }))).filter(file => {
                return file.type === 'dir' ? true :
                    file.ext === '.mp4' ? true : false
            })
        };

        return parentupath ? jsondir : {
            data: jsondir,
            resources
        }
    }

    Promise.all(dirList.map(async dir => await readdir(dir))).then(data => {
        console.log('------> Writing content to disk!')
        fs.writeFile('./server/data/content.data.json', JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.error(err);
                console.error('could not write data');
            } else
                console.log('------> Content written to disk!')
        });
    });
}


// read the file
async function getContent(): Promise<Array<{ data, resources }>> {
    return JSON.parse(await fsp.readFile('./server/data/content.data.json', { encoding: 'utf8' }));
}

export { init, getContent }
