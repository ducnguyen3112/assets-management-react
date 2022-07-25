import axios from "axios";
import React from "react";

const BASE_URL_USERS = 'http://localhost:8080/admin/api/users';

class UserService {
    fetchUsers(pageNo) {

        const url = BASE_URL_USERS + '/all';
        const token = window.localStorage.getItem("accessToken")
        const params = {
            params: {
                pageNo: pageNo
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        console.log(params);
        return axios.get(url, params)
    }

    filterUsersByRole(roleName, pageNo) {
        let url = '';
        if (roleName === 'All') {
            url = BASE_URL_USERS + '/all'
        }
        else {
            url = BASE_URL_USERS + '/filter/' + roleName
        }

        const token = window.localStorage.getItem("accessToken")
        const params = {
            params: {
                pageNo: pageNo
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        return axios.get(url, params)

    }

    searchByText(text, pageNo) {
        const token = window.localStorage.getItem("accessToken")
        const params = {
            params: {
                pageNo: pageNo
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const url = BASE_URL_USERS + '/searching?textPattern=' + text

        return axios.get(url, params)
    }
}

export default new UserService();