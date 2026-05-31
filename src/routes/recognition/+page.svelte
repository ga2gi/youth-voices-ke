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

    // Challenge metadata for display
    const challengeMeta = {
        title: "Youth Access to Capital",
        icon: "🏦",
        color: "#78716c",
        ref: "PL-ECO-001",
        sector: "Economic Inclusion & Finance",
        status: "Closed — Policy Brief Published",
        description: "Restructuring credit guarantee schemes for youth-led enterprises. Phase 1 Complete, recommendations submitted to National Treasury."
    };

    // State
    let isExpanded = false;

    function toggleDashboard() {
        isExpanded = !isExpanded;
    }

    function getStatusBadgeClass(status) {
        if (!status) return 'sent';
        return status.toLowerCase().replace(/\s+/g, '-');
    }

    // Calculate stats from entries
    $: entries = data.trackerEntries || [];
    $: totalEntries = entries.length;
    $: criticalCount = entries.filter(e => e.urgency_level === 'CRITICAL' && e.status !== 'Acknowledged' && e.status !== 'Implementation').length;
    $: highCount = entries.filter(e => e.urgency_level === 'HIGH' && e.status !== 'Acknowledged' && e.status !== 'Implementation').length;
    $: acknowledgedCount = entries.filter(e => e.status === 'Acknowledged' || e.status === 'Implementation').length;
    $: sentCount = entries.filter(e => e.status === 'Sent' || !e.status).length;
    $: overdueCount = entries.filter(e => e.status === 'Overdue').length;
    $: maxDays = entries.length > 0 ? Math.max(...entries.map(e => e.days_since_dispatch || 0)) : 0;
    $: totalPending = totalEntries - acknowledgedCount;
</script>

