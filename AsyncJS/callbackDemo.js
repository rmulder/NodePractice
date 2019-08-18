const log = require('../utils/consoleLog').log;

log('Before');
getUser(1, function (user) {
    //This function is a anonymous function i.e. function without a name
    log('User: ' + user);    //get the repositories of the user
    getRepositories(user.gitHubUserName, displayRepositories);
});
log('After');
//named function to log repos after callback from getRepositories()
function displayRepositories(repos) {
    log('repos: ' + repos);
}
function getUser(id, callback) {
    setTimeout(() => {
        //Execute after 2 seconds
        log('Executing a DB query');
        //when operation completed sending back fetched result
        callback({ id: id, gitHubUserName: 'therahulmidha' });
    }, 2000);
}
function getRepositories(gitHubUserName, callback) {
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
    setTimeout(() => {
        //fetching repositories
        const user = github.find(c => c.gitHubUserName === gitHubUserName);
        callback(user.repos);
    }, 2000);
}