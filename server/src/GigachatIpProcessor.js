import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import dotenv from 'dotenv';
import { INSTRUCTION } from './const.js';

dotenv.config();

// Create axios instance that accepts self-signed certificates
import https from 'https';
const agent = new https.Agent({
  rejectUnauthorized: false
});

class GigachatIpProcessor {
  constructor() {
    this.accessToken = null;
    this.tokenExpiresAt = null;
    this.content = INSTRUCTION;
  }

  /**
   * Generate UUID for RqUID
   */
  generateRqUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Get access token from GigaChat API
   */
  async getToken() {
    try {
      // Check if current token is still valid
      if (this.accessToken && this.tokenExpiresAt && Date.now() < this.tokenExpiresAt) {
        return this.accessToken;
      }

      const rqUID = this.generateRqUID();
      const authorization = process.env.GIGA_API_KEY;
      
      if (!authorization) {
        throw new Error('GIGA_API_KEY environment variable is not set');
      }

      const response = await axios.post('https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
        'scope=GIGACHAT_API_PERS',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'RqUID': rqUID,
            'Authorization': `Basic ${authorization}`
          },
          httpsAgent: agent
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiresAt = response.data.expires_at;

      return this.accessToken;
    } catch (error) {
      console.error('Error getting token:', error.response?.data || error.message);
      throw new Error('Failed to get access token');
    }
  }

  /**
   * Upload file to GigaChat
   */
  async uploadFile(file) {
    try {
      const token = await this.getToken();

      const formData = new FormData();
      formData.append('file', file.buffer, file.originalname);
      formData.append('purpose', 'general');

      const response = await axios.post('https://gigachat.devices.sberbank.ru/api/v1/files',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            ...formData.getHeaders()
          },
          httpsAgent: agent
        }
      );

      return response.data.id;
    } catch (error) {
      console.error('Error uploading file:', error.response?.data || error.message);
      throw new Error('Failed to upload file');
    }
  }

  /**
   * Make request to GigaChat AI with file
   */
  async askAI(fileId) {
    try {
      const token = await this.getToken();

      const requestData = {
        model: "GigaChat-2-Max",
        messages: [
          {
            role: "user",
            content: this.content,
            attachments: [fileId]
          }
        ]
      };

      const response = await axios.post('https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          httpsAgent: agent
        }
      );

      const content = response.data.choices[0].message.content;
      try {
        return JSON.parse(content);
      } catch (parseError) {
        console.error('Failed to parse AI response as JSON:', parseError);
        console.error('Raw response:', content);
        throw new Error('AI response is not valid JSON');
      }
    } catch (error) {
      console.error('Error asking AI:', error.response?.data || error.message);
      throw new Error('Failed to get AI response');
    }
  }

  /**
   * Process file: get token, upload file, ask AI
   */
  async processFile(file) {
    try {
      console.log('Starting file processing...');
      
      // Get token
      console.log('Getting access token...');
      await this.getToken();
      
      // Upload file
      console.log('Uploading file...');
      const fileId = await this.uploadFile(file);
      console.log('File uploaded with ID:', fileId);
      
      // Ask AI
      console.log('Getting AI response...');
      const aiResponse = await this.askAI(fileId);
      console.log('AI response received', aiResponse);
      
      return aiResponse;
    } catch (error) {
      console.error('Error in processFile:', error.message);
      throw error;
    }
  }
}

export default GigachatIpProcessor;
