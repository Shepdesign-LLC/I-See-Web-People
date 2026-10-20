/**
 * Generates ready-to-use WordPress plugin PHP code for "I See Web People"
 */

export function generateWordPressPluginCode(options: {
  siteName?: string;
  enableGhostForms?: boolean;
  enableRageClicks?: boolean;
  enableAdminBar?: boolean;
  telemetryIntervalSec?: number;
}): string {
  const {
    enableGhostForms = true,
    enableRageClicks = true,
    enableAdminBar = true,
    telemetryIntervalSec = 30
  } = options;

  return `<?php
/**
 * Plugin Name: I See Web People
 * Plugin URI: https://iseewebpeople.com
 * Description: See real human behavior in real time. Admin bar visitor radar, ghost form recovery, and rage-click telemetry.
 * Version: 1.0.0
 * Author: Ryan Shephard / Shepdesign
 * Author URI: https://shepdesign.com
 * License: GPL-2.0+
 * Text Domain: i-see-web-people
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class ISeeWebPeople {
    private static $instance = null;
    const OPTION_KEY = 'iswp_settings';

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        // Enqueue front-end tracking beacon
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_radar'));

        // REST API routes for non-blocking beacons
        add_action('rest_api_init', array($this, 'register_rest_routes'));

        ${enableAdminBar ? `// Top WP-Admin Bar Live Eye Radar
        add_action('admin_bar_menu', array($this, 'add_admin_bar_radar'), 100);
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));` : ''}

        // Settings Page
        add_action('admin_menu', array($this, 'add_admin_menu'));
    }

    /**
     * Register REST API endpoints
     */
    public function register_rest_routes() {
        register_rest_route('iseewebpeople/v1', '/beacon', array(
            'methods' => 'POST',
            'callback' => array($this, 'handle_visitor_beacon'),
            'permission_callback' => '__return_true',
        ));
    }

    /**
     * Process incoming visitor beacon
     */
    public function handle_visitor_beacon($request) {
        $params = $request->get_json_params();
        if (empty($params)) {
            return new WP_REST_Response(array('status' => 'empty'), 200);
        }

        $session_id = sanitize_text_field($params['session_id'] ?? '');
        $event_type = sanitize_text_field($params['type'] ?? 'heartbeat');
        $path       = sanitize_text_field($params['path'] ?? '/');

        // Store active session in Transient (expires in 60 seconds)
        $active_sessions = get_transient('iswp_active_sessions') ?: array();
        $active_sessions[$session_id] = array(
            'path'       => $path,
            'last_seen'  => time(),
            'event_type' => $event_type,
            'ip_hash'    => hash('sha256', $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1')
        );

        // Prune expired sessions older than 45 seconds
        $now = time();
        foreach ($active_sessions as $sid => $sess) {
            if (($now - $sess['last_seen']) > 45) {
                unset($active_sessions[$sid]);
            }
        }
        set_transient('iswp_active_sessions', $active_sessions, 60);

        ${enableGhostForms ? `// Process Ghost Form Lead Recovery
        if ($event_type === 'ghost_form' && !empty($params['field_value'])) {
            $ghost_leads = get_option('iswp_ghost_leads', array());
            $ghost_leads[] = array(
                'timestamp' => current_time('mysql'),
                'path'      => $path,
                'email'     => sanitize_email($params['field_value']),
                'field'     => sanitize_key($params['field_name'] ?? 'email')
            );
            // Keep last 100 ghost leads
            if (count($ghost_leads) > 100) {
                array_shift($ghost_leads);
            }
            update_option('iswp_ghost_leads', $ghost_leads);
        }` : ''}

        return new WP_REST_Response(array('success' => true, 'active_count' => count($active_sessions)), 200);
    }

    ${enableAdminBar ? `/**
     * WP-Admin Bar Live Eye Radar
     */
    public function add_admin_bar_radar($wp_admin_bar) {
        if (!current_user_can('manage_options')) {
            return;
        }

        $active_sessions = get_transient('iswp_active_sessions') ?: array();
        $count = count($active_sessions);

        $title = sprintf(
            '<span class="ab-icon dashicons dashicons-visibility" style="margin-top:2px;"></span> <span class="iswp-count-text">I See Web People: <strong>%d active</strong></span>',
            $count
        );

        $wp_admin_bar->add_node(array(
            'id'    => 'iswp_radar',
            'title' => $title,
            'href'  => admin_url('options-general.php?page=i-see-web-people'),
            'meta'  => array('title' => 'Real-time human presence on this website')
        ));
    }` : ''}

    /**
     * Front-end Radar Tracker (< 3KB lightweight beacon)
     */
    public function enqueue_frontend_radar() {
        if (is_admin()) return;

        $api_url = esc_url_raw(rest_url('iseewebpeople/v1/beacon'));
        $inline_script = "
        (function() {
            var sessionId = 'iswp_' + Math.random().toString(36).substr(2, 9);
            var apiUrl = '{$api_url}';

            function sendPing(type, extra) {
                var payload = Object.assign({
                    session_id: sessionId,
                    type: type || 'heartbeat',
                    path: window.location.pathname,
                    timestamp: Date.now()
                }, extra || {});

                if (navigator.sendBeacon) {
                    navigator.sendBeacon(apiUrl, JSON.stringify(payload));
                } else {
                    fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                        keepalive: true
                    }).catch(function(){});
                }
            }

            // Initial ping
            sendPing('pageview');

            // Periodic heartbeat every ${telemetryIntervalSec} seconds
            setInterval(function() { sendPing('heartbeat'); }, ${telemetryIntervalSec * 1000});

            ${enableRageClicks ? `// Rage-click listener: 3 clicks within 1.2s on same element
            var clickLog = [];
            document.addEventListener('click', function(e) {
                var now = Date.now();
                clickLog.push({ target: e.target, time: now });
                clickLog = clickLog.filter(function(item) { return (now - item.time) < 1200; });
                if (clickLog.length >= 3) {
                    var el = clickLog[0].target;
                    var selector = el.tagName + (el.id ? '#' + el.id : '') + (el.className ? '.' + el.className.split(' ').join('.') : '');
                    sendPing('rage_click', { selector: selector.substring(0, 100) });
                    clickLog = [];
                }
            }, { passive: true });` : ''}

            ${enableGhostForms ? `// Ghost-form recovery: capture email inputs on blur or typing
            document.addEventListener('change', function(e) {
                if (e.target && (e.target.type === 'email' || e.target.name === 'email')) {
                    var val = (e.target.value || '').trim();
                    if (val.indexOf('@') > 0 && val.indexOf('.') > 0) {
                        sendPing('ghost_form', { field_name: e.target.name || 'email', field_value: val });
                    }
                }
            }, true);` : ''}
        })();
        ";

        wp_register_script('iswp-radar', '', array(), '1.0.0', true);
        wp_enqueue_script('iswp-radar');
        wp_add_inline_script('iswp-radar', $inline_script);
    }

    public function add_admin_menu() {
        add_options_page(
            'I See Web People',
            'I See Web People',
            'manage_options',
            'i-see-web-people',
            array($this, 'render_admin_dashboard')
        );
    }

    public function render_admin_dashboard() {
        $active_sessions = get_transient('iswp_active_sessions') ?: array();
        $ghost_leads = get_option('iswp_ghost_leads', array());
        ?>
        <div class="wrap">
            <h1>👁️ I See Web People &mdash; Live Human Radar</h1>
            <p>Revealing real human behavior on your WordPress site in real-time.</p>
            <div style="background:#fff; border:1px solid #ccd0d4; padding:20px; border-radius:8px; margin-top:20px;">
                <h2>Currently Active Humans: <strong><?php echo esc_html(count($active_sessions)); ?></strong></h2>
                <table class="widefat striped">
                    <thead><tr><th>Session</th><th>Current Page</th><th>Last Event</th><th>Last Seen</th></tr></thead>
                    <tbody>
                        <?php if (empty($active_sessions)): ?>
                            <tr><td colspan="4">No active visitors right now. Open another browser tab to test!</td></tr>
                        <?php else: ?>
                            <?php foreach ($active_sessions as $sid => $sess): ?>
                                <tr>
                                    <td><code><?php echo esc_html(substr($sid, 0, 12)); ?></code></td>
                                    <td><strong><?php echo esc_html($sess['path']); ?></strong></td>
                                    <td><?php echo esc_html($sess['event_type']); ?></td>
                                    <td><?php echo esc_html(human_time_diff($sess['last_seen'], time())); ?> ago</td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
        <?php
    }
}

// Initialize Plugin
ISeeWebPeople::get_instance();
`;
}

export function downloadWordPressPluginFile(options: {
  siteName?: string;
  enableGhostForms?: boolean;
  enableRageClicks?: boolean;
  enableAdminBar?: boolean;
}) {
  const code = generateWordPressPluginCode(options);
  const blob = new Blob([code], { type: 'application/x-httpd-php;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'i-see-web-people.php';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
