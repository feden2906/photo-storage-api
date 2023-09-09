export const SKIP_AUTH = 'skipAuth';

export const MediaConfig = {
  size: 2 * 1024 * 1024, // 2MB
  mimetypes: [
    'image/png',
    'image/jpeg',
    'image/png',
    'video/quicktime',
    'video/mp4',
  ],
} as const;
