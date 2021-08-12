/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
namespace NodeJS {
    interface ProcessEnv {
        GOOGLE_AUTH_CLIENT_ID: string;
        APP_API_URL: string;
    }
}