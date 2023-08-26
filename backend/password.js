const bcrypt = require('bcrypt')
async function hashPassword(plaintextPassword) {
    const salt = 5
    const hash = await bcrypt.hash(plaintextPassword, salt)

    return hash
    // Store hash in the database
}

// compare password
async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}

(async ()=>{
    const pass = '12345'
    const hash = '$2b$05$0W4AZqy70cJU5bih1gaiGOHkdtBqQZTRDvIGJUtfiaBeA.IUELmyq'
    //console.log(hash)
    const r = await comparePassword(pass, hash)
    console.log(r)
})()
