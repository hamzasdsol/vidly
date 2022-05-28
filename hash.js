const bcrypt = require('bcrypt');

async function run(value){
    let salt = await bcrypt.genSalt(10);
    console.log(salt);
    const hashedPassword = await bcrypt.hash(value,salt);
    console.log(hashedPassword);
}


run('123456');