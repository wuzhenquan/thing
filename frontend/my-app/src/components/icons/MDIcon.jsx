import React from 'react'
import Icon from '@mdi/react'
import * as mdIcons from '@mdi/js'
import myStyles from '../../../src/mystyles.scss'

function MDIcon({ name, size = 1, color = 'primary' }) {
    let path = mdIcons.mdiEmoticonHappy
    switch (name) {
        case 'account': path = mdIcons.mdiAccount; break;
        case 'email': path = mdIcons.mdiEmail; break;
        case 'lock': path = mdIcons.mdiLock; break;
        case 'check': path = mdIcons.mdiCheck; break;
        case 'alert': path = mdIcons.mdiAlert; break;
        case 'plus': path = mdIcons.mdiPlus; break;
        default: break;
    }
    return <Icon path={ path } size={ size } color={ myStyles[color] } />
}

export default MDIcon
