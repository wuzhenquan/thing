import React from 'react'
import Icon from '@mdi/react'

import { mdiEmoticonHappy, mdiAccount, mdiEmail, mdiLock, mdiCheck, mdiAlert } from '@mdi/js'

function MDIcon({ name, size = 1 }) {
    let path = mdiEmoticonHappy
    switch (name) {
        case 'account': path = mdiAccount; break;
        case 'email': path = mdiEmail; break;
        case 'lock': path = mdiLock; break;
        case 'check': path = mdiCheck; break;
        case 'alert': path = mdiAlert; break;
        default: break;
    }
    return <Icon path={ path } size={ size } />
}

export default MDIcon
