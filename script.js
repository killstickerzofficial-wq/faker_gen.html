document.getElementById('generateBtn').addEventListener('click', generateID);
document.getElementById('toggleSide').addEventListener('click', toggleSide);
document.getElementById('downloadBtn').addEventListener('click', downloadPNG);
document.getElementById('realIDCheck').addEventListener('change', (e) => {
    isRealID = e.target.checked;
    generateID();
});

let isFront = true;
let isRealID = true;
let uploadedPhoto = null;

document.getElementById('photoUpload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            uploadedPhoto = event.target.result;
            generateID();
        };
        reader.readAsDataURL(file);
    }
});

function generateID() {
    const canvas = document.getElementById('idCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const data = {
        fullName: document.getElementById('fullName').value,
        street: document.getElementById('street').value,
        cityStateZip: document.getElementById('cityStateZip').value,
        dlNumber: document.getElementById('dlNumber').value,
        dlClass: document.getElementById('dlClass').value,
        restrictions: document.getElementById('restrictions').value,
        endorsements: document.getElementById('endorsements').value,
        sex: document.getElementById('sex').value,
        height: document.getElementById('height').value,
        eyes: document.getElementById('eyes').value,
        hair: document.getElementById('hair').value,
        weight: document.getElementById('weight').value,
        dob: document.getElementById('dob').value,
        issueDate: document.getElementById('issueDate').value,
        expDate: document.getElementById('expDate').value,
        donor: document.getElementById('donor').value
    };
    
    if (isFront) {
        drawFront(ctx, data);
    } else {
        drawBack(ctx, data);
    }
}

