const map = new Map()

map.set('ORA-00001: unique constraint (MEDICAL.SYS_C007604) violated',
        'PATIENT ALREADY EXISTS !!!')
map.set('ORA-01400: cannot insert NULL into ("MEDICAL"."PATIENT"."EMAIL") violated',
    'All values must be fill up')


function errorMsg(error) {
    return (map.get(error.split('\n')[0]))
}

module.exports = errorMsg