const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Store logs to send to frontend
let systemLogs = [];
const addLog = (msg) => {
    const logStr = `[${new Date().toLocaleTimeString()}] ${msg}`;
    console.log(logStr);
    systemLogs.push(logStr);
};

// --- MOCK DATABASES & INTEGRATIONS ---
const CRM_DB = [];

const API_Layer = {
    sendSMS: async (phone, msg) => addLog(`[SMS SUB-SYSTEM] 📱 Sent to ${phone}: ${msg}`),
    sendEmail: async (email, msg) => addLog(`[EMAIL SUB-SYSTEM] 📧 Sent to ${email}: ${msg}`),
    updateCRM: async (lead) => {
        CRM_DB.push(lead);
        addLog(`[CRM SUB-SYSTEM] 💾 Lead synced to CRM: ${lead.name} (Status: ${lead.status})`);
    }
};

// --- AI DECISION COMPONENT ---
class AIDecisionEngine {
    static evaluateLead(lead) {
        let score = 50; // Base score
        
        // Dynamic scoring logic
        if (lead.interest_level === 'High') score += 35;
        if (lead.interest_level === 'Medium') score += 10;
        if (lead.interest_level === 'Low') score -= 20;
        
        if (lead.phone) score += 10;

        let recommendation = 'NURTURE';
        if (score >= 80) recommendation = 'INSTANT_CONTACT';
        else if (score < 40) recommendation = 'PASSIVE_MARKETING';

        addLog(`[AI ENGINE] 🧠 Evaluated ${lead.name}: Score = ${score}, Action = ${recommendation}`);
        return { score, recommendation };
    }
}

// --- WORKFLOW ORCHESTRATION ENGINE ---
class WorkflowEngine {
    static async processLeadEvent(leadEvent) {
        addLog(`[WORKFLOW ENGINE] ⚙️ Processing event for: ${leadEvent.name}`);
        
        const aiInsight = AIDecisionEngine.evaluateLead(leadEvent);
        
        switch (aiInsight.recommendation) {
            case 'INSTANT_CONTACT':
                await API_Layer.sendSMS(leadEvent.phone || 'Unknown', `Hi ${leadEvent.name}, our priority team is reviewing your file!`);
                leadEvent.status = 'Assigned to Priority Sales';
                break;
            case 'NURTURE':
                await API_Layer.sendEmail(`${leadEvent.name.replace(/\s+/g,'').toLowerCase()}@example.com`, `Hello ${leadEvent.name}, here is more info about us.`);
                leadEvent.status = 'In Nurture Sequence';
                break;
            case 'PASSIVE_MARKETING':
                leadEvent.status = 'Cold Lead List';
                break;
        }

        await API_Layer.updateCRM(leadEvent);
        addLog(`[WORKFLOW ENGINE] ✅ Workflow complete for ${leadEvent.name}.`);
    }
}

// --- API ENDPOINTS ---
app.post('/api/leads', async (req, res) => {
    const { name, phone, status, interest_level } = req.body;
    
    if (!name || !interest_level) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    const leadPayload = { name, phone, status: status || 'New', interest_level };
    addLog(`[SYSTEM] 📥 Received new lead: ${name} (${interest_level} Interest)`);
    
    // Process asynchronously
    WorkflowEngine.processLeadEvent(leadPayload).catch(e => console.error(e));
    
    res.status(202).json({ message: "Lead accepted. Workflow triggered." });
});

app.get('/api/logs', (req, res) => {
    res.json(systemLogs);
});

app.get('/api/clear-logs', (req, res) => {
    systemLogs = [];
    res.json({ message: "Logs cleared" });
});

// START SERVER
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Intelligent Workflow System running on http://localhost:${PORT}`);
    console.log(`📊 Open http://localhost:${PORT}/presentation.html for the PPT`);
});
