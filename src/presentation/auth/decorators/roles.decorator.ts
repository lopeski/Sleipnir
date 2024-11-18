import { SetMetadata } from '@nestjs/common';

export const ADMIN_ROLE_INSTANCE = 'Admin';
export const EDITOR_ROLE_INSTANCE = 'Editor';
export const READER_ROLE_INSTANCE = 'Reader';
export const Admin = () => SetMetadata(ADMIN_ROLE_INSTANCE, true);
export const Editor = () => SetMetadata(EDITOR_ROLE_INSTANCE, true);
export const Reader = () => SetMetadata(READER_ROLE_INSTANCE, true);
