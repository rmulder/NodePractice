const log = require('../utils/consoleLog').log;

log('Before');

async function displayRepositories() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUserName);
        log(repos);
    }
    catch(err){
        log(err.message);
    }
}
displayRepositories();

log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            log('Executing a DB query');
            resolve({ id: id, gitHubUserName: 'therahulmidha' });
        }, 2000);
    })
}
function getRepositories(gitHubUserName) {
    const github = [
        {
            gitHubUserName: 'therahulmidha',
            repos: ['repo1', 'repo2', 'repo3']
        },
        {
            gitHubUserName: 'mosh',
            repos: ['mrepo1', 'mrepo2', 'mrepo3']
        }
    ];
    return new Promise((reso, reject) => {
        setTimeout(() => {
            //fetching repositories
            const user = github.find(c => c.gitHubUserName === gitHubUserName);
            reso(user.repos);
        }, 2000);
    })
}
