import threading
import datetime
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder='public', static_url_path='')
CORS(app)

system_logs = []
ai_decisions = []
crm_db = []

def add_log(msg):
    # Match the existing log format
    time_str = datetime.datetime.now().strftime('%I:%M:%S %p').lstrip('0')
    log_str = f"[{time_str}] {msg}"
    print(log_str)
    system_logs.append(log_str)

class API_Layer:
    @staticmethod
    def send_sms(phone, msg):
        pass # No longer logging mock actions
    
    @staticmethod
    def send_email(email, msg):
        pass # No longer logging mock actions
        
    @staticmethod
    def update_crm(lead):
        crm_db.append(lead)
        # No longer logging mock CRM actions

class AIDecisionEngine:
    @staticmethod
    def evaluate_lead(lead):
        score = 50
        
        interest = lead.get('interest_level')
        if interest == 'High':
            score += 35
        elif interest == 'Medium':
            score += 10
        elif interest == 'Low':
            score -= 20
            
        if lead.get('phone'):
            score += 10
            
        recommendation = 'NURTURE'
        if score >= 80:
            recommendation = 'INSTANT_CONTACT'
        elif score < 40:
            recommendation = 'PASSIVE_MARKETING'
            
        add_log(f"[AI ENGINE] 🧠 Evaluated {lead.get('name')}: Score = {score}, Action = {recommendation}")
        return score, recommendation

class WorkflowEngine:
    @staticmethod
    def process_lead_event(lead_event):
        score, recommendation = AIDecisionEngine.evaluate_lead(lead_event)
        
        time_str = datetime.datetime.now().strftime('%I:%M:%S %p').lstrip('0')
        ai_decisions.insert(0, {
            "leadName": lead_event.get('name'),
            "score": score,
            "recommendation": recommendation,
            "timestamp": time_str
        })
        
        if len(ai_decisions) > 10:
            ai_decisions.pop()
            
        if recommendation == 'INSTANT_CONTACT':
            phone = lead_event.get('phone') or 'Unknown'
            API_Layer.send_sms(phone, f"Hi {lead_event.get('name')}, our priority team is reviewing your file!")
            lead_event['status'] = 'Assigned to Priority Sales'
        elif recommendation == 'NURTURE':
            name_no_spaces = lead_event.get('name', '').replace(' ', '').lower()
            email = f"{name_no_spaces}@example.com"
            API_Layer.send_email(email, f"Hello {lead_event.get('name')}, here is more info about us.")
            lead_event['status'] = 'In Nurture Sequence'
        elif recommendation == 'PASSIVE_MARKETING':
            lead_event['status'] = 'Cold Lead List'
            
        API_Layer.update_crm(lead_event)

@app.route('/')
def index():
    return send_from_directory('public', 'index.html')

@app.route('/presentation.html')
def serve_presentation():
    return send_from_directory('public', 'presentation.html')

@app.route('/api/leads', methods=['POST'])
def receive_lead():
    data = request.json
    name = data.get('name')
    interest_level = data.get('interest_level')
    
    if not name or not interest_level:
        return jsonify({"error": "Missing required fields."}), 400
        
    lead_payload = {
        "name": name,
        "phone": data.get('phone', ''),
        "status": data.get('status', 'New'),
        "interest_level": interest_level
    }
    
    add_log(f"📥 Form Input Data: Name='{name}', Phone='{lead_payload['phone']}', Interest='{interest_level}'")
    
    # Process asynchronously to match Node.js behavior
    thread = threading.Thread(target=WorkflowEngine.process_lead_event, args=(lead_payload,))
    thread.start()
    
    return jsonify({"message": "Lead accepted. Workflow triggered."}), 202

@app.route('/api/logs', methods=['GET'])
def get_logs():
    return jsonify(system_logs)

@app.route('/api/ai-decisions', methods=['GET'])
def get_ai_decisions():
    return jsonify(ai_decisions)

@app.route('/api/clear-logs', methods=['GET'])
def clear_logs():
    system_logs.clear()
    ai_decisions.clear()
    return jsonify({"message": "Logs cleared"})

if __name__ == '__main__':
    PORT = 3000
    print(f"🚀 Intelligent Workflow System running on http://localhost:{PORT}")
    print(f"📊 Open http://localhost:{PORT}/presentation.html for the PPT")
    app.run(host='0.0.0.0', port=PORT, threaded=True)
