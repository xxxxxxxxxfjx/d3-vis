export function notification(message, type = 'success', dangerouslyUseHTMLString = true) {
    return ElNotification({
        message,
        type,
        duration: 3000,
        dangerouslyUseHTMLString,
    });
}
