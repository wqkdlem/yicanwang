import "@/api";
const qs = require("qs");
import axios from "axios";
import { localSave, localRead } from "@/lib/local.js";
import md5 from "js-md5";
var refreshConst = 1;
export const fakeGet = (data, time = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data, time);
        });
    });
};

export const get = ({ url = "", baseUrl = "", params = {} }) => {
    return new Promise((resolve, reject) => {
        const requstUrl = `${baseUrl}${url}?${qs.stringify(params)}`;
        let clienttType = "pc";
        let auth = "Basic_Ivj6eZRxMTx2yiyunZvnG8R65";
        let token = localRead("token");
        let time = new Date().getTime();
        let ip = localRead("ip");
        let signA =
            "auth=" +
            auth +
            "&client-type=" +
            clienttType +
            "&ip=" +
            ip +
            "&time=" +
            time +
            "&token=" +
            token;
        let sign = md5(signA);
        return axios
            .get(requstUrl, {
                headers: { "client-type": clienttType, auth, token, time, ip, sign }
            })
            .then(rs => {
                const response = rs.data;
                // if (response.code === 400001) return (window.location = "/");
                if (!response.code || response.code !== 200) return;
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const post = ({
    url,
    data = {},
    baseUrl = "",
    params = {},
    headers = {},
    special = "json",
    Bearer = true
}) => {
    return new Promise((resolve, reject) => {
        const requstUrl = `${baseUrl}${url}?${qs.stringify(params)}`;
        const xtoken = localRead("access_token");
        let requireData = data;
        if (special == "json") requireData = JSON.stringify(data);
        if (special == "qs") requireData = qs.stringify(data);
        let head = {
            Authorization: `Bearer  ${xtoken}`
        };
        if (!Bearer) head = {};
        let clienttType = "pc";
        let auth = "Basic_Ivj6eZRxMTx2yiyunZvnG8R65";
        let token = localRead("token");
        let time = new Date().getTime();
        let ip = localRead("ip");
        let signA =
            "auth=" +
            auth +
            "&client-type=" +
            clienttType +
            "&ip=" +
            ip +
            "&time=" +
            time +
            "&token=" +
            token;
        let sign = md5(signA);
        return axios({
                url: requstUrl,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    "client-type": clienttType,
                    auth,
                    token,
                    time,
                    ip,
                    sign
                },
                data: requireData
            })
            .then(rs => {
                const response = rs.data;
                console.log(response);
                if (response.code === 400001) return (window.location = "#/login");
                if (!response.code || response.code !== 200) return;
                resolve(response.data);
            })
            .catch(error => {
                refreshConst = 1;
                reject(error);
            });
    });
};
// export const get = ({
//     url,
//     data = {},
//     baseUrl = "",
//     params = {},
//     headers = {},
//     special = "json",
//     Bearer = true
// }) => {
//     return new Promise((resolve, reject) => {
//         const requstUrl = `${baseUrl}${url}?${qs.stringify(params)}`;
//         const xtoken = localRead("access_token");
//         let requireData = data;
//         if (special == "json") requireData = JSON.stringify(data);
//         if (special == "qs") requireData = qs.stringify(data);
//         let head = {
//             Authorization: `Bearer  ${xtoken}`
//         };
//         if (!Bearer) head = {};
//         let clienttType = "pc";
//         let auth = "Basic_Ivj6eZRxMTx2yiyunZvnG8R65";
//         let token = localRead("token");
//         let time = new Date().getTime();
//         let ip = localRead("ip");
//         let signA =
//             "auth=" +
//             auth +
//             "&client-type=" +
//             clienttType +
//             "&ip=" +
//             ip +
//             "&time=" +
//             time +
//             "&token=" +
//             token;
//         let sign = md5(signA);
//         return axios({
//                 url: requstUrl,
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     // 'Content-Type': 'application/x-www-form-urlencoded',
//                     "client-type": clienttType,
//                     auth,
//                     token,
//                     time,
//                     ip,
//                     sign
//                 },
//                 data: requireData
//             })
//             .then(rs => {
//                 const res = rs.data;
//                 console.log(res);
//                 if (res.code === 400001) return (window.location = "#/login");
//                 if (res.code && res.code !== 200) return this.$message(response.msg);
//                 resolve(res.data);
//             })
//             .catch(error => {
//                 refreshConst = 1;
//                 reject(error);
//             });
//     });
// };
export const del = ({
    url,
    data = {},
    baseUrl = "",
    params = {},
    headers = {},
    special = "json",
    Bearer = true
}) => {
    return new Promise((resolve, reject) => {
        const requstUrl = `${baseUrl}${url}?${qs.stringify(params)}`;
        const xtoken = localRead("access_token");
        let requireData = data;
        if (special == "json") requireData = JSON.stringify(data);
        if (special == "qs") requireData = qs.stringify(data);
        let head = {
            Authorization: `Bearer  ${xtoken}`
        };
        if (!Bearer) head = {};
        let clienttType = "pc";
        let auth = "Basic_Ivj6eZRxMTx2yiyunZvnG8R65";
        let token = localRead("token");
        let time = new Date().getTime();
        let ip = localRead("ip");
        let signA =
            "auth=" +
            auth +
            "&client-type=" +
            clienttType +
            "&ip=" +
            ip +
            "&time=" +
            time +
            "&token=" +
            token;
        let sign = md5(signA);
        return axios({
                url: requstUrl,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    "client-type": clienttType,
                    auth,
                    token,
                    time,
                    ip,
                    sign
                },
                data: requireData
            })
            .then(rs => {
                const response = rs.data;
                console.log(response);
                if (response.code === 400001) return (window.location = "#/login");
                if (!response.code || response.code !== 200) return resolve(response);
                resolve(response.data);
            })
            .catch(error => {
                refreshConst = 1;
                reject(error);
            });
    });
};
export const put = ({
    url,
    data = {},
    baseUrl = "",
    params = {},
    headers = {},
    special = "json",
    Bearer = true
}) => {
    return new Promise((resolve, reject) => {
        const requstUrl = `${baseUrl}${url}?${qs.stringify(params)}`;
        const xtoken = localRead("access_token");
        let requireData = data;
        if (special == "json") requireData = JSON.stringify(data);
        if (special == "qs") requireData = qs.stringify(data);
        let head = {
            Authorization: `Bearer  ${xtoken}`
        };
        if (!Bearer) head = {};
        let clienttType = "pc";
        let auth = "Basic_Ivj6eZRxMTx2yiyunZvnG8R65";
        let token = localRead("token");
        let time = new Date().getTime();
        let ip = localRead("ip");
        let signA =
            "auth=" +
            auth +
            "&client-type=" +
            clienttType +
            "&ip=" +
            ip +
            "&time=" +
            time +
            "&token=" +
            token;
        let sign = md5(signA);
        return axios({
                url: requstUrl,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    "client-type": clienttType,
                    auth,
                    token,
                    time,
                    ip,
                    sign
                },
                data: requireData
            })
            .then(rs => {
                const response = rs.data;
                console.log(response);
                if (response.code === 400001) return (window.location = "#/login");
                if (!response.code || response.code !== 200) return;
                resolve(response.data);
            })
            .catch(error => {
                refreshConst = 1;
                reject(error);
            });
    });
};
// //刷新令牌
// const refreshToken = async () => {
//   if (refreshConst != 1) return;
//   refreshConst = 2;
//   const xtoken = localRead("refreshToken");
//   if (xtoken) {
//     let url = "/auth/refreshToken";
//     let data = xtoken
//     let res = await post({ url, data, Bearer: false, special: 'qa' });
//     if (res.status) return window.location = "#/login";
//     let { token = '', refreshToken = '' } = res;
//     localSave("access_token", token);
//     localSave("refreshToken", refreshToken);
//     window.location.Reload()
//   }
// };