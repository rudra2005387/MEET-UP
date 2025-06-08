import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createMeeting = async (meetingData) => {
    try {
        const response = await axios.post(`${API_URL}/meetings`, meetingData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const joinMeeting = async (meetingId) => {
    try {
        const response = await axios.get(`${API_URL}/meetings/${meetingId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};