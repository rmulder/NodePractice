const log = require('../utils/consoleLog').log;

log('Before');

getUser(1)
    .then(user => getRepositories(user.gitHubUserName))
    .then(repos => log('Repositories: ' + repos))
    .catch(err => log(err.message));//single error handler for all async operations

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

//Settled Promises... already resolve/reject
const sp = Promise.resolve({ id: 1 });
sp.then(result=> log(result));

const sp2 = Promise.reject(new Error('error reason'));
sp2.catch(err => log(err.message));

//Parallel Promises
const p1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        log('Async operation1')
        resolve(1);
    },200);
});


const p2 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        log('Async operation2')
        resolve(2);
    },200);
});

/* .all() returns new promise that will be 
resolved when all the promises in this array are resolved*/
Promise.all([p1, p2])
    .then(result=> log(result))//result obtained as an array
    .catch(err=>log(err.message));/*If any of the promises cause error,
    final promise returned is considered rejected */

//Note: Both these async operations occur almost at the same time
//Earlier .then was used and caused a sequence to be followed

/*If we don't want to wait for one promise to complete
 and return something as soon as any promise completes*/
 Promise.race([p1, p2])
    .then(result=> log(result))//result of first promise returned
    .catch(err=>log(err.message))
