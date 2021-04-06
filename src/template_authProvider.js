"use strict";

// This is a Template
// Add authority, clientId, redirectUri,
// scopes for autenticationParameters & authenticationparametersGraph
// Then change the name of the file to authprovider.js

// authProvider.js
import { MsalAuthProvider, LoginType } from 'react-aad-msal';

// Msal Configurations
const config = {
    auth: {
        authority: '',
        clientId: '',
        postLogoutRedirectUri: window.location.origin,
        redirectUri: "",
        validateAuthority: true,
        navigateToLoginRequestUrl: true
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
};

// Authentication Parameters
export const authenticationParameters = {
    scopes: [
        `api://`
    ]
};

export const authenticationParametersGraph = {
    scopes: [
        'openid',
        `api://`
    ]
};

// Options
const options = {
    loginType: LoginType.Redirect,
    tokenRefreshUri: window.location.origin
};

export const authProvider = new MsalAuthProvider(config, authenticationParameters, options);
