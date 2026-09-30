import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { useLanguage } from '../context/LanguageContext';
import { useOrders } from '../context/OrderContext';

export default function PickupPassModal({ order, isOpen, onClose, onMarkCollected = null, isFarmerView = false }) {
  const { t, formatPrice, isRTL } = useLanguage();
  const { updateOrderStatus } = useOrders();

  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copiedToken, setCopiedToken] = useState(false);
  const [sunshineMode, setSunshineMode] = useState(false);
  const [isMarking, setIsMarking] = useState(false);

  const voucherRef = useRef(null);

  const displayOrderId = order?.id || order?.order_number || String(order?.rawId || 'ORD-001');
  const displayToken = order?.pickupToken || order?.pickup_token || displayOrderId;
  const displayCustomer = order?.customerName || order?.customer_name || 'Valued Customer';
  const displayPhone = order?.customerPhone || order?.customer_phone || '';
  const displayFarmer = order?.farmerName || order?.farmer_name || 'Farm Producer';
  const displayStall = order?.stallNumber || order?.stall_number || 'Stall A-12';
  const displayMarket = order?.marketName || order?.market_name || 'Liberty Farmers Market';
  const displayPickupDate = order?.pickupDate || order?.pickup_date || 'Scheduled Pickup';
  const displayTimeSlot = order?.timeSlot || order?.pickup_time_slot || order?.pickup_slot || 'Standard Window';
  const displayItems = Array.isArray(order?.items) ? order.items : (Array.isArray(order?.order_items) ? order.order_items : []);

  const calculatedSubtotal = (displayItems.length > 0)
    ? displayItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0)
    : (Number(order?.totalAmount) || Number(order?.total) || Number(order?.total_amount) || 0);

  useEffect(() => {
    if (!order) return;

    // Generate structured QR Payload
    const qrPayload = JSON.stringify({
      portal: 'MarketLink',
      orderId: displayOrderId,
      token: displayToken,
      customer: displayCustomer,
      stall: displayStall,
      farmer: displayFarmer,
      pickupDate: displayPickupDate,
      timeSlot: displayTimeSlot,
      cashDue: calculatedSubtotal,
      rule: 'Cash on Stall Pickup Only'
    });

    QRCode.toDataURL(qrPayload, {
      width: 240,
      margin: 1,
      color: {
        dark: '#0d381e',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'M'
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => {
        console.error('Failed to generate full QR, falling back to token:', err);
        QRCode.toDataURL(`MarketLink:${displayToken}`, { width: 240, margin: 1 })
          .then((url) => setQrDataUrl(url))
          .catch(() => {});
      });
  }, [order, displayOrderId, displayToken, displayCustomer, displayStall, displayFarmer, displayPickupDate, displayTimeSlot, calculatedSubtotal]);

  if (!isOpen || !order) return null;

  const handleCopyToken = () => {
    navigator.clipboard.writeText(displayToken).then(() => {
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSlip = () => {
    // Generate text receipt manifest
    const textSlip = `
=============================================================
  MARKETLINK FARM-TO-COMMUNITY PRE-ORDER PICKUP SLIP
=============================================================
ORDER REFERENCE   : ${displayOrderId}
STALL TOKEN       : ${displayToken}
CUSTOMER          : ${displayCustomer} (${displayPhone || 'N/A'})
DATE PLACED       : ${new Date(order.placedAt || order.created_at || Date.now()).toLocaleString()}

STALL PICKUP LOGISTICS:
FARMER / PRODUCER : ${displayFarmer}
MARKET LOCATION   : ${displayMarket}
STALL NUMBER      : ${displayStall}
SCHEDULED WINDOW  : ${displayPickupDate} (${displayTimeSlot})

RESERVED PRODUCE:
${displayItems.length > 0 ? displayItems.map((it, idx) => `  ${idx + 1}. ${it.name || it.product_name || 'Produce'} x ${it.quantity || 1} ${it.unit || 'kg'} @ ${formatPrice(it.price || 0)} = ${formatPrice((it.price || 0) * (it.quantity || 1))}`).join('\n') : '  (Items verified at stall pickup)'}

FINANCIAL SETTLEMENT (STRICT POLICY):
ITEMS SUBTOTAL    : ${formatPrice(calculatedSubtotal)}
STALL ADMIN FEE   : ${formatPrice(0)} (WAIVED)
GRAND TOTAL DUE   : ${formatPrice(calculatedSubtotal)} [EXACT CASH ON PICKUP]

NOTE: No advance card charges were taken online.
Hand cash directly to the farmer at stall upon collecting produce.
=============================================================
`;
    const blob = new Blob([textSlip], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MarketLink_Pickup_Pass_${displayOrderId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCollectAndSettle = () => {
    setIsMarking(true);
    updateOrderStatus(order.id, 'completed');
    if (onMarkCollected) onMarkCollected(order.id);
    setTimeout(() => {
      setIsMarking(false);
      onClose();
    }, 500);
  };

  const isCompleted = order.status === 'completed';

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-2 p-md-3"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.72)', zIndex: 1080 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-4 shadow-lg overflow-hidden position-relative d-flex flex-column"
        style={{
          maxWidth: '680px',
          width: '100%',
          maxHeight: '94vh',
          animation: 'fadeInUp 0.25s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Actions (Hidden in Print) */}
        <div className="no-print p-3 border-bottom d-flex align-items-center justify-content-between bg-light">
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-success text-white rounded-pill px-3 py-1">
              <i className="fa fa-ticket-alt me-1"></i> {t('pass_modal_title')}
            </span>
            <span className="text-muted small d-none d-sm-inline">
              Ref: <strong className="text-dark">{displayOrderId}</strong>
            </span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className={`btn btn-sm ${sunshineMode ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary'} rounded-pill px-2 py-1`}
              onClick={() => setSunshineMode(!sunshineMode)}
              title={t('pass_high_contrast')}
            >
              <i className="fa fa-sun me-1"></i>
              <span className="d-none d-md-inline">{t('pass_high_contrast')}</span>
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-primary rounded-pill px-2 py-1"
              onClick={handlePrint}
              title={t('pass_print_btn')}
            >
              <i className="fa fa-print me-1"></i>
              <span className="d-none d-sm-inline">{t('pass_print_btn')}</span>
            </button>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
        </div>

        {/* Scrollable Printable Voucher Body */}
        <div className="overflow-auto p-3 p-md-4 flex-grow-1" ref={voucherRef}>
          <div className="pickup-pass-voucher printable-pickup-pass border">
            {/* Voucher Header */}
            <div className="pickup-pass-header d-flex flex-wrap justify-content-between align-items-center gap-2">
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <i className="fa fa-leaf fs-4 text-warning"></i>
                  <h4 className="mb-0 fw-bold text-white tracking-wide">MarketLink</h4>
                  <span className="badge bg-white text-success fw-bold rounded-pill text-uppercase px-2 py-0" style={{ fontSize: '0.65rem' }}>
                    Stall Pass
                  </span>
                </div>
                <p className="mb-0 text-white-50 small" style={{ fontSize: '0.78rem' }}>
                  {t('pass_modal_subtitle')}
                </p>
              </div>

              <div className="text-end">
                <span className={`badge px-3 py-1 rounded-pill ${isCompleted ? 'bg-secondary text-white' : 'bg-warning text-dark fw-bold'}`}>
                  {isCompleted ? t('pass_status_verified') : (order.status?.replace('_', ' ').toUpperCase() || 'CONFIRMED')}
                </span>
                <div className="text-white font-monospace small mt-1 opacity-75">
                  #{displayOrderId}
                </div>
              </div>
            </div>

            <div className="p-3 p-md-4">
              {/* QR Code and Token Bar */}
              <div className="row g-3 align-items-center mb-3">
                <div className="col-sm-5 text-center">
                  <div className={`qr-scanner-card ${sunshineMode ? 'sunshine-mode' : ''}`}>
                    {qrDataUrl ? (
                      <img
                        src={qrDataUrl}
                        alt={`QR Pass for ${displayOrderId}`}
                        style={{ width: '160px', height: '160px' }}
                      />
                    ) : (
                      <div style={{ width: '160px', height: '160px' }} className="d-flex align-items-center justify-content-center bg-light">
                        <i className="fa fa-spinner fa-spin text-muted fs-3"></i>
                      </div>
                    )}
                    <small className="text-muted mt-2 fw-semibold d-block" style={{ fontSize: '0.68rem' }}>
                      <i className="fa fa-qrcode me-1 text-primary"></i>
                      {t('pass_scan_notice')}
                    </small>
                  </div>
                </div>

                <div className="col-sm-7">
                  <div className="bg-light p-3 rounded-3 border">
                    <small className="text-muted fw-bold text-uppercase d-block mb-1" style={{ fontSize: '0.7rem' }}>
                      {t('pass_token_label')}
                    </small>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-dark text-warning font-monospace fw-bold fs-5 rounded-2 tracking-wider">
                        {displayToken}
                      </span>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary rounded-circle"
                        style={{ width: '32px', height: '32px', padding: 0 }}
                        onClick={handleCopyToken}
                        title="Copy Token"
                      >
                        <i className={`fa ${copiedToken ? 'fa-check text-success' : 'fa-copy'}`}></i>
                      </button>
                    </div>

                    <div className="small text-muted mb-1">
                      <i className="fa fa-user me-1 text-primary"></i> <strong>{displayCustomer}</strong>
                      {displayPhone && <span className="ms-2">({displayPhone})</span>}
                    </div>

                    <div className="small text-muted">
                      <i className="fa fa-calendar-alt me-1 text-primary"></i> Placed: {new Date(order.placedAt || order.created_at || Date.now()).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Highlights box: Stall & Window */}
                  <div className="mt-2 p-2 rounded-2 bg-success bg-opacity-10 border border-success border-opacity-25 d-flex align-items-center justify-content-between">
                    <div>
                      <small className="text-success fw-bold d-block" style={{ fontSize: '0.68rem' }}>
                        {t('pass_stall_number')}
                      </small>
                      <strong className="text-dark fs-6">{displayStall}</strong>
                    </div>
                    <div className="text-end">
                      <small className="text-success fw-bold d-block" style={{ fontSize: '0.68rem' }}>
                        {t('pass_pickup_window')}
                      </small>
                      <strong className="text-dark small">{displayPickupDate} ({displayTimeSlot})</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Perforation Separator */}
              <div className="pickup-pass-perforation"></div>

              {/* Logistics & Location Details */}
              <div className="row g-2 mb-3 small">
                <div className="col-6">
                  <span className="text-muted d-block">{t('pass_market_location')}:</span>
                  <strong className="text-dark">{displayMarket}</strong>
                </div>
                <div className="col-6 text-end">
                  <span className="text-muted d-block">Producer / Farm:</span>
                  <strong className="text-primary">{displayFarmer}</strong>
                </div>
              </div>

              {/* Reserved Produce Manifest Table */}
              <div className="mb-3">
                <small className="text-muted fw-bold text-uppercase d-block mb-1" style={{ fontSize: '0.72rem' }}>
                  <i className="fa fa-shopping-basket text-primary me-1"></i> {t('pass_reserved_items')}
                </small>
                <div className="table-responsive">
                  <table className="table table-sm table-bordered mb-0 align-middle" style={{ fontSize: '0.8rem' }}>
                    <thead className="table-light text-muted">
                      <tr>
                        <th>Item</th>
                        <th className="text-center" style={{ width: '80px' }}>Qty</th>
                        <th className="text-end" style={{ width: '100px' }}>Rate</th>
                        <th className="text-end" style={{ width: '100px' }}>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayItems.length > 0 ? (
                        displayItems.map((item, idx) => (
                          <tr key={idx}>
                            <td className="fw-semibold text-dark">{item.name || item.product_name || 'Produce Item'}</td>
                            <td className="text-center">{item.quantity || 1} {item.unit || 'kg'}</td>
                            <td className="text-end">{formatPrice(item.price || 0)}</td>
                            <td className="text-end fw-bold">{formatPrice((item.price || 0) * (item.quantity || 1))}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center text-muted py-2">
                            Produce reservation confirmed. Pay exact cash at stall pickup.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Financial Settlement & Cash Guarantee */}
              <div className="bg-light p-3 rounded-3 border mb-3">
                <div className="d-flex justify-content-between mb-1 small text-muted">
                  <span>{t('pass_subtotal')}:</span>
                  <span>{formatPrice(calculatedSubtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 small text-muted">
                  <span>{t('pass_stall_fee')}:</span>
                  <span className="text-success fw-bold">{t('pass_free_waived')}</span>
                </div>

                <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                  <div>
                    <span className="fw-bold text-dark fs-6 d-block">{t('pass_total_cash')}</span>
                    <small className="text-danger fw-semibold" style={{ fontSize: '0.7rem' }}>
                      <i className="fa fa-money-bill-wave me-1"></i> {t('cash_pickup_rule')}
                    </small>
                  </div>
                  <span className="fw-bolder text-primary fs-4">
                    {formatPrice(calculatedSubtotal)}
                  </span>
                </div>
              </div>

              {/* Official Farmer Stamp & Verification Box */}
              <div className="pass-stamp-box">
                <div className="row g-2 align-items-center">
                  <div className="col-sm-7">
                    <small className="text-muted fw-bold d-block mb-1" style={{ fontSize: '0.68rem' }}>
                      {t('pass_farmer_signature')}
                    </small>
                    <div className="border-bottom border-secondary border-opacity-50 pt-3 mb-1" style={{ maxWidth: '200px' }}></div>
                    <small className="text-muted" style={{ fontSize: '0.65rem' }}>
                      Stall Attendant Signature &amp; Cash Verification
                    </small>
                  </div>
                  <div className="col-sm-5 text-sm-end">
                    <span className="badge bg-light text-secondary border px-2 py-1 font-monospace" style={{ fontSize: '0.65rem' }}>
                      VERIFIED AT STALL: [ &nbsp; ] YES
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions (Hidden in Print) */}
        <div className="no-print p-3 border-top bg-light d-flex flex-wrap align-items-center justify-content-between gap-2">
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary rounded-pill px-3"
              onClick={handleDownloadSlip}
            >
              <i className="fa fa-download me-1"></i> {t('pass_download_btn')}
            </button>
          </div>

          <div className="d-flex align-items-center gap-2">
            {isFarmerView && !isCompleted && (
              <button
                type="button"
                className="btn btn-sm btn-success rounded-pill px-3 fw-bold"
                onClick={handleCollectAndSettle}
                disabled={isMarking}
              >
                <i className="fa fa-check-circle me-1"></i>
                {isMarking ? 'Marking...' : 'Confirm Cash & Complete Pickup'}
              </button>
            )}

            <button
              type="button"
              className="btn btn-sm btn-primary rounded-pill px-4 fw-semibold"
              onClick={handlePrint}
            >
              <i className="fa fa-print me-1"></i> {t('pass_print_btn')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
