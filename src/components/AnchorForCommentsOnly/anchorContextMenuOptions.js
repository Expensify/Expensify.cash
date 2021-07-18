import Clipboard from '../../libs/Clipboard';
import {Clipboard as ClipboardIcon, Checkmark} from '../Icon/Expensicons';


export default function anchorContextMenuOptions(href, translate) {
    return [{
        text: translate('htmlContextMenu.copyURLToClipboard'),
        icon: ClipboardIcon,
        successText: translate('reportActionContextMenu.copied'),
        successIcon: Checkmark,
        callback: () => Clipboard.setString(href),
    }];
}
