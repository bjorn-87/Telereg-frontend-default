import {authProvider} from '../../authProvider';

"use strict";

var Auth = {
    GetToken: async function() {
        const token = await authProvider.getAccessToken();

        return token;
    },
    GetUser: function() {
        const userInfo = authProvider.getAccountInfo();

        let name = userInfo.account.name,
            userName = userInfo.account.userName;

        return {
            "name": name,
            "userName": userName
        };
    }
};

export default Auth;