function drawFront(ctx, data) {
    // Background - beige/tan color
    ctx.fillStyle = '#E8D7C3';
    ctx.fillRect(0, 0, 1012, 637);
    
    // Draw mountain landscape background
    drawMountainBackground(ctx);
    
    // Green header bar
    ctx.fillStyle = '#5C9E5F';
    ctx.fillRect(0, 0, 1012, 120);
    
    // "COLORADO" text in large green letters
    ctx.font = 'bold 72px Arial';
    ctx.fillStyle = '#5C9E5F';
    ctx.fillText('COLORADO', 25, 90);
    
    // "USA" logo circle
    ctx.beginPath();
    ctx.arc(580, 50, 35, 0, Math.PI * 2);
    ctx.fillStyle = '#5C9E5F';
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('USA', 560, 55);
    
    // REAL ID star
    if (isRealID) {
        drawStar(ctx, 675, 50, 5, 25, 12, '#000000');
    }
    
    // "DRIVER LICENSE" text
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 18px Arial';
    ctx.fillText('DRIVER LICENSE', 25, 140);
    
    // Photo area
    ctx.fillStyle = '#CCCCCC';
    ctx.fillRect(25, 160, 150, 200);
    
    if (uploadedPhoto) {
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 25, 160, 150, 200);
            addWatermarks(ctx);
        };
        img.src = uploadedPhoto;
    } else {
        ctx.fillStyle = '#666666';
        ctx.font = '14px Arial';
        ctx.fillText('Photo', 80, 260);
    }
    
    // Signature line
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(25, 380);
    ctx.lineTo(175, 380);
    ctx.stroke();
    
    ctx.font = 'italic 20px Brush Script MT, cursive';
    ctx.fillStyle = '#000080';
    ctx.fillText('Signature', 50, 375);
    
    // Parse name
    const nameParts = data.fullName.split(' ');
    const lastName = nameParts[nameParts.length - 1] || '';
    const firstName = nameParts.slice(0, -1).join(' ') || '';
    
    // Right side information
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(lastName.toUpperCase(), 230, 190);
    
    ctx.font = 'bold 20px Arial';
    ctx.fillText(firstName.toUpperCase(), 230, 220);
    
    ctx.font = '14px Arial';
    ctx.fillText(data.street.toUpperCase(), 230, 250);
    ctx.fillText(data.cityStateZip.toUpperCase(), 230, 270);
    
    // ID details in smaller area
    ctx.font = 'bold 10px Arial';
    ctx.fillStyle = '#666666';
    
    ctx.fillText('DOB:', 620, 670);
    ctx.fillStyle = '#000000';
    ctx.fillText(data.dob, 665, 670);
    
    ctx.fillStyle = '#666666';
    ctx.fillText('DL#:', 620, 700);
    ctx.fillStyle = '#000000';
    ctx.fillText(data.dlNumber, 665, 700);
    
    ctx.fillStyle = '#666666';
    ctx.fillText('EXP:', 620, 730);
    ctx.fillStyle = '#FF0000';
    ctx.font = 'bold 11px Arial';
    ctx.fillText(data.expDate, 665, 730);
    
    // Left column details
    ctx.fillStyle = '#666666';
    ctx.font = 'bold 9px Arial';
    ctx.fillText('ISS:', 230, 310);
    ctx.fillStyle = '#000000';
    ctx.fillText(data.issueDate, 260, 310);
    
    ctx.fillStyle = '#666666';
    ctx.fillText('Sex:', 230, 330);
    ctx.fillStyle = '#000000';
    ctx.fillText(data.sex, 260, 330);
    
    ctx.fillStyle = '#666666';
    ctx.fillText('Hgt:', 310, 330);
    ctx.fillStyle = '#000000';
    ctx.fillText(data.height, 340, 330);
    
    ctx.fillStyle = '#666666';
    ctx.fillText('Eye:', 230, 350);
    ctx.fillStyle = '#000000';
    ctx.fillText(data.eyes, 260, 350);
    
    ctx.fillStyle = '#666666';
    ctx.fillText('Class:', 230, 370);
    ctx.fillStyle = '#000000';
    ctx.fillText(data.dlClass, 270, 370);
    
    ctx.fillStyle = '#666666';
    ctx.fillText('Rest:', 320, 370);
    ctx.fillStyle = '#000000';
    ctx.fillText(data.restrictions, 355, 370);
    
    // Small ghost photo in bottom right
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#CCCCCC';
    ctx.fillRect(850, 500, 100, 120);
    if (uploadedPhoto) {
        const img = new Image();
        img.onload = () => {
            ctx.globalAlpha = 0.3;
            ctx.drawImage(img, 850, 500, 100, 120);
            ctx.globalAlpha = 1;
            addWatermarks(ctx);
        };
        img.src = uploadedPhoto;
    }
    ctx.globalAlpha = 1;
    
    // Add watermarks
    addWatermarks(ctx);
}

function drawMountainBackground(ctx) {
    // Sky gradient (light blue to lighter)
    const skyGradient = ctx.createLinearGradient(0, 300, 0, 500);
    skyGradient.addColorStop(0, '#B8D4E8');
    skyGradient.addColorStop(1, '#D0E8F0');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(200, 300, 812, 200);
    
    // Mountains (blue-gray)
    ctx.fillStyle = '#7A9FB5';
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.moveTo(300, 500);
    ctx.lineTo(450, 350);
    ctx.lineTo(600, 500);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(500, 500);
    ctx.lineTo(650, 320);
    ctx.lineTo(800, 500);
    ctx.fill();
    
    // Green hills
    ctx.fillStyle = '#8BBF8F';
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.moveTo(200, 500);
    ctx.quadraticCurveTo(400, 450, 600, 500);
    ctx.lineTo(600, 550);
    ctx.lineTo(200, 550);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(400, 500);
    ctx.quadraticCurveTo(600, 470, 1012, 500);
    ctx.lineTo(1012, 637);
    ctx.lineTo(400, 637);
    ctx.fill();
    
    ctx.globalAlpha = 1;
}

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;
    
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;
        
        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

