/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
import Axios from './index';
import axios from 'axios';
import store from '@/store';


function addCoupon(params) {
    console.log(params);
    let fd = new FormData();
    if (params.stoneId === '') {
        fd.append('bossId ', params.bossId);
    }
    if (params.stoneId !== '') {
        fd.append('stoneId ', params.stoneId);
    }

    fd.append('discountCouponDesc', params.discountCouponDesc);
    fd.append('discountCouponName ', params.discountCouponName);
    fd.append('discountCouponType', params.discountCouponType);
    fd.append('scope', params.scope);
    fd.append('startTime', params.startTime);
    fd.append('stopTime', params.stopTime);
    fd.append('superposition', params.superposition);
    fd.append('useLimit', params.useLimit);
    fd.append('useState', -1);
    return Axios.post('/api/api/product/discountCoupon/addDiscountCoupon', fd);
}

function bianCoupon(params) {
    console.log(params);
    let fd = new FormData();
    fd.append('bossId ', params.bossId);
    fd.append('discountCouponDesc', params.discountCouponDesc);
    fd.append('discountCouponName ', params.discountCouponName);
    fd.append('discountCouponType', params.discountCouponType);
    fd.append('scope', params.scope);
    fd.append('startTime', params.startTime);
    fd.append('stopTime', params.stopTime);
    fd.append('superposition', params.superposition);
    fd.append('useLimit', params.useLimit);
    fd.append('id', params.id);

    return Axios.post('/api/api/product/discountCoupon/updateDiscountCoupon', fd);
}

function getScope() {
    return Axios.get('/api/api/product/discountCoupon/selectScope');
}

function getlist() {
    let bossId = store.getUser().BSid;
    return Axios.get('/api/api/product/discountCoupon/selectDiscountCoupon?bossId=' + bossId);
}

function getliststoneId(stoneId) {
    return axios.get('/api/api/product/discountCoupon/selectDiscountCoupon?stoneId=' + stoneId);
}
export default {
    addCoupon: addCoupon,
    getScope: getScope,
    getlist: getlist,
    bianCoupon: bianCoupon,
    getliststoneId: getliststoneId,
};