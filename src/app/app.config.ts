import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';


const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export const msalConfig: Configuration = {
    auth: {
        clientId: 'b53257a5-cd5a-4f2a-92fc-80f9ab75ffb9', 
        authority: 'https://login.microsoftonline.com/b9806c7d-9280-4e44-afea-6dc0ff495c2f', 
        redirectUri: 'http://randomweb001.s3-website.us-east-2.amazonaws.com/#/main/login', 
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