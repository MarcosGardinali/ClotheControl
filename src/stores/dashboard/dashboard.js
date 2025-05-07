import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';

import { globali18nGlobal } from '@/config/i18n';
import axiosInstance from '@/api/axios';
import { resolve } from 'mathjs';
import { reject } from 'lodash';

const toast = useToast();
const CLIENTS_URL = '/client';
const INSTALL_LOCATION_URL = '/location';
const DASHBOARD_URL = '/dashboard';

const defaultState = () => ({
	_resaleList: [],
	_clientsList: [],
	_installLocationList: [],
	_equipmentTypes: [],
	_dashboardData: null,

	// loaders
	_isLoadingResaleList: '',
	_isLoadingClientsList: '',
	_isLoadingInstallLocationList: '',
	_isLoadingDashboardData: '',
	_isLoadingEquipmentTypes: '',
});

export const useDashboardStore = defineStore('dashboard', {
	state: () => defaultState(),
	getters: {
		resaleList: (state) => state._resaleList,
		clientsList: (state) => state._clientsList,
		installLocationList: (state) => state._installLocationList,
		dashboardData: (state) => state._dashboardData,
		equipmentTypes: (state) => state._equipmentTypes,

		isLoadingResaleList: (state) => state._isLoadingResaleList === 'loading',
		isLoadingClientsList: (state) => state._isLoadingClientsList === 'loading',
		isLoadingInstallLocationList: (state) => state._isLoadingInstallLocationList === 'loading',
		isLoadingDashboardData: (state) => state._isLoadingDashboardData === 'loading',
		isLoadingEquipmentTypes: (state) => state._isLoadingEquipmentTypes === 'loading',
	},
	actions: {
		getClientsList(resaleId) {
			return new Promise(async (resolve, reject) => {
				try {
					this._isLoadingClientsList = 'loading';

					const response = await axiosInstance.get(
						`${CLIENTS_URL}/basic-info?resale_id=${resaleId}`,
					);
					const { data } = response;

					this._clientsList = data;

					if (!data.length) {
						toast.error(globali18nGlobal.t('errors.no_clients_registered'));
					}

					resolve(response);
				} catch (error) {
					toast.error(error?.response?.data?.message || 'Erro ao obter lista de clientes.');
					reject(error);
					throw error;
				} finally {
					this._isLoadingClientsList = 'finished';
				}
			});
		},
		getInstallLocationList(clientId) {
			return new Promise(async (resolve, reject) => {
				try {
					this._isLoadingInstallLocationList = 'loading';

					const response = await axiosInstance.get(`${INSTALL_LOCATION_URL}/${clientId}/list`);
					const { data } = response;

					this._installLocationList = data;

					if (!data.length) {
						toast.error(globali18nGlobal.t('errors.no_install_locations_registered'));
					}

					resolve(response);
				} catch (error) {
					toast.error(
						error?.response?.data?.message || 'Erro ao obter lista de locais de instalação.',
					);
					reject(error);
					throw error;
				} finally {
					this._isLoadingInstallLocationList = 'finished';
				}
			});
		},
		getDashboardData(
			rangePeriod,
			locationIds,
			resaleId,
			clientId,
			showMap,
			showConsumption,
			showconsumptionTotal,
			showValue,
			showValueTotal
		) {
			return new Promise(async (resolve, reject) => {
				try {
					this._isLoadingDashboardData = 'loading';
					const requestBody = {
						period: rangePeriod,
						location_ids: locationIds,
						resale_id: resaleId,
						client_id: clientId,
						show_consumption: showConsumption,
						show_total_consumption: showconsumptionTotal,
						show_value: showValue,
						show_total_value: showValueTotal,
						show_map: showMap
					};
					const response = await axiosInstance.post(`${DASHBOARD_URL}/dashboard`, requestBody);
					const { data } = response;
					this._dashboardData = data;
					resolve(response);
				} catch (error) {
					toast.error(error?.response?.data?.message || 'Erro ao obter dados da dashboard.');
					reject(error);
					throw error;
				} finally {
					this._isLoadingDashboardData = 'finished';
				}
			});
		},
		getDashboardConfig() {
			return new Promise(async (resolve, reject) => {
				try {
					const response = await axiosInstance.get(`${DASHBOARD_URL}/config`)
					resolve(response)
				} catch (error) {
					reject(error)
				}
			})
		},
		getEquipmentTypes(locationIds) {
			return new Promise(async (resolve, reject) => {
				try {
					this._isLoadingEquipmentTypes = 'loading';

					const query = new URLSearchParams();
					locationIds.forEach((locationId) => query.append('location_ids', locationId));

					const response = await axiosInstance.get(
						`${INSTALL_LOCATION_URL}/equipment-types?${query.toString()}`,
					);
					const { data } = response;

					this._equipmentTypes = data;

					resolve(response);
				} catch (error) {
					toast.error(
						error?.response?.data?.message || 'Erro ao obter dados dos tipos de equipamento.',
					);
					reject(error);
					throw error;
				} finally {
					this._isLoadingEquipmentTypes = 'finished';
				}
			});
		},
		resetState() {
			Object.assign(this.$state, defaultState());
		},
		clearDashboardData(){
			this._dashboardData = null
		}
	},
	persist: false,
});
