import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import axiosInstance from '@/api/axios';

const toast = useToast();
const AUTH_URL = '/auth';

const defaultState = () => ({
	_token: localStorage.getItem('token') || null,
	_resaleLayer: null,
	_userInfo: {
		name: null,
		email: null,
		role: null,
		permissions: {},
		original_role: null,
	},
    _modulesPermissions: [],
	_clientId: null,
	_userPicture: null,
	_userEmailRecovery: null,
	_newPasswordToken: null,
	_isLoadingLogin: '',
});

export const useAuthStore = defineStore('authStore', {
	state: () => defaultState(),
	getters: {
		token: (state) => state._token,
		userInfo: (state) => state._userInfo,
		userPicture: (state) => state._userPicture,
		userPermissions: (state) => state._userInfo.permissions,
		userEmailRecovery: (state) => state._userEmailRecovery,
		newPasswordToken: (state) => state._newPasswordToken,
		clientId: (state) => state._clientId,
		modulesPermissions: (state) => state._modulesPermissions,
		isLoadingLogin: (state) => state._isLoadingLogin === 'loading',

		//roles
		isAdmin: (state) => state._userInfo.role === 'admin',
		isResale: (state) => state._userInfo.role === 'resale',
		isClient: (state) => state._userInfo.role === 'client',

		resaleLayer: (state) => state._resaleLayer,
	},
	actions: {
		cleanAuthInfo() {
			localStorage.removeItem('token');
			Object.assign(this.$state, defaultState());
			this._userInfo.permissions = {};
		},
		clearIsLoadingLogin(){
			this._isLoadingLogin = '';
		},
		saveUserEmail(email) {
			this._userEmailRecovery = email;
		},
		saveNewPasswordToken(tokenToStore, isFromUrl) {
			if (!isFromUrl) return (this._newPasswordToken = tokenToStore);

			const decodedToken = this.decodeAcessToken(tokenToStore);
			const { email, token } = decodedToken;

			this.saveUserEmail(email);
			this._newPasswordToken = token;
		},
		loginRequest(body) {
			this.cleanAuthInfo();

			return new Promise(async (resolve, reject) => {
				try {
					this._isLoadingLogin = 'loading';

					const response = await axiosInstance.post(`${AUTH_URL}/login`, body);
					const { data } = response;
					const { access_token, picture_url, client_id } = data;

					this._resaleLayer = data.resale_layer

					this._userInfo = this.decodeAcessToken(access_token);
					this._userPicture = picture_url || null;
					this._clientId = client_id;
					localStorage.setItem('token', access_token);

					resolve(response);
				} catch (error) {
					reject(error);
					throw error;
				} finally {
					this._isLoadingLogin = 'finished';
				}
			});
		},
		sendEmailRecovery(body) {
			this.cleanAuthInfo();

			return new Promise(async (resolve, reject) => {
				try {
					this._isLoadingLogin = 'loading';

					const { email } = body;
					const response = await axiosInstance.post(`${AUTH_URL}/password-recovery`, body);

					this.saveUserEmail(email);

					resolve(response);
				} catch (error) {
					reject(error);
					throw error;
				} finally {
					this._isLoadingLogin = 'finished';
				}
			});
		},
		sendTokenValidation(body) {
			return new Promise(async (resolve, reject) => {
				try {
					this._isLoadingLogin = 'loading';

					const response = await axiosInstance.post(`${AUTH_URL}/recovery-token-validation`, body);

					resolve(response);
				} catch (error) {
					reject(error);
					throw error;
				} finally {
					this._isLoadingLogin = 'finished';
				}
			});
		},
		saveNewPassword(body) {
			return new Promise(async (resolve, reject) => {
				try {
					this._isLoadingLogin = 'loading';

					const response = await axiosInstance.patch(`${AUTH_URL}/password-reset`, body);
					const { data } = response;
					const { access_token } = data;

					this.cleanAuthInfo();

					this._userInfo = this.decodeAcessToken(access_token);
					localStorage.setItem('token', access_token);

					resolve(response);
				} catch (error) {
					reject(error);
					toast.error(error?.response?.data?.message);
					throw error;
				} finally {
					this._isLoadingLogin = 'finished';
				}
			});
		},
		decodeAcessToken(jwt) {
			const base64Url = jwt.split('.')[1];
			const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			const jsonPayload = decodeURIComponent(
				atob(base64)
					.split('')
					.map(function (c) {
						return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
					})
					.join(''),
			);

			return JSON.parse(jsonPayload);
		},
		updateProfilePic(newPic) {
			this._userPicture = newPic;
		},
        updateProfilePicUrl() {
			return new Promise(async (resolve, reject) => {
				try {
					const response = await axiosInstance.post(`${AUTH_URL}/profile-url`);
                    const { data } = response;
					const { picture_url } = data;
                    this.updateProfilePic(picture_url);

					resolve(response);
				} catch (error) {
					reject(error);
					throw error;
				}
			});
		},
        changeUserRole(role) {
            this._userInfo.role = role;
        },
        getModulesPermissions() {
			return new Promise(async (resolve, reject) => {
				try {
					const response = await axiosInstance.get(`${AUTH_URL}/module-permission`);
                    const { data } = response;

                    this._modulesPermissions = data;

					resolve(response);
				} catch (error) {
					reject(error);
					throw error;
				}
			});
		},
	},
	persist: true,
});
