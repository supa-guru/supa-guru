// Supa Guru Complete API
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jczevnazcknzdnachcxf.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjemV2bmF6Y2tuemRuYWNoY3hmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDk3NDU3NywiZXhwIjoyMDg2NTUwNTc3fQ.7-yc_ZxPA3Xouk0Zc-ievLAu22NLUo1W_yA1AOaJwso';
const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to authenticate requests
const authenticate = (req) => {
  const apiKey = req.headers.authorization;
  // For demo purposes, accept the demo key
  return apiKey === 'Bearer YOUR-API-KEY' || apiKey === 'Bearer YOUR_API_KEY';
};

// Helper function to send JSON responses
const sendResponse = (res, status, data) => {
  res.status(status).json(data);
};

// Helper function to send error responses
const sendError = (res, status, message) => {
  sendResponse(res, status, { error: message });
};

// Guru Registration
const handleRegisterGuru = async (req, res) => {
  if (req.method !== 'POST') {
    return sendError(res, 405, 'Method not allowed');
  }

  if (!authenticate(req)) {
    return sendError(res, 401, 'Missing or invalid API key');
  }

  try {
    const { name, description, capabilities, contact, tags } = req.body;

    if (!name || !description || !capabilities || !contact) {
      const missingFields = [];
      if (!name) missingFields.push('name');
      if (!description) missingFields.push('description');
      if (!capabilities) missingFields.push('capabilities');
      if (!contact) missingFields.push('contact');
      return sendError(res, 400, `Missing required fields: ${missingFields.join(', ')}`);
    }

    const guruid = Math.random().toString(36).substring(2, 10);
    const newGuru = { guruid, name, description, capabilities, contact, tags: tags || [] };

    const { data, error } = await supabase
      .from('gurus')
      .insert([newGuru])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return sendError(res, 500, `Supabase error: ${error.message}`);
    }

    return sendResponse(res, 201, { 
      guruid: data[0].guruid, 
      message: 'Bot registered successfully!'
    });
  } catch (error) {
    console.error('Registration error:', error);
    return sendError(res, 500, 'Internal server error');
  }
};

// Get All Gurus
const handleGetAllGurus = async (req, res) => {
  if (req.method !== 'GET') {
    return sendError(res, 405, 'Method not allowed');
  }

  // Allow unauthenticated reads for public viewing
  // if (!authenticate(req)) {
  //   return sendError(res, 401, 'Missing or invalid API key');
  // }

  try {
    const { data, error } = await supabase
      .from('gurus')
      .select('*');

    if (error) {
      console.error('Supabase fetch error:', error);
      return sendError(res, 500, `Supabase error: ${error.message}`);
    }

    return sendResponse(res, 200, { gurus: data || [] });
  } catch (error) {
    console.error('Fetch error:', error);
    return sendError(res, 500, 'Internal server error');
  }
};

// Get Specific Guru
const handleGetGuru = async (req, res) => {
  if (req.method !== 'GET') {
    return sendError(res, 405, 'Method not allowed');
  }

  if (!authenticate(req)) {
    return sendError(res, 401, 'Missing or invalid API key');
  }

  try {
    const { guruid } = req.query;

    if (!guruid) {
      return sendError(res, 400, 'Guru ID is required');
    }

    const { data, error } = await supabase
      .from('gurus')
      .select('*')
      .eq('guruid', guruid)
      .single();

    if (error) {
      console.error('Supabase fetch error:', error);
      if (error.code === 'PGRST116') {
        return sendError(res, 404, 'Guru not found');
      }
      return sendError(res, 500, `Supabase error: ${error.message}`);
    }

    return sendResponse(res, 200, data);
  } catch (error) {
    console.error('Fetch error:', error);
    return sendError(res, 500, 'Internal server error');
  }
};

// Update Guru Profile
const handleUpdateGuru = async (req, res) => {
  if (req.method !== 'PUT') {
    return sendError(res, 405, 'Method not allowed');
  }

  if (!authenticate(req)) {
    return sendError(res, 401, 'Missing or invalid API key');
  }

  try {
    const { guruid } = req.query;
    const updateData = req.body;

    if (!guruid) {
      return sendError(res, 400, 'Guru ID is required');
    }

    if (Object.keys(updateData).length === 0) {
      return sendError(res, 400, 'No update data provided');
    }

    const { data, error } = await supabase
      .from('gurus')
      .update(updateData)
      .eq('guruid', guruid)
      .select();

    if (error) {
      console.error('Supabase update error:', error);
      if (error.code === 'PGRST116') {
        return sendError(res, 404, 'Guru not found');
      }
      return sendError(res, 500, `Supabase error: ${error.message}`);
    }

    return sendResponse(res, 200, { 
      message: 'Guru updated successfully',
      guru: data[0]
    });
  } catch (error) {
    console.error('Update error:', error);
    return sendError(res, 500, 'Internal server error');
  }
};

// Main API handler
module.exports = async (req, res) => {
  const { path } = req.query;

  // Route requests based on path
  if (path === 'gurus') {
    if (req.method === 'POST') {
      return handleRegisterGuru(req, res);
    } else if (req.method === 'GET') {
      return handleGetAllGurus(req, res);
    }
  } else if (path && path.startsWith('gurus/')) {
    const guruid = path.split('/')[1];
    req.query.guruid = guruid;
    
    if (req.method === 'GET') {
      return handleGetGuru(req, res);
    } else if (req.method === 'PUT') {
      return handleUpdateGuru(req, res);
    }
  }

  // Method not allowed or path not found
  return sendError(res, 404, 'Endpoint not found');
};
