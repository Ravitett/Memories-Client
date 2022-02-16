import { httpService } from "./httpService";

const middelPoint = "api/memories/";

const getAllMemories = async() => {
    return httpService.get(`${middelPoint}`);
}

const getMemory = async(_id) => {
    return httpService.get(`${middelPoint}memory/${_id}`);
}

const getChet = async(_id) => {
    return httpService.get(`${middelPoint}chat/${_id}`);
}

const getAllMemoryForUser = async() => {
    return httpService.get(`${middelPoint}user/`);
}

const getMemoryForUser = async(_id) => {
    return httpService.get(`${middelPoint}user/${_id}`);
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

const addMemory = async(_body) => {
    return httpService.post(`${middelPoint}`,_body)
}

const updateMemory = async(_id,_body) => {
    return httpService.put(`${middelPoint}/${_id}`,_body)
}

const deleteMemory = async(_id) => {
    return httpService.delete(`${middelPoint}/${_id}`)
}

export {
    getAllMemories,
    getMemory,
    getChet,
    getAllMemoryForUser,
    getMemoryForUser,
    getAllMemoryForApprove,
    getMemoryForApprove,
    changeStatus,
    getBadWords,
    chatSendMsg,
    addMemory,
    updateMemory,
    deleteMemory
}