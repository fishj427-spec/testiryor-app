// [РАСПИСАНИЕ ЗАНЯТИЙ] Официальный портал расписания УГНТУ (rasp.rusoil.net)

function showScheduleToast(text) {
    let toast = document.getElementById("schedule-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "schedule-toast";
        toast.className = "schedule-toast";
        document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.remove("show");
    void toast.offsetWidth; // force reflow
    toast.classList.add("show");
    if (window._scheduleToastTimer) clearTimeout(window._scheduleToastTimer);
    window._scheduleToastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

function showPortalLoading(show) {
    const overlay = document.getElementById("portal-loading-overlay");
    if (overlay) {
        if (show) {
            overlay.classList.add("visible");
        } else {
            overlay.classList.remove("visible");
        }
    }
}

function onPortalIframeLoad() {
    showPortalLoading(false);
}

function reloadSchedulePortal() {
    vibrate(10);
    const frame = document.getElementById("schedule-portal-frame");
    if (frame) {
        showPortalLoading(true);
        try {
            frame.contentWindow.location.reload();
        } catch (e) {
            frame.src = "https://rasp.rusoil.net/?t=" + Date.now();
        }
    }
    showScheduleToast("Обновление rasp.rusoil.net...");
}

function openScheduleExternal() {
    vibrate(10);
    const url = "https://rasp.rusoil.net/";
    if (window.Telegram?.WebApp?.openLink) {
        window.Telegram.WebApp.openLink(url);
    } else {
        window.open(url, "_blank");
    }
}

function renderSchedule() {
    const container = document.getElementById("schedule-content");
    if (!container) return;

    // Инициализируем iframe один раз, чтобы не сбрасывать выбранную группу при переходах
    const existingFrame = document.getElementById("schedule-portal-frame");
    if (!existingFrame) {
        container.innerHTML = `
            <!-- [ВЕРХНЯЯ ПАНЕЛЬ РАСПИСАНИЯ] -->
            <div class="schedule-top-nav">
                <div class="schedule-top-title-area">
                    <div class="schedule-portal-status-dot"></div>
                    <div class="schedule-top-title-text">РАСПИСАНИЕ</div>
                    <span class="schedule-portal-domain">rasp.rusoil.net</span>
                </div>
                <div class="schedule-top-actions">
                    <button type="button" class="schedule-action-btn" onclick="reloadSchedulePortal()" title="Обновить страницу rasp.rusoil.net">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M23 4v6h-6"/>
                            <path d="M1 20v-6h6"/>
                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                        </svg>
                    </button>
                    <button type="button" class="schedule-action-btn" onclick="openScheduleExternal()" title="Открыть rasp.rusoil.net в браузере">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- [ВЬЮ ПОРТАЛА (ОНЛАЙН RASP.RUSOIL.NET)] -->
            <div class="schedule-portal-view" id="schedule-portal-view">
                <div class="portal-loading-overlay visible" id="portal-loading-overlay">
                    <div class="portal-spinner"></div>
                    <div class="portal-loading-text">Загрузка расписания УГНТУ...</div>
                </div>
                <iframe id="schedule-portal-frame" src="https://rasp.rusoil.net/" class="schedule-portal-iframe" onload="onPortalIframeLoad()" allow="clipboard-write; fullscreen"></iframe>
            </div>
        `;
    }
}

if (typeof window !== "undefined") {
    window.renderSchedule = renderSchedule;
    window.reloadSchedulePortal = reloadSchedulePortal;
    window.openScheduleExternal = openScheduleExternal;
    window.onPortalIframeLoad = onPortalIframeLoad;
    window.showScheduleToast = showScheduleToast;
}
