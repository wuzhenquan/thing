import React from 'react'
import Icon from '@mdi/react'
import * as mdIcons from '@mdi/js'
import myStyles from '../../../src/mystyles.scss'
import './MDIcon.scss'

function MDIcon({ name, size = '1em', color = 'primary' }) {
    let path = mdIcons.mdiEmoticonHappy
    let iconColor = myStyles[color] || color
    switch (name) {
        case 'account': path = mdIcons.mdiAccount; break;
        case 'email': path = mdIcons.mdiEmail; break;
        case 'lock': path = mdIcons.mdiLock; break;
        case 'check': path = mdIcons.mdiCheck; break;
        case 'alert': path = mdIcons.mdiAlert; break;
        case 'plus': path = mdIcons.mdiPlus; break;
        case 'radioBoxBlank': path = mdIcons.mdiRadioboxBlank; break;
        default: break;
    }
    return (
        <div className="icon baseline">
            <Icon path={ path } size={ size } color={ iconColor } />
        </div>
    )
}

export default MDIcon
