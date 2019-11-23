import React from '../../../node_modules/react'
import Icon from '../../../node_modules/@mdi/react/dist/Icon'
import * as mdIcons from '../../../node_modules/@mdi/js/mdi'
import myStyles from '../../mystyles.scss'
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
        case 'delete': path=mdIcons.mdiDeleteOutline;break
        default: break;
    }
    return (
        <span className="icon baseline">
            <Icon path={ path } size={ size } color={ iconColor } />
        </span>
    )
}

export default MDIcon