<div class="container accountability-page">
    <header class="tracking-header">
        <div class="live-indicator">
            <span class="dot"></span> Live Accountability Tracker
        </div>
        <h1>Policy Brief Accountability</h1>
        <p class="intro">
            Tracking stakeholder engagement for dispatched policy briefs.
            Click the card below to reveal the full dashboard.
        </p>
    </header>

    <!-- Summary Stats Bar -->
    <div class="summary-bar">
        <div class="summary-card">
            <span class="summary-value">{totalEntries}</span>
            <span class="summary-label">Total Dispatches</span>
        </div>
        <div class="summary-card critical-summary">
            <span class="summary-value">{criticalCount}</span>
            <span class="summary-label">Critical</span>
        </div>
        <div class="summary-card success-summary">
            <span class="summary-value">{acknowledgedCount}</span>
            <span class="summary-label">Acknowledged</span>
        </div>
        <div class="summary-card pending-summary">
            <span class="summary-value">{totalPending}</span>
            <span class="summary-label">Pending</span>
        </div>
    </div>

    <!-- The Challenge Card -->
    <div class="challenge-card" class:expanded={isExpanded} style="--card-color: {challengeMeta.color}">
        <!-- CLICKABLE HEADER -->
        <button 
            class="card-header" 
            on:click={toggleDashboard}
            type="button"
        >
            <div class="header-left">
                <span class="header-icon">{challengeMeta.icon}</span>
                <div class="header-info">
                    <div class="header-badges">
                        <span class="ref-badge">{challengeMeta.ref}</span>
                        <span class="status-badge-sm">{challengeMeta.status}</span>
                    </div>
                    <h2 class="header-title">
                        {challengeMeta.title}
                        <span class="header-subtitle"> — Policy Brief Accountability Tracker</span>
                    </h2>
                    <p class="header-desc">{challengeMeta.description}</p>
                </div>
            </div>
            
            <div class="header-right">
                <div class="header-stats">
                    <div class="hstat">
                        <span class="hstat-val">{totalEntries}</span>
                        <span class="hstat-lbl">Tracked</span>
                    </div>
                    {#if criticalCount > 0}
                        <div class="hstat hstat-critical">
                            <span class="hstat-val">{criticalCount}</span>
                            <span class="hstat-lbl">Critical</span>
                        </div>
                    {/if}
                    <div class="hstat hstat-ack">
                        <span class="hstat-val">{acknowledgedCount}/{totalEntries}</span>
                        <span class="hstat-lbl">Responded</span>
                    </div>
                </div>
                <span class="expand-arrow">{isExpanded ? '▴' : '▸'}</span>
            </div>
        </button>

        <!-- EXPANDABLE DASHBOARD -->
        {#if isExpanded}
            <div class="card-content">
                <!-- Status Summary -->
                <div class="status-strip">
                    <div class="strip-item">
                        <span class="strip-dot" style="background:#0ea5e9"></span>
                        <span><strong>{sentCount}</strong> Sent</span>
                    </div>
                    <div class="strip-item">
                        <span class="strip-dot" style="background:#dc2626"></span>
                        <span><strong>{overdueCount}</strong> Overdue</span>
                    </div>
                    <div class="strip-item">
                        <span class="strip-dot" style="background:#059669"></span>
                        <span><strong>{acknowledgedCount}</strong> Resolved</span>
                    </div>
                    <div class="strip-item">
                        <span class="strip-dot" style="background:#f59e0b"></span>
                        <span><strong>{criticalCount + highCount}</strong> High Priority</span>
                    </div>
                    <div class="strip-item">
                        <span>Max: <strong>{maxDays} days</strong></span>
                    </div>
                </div>

                {#if entries.length > 0}
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
                                {#each entries as record}
                                    <tr class="status-row {getUrgencyClass(record.urgency_level, record.status)}">
                                        <td class="stakeholder-info">
                                            <span class="dept">{record.office_department || 'General Office'}</span>
                                            <span class="name">{record.stakeholder_name || 'Unknown Stakeholder'}</span>
                                        </td>
                                        <td>
                                            <span class="status-badge {getStatusBadgeClass(record.status)}">
                                                {record.status || 'Sent'}
                                            </span>
                                        </td>
                                        <td class="days-cell">
                                            <strong>{record.days_since_dispatch || 0}</strong> 
                                            <span class="unit">days</span>
                                        </td>
                                        <td>
                                            <div class="urgency-tag">
                                                {record.status === 'Acknowledged' || record.status === 'Implementation' 
                                                    ? '✅ Resolved' 
                                                    : record.urgency_level || 'NORMAL'}
                                            </div>
                                        </td>
                                        <td class="ref-cell">
                                            <code>{record.reference_number || '—'}</code>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>

                    <div class="content-footer">
                        <span>
                            <strong>{acknowledgedCount} of {totalEntries}</strong> stakeholders have responded
                        </span>
                        {#if criticalCount > 0}
                            <span class="footer-warning">
                                ⚠️ <strong>{criticalCount}</strong> require immediate attention
                            </span>
                        {/if}
                    </div>
                {:else}
                    <div class="empty-state">
                        <span class="empty-icon">📭</span>
                        <p>No stakeholder dispatches tracked yet.</p>
                    </div>
                {/if}
            </div>
        {/if}
    </div>

    <section class="accountability-footer">
        <p><strong>Methodology:</strong> Policy Bridge KE dispatches policy briefs to relevant stakeholders and tracks acknowledgment. 
        A "Public Nudge" alert is issued via social channels once an institution surpasses <strong>21 days</strong> without formal response.</p>
    </section>
</div>

<style>
    .accountability-page { 
        padding: 40px 20px; 
        max-width: 1100px; 
        margin: 0 auto; 
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #0f172a;
        -webkit-font-smoothing: antialiased;
    }
    
    /* ==================== HEADER ==================== */
    .tracking-header { 
        text-align: center; 
        margin-bottom: 36px; 
    }
    .live-indicator { 
        display: inline-flex; 
        align-items: center; 
        gap: 8px;
        background: #f0fdf4; 
        color: #064e3b; 
        padding: 6px 16px; 
        border-radius: 99px; 
        font-weight: 700; 
        font-size: 0.8rem; 
        border: 1px solid #bbf7d0;
        letter-spacing: 0.02em;
    }
    .dot { 
        width: 8px; 
        height: 8px; 
        background: #064e3b; 
        border-radius: 50%; 
        animation: pulse 2s infinite; 
    }
    @keyframes pulse { 
        0% { opacity: 1; } 
        50% { opacity: 0.3; } 
        100% { opacity: 1; } 
    }

    h1 { 
        font-size: 2.2rem; 
        color: #0f172a; 
        margin: 16px 0 10px; 
        font-weight: 800; 
        letter-spacing: -0.03em;
    }
    .intro { 
        color: #475569; 
        font-size: 1rem; 
        max-width: 580px; 
        margin: 0 auto; 
        line-height: 1.6;
    }

    /* ==================== SUMMARY BAR ==================== */
    .summary-bar {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 14px;
        margin-bottom: 32px;
    }

    .summary-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 18px 16px;
        text-align: center;
        transition: all 0.2s ease;
    }

    .summary-card:hover {
        border-color: #cbd5e1;
        box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    }

    .summary-value {
        display: block;
        font-size: 1.8rem;
        font-weight: 800;
        color: #0f172a;
        letter-spacing: -0.02em;
        line-height: 1;
        margin-bottom: 4px;
    }

    .summary-label {
        font-size: 0.7rem;
        font-weight: 600;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .critical-summary .summary-value { color: #dc2626; }
    .success-summary .summary-value { color: #059669; }
    .pending-summary .summary-value { color: #d97706; }

    /* ==================== CHALLENGE CARD ==================== */
    .challenge-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 14px;
        overflow: hidden;
        transition: all 0.2s ease;
        box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        margin-bottom: 24px;
    }

    .challenge-card.expanded {
        border-color: var(--card-color);
        box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    }

    /* ==================== CLICKABLE HEADER ==================== */
    .card-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px;
        background: #fafbfc;
        border: none;
        cursor: pointer;
        text-align: left;
        font-family: inherit;
        transition: background 0.15s ease;
        gap: 20px;
    }

    .card-header:hover {
        background: #f1f5f9;
    }

    .header-left {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        min-width: 0;
        flex: 1;
    }

    .header-icon {
        font-size: 2rem;
        flex-shrink: 0;
        line-height: 1;
        margin-top: 2px;
    }

    .header-info {
        min-width: 0;
    }

    .header-badges {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 4px;
    }

    .ref-badge {
        font-family: ui-monospace, SFMono-Regular, monospace;
        font-size: 0.68rem;
        font-weight: 700;
        background: #f1f5f9;
        padding: 2px 7px;
        border-radius: 4px;
        color: #64748b;
    }

    .status-badge-sm {
        font-size: 0.62rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.03em;
        padding: 2px 8px;
        border-radius: 99px;
        background: #e2e8f0;
        color: #64748b;
    }

    .header-title {
        font-size: 1.1rem;
        font-weight: 700;
        color: #0f172a;
        margin: 0 0 4px 0;
        letter-spacing: -0.01em;
    }

    .header-subtitle {
        font-weight: 400;
        color: #94a3b8;
        font-size: 0.85rem;
    }

    .header-desc {
        font-size: 0.82rem;
        color: #64748b;
        margin: 0;
        line-height: 1.4;
    }

    .header-right {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-shrink: 0;
    }

    .header-stats {
        display: flex;
        gap: 14px;
    }

    .hstat {
        text-align: center;
    }

    .hstat-val {
        display: block;
        font-size: 1.1rem;
        font-weight: 800;
        color: #0f172a;
        line-height: 1;
    }

    .hstat-lbl {
        font-size: 0.6rem;
        font-weight: 600;
        color: #94a3b8;
        text-transform: uppercase;
        letter-spacing: 0.04em;
    }

    .hstat-critical .hstat-val { color: #dc2626; }
    .hstat-ack .hstat-val { color: #059669; }

    .expand-arrow {
        font-size: 1rem;
        color: #94a3b8;
        font-weight: 700;
        transition: transform 0.2s ease;
    }

    /* ==================== EXPANDABLE CONTENT ==================== */
    .card-content {
        border-top: 1px solid #e2e8f0;
        animation: revealContent 0.25s ease;
    }

    @keyframes revealContent {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* Status Strip */
    .status-strip {
        display: flex;
        gap: 20px;
        padding: 12px 24px;
        background: #f9fafb;
        border-bottom: 1px solid #e2e8f0;
        flex-wrap: wrap;
        font-size: 0.75rem;
        color: #64748b;
    }

    .strip-item {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .strip-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .strip-item strong {
        color: #0f172a;
    }

    /* Table */
    .table-container { 
        overflow-x: auto; 
    }
    table { 
        width: 100%; 
        border-collapse: collapse; 
    }
    th { 
        background: #f9fafb; 
        padding: 12px 20px; 
        text-align: left; 
        font-size: 0.68rem; 
        text-transform: uppercase; 
        color: #64748b; 
        border-bottom: 1px solid #e2e8f0; 
        font-weight: 700;
        letter-spacing: 0.05em;
    }
    td { 
        padding: 14px 20px; 
        border-bottom: 1px solid #f1f5f9; 
        font-size: 0.88rem;
    }

    /* Row States */
    .status-row.critical { background: #fffbeb; }
    .status-row.warning { background: #fff7ed; }
    .status-row.success { opacity: 0.7; background: #f8fafc; }

    .stakeholder-info { 
        display: flex; 
        flex-direction: column; 
        gap: 2px;
    }
    .dept { 
        font-size: 0.68rem; 
        color: #64748b; 
        text-transform: uppercase; 
        font-weight: 600; 
        letter-spacing: 0.03em;
    }
    .name { 
        font-weight: 700; 
        color: #0f172a; 
        font-size: 0.92rem; 
    }

    /* Status Badges */
    .status-badge { 
        padding: 3px 9px; 
        border-radius: 5px; 
        font-size: 0.68rem; 
        font-weight: 700; 
        text-transform: uppercase; 
        letter-spacing: 0.02em;
        white-space: nowrap;
    }
    .status-badge.sent { background: #e0f2fe; color: #0369a1; }
    .status-badge.acknowledged { background: #059669; color: white; }
    .status-badge.overdue { background: #dc2626; color: white; }
    .status-badge.implementation { background: #7c3aed; color: white; }

    .urgency-tag { 
        font-size: 0.75rem; 
        font-weight: 700; 
        white-space: nowrap;
    }
    .critical .urgency-tag { color: #dc2626; }
    .warning .urgency-tag { color: #d97706; }
    .success .urgency-tag { color: #059669; }

    .days-cell { 
        font-family: ui-monospace, SFMono-Regular, monospace; 
    }
    .days-cell strong { font-size: 1rem; }
    .unit { 
        font-size: 0.68rem; 
        color: #64748b; 
        font-weight: 500; 
    }
    code { 
        background: #f1f5f9; 
        padding: 2px 6px; 
        border-radius: 4px; 
        font-size: 0.75rem; 
        color: #475569; 
        font-family: ui-monospace, SFMono-Regular, monospace;
    }

    /* Empty & Footer */
    .empty-state {
        padding: 40px 24px;
        text-align: center;
        color: #94a3b8;
    }
    .empty-icon { font-size: 2rem; display: block; margin-bottom: 8px; }

    .content-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 24px;
        background: #f9fafb;
        border-top: 1px solid #e2e8f0;
        font-size: 0.78rem;
        color: #64748b;
        flex-wrap: wrap;
        gap: 8px;
    }
    .content-footer strong { color: #0f172a; }
    .footer-warning { color: #dc2626; }

    /* ==================== FOOTER ==================== */
    .accountability-footer { 
        padding: 20px 24px; 
        background: #f8fafc; 
        border-radius: 12px; 
        font-size: 0.85rem; 
        color: #64748b; 
        border: 1px solid #e2e8f0; 
        line-height: 1.6;
        text-align: center;
    }

    /* ==================== RESPONSIVE ==================== */
    @media (max-width: 768px) {
        .accountability-page { padding: 20px 12px; }
        h1 { font-size: 1.5rem; }
        
        .card-header {
            padding: 16px;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
        }
        
        .header-right {
            width: 100%;
            justify-content: space-between;
        }

        .header-stats {
            gap: 12px;
        }

        .header-title {
            font-size: 0.95rem;
        }

        .status-strip {
            gap: 12px;
            padding: 10px 16px;
            font-size: 0.7rem;
        }

        .table-container { overflow-x: auto; }
        th, td { padding: 10px 12px; font-size: 0.75rem; }
        
        .summary-bar {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
        }
        .summary-value { font-size: 1.4rem; }
    }
</style>