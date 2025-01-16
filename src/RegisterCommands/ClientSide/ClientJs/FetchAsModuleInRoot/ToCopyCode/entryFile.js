import { StartFunc as GetFetch } from './GetFetch.js';
import { StartFunc as afterFetch } from './afterFetch/EntryFile.js';

const startFunc = async () => {
    let localResponse = await GetFetch();

    afterFetch(localResponse);
};

export { startFunc };