function addWatermarks(ctx) {
    // Large diagonal "SAMPLE" watermark
    ctx.save();
    ctx.translate(506, 318);
    ctx.rotate(-Math.PI / 6);
    ctx.font = 'bold 120px Arial';
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
    ctx.fillText('SAMPLE', -250, 40);
    ctx.restore();
    
    // Top watermark
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
    ctx.fillText('NOT VALID FOR IDENTIFICATION', 350, 25);
    
    // Bottom watermark
    ctx.fillText('SAMPLE ONLY - EDUCATIONAL PURPOSES', 320, 620);
}

function drawBack(ctx, data) {
    ctx.fillStyle = '#E8D7C3';
    ctx.fillRect(0, 0, 1012, 637);
    
    // Green header
    ctx.fillStyle = '#5C9E5F';
    ctx.fillRect(0, 0, 1012, 80);
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 48px Arial';
    ctx.fillText('COLORADO', 25, 55);
    
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('DRIVER LICENSE', 25, 110);
    
    // Information section
    ctx.font = '12px Arial';
    ctx.fillText('This document contains security features.', 25, 150);
    ctx.fillText('For verification, visit www.dmv.colorado.gov', 25, 170);
    
    ctx.font = 'bold 14px Arial';
    ctx.fillText(`Class: ${data.dlClass}`, 25, 210);
    ctx.fillText(`Restrictions: ${data.restrictions}`, 25, 235);
    ctx.fillText(`Endorsements: ${data.endorsements}`, 25, 260);
    
    if (data.donor === 'YES') {
        ctx.fillStyle = '#FF0000';
        ctx.fillText('❤ ORGAN DONOR', 25, 290);
        ctx.fillStyle = '#000000';
    }
    
    // Barcode area
    const barcodeData = generateBarcodeData(data);
    generateBarcode(barcodeData, (barcodeCanvas) => {
        ctx.drawImage(barcodeCanvas, 350, 200, 300, 150);
        addWatermarks(ctx);
    });
    
    // Add watermarks
    addWatermarks(ctx);
}

function generateBarcodeData(data) {
    return `@\n\x1e\rANSI 636000080002DLDAQ${data.dlNumber}\nDCS${data.fullName}\nDDEN\nDAC${data.fullName.split(' ')[0]}\nDDFN\nDAD${data.fullName.split(' ').slice(1).join(' ')}\nDDGN\nDC${data.dlClass}M\nDCBNONE\nDCDNONE\nDBD${data.expDate.replace(/\//g, '')}\nDBB${data.dob.replace(/\//g, '')}\nDBH${data.height.replace(/[^0-9]/g, '')}\nDAG${data.street}\nDAI${data.cityStateZip.split(',')[0].trim()}\nDAJCO\nDAK${data.cityStateZip.split(' ')[2]}0000\nDCFNONE\nDCGUSA\nDDC${data.eyes}\nDDDNONE\nDDGUSA\nDDEU\nDDJCH\nDDK1\nDDL1\nDDMNONE\nDDN0\nDDP0\nDDQNONE\nDDRNONE\nDDSNONE\nDDT0\nDDU0\x1e\r`;
}

function generateBarcode(text, callback) {
    const canvas = document.createElement('canvas');
    try {
        bwipjs.toCanvas(canvas, {
            bcid: 'pdf417',
            text: text,
            scale: 3,
            height: 10,
            width: 30,
            includetext: false,
            textxalign: 'center',
        }, (err) => {
            if (err) {
                console.error(err);
            } else {
                callback(canvas);
            }
        });
    } catch (e) {
        console.error('Barcode generation error:', e);
    }
}

function toggleSide() {
    isFront = !isFront;
    generateID();
}

function downloadPNG() {
    const canvas = document.getElementById('idCanvas');
    const link = document.createElement('a');
    link.download = 'Colorado_ID_SAMPLE.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Generate initial ID on page load
window.addEventListener('load', generateID);