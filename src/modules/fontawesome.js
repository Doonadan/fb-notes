import Vue from 'vue'
// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHouse, faUserSecret, faClipboard, faNoteSticky, faRightToBracket, faRightFromBracket, faCircleInfo, faBars, faPlus,
  faListCheck, faLocationDot, faFloppyDisk, faClock, faEllipsisVertical, faPen, faTrash, faCircleExclamation, faBan,
  faAngleLeft, faClone, faCartArrowDown, faDeleteLeft, faCircleCheck
} from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

library.add(
  faHouse, faUserSecret, faClipboard, faNoteSticky, faRightToBracket, faRightFromBracket, faCircleInfo,
  faBars, faGoogle, faPlus, faListCheck, faLocationDot, faFloppyDisk, faClock, faEllipsisVertical, faPen, faTrash,
  faCircleExclamation, faBan, faAngleLeft, faClone, faCartArrowDown, faDeleteLeft, faCircleCheck
)
Vue.component('font-awesome-icon', FontAwesomeIcon)
