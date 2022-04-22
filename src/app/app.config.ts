import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';


const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export const msalConfig: Configuration = {
    auth: {
        clientId: 'c008b918-497e-4cf9-b518-790eab23f462', 
        authority: 'https://login.microsoftonline.com/b9806c7d-9280-4e44-afea-6dc0ff495c2f',
        postLogoutRedirectUri: '/', 
        navigateToLoginRequestUrl: true, 
    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: isIE, 
    },
    system: {
        loggerOptions: {
            loggerCallback(logLevel: LogLevel, message: string) {
                console.log(message);
            },
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: false
        }
    }
}