module.exports = {
    name: 'error',
    execute(err) {
        console.log('Database: An Error Occured:\n' + err);
    }
}