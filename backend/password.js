const bcrypt = require('bcrypt')

async function hashPassword(plaintextPassword) {
    const salt = 5
    return await bcrypt.hash(plaintextPassword, salt)
}

// compare password
async function comparePassword(plaintextPassword, hash) {
    return await bcrypt.compare(plaintextPassword, hash);
}


(async ()=>{
    const pass = '12345'
    const hash = '$2b$05$0W4AZqy70cJU5bih1gaiGOHkdtBqQZTRDvIGJUtfiaBeA.IUELmyq'
    //console.log(hash)
    const r = await comparePassword(pass, hash)
    console.log(r)
})()

module.exports = hashPassword
