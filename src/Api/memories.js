import { httpService } from "./httpService";

import axios from "axios";

const middelPoint = "api/memories/";

const changeStatus = (_id,_newStatus) => {
    return httpService.put(`${middelPoint}status/${_id}`,{status:_newStatus});
}
const chatSendMsg = (_id,_from,_newMessage) => {
    return httpService.put(`${middelPoint}chat/${_id}`,{from: _from, message: _newMessage});
}

const getAllMemoryForApprove = async() => {
    return httpService.get(`${middelPoint}manager/`);
}

const getAllMemories = async() => {
    return httpService.get(`${middelPoint}`);
}


const getBadWords = async() => {
    return httpService.get(`${middelPoint}badwords/`)
}

export {
    getAllMemories,
    getAllMemoryForApprove,
    changeStatus,
    getBadWords,
    chatSendMsg
}