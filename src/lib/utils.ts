import {IMAGE_MAX_SIZE} from "$lib/constants";

export function handleLoginRedirect(originUrl: URL) {
    return "/auth/login?" + new URLSearchParams({redirectTo: originUrl.pathname + originUrl.search}).toString();
}

export function validateFile(file: FormDataEntryValue | null, maxFileSize = IMAGE_MAX_SIZE): Error | null {
    if (!(file instanceof File)) {
        return new Error('Not a file');
    }

    if (file.size <= 0) {
        return new Error('File is required');
    }

    if (file.size > maxFileSize) {
        return new Error(
            `Maximum file size is ${maxFileSize}, got ${file.size} [${file.size / 1024} - ${maxFileSize / 1024}]`
        );
    }

    return null;
}
