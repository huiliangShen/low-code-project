export const checkFileType = (file: File) => {
    let type = file.type
    if (!type) {
        const index = file.name.lastIndexOf('.')
        type = file.name.substring(index + 1, file.name.length).toLocaleLowerCase()
    }
    console.log(type)
    let result = 0
    switch (type) {
        case 'image/png':
        case 'image/jpeg':
        case 'image/gif':
        case 'png':
        case 'jpeg':
        case 'gif':
            result = 1
            break
        case 'video/mp4':
        case 'mp4':
        case 'mkv':
        case 'rmvb':
        case 'rm':
        case 'avi':
        case 'video/avi':
        case 'video/x-msvideo':
            result = 2
            break
        case 'audio/mp3':
        case 'mp3':
        case 'audio/mpeg':
        case 'mpeg':
            result = 3
            break
        case 'application/msword':
        case 'application/pdf':
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        case 'application/vnd.ms-powerpoint':
        case 'ppt':
        case 'pptx':
        case 'pdf':
        case 'doc':
        case 'docx':
        case 'application/wps-writer':
            result = 4
            break
        default:
            result = 0
            break
    }
    return result
}
