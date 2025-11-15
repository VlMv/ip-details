import dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';

import GigachatIpProcessor from './GigachatIpProcessor.js';

dotenv.config();


const PORT = process.env.PORT || 4000;

const upload = multer();

const gigachatProcessor = new GigachatIpProcessor();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/fetchIPData', upload.single('file'), async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    console.log('Processing file:', file.originalname);
    
    // Process file using GigachatIpProcessor
    const aiResponse = await gigachatProcessor.processFile(file);
    
    
    res.json({ data: aiResponse });
  } catch (error) {
    console.error('Failed to fetch IP data', error);
    
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
});

app.listen(PORT, () => {
   
  console.log(`IP details server is running on http://localhost:${PORT}`);
});
