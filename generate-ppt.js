const pptxgen = require("pptxgenjs");

let pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'AI Architect';
pptx.title = 'Intelligent Workflow Automation';

// Define master slide
pptx.defineSlideMaster({
  title: 'MASTER_SLIDE',
  background: { color: 'F4F7F6' },
  objects: [
    { rect: { x: 0, y: 0, w: '100%', h: 0.75, fill: { color: '2C3E50' } } },
    { text: { text: 'Intelligent Workflow Automation | System Architecture', options: { x: 0.5, y: 0.1, w: 9, h: 0.5, color: 'FFFFFF', fontSize: 14, bold: true } } }
  ]
});

// Slide 1: Title
let slide1 = pptx.addSlide();
slide1.background = { color: '2C3E50' };
slide1.addText('Intelligent Workflow Automation System', { x:1.0, y:2.5, w:11, h:1, fontSize:44, bold:true, color:'FFFFFF', align:'center' });
slide1.addText('Company Submission Project Report', { x:1.0, y:3.6, w:11, h:1, fontSize:22, color:'F39C12', align:'center' });

// Slide 2: The Problem
let slide2 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide2.addText('The Objective & Solution', { x: 0.5, y: 1.0, fontSize: 28, bold: true, color: '2C3E50' });
slide2.addText('The Problem:\n• Manual lead qualification is slow and error-prone.\n• Siloed data across CRM, Email, and SMS platforms.\n• Static "If-This-Then-That" logic breaks at scale.\n\nThe Solution:\n• Automate execution asynchronously.\n• Orchestrate via a centralized event-driven engine.\n• Inject AI variable scoring for dynamic pathways.', 
    { x: 0.5, y: 2.0, w: 12, h: 4, fontSize: 18, color: '34495E', bullet: true });

// Slide 3: Architecture Image
let slide3 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide3.addText('System Architecture', { x: 0.5, y: 1.0, fontSize: 28, bold: true, color: '2C3E50' });
slide3.addText('Microservices approach with Event-driven scaling.', { x: 0.5, y: 1.5, fontSize: 16, color: '7F8C8D' });
slide3.addImage({ path: 'public/images/architecture.png', x: 2.0, y: 2.0, w: 9.3, h: 5.2, sizing: { type: 'contain' } });

// Slide 4: AI Decision Logic Image
let slide4 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide4.addText('AI Decision Engine', { x: 0.5, y: 1.0, fontSize: 28, bold: true, color: '2C3E50' });
slide4.addText('Scores incoming data (Profile, History, Source) to dictate exact actions.', { x: 0.5, y: 1.5, fontSize: 16, color: '7F8C8D' });
slide4.addImage({ path: 'public/images/ai_scoring.png', x: 2.0, y: 2.0, w: 9.3, h: 5.2, sizing: { type: 'contain' } });

// Slide 5: Workflow Image
let slide5 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide5.addText('Execution Workflow', { x: 0.5, y: 1.0, fontSize: 28, bold: true, color: '2C3E50' });
slide5.addText('How scores map logically into CRM and Outreach actions.', { x: 0.5, y: 1.5, fontSize: 16, color: '7F8C8D' });
slide5.addImage({ path: 'public/images/workflow.png', x: 2.0, y: 2.0, w: 9.3, h: 5.2, sizing: { type: 'contain' } });

// Slide 6: Tech Stack
let slide6 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide6.addText('The Tech Stack Matrix', { x: 0.5, y: 1.0, fontSize: 28, bold: true, color: '2C3E50' });
slide6.addTable([
    [{ text: 'Domain', options: { bold: true, color: 'FFFFFF', fill: '3498DB' } }, { text: 'Technology', options: { bold: true, color: 'FFFFFF', fill: '3498DB' } }, { text: 'Justification', options: { bold: true, color: 'FFFFFF', fill: '3498DB' } }],
    ['Backend API', 'Node.js (Express)', 'Excellent non-blocking I/O for webhook volume'],
    ['Queue/Broker', 'Redis (BullMQ)', 'Async execution prevents thread freezing'],
    ['AI Engine', 'Python / Scikit-Learn', 'Industry standard ML integrations'],
    ['Storage', 'PostgreSQL', 'ACID compliant for rigid CRM transactions']
], { x: 1.0, y: 2.0, w: 11, colW: [2.5, 3.5, 5.0], rowH: 0.8, fontSize: 16, color: '34495E', border: {pt: 1, color: 'BDC3C7'} });

// Slide 7: AI Logic Backend Implementation
let slide7 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide7.addText('Implementation Code (1/2): AI Decision Logic', { x: 0.5, y: 1.0, fontSize: 28, bold: true, color: '2C3E50' });
slide7.addText(`class AIDecisionEngine {
    static evaluateLead(lead) {
        let score = 50; // Base score
        
        // Probabilistic routing simulation
        if (lead.interest_level === 'High') score += 35;
        if (lead.interest_level === 'Low') score -= 20;
        
        // Define action dynamically avoiding hardcoded static routes
        let recommendation = 'NURTURE';
        if (score >= 80) recommendation = 'INSTANT_CONTACT';
        if (score < 40) recommendation = 'PASSIVE_MARKETING';
        
        return { score, recommendation };
    }
}`, { x: 0.5, y: 1.8, w: 12.0, h: 4.5, fill: '1E293B', color: 'A5B4FC', fontFace: 'Courier New', fontSize: 18 });

// Slide 8: Workflow Orchestration Implementation
let slide8 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide8.addText('Implementation Code (2/2): Core Engine', { x: 0.5, y: 1.0, fontSize: 28, bold: true, color: '2C3E50' });
slide8.addText(`class WorkflowEngine {
    static async processLeadEvent(leadEvent) {
        // Query microservice logic (Mocked above)
        const aiInsight = AIDecisionEngine.evaluateLead(leadEvent);
        
        switch (aiInsight.recommendation) {
            case 'INSTANT_CONTACT':
                await API_Layer.sendSMS(leadEvent.phone, "Reviewing priority file!");
                break;
            case 'NURTURE':
                await API_Layer.sendEmail(leadEvent.email, "Welcome packet sent");
                break;
        }
        
        // Commit final state to PostgreSQL / System DB via API Layer
        await API_Layer.updateCRM(leadEvent);
    }
}`, { x: 0.5, y: 1.8, w: 12.0, h: 4.5, fill: '1E293B', color: 'A5B4FC', fontFace: 'Courier New', fontSize: 18 });

// Save File
const outputPath = '/Users/chandu/Desktop/cyrevein privte lmt problem statement solution/Intelligent_Workflow_System.pptx';
pptx.writeFile({ fileName: outputPath }).then(fileName => {
    console.log('Successfully generated PPTX at:', fileName);
});
