import {Store} from "react-notifications-component";

export const createLinkNotification = (link) => {
    Store.addNotification({
        title: 'Link was squeezed!',
        message: link,
        type: 'success',
        container: 'top-right',
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 3000
        }
    })
}

export const createLinkFaultNotification = (link) => {
    Store.addNotification({
        title: 'Link is incorrect!',
        message: link,
        type: 'danger',
        container: 'top-right',
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 3000
        }
    })
}

export const copyLinkNotification = (link) => {
    Store.addNotification({
        title: 'Your link was copied!',
        message: link,
        type: 'success',
        container: 'top-right',
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 3000
        }
    })
}