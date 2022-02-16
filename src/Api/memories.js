import { httpService } from "./httpService";

import axios from "axios";

const middelPoint = "api/memories/";
const USERID = localStorage.getItem("memories-userID") || '';

const getAllMemories = async() => {
    return httpService.get(`${middelPoint}`);
}

const getAllMemoryForUser = async() => {
    return httpService.get(`${middelPoint}user/${USERID}`);
}

const getAllMemoryForApprove = async() => {
    return httpService.get(`${middelPoint}manager/`);
}

const getMemoryForApprove = async(_id) => {
    return httpService.get(`${middelPoint}manager/${_id}`);
}

const changeStatus = (_id,_newStatus) => {
    return httpService.put(`${middelPoint}status/${_id}`,{status:_newStatus});
}
const chatSendMsg = (_id,_from,_newMessage) => {
    return httpService.put(`${middelPoint}chat/${_id}`,{from: _from, message: _newMessage});
}

const getBadWords = async() => {
    return httpService.get(`${middelPoint}badwords/`)
}

export {
    getAllMemories,
    getAllMemoryForUser,
    getAllMemoryForApprove,
    getMemoryForApprove,
    changeStatus,
    getBadWords,
    chatSendMsg
}