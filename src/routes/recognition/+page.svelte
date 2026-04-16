<script>
    /** @type {import('./$types').PageData} */
    export let data;

    // Logic to handle row styling based on the DB 'urgency_level'
    const getUrgencyClass = (level, status) => {
        if (status === 'Acknowledged' || status === 'Implementation') return 'success';
        if (level === 'CRITICAL') return 'critical';
        if (level === 'HIGH') return 'warning';
        return 'normal';
    };
</script>

<div class="container accountability-page">
    <header class="tracking-header">
        <div class="live-indicator">
            <span class="dot"></span> Live Accountability Tracker
        </div>
        <h1>Stakeholder Responsiveness</h1>
        <p class="intro">
            Monitoring the engagement of <strong>{data.trackerEntries.length}</strong> Kenyan institutions 
            regarding the <em>Youth Employment & Gig Economy Framework</em>.
        </p>
    </header>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Stakeholder / Office</th>
                    <th>Status</th>
                    <th>Days Since Dispatch</th>
                    <th>Urgency</th>
                    <th>Ref Number</th>
                </tr>
            </thead>
            <tbody>
                {#each data.trackerEntries as record}
                    <tr class="status-row {getUrgencyClass(record.urgency_level, record.status)}">
                        <td class="stakeholder-info">
                            <span class="dept">{record.office_department || 'General Office'}</span>
                            <span class="name">{record.stakeholder_name}</span>
                        </td>
                        <td>
                            <span class="status-badge {record.status.toLowerCase().replace(' ', '-')}">
                                {record.status}
                            </span>
                        </td>
                        <td class="days-cell">
                            <strong>{record.days_since_dispatch}</strong> 
                            <span class="unit">Days</span>
                        </td>
                        <td>
                            <div class="urgency-tag">
                                {record.status === 'Acknowledged' ? '✅ Resolved' : record.urgency_level}
                            </div>
                        </td>
                        <td class="ref-cell">
                            <code>{record.reference_number || 'Pending'}</code>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    <section class="accountability-footer">
        <p><strong>Methodology:</strong> Policy Bridge KE issues a "Public Nudge" alert via social channels 
        once an institution surpasses 21 days without formal acknowledgment.</p>
    </section>
</div>

<style>
    .accountability-page { padding: 40px 20px; max-width: 1200px; margin: 0 auto; }
    
    /* Header & Live Pulse */
    .tracking-header { text-align: center; margin-bottom: 40px; }
    .live-indicator { 
        display: inline-flex; align-items: center; gap: 8px;
        background: #f0fdf4; color: #064e3b; padding: 6px 16px; 
        border-radius: 99px; font-weight: 700; font-size: 0.8rem; border: 1px solid #064e3b;
    }
    .dot { width: 8px; height: 8px; background: #064e3b; border-radius: 50%; animation: pulse 2s infinite; }
    @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }

    h1 { font-size: 2.5rem; color: #111827; margin: 15px 0; font-weight: 800; }
    .intro { color: #4b5563; font-size: 1.1rem; }

    /* Table Structure */
    .table-container { background: white; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    table { width: 100%; border-collapse: collapse; }
    th { background: #f9fafb; padding: 16px 20px; text-align: left; font-size: 0.75rem; text-transform: uppercase; color: #6b7280; border-bottom: 1px solid #e5e7eb; }
    td { padding: 18px 20px; border-bottom: 1px solid #f3f4f6; }

    /* Row States */
    .status-row.critical { background: #fff1f2; } /* Light red for urgency */
    .status-row.success { opacity: 0.8; background: #f0fdf4; }

    /* Stakeholder Cell */
    .stakeholder-info { display: flex; flex-direction: column; }
    .dept { font-size: 0.7rem; color: #6b7280; text-transform: uppercase; font-weight: 600; }
    .name { font-weight: 700; color: #111827; font-size: 1rem; }

    /* Badges */
    .status-badge { padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; }
    .status-badge.sent { background: #e0f2fe; color: #0369a1; }
    .status-badge.acknowledged { background: #064e3b; color: white; }
    .status-badge.overdue { background: #dc2626; color: white; }

    /* Urgency Styling */
    .urgency-tag { font-size: 0.75rem; font-weight: 700; }
    .critical .urgency-tag { color: #dc2626; }
    .warning .urgency-tag { color: #ca8a04; }
    .success .urgency-tag { color: #064e3b; }

    .days-cell { font-family: 'Inter', sans-serif; }
    .unit { font-size: 0.7rem; color: #6b7280; font-weight: 500; }
    code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 0.8rem; color: #475569; }

    .accountability-footer { margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 8px; font-size: 0.9rem; color: #64748b; border: 1px solid #e2e8f0; }

    @media (max-width: 768px) {
        .table-container { overflow-x: auto; }
        h1 { font-size: 1.8rem; }
    }
</style>